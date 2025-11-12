import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Package, UserCheck, Wallet, ClipboardCheck } from "lucide-react";

const ProfileSetup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
              <Package className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Choose Your Role</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join DropIt as a requester to post tasks, or become a tasker to earn by completing deliveries and errands.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Requester Card */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader className="space-y-4">
              <div className="bg-primary/10 text-primary rounded-xl p-4 w-fit mx-auto">
                <ClipboardCheck className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl text-center">I Need Help</CardTitle>
              <CardDescription className="text-center text-base">
                Post tasks and get them done by verified taskers in your area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Post delivery and errand tasks instantly</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Connect your wallet to create tasks</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Pay securely through crypto escrow</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">No KYC verification required</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Wallet className="w-4 h-4" />
                  <span>Wallet required to create tasks</span>
                </div>
                <Button
                  onClick={() => navigate("/create-profile?role=REQUESTER")}
                  className="w-full"
                  size="lg"
                >
                  Continue as Requester
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tasker Card */}
          <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg">
            <CardHeader className="space-y-4">
              <div className="bg-accent/10 text-accent rounded-xl p-4 w-fit mx-auto">
                <UserCheck className="w-10 h-10" />
              </div>
              <CardTitle className="text-2xl text-center">I Want to Earn</CardTitle>
              <CardDescription className="text-center text-base">
                Complete tasks, earn crypto, and build your reputation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Browse available tasks in your area</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Accept tasks that fit your schedule</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Get paid instantly after completion</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Build your reputation and earn more</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm text-warning">
                  <UserCheck className="w-4 h-4" />
                  <span>KYC verification required to accept tasks</span>
                </div>
                <Button
                  onClick={() => navigate("/create-profile?role=TASKER")}
                  variant="default"
                  className="w-full bg-accent hover:bg-accent/90"
                  size="lg"
                >
                  Register as Tasker
                </Button>
                <Button
                  onClick={() => navigate("/home")}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Browse Tasks First
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground">
          You can always change your role or register for both later
        </p>
      </div>
    </div>
  );
};

export default ProfileSetup;