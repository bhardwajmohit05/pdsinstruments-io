
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";

// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Client";
  status: "Active" | "Blocked" | "Inactive";
  contact?: string;
  devices?: number;
  subUsers?: number;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: Omit<User, "id" | "status" | "devices" | "subUsers"> & { password: string }) => Promise<boolean>;
  signOut: () => void;
  getUsers: () => User[];
  addUser: (user: Omit<User, "id"> & { password: string }) => string;
  updateUser: (id: string, data: Partial<User>) => boolean;
  deleteUser: (id: string) => boolean;
  getUser: (id: string) => User | null;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Get all users from localStorage
  const getUsers = (): User[] => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  // Get a specific user by ID
  const getUser = (id: string): User | null => {
    const users = getUsers();
    return users.find(u => u.id === id) || null;
  };

  // Add a new user
  const addUser = (userData: Omit<User, "id"> & { password: string }): string => {
    const users = getUsers();
    const { password, ...userWithoutPassword } = userData;
    
    // Generate ID
    const id = Date.now().toString();
    
    // Create new user object
    const newUser = {
      id,
      ...userWithoutPassword,
      devices: 0,
      subUsers: 0
    };
    
    // Store in users array
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Store password separately
    const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
    credentials[newUser.email] = password;
    localStorage.setItem("credentials", JSON.stringify(credentials));
    
    return id;
  };

  // Update user
  const updateUser = (id: string, data: Partial<User>): boolean => {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) return false;
    
    users[index] = { ...users[index], ...data };
    localStorage.setItem("users", JSON.stringify(users));
    
    // Update current user if it's them being updated
    if (user && user.id === id) {
      setUser(users[index]);
      localStorage.setItem("user", JSON.stringify(users[index]));
    }
    
    return true;
  };

  // Delete user
  const deleteUser = (id: string): boolean => {
    const users = getUsers();
    const updatedUsers = users.filter(u => u.id !== id);
    
    if (updatedUsers.length === users.length) return false;
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Log out current user if they're the one being deleted
    if (user && user.id === id) {
      signOut();
    }
    
    return true;
  };

  // Sign in
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Check credentials
      const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
      const validPassword = credentials[email];
      
      if (!validPassword || validPassword !== password) {
        toast({
          title: "Authentication failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
      
      // Find user
      const users = getUsers();
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        toast({
          title: "Authentication failed",
          description: "User not found",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if user is blocked or inactive
      if (foundUser.status !== "Active") {
        toast({
          title: "Account " + foundUser.status.toLowerCase(),
          description: "Your account is not active. Please contact the administrator.",
          variant: "destructive",
        });
        return false;
      }
      
      // Set user in state and localStorage
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      
      toast({
        title: "Welcome back!",
        description: `Signed in as ${foundUser.name}`,
      });
      
      return true;
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Authentication failed",
        description: "An error occurred during sign in",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up
  const signUp = async (userData: Omit<User, "id" | "status" | "devices" | "subUsers"> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Check if email already exists
      const users = getUsers();
      if (users.some(u => u.email === userData.email)) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // Add user
      const id = addUser({
        ...userData,
        status: "Active",
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      return true;
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  // Initialize default admin if no users exist
  useEffect(() => {
    if (!isLoading) {
      const users = getUsers();
      if (users.length === 0) {
        // Add default admin
        addUser({
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123",
          role: "Admin",
          status: "Active",
          contact: "123-456-7890",
        });
      }
    }
  }, [isLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
