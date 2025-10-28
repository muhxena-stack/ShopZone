import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 
              onClick={() => handleNavigate('/products')}
              className="text-2xl font-bold flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="text-3xl">🛍️</span>
              ShopZone
            </h1>
            <div className="hidden md:flex gap-4">
              <button
                onClick={() => handleNavigate('/products')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPath === '/products' || currentPath.startsWith('/products/')
                    ? 'bg-primary-foreground/20 backdrop-blur-sm'
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                Products
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPath === '/dashboard'
                      ? 'bg-primary-foreground/20 backdrop-blur-sm'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            <div className="w-px h-6 bg-primary-foreground/20"></div>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="bg-primary-foreground/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  👤 {user?.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    handleNavigate('/products');
                  }}
                  className="bg-secondary text-secondary-foreground px-5 py-2 rounded-lg font-semibold hover:bg-secondary/80 transition-all border-2 border-border shadow-lg hover:shadow-secondary/40"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigate('/login')}
                className="bg-secondary text-secondary-foreground px-5 py-2 rounded-lg font-semibold hover:bg-secondary/80 transition-all border-2 border-border shadow-lg hover:shadow-secondary/40"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="ml-4 text-primary-foreground">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigate('/products')}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-left ${
                  currentPath === '/products' || currentPath.startsWith('/products/')
                    ? 'bg-primary-foreground/20 backdrop-blur-sm'
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                Products
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-left ${
                    currentPath === '/dashboard'
                      ? 'bg-primary-foreground/20 backdrop-blur-sm'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  Dashboard
                </button>
              )}
              <div className="pt-4 border-t border-primary-foreground/20">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-4">
                    <span className="bg-primary-foreground/20 px-4 py-2 rounded-lg backdrop-blur-sm text-center">
                      👤 {user?.username}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        handleNavigate('/products');
                      }}
                      className="bg-secondary text-secondary-foreground px-5 py-2 rounded-lg font-semibold hover:bg-secondary/80 transition-all border-2 border-border shadow-lg hover:shadow-secondary/40"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigate('/login')}
                    className="bg-secondary text-secondary-foreground px-5 py-2 rounded-lg font-semibold hover:bg-secondary/80 transition-all border-2 border-border shadow-lg hover:shadow-secondary/40 w-full"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
