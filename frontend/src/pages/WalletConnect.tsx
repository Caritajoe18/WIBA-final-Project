import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, Shield, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WalletConnect = () => {
  const navigate = useNavigate();

  const handleWalletConnect = (walletName: string) => {
    toast.success(`${walletName} connected!`, {
      description: "Now let's verify your identity",
    });
    setTimeout(() => navigate("/home"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Connect Wallet</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Info Card */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
            <div className="flex justify-center">
              <div className="bg-primary/10 text-primary rounded-full p-4">
                <Wallet className="w-8 h-8" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Connect Your Wallet
              </h2>
              <p className="text-muted-foreground">
                Choose your preferred wallet to get started with DropIt
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-success/10 text-success rounded-full p-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-foreground">Secure transactions</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-success/10 text-success rounded-full p-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-foreground">Instant crypto payouts</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-success/10 text-success rounded-full p-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-foreground">Your keys, your crypto</span>
              </div>
            </div>
          </div>

          {/* Wallet Options */}
          <div className="space-y-3">
            <Button
              onClick={() => handleWalletConnect("MetaMask")}
              variant="outline"
              size="lg"
              className="w-full justify-start text-base font-semibold h-auto py-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-warning/10 rounded-lg p-2">
                  <Wallet className="w-6 h-6 text-warning" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">MetaMask</div>
                  <div className="text-xs text-muted-foreground">Most popular wallet</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleWalletConnect("WalletConnect")}
              variant="outline"
              size="lg"
              className="w-full justify-start text-base font-semibold h-auto py-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">WalletConnect</div>
                  <div className="text-xs text-muted-foreground">Connect any wallet</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleWalletConnect("Coinbase Wallet")}
              variant="outline"
              size="lg"
              className="w-full justify-start text-base font-semibold h-auto py-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-accent/10 rounded-lg p-2">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Coinbase Wallet</div>
                  <div className="text-xs text-muted-foreground">Easy and secure</div>
                </div>
              </div>
            </Button>
          </div>

          {/* KYC Notice */}
          <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-sm font-semibold text-foreground">
                  Verification Required
                </div>
                <p className="text-xs text-muted-foreground">
                  After connecting, you'll need to complete KYC verification to start using DropIt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
