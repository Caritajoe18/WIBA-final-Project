import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, DollarSign, MessageCircle, Navigation, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAcceptTask = () => {
    toast.success("Task accepted!", {
      description: "You can now start the task. Requester has been notified.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Task Details</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Task Header */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-foreground flex-1">
              Deliver documents to downtown office
            </h2>
            <Badge variant="secondary">open</Badge>
          </div>

          <p className="text-muted-foreground">
            Need someone to pick up and deliver important documents by 3 PM today. 
            Documents are ready for pickup at the front desk. Please handle with care.
          </p>

          {/* Price Card */}
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Task Payment</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">$25</div>
                <div className="text-xs text-muted-foreground">USDC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Task Information</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Pickup Location</div>
                <div className="text-sm text-muted-foreground">
                  123 Broadway, Manhattan, NYC
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-accent/10 text-accent rounded-lg p-2">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Dropoff Location</div>
                <div className="text-sm text-muted-foreground">
                  456 Wall Street, Manhattan, NYC
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-warning/10 text-warning rounded-lg p-2">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Deadline</div>
                <div className="text-sm text-muted-foreground">
                  Today at 3:00 PM (2 hours remaining)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requester Info */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Requester</h3>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-lg font-bold">
              S
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Sarah J.</span>
                <Badge variant="outline" className="h-5 px-2 text-xs">
                  ✓ Verified
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                ⭐ 4.8 rating • 127 tasks completed
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Requester
          </Button>
        </div>

        {/* Route Preview */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Route Preview</h3>
          
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <Navigation className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">
                Map view • 2.3 km • ~15 min
              </p>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View Full Route
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={handleAcceptTask}
            size="lg"
            className="w-full text-base font-semibold"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Accept Task
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By accepting, you agree to complete this task within the deadline
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
