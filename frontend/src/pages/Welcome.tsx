import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, Shield, Zap, TrendingUp, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
              <Package className="w-12 h-12" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">DropIt</h1>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              The Uber of Deliveries
            </p>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Starting where traditional logistics stops. Connect with verified individuals to complete real-world tasks — from flower deliveries to grocery pickups.
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 text-left bg-card/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border">
              <div className="bg-accent/10 text-accent rounded-lg p-2.5 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">Hyperlocal Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Request anything from flowers to documents. Real people, real tasks, real-time fulfillment in your neighborhood.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-card/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border">
              <div className="bg-primary/10 text-primary rounded-lg p-2.5 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">Verified & Trusted</h3>
                <p className="text-sm text-muted-foreground">
                  Every user is KYC-verified. Build trust through blockchain-backed identity and transparent reputation scores.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-card/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border">
              <div className="bg-warning/10 text-warning rounded-lg p-2.5 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">Instant Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Secure escrow holds funds until completion. Get paid instantly in crypto when the task is done.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-card/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border">
              <div className="bg-success/10 text-success rounded-lg p-2.5 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">Earn on Your Terms</h3>
                <p className="text-sm text-muted-foreground">
                  Accept tasks that fit your schedule. Build your reputation, set your availability, and grow your income.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-card/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border">
              <div className="bg-primary/10 text-primary rounded-lg p-2.5 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">Community-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Built on mutual accountability. Rate and review to maintain quality and trust in the ecosystem.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left bg-card/95 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border">
              <div className="bg-accent/10 text-accent rounded-lg p-2.5 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">On-Demand Speed</h3>
                <p className="text-sm text-muted-foreground">
                  Need it now? Find available helpers nearby and get your tasks completed in hours, not days.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-6">
            <Button
              onClick={() => navigate("/profile-setup")}
              size="lg"
              className="w-full md:w-auto md:px-12 text-lg font-semibold shadow-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/home")}
              variant="outline"
              size="lg"
              className="w-full md:w-auto md:px-12 text-lg bg-card/95 backdrop-blur-sm"
            >
              Explore Tasks
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-xs text-muted-foreground">Verified Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50K+</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">99%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center pb-6 text-sm text-muted-foreground">
        Built on trust. Powered by blockchain. Starting where traditional logistics stops.
      </footer>
    </div>
  );
};

export default Welcome;