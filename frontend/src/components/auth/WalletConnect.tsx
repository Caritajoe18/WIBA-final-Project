import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { Wallet, LogOut } from 'lucide-react';
import { useEffect } from 'react';

export function WalletConnect() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { toast } = useToast();

    useEffect(() => {
        if (isConnected && address) {
            handleWalletConnected(address);
        }
    }, [isConnected, address]);

    const handleWalletConnected = async (walletAddress: string) => {
        try {
            await api.connectWallet(walletAddress);
            toast({
                title: 'Wallet Connected! 🎉',
                description: `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
            });
        } catch (error: any) {
            toast({
                title: 'Connection Failed',
                description: error.message || 'Failed to connect wallet',
                variant: 'destructive',
            });
        }
    };

    const handleConnect = (connector: any) => {
        connect({ connector });
    };

    const handleDisconnect = () => {
        disconnect();
        toast({
            title: 'Wallet Disconnected',
            description: 'Your wallet has been disconnected',
        });
    };

    if (isConnected && address) {
        return (
            <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                Wallet Connected
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-300 font-mono">
                                {address.slice(0, 6)}...{address.slice(-4)}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDisconnect}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Disconnect
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-center space-y-2">
                <Wallet className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="font-semibold">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground">
                    Connect your crypto wallet to complete registration
                </p>
            </div>

            <div className="space-y-2">
                {connectors.map((connector) => (
                    <Button
                        key={connector.id}
                        onClick={() => handleConnect(connector)}
                        variant="outline"
                        className="w-full"
                    >
                        {connector.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
