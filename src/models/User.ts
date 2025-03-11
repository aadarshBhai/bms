
export interface User {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  occupation?: string;
  password?: string; // Only used for registration, not stored in client-side
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSignupData {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  password: string;
}
