import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ClerkProvider } from '@clerk/clerk-react';
import Index from './pages/Index';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import RefundPolicy from './pages/RefundPolicy';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

// Import your publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing VITE_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable');
}

// Create a wrapper component for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isSignedIn ? <>{children}</> : null;
};

// Component to handle scroll to top on route change
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ClerkProvider 
        publishableKey={clerkPubKey}
        appearance={{
          variables: {
            colorPrimary: '#2563eb',
            colorText: '#111827',
            colorTextSecondary: '#4b5563',
            colorBackground: '#ffffff',
            colorInputBackground: '#ffffff',
            colorInputText: '#111827',
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <div className="min-h-screen flex flex-col">
                    <ScrollToTop />
                    <main className="flex-grow w-full">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        
                        {/* Auth Routes */}
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        
                        {/* Protected Routes */}
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/refundpolicy" element={<RefundPolicy />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/course/:id" element={<CourseDetails />} />
                        
                        {/* Redirect old login route */}
                        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
                        
                        {/* 404 - Not Found */}
                        <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <div className="mt-auto">
                      <Footer />
                    </div>
                  </div>
                </BrowserRouter>
              </CartProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
}

export default App;
