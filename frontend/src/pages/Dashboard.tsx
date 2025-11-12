import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { WalletConnect } from '@/components/auth/WalletConnect';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.getProfile();
            setUser(response.user);
        } catch (error) {
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        api.logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto p-4 max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Role</p>
                                    <Badge>{user?.role}</Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">KYC Status</p>
                                    <Badge variant={user?.kycStatus === 'VERIFIED' ? 'default' : 'secondary'}>
                                        {user?.kycStatus}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Reputation Score</p>
                                    <p className="font-medium">{user?.reputationScore || 0}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Verified</p>
                                    <Badge variant={user?.isEmailVerified ? 'default' : 'destructive'}>
                                        {user?.isEmailVerified ? 'Yes' : 'No'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Wallet Connection</CardTitle>
                            <CardDescription>
                                Connect your crypto wallet to start using DropIt
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user?.walletAddress ? (
                                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                        Wallet Connected
                                    </p>
                                    <p className="text-xs text-green-700 dark:text-green-300 font-mono">
                                        {user.walletAddress}
                                    </p>
                                </div>
                            ) : (
                                <WalletConnect />
                            )}
                        </CardContent>
                    </Card>

                    {user?.kycStatus === 'PENDING' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Complete KYC Verification</CardTitle>
                                <CardDescription>
                                    Verify your identity to start accepting or creating tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Start KYC Verification</Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
