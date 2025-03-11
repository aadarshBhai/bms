
import { User, UserSignupData } from '@/models/User';

// API URL should be configured based on your MongoDB Atlas setup
const API_URL = 'https://students-90cc0.firebasestorage.app/api';

export async function registerUser(userData: UserSignupData): Promise<{ user: User }> {
  try {
    // In a real application, this would be an API call to your MongoDB backend
    // For now, we'll simulate success and just return the user data
    const { password, ...userWithoutPassword } = userData;
    
    // Log the registration attempt
    console.log('Registering user:', userWithoutPassword);
    
    // Return simulated success response
    return { 
      user: {
        ...userWithoutPassword,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: false
      } 
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }
}

export async function getUserProfile(userId: string): Promise<{ user: User }> {
  try {
    // In a real application, this would fetch the user profile from MongoDB
    // For now, return mock data
    return {
      user: {
        _id: userId,
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        occupation: "Student",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}
