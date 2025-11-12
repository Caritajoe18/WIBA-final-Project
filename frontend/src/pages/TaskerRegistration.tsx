import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, CheckCircle2, Clock, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TaskerRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    idDocument: null as File | null,
    selfie: null as File | null,
  });

  const handleFileChange = (field: 'idDocument' | 'selfie', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.fullName || !formData.phoneNumber || !formData.address) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else {
      if (!formData.idDocument || !formData.selfie) {
        toast({
          title: "Missing Documents",
          description: "Please upload both required documents",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Verification Submitted!",
        description: "Your documents are under review. We'll notify you within 24-48 hours.",
      });
      
      setTimeout(() => navigate("/profile"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 p-4 max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step === 1 ? navigate("/profile") : setStep(1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Become a Tasker</h1>
            <p className="text-sm text-muted-foreground">Complete KYC verification</p>
          </div>
          <Badge variant="secondary">
            Step {step} of 2
          </Badge>
        </div>
      </header>

      <main className="p-4 max-w-2xl mx-auto py-8">
        {/* Benefits Banner */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Why verify?</h3>
                <p className="text-sm text-muted-foreground">
                  Verification builds trust, unlocks task opportunities, and ensures secure payments through our platform.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Trusted by requesters</p>
              </div>
              <div>
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Fast approval</p>
              </div>
              <div>
                <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Secure payments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Provide your basic details for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Legal Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="As it appears on your ID"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    placeholder="Street, City, State, ZIP"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Continue to Document Upload
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>
                  Upload clear photos of your documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="idDocument">Government-Issued ID *</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Driver's license, passport, or national ID card
                  </p>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <Input
                      id="idDocument"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                    />
                    <Label htmlFor="idDocument" className="cursor-pointer">
                      {formData.idDocument ? (
                        <span className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {formData.idDocument.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-sm text-muted-foreground">
                            Click to upload ID document
                          </span>
                          <span className="block text-xs text-muted-foreground mt-1">
                            PNG, JPG up to 10MB
                          </span>
                        </>
                      )}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selfie">Selfie Verification *</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Hold your ID next to your face
                  </p>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <Input
                      id="selfie"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange('selfie', e.target.files?.[0] || null)}
                    />
                    <Label htmlFor="selfie" className="cursor-pointer">
                      {formData.selfie ? (
                        <span className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {formData.selfie.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-sm text-muted-foreground">
                            Click to upload selfie
                          </span>
                          <span className="block text-xs text-muted-foreground mt-1">
                            PNG, JPG up to 10MB
                          </span>
                        </>
                      )}
                    </Label>
                  </div>
                </div>

                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Your documents are encrypted and stored securely. We only use them for verification purposes.
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit for Verification
                </Button>
              </CardContent>
            </Card>
          )}
        </form>
      </main>
    </div>
  );
};

export default TaskerRegistration;
