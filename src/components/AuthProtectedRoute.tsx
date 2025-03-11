
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface AuthProtectedRouteProps {
  children: React.ReactNode;
}

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
          toast({
            title: "Authentication Required",
            description: "You need to log in to access this page.",
            variant: "destructive",
          });
          navigate('/login');
        }
      });

      return () => unsubscribe();
    };

    checkAuthStatus();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthProtectedRoute;
