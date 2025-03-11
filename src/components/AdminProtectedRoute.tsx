
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';

// List of admin emails
const ADMIN_EMAILS = ['admin@eventdekho.com']; // Add your admin emails here

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && ADMIN_EMAILS.includes(user.email || '')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin area.",
            variant: "destructive",
          });
          navigate('/');
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    };

    checkAdminStatus();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return isAdmin ? <>{children}</> : null;
};

export default AdminProtectedRoute;
