import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Package, User, Mail, Phone, Wallet, Loader2, CheckCircle } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const profileSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    phoneNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CreateProfile = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'REQUESTER';
    const { toast } = useToast();

    const [step, setStep] = useState<'profile' | 'wallet' | 'success'>('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    const onSubmitProfile = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            const response = await api.register({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                role: role as 'REQUESTER' | 'TASKER',
            });

            setUserId(response.userId);

            toast({
                title: 'Profile Created! 🎉',
                description: 'Please check your email to verify your account.',
            });

            // Move to wallet connection step
            setStep('wallet');
        } catch (error: any) {
            toast({
                title: 'Registration Failed',
                description: error.message || 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleWalletConnect = (connector: any) => {
        connect({ connector });
    };

    const handleSkipWallet = () => {
        setStep('success');
    };

    const handleCompleteSetup = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-background to-background" />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
                            <Package className="w-12 h-12" />
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2">
                        <div className={`h-2 w-16 rounded-full transition-colors ${step === 'profile' ? 'bg-primary' : 'bg-primary/30'
                            }`} />
                        <div className={`h-2 w-16 rounded-full transition-colors ${step === 'wallet' ? 'bg-primary' : 'bg-primary/30'
                            }`} />
                        <div className={`h-2 w-16 rounded-full transition-colors ${step === 'success' ? 'bg-primary' : 'bg-primary/30'
                            }`} />
                    </div>

                    {/* Step 1: Profile Information */}
                    {step === 'profile' && (
                        <Card className="border-2 shadow-xl bg-card/95 backdrop-blur-sm">
                            <CardHeader className="space-y-3">
                                <div className="bg-primary/10 text-primary rounded-xl p-3 w-fit mx-auto">
                                    <User className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-3xl text-center">Create Your Profile</CardTitle>
                                <CardDescription className="text-center text-base">
                                    {role === 'REQUESTER'
                                        ? 'Set up your account to start posting tasks'
                                        : 'Set up your account to start earning'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                {...register('firstName')}
                                                placeholder="John"
                                                className="bg-background"
                                            />
                                            {errors.firstName && (
                                                <p className="text-sm text-red-500">{errors.firstName.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                {...register('lastName')}
                                                placeholder="Doe"
                                                className="bg-background"
                                            />
                                            {errors.lastName && (
                                                <p className="text-sm text-red-500">{errors.lastName.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                {...register('email')}
                                                placeholder="john@example.com"
                                                className="pl-10 bg-background"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <Input
                                                id="phoneNumber"
                                                type="tel"
                                                {...register('phoneNumber')}
                                                placeholder="+1234567890"
                                                className="pl-10 bg-background"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...register('password')}
                                            placeholder="••••••••"
                                            className="bg-background"
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-500">{errors.password.message}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            {...register('confirmPassword')}
                                            placeholder="••••••••"
                                            className="bg-background"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>

                                    {/* Role Badge */}
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                                        <p className="text-sm text-muted-foreground">Registering as</p>
                                        <p className="text-lg font-semibold text-primary">
                                            {role === 'REQUESTER' ? 'Requester' : 'Tasker'}
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Creating Profile...
                                            </>
                                        ) : (
                                            'Continue to Wallet Connection'
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Wallet Connection */}
                    {step === 'wallet' && (
                        <Card className="border-2 shadow-xl bg-card/95 backdrop-blur-sm">
                            <CardHeader className="space-y-3">
                                <div className="bg-accent/10 text-accent rounded-xl p-3 w-fit mx-auto">
                                    <Wallet className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-3xl text-center">Connect Your Wallet</CardTitle>
                                <CardDescription className="text-center text-base">
                                    Connect your crypto wallet to {role === 'REQUESTER' ? 'create and fund tasks' : 'receive payments'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {isConnected && address ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                                    Wallet Connected
                                                </p>
                                            </div>
                                            <p className="text-xs text-green-700 dark:text-green-300 font-mono break-all">
                                                {address}
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => disconnect()}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                Disconnect
                                            </Button>
                                            <Button
                                                onClick={() => setStep('success')}
                                                className="flex-1"
                                                size="lg"
                                            >
                                                Complete Setup
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="text-center space-y-2 py-4">
                                            <Wallet className="h-16 w-16 mx-auto text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Choose your preferred wallet provider
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            {connectors.map((connector) => (
                                                <Button
                                                    key={connector.id}
                                                    onClick={() => handleWalletConnect(connector)}
                                                    variant="outline"
                                                    className="w-full h-14 text-base"
                                                    size="lg"
                                                >
                                                    <Wallet className="mr-3 h-5 w-5" />
                                                    {connector.name}
                                                </Button>
                                            ))}
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-border" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-card px-2 text-muted-foreground">Or</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleSkipWallet}
                                            variant="ghost"
                                            className="w-full"
                                        >
                                            Skip for Now
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Success */}
                    {step === 'success' && (
                        <Card className="border-2 shadow-xl bg-card/95 backdrop-blur-sm">
                            <CardHeader className="space-y-3">
                                <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl p-3 w-fit mx-auto">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-3xl text-center">Profile Created! 🎉</CardTitle>
                                <CardDescription className="text-center text-base">
                                    Your account has been created successfully
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">Check Your Email</p>
                                                <p className="text-sm text-muted-foreground">
                                                    We've sent a verification link to your email address
                                                </p>
                                            </div>
                                        </div>

                                        {isConnected && (
                                            <div className="flex items-start gap-3">
                                                <div className="bg-accent/10 rounded-full p-1 mt-0.5">
                                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">Wallet Connected</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Your wallet is ready to use
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-3">
                                            <div className="bg-warning/10 rounded-full p-1 mt-0.5">
                                                <div className="w-2 h-2 bg-warning rounded-full" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">Next Steps</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {role === 'TASKER'
                                                        ? 'Complete KYC verification to start accepting tasks'
                                                        : 'Start browsing or creating tasks'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCompleteSetup}
                                        className="w-full"
                                        size="lg"
                                    >
                                        Go to Login
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Back Button */}
                    {step === 'profile' && (
                        <div className="text-center">
                            <Button
                                onClick={() => navigate('/profile-setup')}
                                variant="ghost"
                            >
                                ← Back to Role Selection
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <footer className="relative z-10 text-center pb-6 text-sm text-muted-foreground">
                Built on trust. Powered by blockchain.
            </footer>
        </div>
    );
};

export default CreateProfile;
