import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';

const Router: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/products');
  const [productId, setProductId] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const path = window.location.hash.slice(1) || '/products';
    setCurrentPath(path);

    const match = path.match(/^\/products\/(\d+)$/);
    if (match) {
      setProductId(parseInt(match[1], 10));
    }
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;

    const match = path.match(/^\/products\/(\d+)$/);
    if (match) {
      setProductId(parseInt(match[1], 10));
    } else {
      setProductId(null);
    }
  };

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      navigate('/products');
      return null;
    }

    if (currentPath === '/login') {
      if (isAuthenticated) {
        navigate('/dashboard');
        return null;
      }
      return <LoginPage onNavigate={navigate} />;
    }

    if (currentPath === '/dashboard') {
      if (!isAuthenticated) {
        navigate('/login');
        return null;
      }
      return <DashboardPage />;
    }

    if (currentPath.startsWith('/products/') && productId) {
      return <ProductDetailPage productId={productId} onNavigate={navigate} />;
    }

    if (currentPath === '/products') {
      return <ProductsPage onNavigate={navigate} />;
    }

    return <ProductsPage onNavigate={navigate} />;
  };

  return (
    <>
      <Navbar onNavigate={navigate} currentPath={currentPath} />
      <ErrorBoundary>{renderPage()}</ErrorBoundary>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;