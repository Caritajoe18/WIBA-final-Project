import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  User
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for verification requests
const mockVerificationRequests = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    submittedAt: "2024-01-15T10:30:00",
    status: "pending",
    documents: {
      idDocument: "/placeholder.svg",
      selfie: "/placeholder.svg",
    }
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    submittedAt: "2024-01-15T09:15:00",
    status: "pending",
    documents: {
      idDocument: "/placeholder.svg",
      selfie: "/placeholder.svg",
    }
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Elm St, Chicago, IL 60601",
    submittedAt: "2024-01-14T16:45:00",
    status: "pending",
    documents: {
      idDocument: "/placeholder.svg",
      selfie: "/placeholder.svg",
    }
  },
];

const AdminDashboard = () => {
  const [requests, setRequests] = useState(mockVerificationRequests);

  const handleApprove = (id: string, name: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Verification Approved",
      description: `${name} has been verified as a tasker.`,
    });
  };

  const handleReject = (id: string, name: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Verification Rejected",
      description: `${name}'s verification has been rejected.`,
      variant: "destructive",
    });
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <header className="bg-card border-b border-border">
        <div className="p-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage tasker verifications</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Admin
            </Badge>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-7xl mx-auto py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold text-foreground">{pendingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified Taskers</p>
                  <p className="text-3xl font-bold text-foreground">847</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">2,451</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected Today</p>
                  <p className="text-3xl font-bold text-foreground">3</p>
                </div>
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Requests */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No pending verification requests</p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            <User className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.name}</CardTitle>
                          <CardDescription className="space-y-1 mt-1">
                            <p>{request.email}</p>
                            <p>{request.phone}</p>
                            <p>{request.address}</p>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Submitted Documents
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">Government ID</p>
                            <div className="border border-border rounded-lg overflow-hidden aspect-video bg-accent/50 flex items-center justify-center">
                              <FileText className="w-8 h-8 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">Selfie Verification</p>
                            <div className="border border-border rounded-lg overflow-hidden aspect-video bg-accent/50 flex items-center justify-center">
                              <User className="w-8 h-8 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button 
                          className="flex-1" 
                          size="lg"
                          onClick={() => handleApprove(request.id, request.name)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Approve Verification
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1" 
                          size="lg"
                          onClick={() => handleReject(request.id, request.name)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-muted-foreground">Approved verifications appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardContent className="py-12 text-center">
                <XCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                <p className="text-muted-foreground">Rejected verifications appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
