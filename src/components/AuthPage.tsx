import { useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { GraduationCap } from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: (accessToken: string, userName: string) => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'creator' | 'student'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Now log them in
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      if (loginData.session) {
        onAuthSuccess(loginData.session.access_token, name);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login...');
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.error('Login error:', loginError);
        setError(loginError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        console.log('Login successful, session created:', {
          userId: data.user.id,
          hasAccessToken: !!data.session.access_token
        });
        const userName = data.user.user_metadata?.name || 'User';
        onAuthSuccess(data.session.access_token, userName);
      } else {
        console.error('Login succeeded but no session was created');
        setError('Failed to create session');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login exception:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-12 h-12 text-[var(--color-primary)]" />
            <span className="font-['Outfit'] text-3xl text-[var(--color-primary-dark)]">EduLearn</span>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            Create and share interactive lessons
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--color-border)]">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                isLogin 
                  ? 'bg-[var(--color-primary)] text-white' 
                  : 'bg-gray-100 text-[var(--color-text-secondary)] hover:bg-gray-200'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                !isLogin 
                  ? 'bg-[var(--color-primary)] text-white' 
                  : 'bg-gray-100 text-[var(--color-text-secondary)] hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Account Type</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'creator' | 'student')}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
                  >
                    <option value="student">Student - Browse and learn from lessons</option>
                    <option value="creator">Creator - Create, edit, and manage lessons</option>
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}