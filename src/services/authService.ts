
import { User } from "@/hooks/useAuth";

// This would be replaced with actual API calls in a production environment
export const authService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    // In a real implementation, this would be a fetch call to your backend API
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  },

  // Sign in
  signIn: async (email: string, password: string): Promise<User | null> => {
    // In a real implementation, this would be a POST request to your API
    const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
    if (credentials[email] !== password) {
      return null;
    }

    const users = localStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];
    const user = usersList.find((u: User) => u.email === email);
    
    return user || null;
  },

  // Sign up
  signUp: async (userData: Omit<User, "id" | "status" | "devices" | "subUsers"> & { password: string }): Promise<User | null> => {
    // In a real implementation, this would be a POST request to your API
    const users = localStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];
    
    // Check if email already exists
    if (usersList.some((u: User) => u.email === userData.email)) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = userData;
    const id = Date.now().toString();
    
    const newUser = {
      id,
      ...userWithoutPassword,
      status: "Active",
      devices: 0,
      subUsers: 0
    };
    
    // Store in users array
    const updatedUsers = [...usersList, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Store password separately
    const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
    credentials[newUser.email] = password;
    localStorage.setItem("credentials", JSON.stringify(credentials));
    
    return newUser;
  },

  // Add user (Admin only)
  addUser: async (userData: Omit<User, "id"> & { password: string }): Promise<User | null> => {
    // In a real implementation, this would be a POST request to your API
    const users = localStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];
    
    // Check if email already exists
    if (usersList.some((u: User) => u.email === userData.email)) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = userData;
    const id = Date.now().toString();
    
    const newUser = {
      id,
      ...userWithoutPassword,
    };
    
    // Store in users array
    const updatedUsers = [...usersList, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Store password separately
    const credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
    credentials[newUser.email] = password;
    localStorage.setItem("credentials", JSON.stringify(credentials));
    
    return newUser;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<User | null> => {
    // In a real implementation, this would be a PUT request to your API
    const users = localStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];
    
    const index = usersList.findIndex((u: User) => u.id === id);
    if (index === -1) return null;
    
    usersList[index] = { ...usersList[index], ...data };
    localStorage.setItem("users", JSON.stringify(usersList));
    
    return usersList[index];
  },

  // Delete user
  deleteUser: async (id: string): Promise<boolean> => {
    // In a real implementation, this would be a DELETE request to your API
    const users = localStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];
    
    const updatedUsers = usersList.filter((u: User) => u.id !== id);
    if (updatedUsers.length === usersList.length) return false;
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  }
};
