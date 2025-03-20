
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Server, Signal, Battery, Settings, Plus, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/hooks/useAuth";

// Mock device data
const initialDevices = [
  {
    id: "FL-001",
    name: "Flow Meter 1",
    type: "Flow Meter",
    user: "John Doe",
    status: "Online",
    lastSeen: "2023-05-10T12:30:00",
    battery: 85,
    signal: 92,
  },
  {
    id: "PR-002",
    name: "Pressure Sensor 1",
    type: "Pressure Sensor",
    user: "Jane Smith",
    status: "Online",
    lastSeen: "2023-05-10T12:25:00",
    battery: 72,
    signal: 88,
  },
  {
    id: "TM-003",
    name: "Temperature Sensor 1",
    type: "Temperature Sensor",
    user: "Robert Johnson",
    status: "Offline",
    lastSeen: "2023-05-09T18:45:00",
    battery: 31,
    signal: 0,
  },
];

const deviceTypes = ["Flow Meter", "Pressure Sensor", "Temperature Sensor", "Water Level Sensor"];

const DeviceManagement = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDevice, setNewDevice] = useState({
    id: "",
    name: "",
    type: "",
    user: "",
  });
  const [open, setOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, getUsers } = useAuth();

  // Filter devices based on user role and search term
  useEffect(() => {
    // Get all users for the dropdown
    const allUsers = getUsers();
    
    // For Admin, show all users
    // For Client, only show sub-users created by the client
    if (user) {
      if (user.role === "Admin") {
        setAvailableUsers(allUsers);
      } else {
        // Filter users to only show those created by the current client
        // In a real app, you would have a createdBy field or similar
        // For now, we'll just show the client themselves
        setAvailableUsers([user]);
      }
      
      // Filter devices based on user role
      let userDevices = [...devices];
      if (user.role === "Client") {
        // Only show devices assigned to this client
        userDevices = devices.filter(device => device.user === user.name);
      }
      
      // Apply search filter
      const searchFiltered = userDevices.filter(
        (device) =>
          device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setFilteredDevices(searchFiltered);
    }
  }, [user, devices, searchTerm, getUsers]);

  const handleAddDevice = () => {
    if (!newDevice.id || !newDevice.name || !newDevice.type || !newDevice.user) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const device = {
      ...newDevice,
      status: "Online",
      lastSeen: new Date().toISOString(),
      battery: 100,
      signal: 95,
    };

    setDevices([...devices, device]);
    setNewDevice({ id: "", name: "", type: "", user: "" });
    setOpen(false);
    
    toast({
      title: "Device Added",
      description: `${device.name} has been added successfully.`,
    });
  };

  const handleViewDevice = (deviceId) => {
    navigate(`/devices/${deviceId}`);
  };

  const handleDeleteDevice = (deviceId) => {
    const device = devices.find((d) => d.id === deviceId);
    setDevices(devices.filter((device) => device.id !== deviceId));
    
    toast({
      title: "Device Deleted",
      description: `${device?.name} has been removed.`,
    });
  };

  const generateDeviceId = () => {
    const types = {
      "Flow Meter": "FL",
      "Pressure Sensor": "PR",
      "Temperature Sensor": "TM",
      "Water Level Sensor": "WL"
    };
    
    const prefix = newDevice.type ? types[newDevice.type] || "DEV" : "DEV";
    const number = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${number}`;
  };

  // Determine if the user can add devices (only admins or clients)
  const canAddDevices = user && ["Admin", "Client"].includes(user.role);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Device Management</h1>
            {canAddDevices && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Device
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Device</DialogTitle>
                    <DialogDescription>
                      Register a new IoT device to the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deviceId" className="text-right">
                        Device ID
                      </Label>
                      <div className="col-span-3 flex gap-2">
                        <Input
                          id="deviceId"
                          value={newDevice.id}
                          onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                          className="flex-1"
                          placeholder="e.g., FL-1234"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => setNewDevice({...newDevice, id: generateDeviceId()})}
                          type="button"
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deviceName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="deviceName"
                        value={newDevice.name}
                        onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., Kitchen Flow Meter"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deviceType" className="text-right">
                        Type
                      </Label>
                      <Select
                        onValueChange={(value) => setNewDevice({ ...newDevice, type: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                        <SelectContent>
                          {deviceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deviceUser" className="text-right">
                        Assign to User
                      </Label>
                      <Select
                        onValueChange={(value) => setNewDevice({ ...newDevice, user: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableUsers.map((availableUser) => (
                            <SelectItem key={availableUser.id} value={availableUser.name}>
                              {availableUser.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDevice}>Add Device</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
              <CardDescription>
                {user?.role === "Admin" 
                  ? "Manage all IoT devices connected to the platform." 
                  : "View and manage your assigned IoT devices."}
              </CardDescription>
              <div className="mt-4">
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              {filteredDevices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm 
                    ? "No devices match your search criteria." 
                    : user?.role === "Admin" 
                      ? "No devices have been added yet." 
                      : "You don't have any devices assigned to you."}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Battery</TableHead>
                      <TableHead>Signal</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDevices.map((device) => (
                      <TableRow
                        key={device.id}
                        className="cursor-pointer"
                        onClick={() => handleViewDevice(device.id)}
                      >
                        <TableCell className="font-medium">{device.id}</TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.type}</TableCell>
                        <TableCell>{device.user}</TableCell>
                        <TableCell>
                          <Badge
                            variant={device.status === "Online" ? "default" : "secondary"}
                            className="flex items-center gap-1"
                          >
                            {device.status === "Online" ? (
                              <BadgeCheck className="h-3 w-3" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-gray-400" />
                            )}
                            {device.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Battery className="h-4 w-4 text-muted-foreground" />
                            <span
                              className={`${
                                device.battery > 70
                                  ? "text-green-600"
                                  : device.battery > 30
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {device.battery}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Signal className="h-4 w-4 text-muted-foreground" />
                            <span
                              className={`${
                                device.signal > 70
                                  ? "text-green-600"
                                  : device.signal > 30
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {device.signal}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/devices/${device.id}/config`);
                            }}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          {user?.role === "Admin" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDevice(device.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DeviceManagement;
