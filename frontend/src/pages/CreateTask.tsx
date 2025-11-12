import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Calendar, DollarSign, Upload, ArrowLeft, Wallet, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateTask = () => {
  const navigate = useNavigate();
  // Simulated wallet connection state - in production, this would come from wallet provider
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pickupLocation: "",
    dropoffLocation: "",
    deadline: "",
    price: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!formData.title || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Task created successfully!", {
      description: "Your task is now visible to nearby taskers",
    });
    
    setTimeout(() => navigate("/home"), 1500);
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
            <h1 className="text-xl font-bold text-foreground">Create Task</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Wallet Connection Alert */}
        {!isWalletConnected && (
          <Alert className="mb-6 border-warning bg-warning/10">
            <AlertCircle className="h-5 w-5 text-warning" />
            <AlertTitle className="text-warning font-semibold">Wallet Connection Required</AlertTitle>
            <AlertDescription className="text-foreground mt-2">
              <p className="mb-3">
                You need to connect your crypto wallet to create tasks. Funds will be held in escrow until task completion.
              </p>
              <Button 
                onClick={() => navigate("/wallet-connect")}
                className="w-full sm:w-auto"
                size="sm"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground font-semibold">
              Task Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Deliver documents to downtown"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-card"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground font-semibold">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Provide details about the task..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-card min-h-[100px]"
            />
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-foreground font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Pickup Location
              </Label>
              <Input
                id="pickup"
                placeholder="Enter pickup address"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropoff" className="text-foreground font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Dropoff Location
              </Label>
              <Input
                id="dropoff"
                placeholder="Enter dropoff address"
                value={formData.dropoffLocation}
                onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                className="bg-card"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-foreground font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Deadline
            </Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="bg-card"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              Price (USDC) *
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-card"
            />
          </div>

          {/* Upload Media */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">
              Add Photos (Optional)
            </Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-card hover:bg-muted/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 space-y-3">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-base font-semibold"
              disabled={!isWalletConnected}
            >
              {isWalletConnected ? "Create Task" : "Connect Wallet to Create Task"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Funds will be held in escrow until task completion
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;