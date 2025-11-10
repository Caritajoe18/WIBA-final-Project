import { useState } from 'react';
import type { Screen } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Package, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  onUserTypeSelect: (type: 'requester' | 'tasker' | 'admin') => void;
}

export default function LoginScreen({ onNavigate, onUserTypeSelect }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Mock login logic - in real app, would validate credentials
    onUserTypeSelect('requester');
    onNavigate('home');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="px-6 lg:px-12 pt-6 lg:pt-8 pb-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => onNavigate('welcome')} className="mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 lg:px-12">
        <div className="max-w-md mx-auto w-full">
          {/* Logo and Title */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h2 className="text-blue-900 mb-2 text-2xl lg:text-3xl font-bold">Welcome Back</h2>
            <p className="text-slate-600 lg:text-lg">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4 lg:space-y-5 mb-6">
            <div>
              <label className="text-slate-700 mb-2 block text-sm lg:text-base font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="rounded-xl h-12 lg:h-14 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-slate-700 mb-2 block text-sm lg:text-base font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="rounded-xl h-12 lg:h-14 pr-12 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm lg:text-base">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl h-12 lg:h-14 mb-4 text-base lg:text-lg"
            onClick={handleLogin}
          >
            Sign In
          </Button>

          {/* Divider */}
          <div className="relative my-6 lg:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gradient-to-br from-blue-50 to-green-50 text-slate-500 text-sm lg:text-base">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full rounded-xl h-12 lg:h-14 border-slate-300 text-base lg:text-lg"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
                <span>Continue with Wallet</span>
              </div>
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-auto pb-6">
            <p className="text-slate-600 text-sm lg:text-base">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('welcome')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
