import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Star, Package, TrendingUp, Wallet, Shield } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl font-bold">
              J
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">John Doe</h2>
                <Badge variant="outline" className="h-6 px-2">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-semibold">4.9</span>
                <span className="text-sm">• 43 reviews</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Member since January 2024
              </p>
            </div>
          </div>

          <Button className="w-full">Edit Profile</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center space-y-1">
            <div className="bg-accent/10 text-accent rounded-full p-2 w-10 h-10 flex items-center justify-center mx-auto">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-foreground">28</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center space-y-1">
            <div className="bg-primary/10 text-primary rounded-full p-2 w-10 h-10 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-foreground">95%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center space-y-1">
            <div className="bg-warning/10 text-warning rounded-full p-2 w-10 h-10 flex items-center justify-center mx-auto">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-foreground">$840</div>
            <div className="text-xs text-muted-foreground">Earned</div>
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Wallet</h3>
          
          <div className="bg-primary/10 rounded-lg p-4 space-y-2">
            <div className="text-sm text-muted-foreground">Available Balance</div>
            <div className="text-3xl font-bold text-foreground">$125.50</div>
            <div className="text-xs text-muted-foreground">USDC</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline">Withdraw</Button>
            <Button>Top Up</Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
          
          <div className="space-y-3">
            {[
              { task: "Document delivery", amount: "+$25", status: "completed" },
              { task: "Grocery pickup", amount: "+$15", status: "completed" },
              { task: "Package return", amount: "+$12", status: "completed" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium text-foreground">{activity.task}</div>
                  <div className="text-xs text-muted-foreground">{activity.status}</div>
                </div>
                <div className="text-sm font-semibold text-accent">{activity.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
