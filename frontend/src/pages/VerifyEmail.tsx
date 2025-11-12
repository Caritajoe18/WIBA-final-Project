import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="text-center">
                        {status === 'loading' && (
                            <Loader2 className="h-16 w-16 mx-auto animate-spin text-primary" />
                        )}
                        {status === 'success' && (
                            <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                        )}
                        {status === 'error' && (
                            <XCircle className="h-16 w-16 mx-auto text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl text-center">
                        {status === 'loading' && 'Verifying Email...'}
                        {status === 'success' && 'Email Verified! 🎉'}
                        {status === 'error' && 'Verification Failed'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {message}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {status === 'success' && (
                        <div className="text-center space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Redirecting to dashboard...
                            </p>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="space-y-4">
                            <Button
                                onClick={() => navigate('/login')}
                                className="w-full"
                            >
                                Go to Login
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
