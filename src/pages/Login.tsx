import React, { useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const success = login(username, password);
      if (success) {
        onNavigate('/dashboard');
      } else {
        setError('Invalid credentials. Try: admin / admin123');
      }
    },
    [username, password, login, onNavigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-primary">
            Welcome Back
          </h2>
          <p className="text-muted-foreground mt-2">Login to access admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-card-foreground font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-card-foreground font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-destructive/20 border-2 border-destructive/40 text-destructive-foreground px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 border-2 border-border shadow-lg hover:shadow-primary/50"
          >
            Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-semibold">Demo credentials:</span><br />
            Username: <span className="font-mono bg-background px-2 py-1 rounded">admin</span><br />
            Password: <span className="font-mono bg-background px-2 py-1 rounded">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;