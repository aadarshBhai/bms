
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { signUp } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
import { registerUser } from '@/api/users';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: 'participant',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, occupation: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Register with Firebase Auth
      const userCredential = await signUp(formData.email, formData.password);
      
      // 2. Store additional user data in MongoDB (or simulated for now)
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        occupation: formData.occupation,
        password: formData.password, // This would be hashed on the server
      });
      
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      
      navigate('/login');
    } catch (error: any) {
      let message = "Failed to create account";
      
      if (error.code === 'auth/email-already-in-use') {
        message = "Email already in use";
      } else if (error.code === 'auth/invalid-email') {
        message = "Invalid email address";
      } else if (error.code === 'auth/weak-password') {
        message = "Password is too weak";
      }
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-8 md:py-16 flex-grow">
        <div className="container-custom max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-brand-blue opacity-90"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                  alt="Event audience" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">Join Event Dekho Today</h2>
                  <p className="text-center">Discover, participate, and organize amazing events at your educational institution.</p>
                </div>
              </div>
              
              <div className="p-4 md:p-8">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-brand-blue">Create An Account</h1>
                  <p className="text-gray-600 mt-1">Register to get started</p>
                </div>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="name" 
                        placeholder="Enter your full name" 
                        className="pl-10" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="pl-10" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        className="pl-10" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select 
                      value={formData.occupation} 
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participant">Participant</SelectItem>
                        <SelectItem value="organizer">Organizer</SelectItem>
                        <SelectItem value="manager">Event Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a password" 
                        className="pl-10 pr-10" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long with a number and special character.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 mt-1 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{' '}
                      <a href="#" className="text-brand-purple hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-brand-purple hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  
                  <Button 
                    className="w-full mt-2 bg-brand-blue hover:bg-brand-purple transition-colors"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500">Or sign up with</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" type="button">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link to="/login" className="text-brand-purple hover:underline font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Signup;
