import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, UserPlus, UserX, Edit, Trash2, Lock, Unlock, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    role: "Client", 
    contact: ""
  });
  const [newSubUser, setNewSubUser] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    parentUser: "", 
    accessLevel: "Read-only" 
  });
  const [userOpen, setUserOpen] = useState(false);
  const [subUserOpen, setSubUserOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const { toast } = useToast();
  const { getUsers, addUser, updateUser, deleteUser, getUser } = useAuth();
  
  const [users, setUsers] = useState(getUsers());
  const [subUsers, setSubUsers] = useState([]);

  // Refresh users when changes happen
  useEffect(() => {
    setUsers(getUsers());
  }, [getUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubUsers = subUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.parentUser.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.contact) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const userId = addUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role as "Admin" | "Client",
        contact: newUser.contact,
        status: "Active"
      });
      
      setNewUser({ name: "", email: "", password: "", confirmPassword: "", role: "Client", contact: "" });
      setUserOpen(false);
      setUsers(getUsers()); // Refresh the users list
      
      toast({
        title: "User Added",
        description: `${newUser.name} has been added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user. Email may already be in use.",
        variant: "destructive",
      });
    }
  };

  const handleAddSubUser = () => {
    if (!newSubUser.name || !newSubUser.email || !newSubUser.password || !newSubUser.parentUser) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (newSubUser.password !== newSubUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const id = subUsers.length ? Math.max(...subUsers.map((u) => u.id)) + 1 : 1;
    const subUser = {
      id,
      name: newSubUser.name,
      email: newSubUser.email,
      parentUser: newSubUser.parentUser,
      status: "Active",
      accessLevel: newSubUser.accessLevel,
    };

    setSubUsers([...subUsers, subUser]);
    
    // Update the subUsers count for the parent user
    const updatedUsers = users.map(user => 
      user.name === newSubUser.parentUser 
        ? { ...user, subUsers: user.subUsers + 1 }
        : user
    );
    setUsers(updatedUsers);
    
    setNewSubUser({ name: "", email: "", password: "", confirmPassword: "", parentUser: "", accessLevel: "Read-only" });
    setSubUserOpen(false);
    
    toast({
      title: "Sub-User Added",
      description: `${subUser.name} has been added to ${subUser.parentUser}'s account successfully.`,
    });
  };

  const handleDeleteUser = (id: string) => {
    const user = getUser(id);
    
    if (deleteUser(id)) {
      // Also delete all sub-users associated with this user
      if (user) {
        const updatedSubUsers = subUsers.filter(su => su.parentUser !== user.name);
        setSubUsers(updatedSubUsers);
      }
      
      setUsers(getUsers()); // Refresh users list
      
      toast({
        title: "User Deleted",
        description: `${user?.name} has been removed.`,
      });
    }
  };

  const handleDeleteSubUser = (id: number) => {
    const subUser = subUsers.find((u) => u.id === id);
    
    // Update the subUsers count for the parent user
    if (subUser) {
      const updatedUsers = users.map(user => 
        user.name === subUser.parentUser 
          ? { ...user, subUsers: Math.max(0, user.subUsers - 1) }
          : user
      );
      setUsers(updatedUsers);
    }
    
    setSubUsers(subUsers.filter((su) => su.id !== id));
    
    toast({
      title: "Sub-User Deleted",
      description: `${subUser?.name} has been removed.`,
    });
  };

  const toggleUserStatus = (id: string) => {
    const user = getUser(id);
    
    if (user) {
      const newStatus = user.status === "Active" ? "Blocked" : "Active";
      
      if (updateUser(id, { status: newStatus as "Active" | "Blocked" | "Inactive" })) {
        setUsers(getUsers()); // Refresh the users list
        
        toast({
          title: `User ${newStatus}`,
          description: `${user.name} has been ${newStatus.toLowerCase()}.`,
        });
      }
    }
  };

  const clientUsers = users.filter(user => user.role === "Client");

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <div className="flex gap-2">
              <Dialog open={userOpen} onOpenChange={setUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" /> Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Register New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account with appropriate role and permissions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact" className="text-right">Contact</Label>
                      <Input
                        id="contact"
                        type="tel"
                        value={newUser.contact}
                        onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirmPassword" className="text-right">Confirm</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={newUser.confirmPassword}
                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">Role</Label>
                      <Select 
                        value={newUser.role} 
                        onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Client">Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setUserOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddUser}>Register User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={subUserOpen} onOpenChange={setSubUserOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" /> Add Sub-User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Sub-User</DialogTitle>
                    <DialogDescription>
                      Create a new sub-user account with read-only permissions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subName" className="text-right">Name</Label>
                      <Input
                        id="subName"
                        value={newSubUser.name}
                        onChange={(e) => setNewSubUser({ ...newSubUser, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subEmail" className="text-right">Email</Label>
                      <Input
                        id="subEmail"
                        type="email"
                        value={newSubUser.email}
                        onChange={(e) => setNewSubUser({ ...newSubUser, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subPassword" className="text-right">Password</Label>
                      <Input
                        id="subPassword"
                        type="password"
                        value={newSubUser.password}
                        onChange={(e) => setNewSubUser({ ...newSubUser, password: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subConfirmPassword" className="text-right">Confirm</Label>
                      <Input
                        id="subConfirmPassword"
                        type="password"
                        value={newSubUser.confirmPassword}
                        onChange={(e) => setNewSubUser({ ...newSubUser, confirmPassword: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="parentUser" className="text-right">Parent User</Label>
                      <Select 
                        value={newSubUser.parentUser} 
                        onValueChange={(value) => setNewSubUser({ ...newSubUser, parentUser: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a client user" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientUsers.map(user => (
                            <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="accessLevel" className="text-right">Access Level</Label>
                      <Select 
                        value={newSubUser.accessLevel} 
                        onValueChange={(value) => setNewSubUser({ ...newSubUser, accessLevel: value })}
                        disabled
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Read-only">Read-only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSubUserOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddSubUser}>Add Sub-User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>
                Manage user accounts, sub-users, and permissions for your IoT platform.
              </CardDescription>
              <div className="mt-4 space-y-4">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="subusers">Sub-Users</TabsTrigger>
                  </TabsList>
                  <TabsContent value="users" className="mt-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Devices</TableHead>
                          <TableHead>Sub-Users</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.contact || "N/A"}</TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  user.role === "Admin"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                }`}>
                                  {user.role}
                                </span>
                              </TableCell>
                              <TableCell>{user.devices || 0}</TableCell>
                              <TableCell>{user.subUsers || 0}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    user.status === "Active"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : user.status === "Blocked"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end items-center gap-1">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => toggleUserStatus(user.id)}
                                  >
                                    {user.status === "Active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                              No users found. Add a new user to get started.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="subusers" className="mt-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Parent User</TableHead>
                          <TableHead>Access Level</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubUsers.length > 0 ? (
                          filteredSubUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.parentUser}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                                  {user.accessLevel}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                  {user.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end items-center gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteSubUser(user.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                              No sub-users found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </div>
            </CardHeader>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
