import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link');
            return;
        }

        verifyEmail(token);
    }, [searchParams]);

    const verifyEmail = async (token: string) => {
        try {
            const response = await api.verifyEmail(token);
            setStatus('success');
            setMessage(response.message || 'Email verified successfully!');

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Verification failed');
        }
    };

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

            {/* Content */}
            <div className="max-w-lg mx-auto px-4 py-12">
                <div className="bg-card rounded-xl border border-border shadow-sm p-8">
                    <div className="text-center space-y-6">
                        {/* Icon */}
                        <div className="flex justify-center">
                            {status === 'loading' && (
                                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                            )}
                            {status === 'success' && (
                                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                    <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                {status === 'loading' && 'Verifying Email...'}
                                {status === 'success' && 'Email Verified! 🎉'}
                                {status === 'error' && 'Verification Failed'}
                            </h2>
                            <p className="text-muted-foreground">
                                {message}
                            </p>
                        </div>

                        {/* Actions */}
                        {status === 'success' && (
                            <div className="pt-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Redirecting to dashboard...
                                </p>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                    <div className="bg-primary h-full animate-pulse" style={{ width: '100%' }} />
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="space-y-3 pt-4">
                                <Button
                                    onClick={() => navigate('/login')}
                                    className="w-full"
                                >
                                    Go to Login
                                </Button>
                                <Button
                                    onClick={() => navigate('/register')}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Register New Account
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
