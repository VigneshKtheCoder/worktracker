
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from './AuthForm';
import Index from '../pages/Index';
import AppHeader from './AppHeader';

const MainApp: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen">
      <AppHeader />
      <Index />
    </div>
  );
};

export default MainApp;
