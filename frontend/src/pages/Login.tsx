import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
                <div className="max-w-lg mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-foreground">DropIt</h1>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground shadow-sm">
                <div className="max-w-lg mx-auto px-4 py-8 text-center">
                    <div className="text-6xl mb-4">🚚</div>
                    <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-sm opacity-90">
                        Login to your DropIt account
                    </p>
                </div>
            </div>

            {/* Login Form */}
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <LoginForm />
                </div>

                {/* Footer */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                            Register
                        </Link>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        <Link to="/forgot-password" className="text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
