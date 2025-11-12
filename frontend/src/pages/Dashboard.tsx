import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { WalletConnect } from '@/components/auth/WalletConnect';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    LogOut,
    User,
    Wallet,
    Shield,
    Star,
    Settings,
    ChevronRight,
    TrendingUp
} from 'lucide-react';

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
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
                <div className="max-w-lg mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">DropIt</h1>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Profile Header */}
            <div className="bg-primary text-primary-foreground shadow-sm">
                <div className="max-w-lg mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center text-2xl font-bold">
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <p className="text-sm opacity-90">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                    {user?.role}
                                </Badge>
                                {user?.isEmailVerified && (
                                    <Badge variant="outline" className="text-xs border-primary-foreground/30">
                                        ✓ Verified
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-card border-b border-border">
                <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-around text-center">
                    <div>
                        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                            <Star className="w-5 h-5 text-yellow-500" />
                            {user?.reputationScore || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Reputation</div>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div>
                        <div className="text-2xl font-bold text-foreground">0</div>
                        <div className="text-xs text-muted-foreground">Tasks Done</div>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div>
                        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            0%
                        </div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
                {/* Wallet Section */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Wallet Connection</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        {user?.walletAddress ? (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                        Wallet Connected
                                    </p>
                                </div>
                                <p className="text-xs text-green-700 dark:text-green-300 font-mono break-all">
                                    {user.walletAddress}
                                </p>
                            </div>
                        ) : (
                            <WalletConnect />
                        )}
                    </div>
                </div>

                {/* KYC Section */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">KYC Verification</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-foreground">Status</p>
                                <Badge
                                    variant={user?.kycStatus === 'VERIFIED' ? 'default' : 'secondary'}
                                    className="mt-1"
                                >
                                    {user?.kycStatus}
                                </Badge>
                            </div>
                            {user?.kycStatus === 'PENDING' && (
                                <Button size="sm">
                                    Start Verification
                                </Button>
                            )}
                        </div>
                        {user?.kycStatus === 'PENDING' && (
                            <p className="text-xs text-muted-foreground mt-3">
                                Complete KYC verification to start accepting or creating tasks
                            </p>
                        )}
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Account Settings</h3>
                        </div>
                    </div>
                    <div className="divide-y divide-border">
                        <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm text-foreground">Edit Profile</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                        <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm text-foreground">Security</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                {user?.role === 'REQUESTER' && (
                    <Button className="w-full" size="lg">
                        Create New Task
                    </Button>
                )}
                {user?.role === 'TASKER' && (
                    <Button className="w-full" size="lg">
                        Browse Available Tasks
                    </Button>
                )}
            </div>
        </div>
    );
}
