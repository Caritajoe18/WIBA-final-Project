import { Link } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';

export default function Register() {
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
                    <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                    <p className="text-sm opacity-90">
                        Join DropIt - Decentralized Logistics Marketplace
                    </p>
                </div>
            </div>

            {/* Registration Form */}
            <div className="max-w-lg mx-auto px-4 py-6">
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <RegisterForm />
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
