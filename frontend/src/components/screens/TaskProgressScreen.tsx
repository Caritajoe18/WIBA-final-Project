import { useState } from 'react';
import type { Screen } from '../../App';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
// import { Badge } from '../ui/badge';
// import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowLeft, MapPin, MessageCircle, Camera, CheckCircle, Navigation } from 'lucide-react';

interface TaskProgressScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function TaskProgressScreen({ onNavigate }: TaskProgressScreenProps) {
  const [] = useState(2);
  const [showProofModal, setShowProofModal] = useState(false);

  const steps = [
    { id: 1, label: 'Task Accepted', status: 'completed' },
    { id: 2, label: 'En Route to Pickup', status: 'active' },
    { id: 3, label: 'Package Picked Up', status: 'pending' },
    { id: 4, label: 'Delivering', status: 'pending' },
    { id: 5, label: 'Completed', status: 'pending' },
  ];

  const handleComplete = () => {
    setShowProofModal(true);
  };

  const handleSubmitProof = () => {
    setShowProofModal(false);
    onNavigate('ratings');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 px-6 py-4 shadow-lg">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Task in Progress</h2>
        <p className="text-blue-100">Track your delivery</p>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Live Map */}
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 relative">
          <div className="absolute inset-0">
            {/* Simulated map */}
            <div className="w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-slate-100" />
            
            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 50 200 Q 150 150, 250 100"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Pickup location */}
            <div className="absolute" style={{ top: '75%', left: '20%' }}>
              <MapPin className="w-8 h-8 text-blue-500 fill-blue-500" />
            </div>

            {/* Dropoff location */}
            <div className="absolute" style={{ top: '40%', left: '80%' }}>
              <MapPin className="w-8 h-8 text-green-500 fill-green-500" />
            </div>

            {/* Tasker current location */}
            <div className="absolute" style={{ top: '60%', left: '45%' }}>
              <div className="relative">
                <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          </div>

          {/* Navigation button */}
          <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Navigation className="w-6 h-6 text-blue-600" />
          </button>

          {/* ETA Card */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="p-4 rounded-2xl bg-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">Estimated arrival</p>
                  <p className="text-slate-900">8 minutes</p>
                </div>
                <div className="text-blue-600">
                  <p className="text-slate-900">1.2 km away</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Tasker Info */}
          <Card className="p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-green-100 text-green-600">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900">Sarah Miller</p>
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-slate-600">Tasker • 4.9 ⭐</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Progress Steps */}
          <div>
            <h4 className="text-slate-900 mb-4">Progress</h4>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed'
                          ? 'bg-green-500'
                          : step.status === 'active'
                          ? 'bg-blue-500'
                          : 'bg-slate-200'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white">{step.id}</span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p
                      className={`${
                        step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.status === 'active' && (
                      <p className="text-blue-600">In progress...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Details */}
          <Card className="p-4 rounded-2xl bg-slate-50">
            <h4 className="text-slate-900 mb-3">Task Details</h4>
            <div className="space-y-2 text-slate-600">
              <p>📦 Deliver package to downtown</p>
              <p>💰 Payment: $25.00 (in escrow)</p>
              <p>⏰ Deadline: Today, 5:00 PM</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Complete Button (for tasker) */}
      <div className="p-6 bg-white border-t border-slate-200">
        <Button 
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl h-12"
          onClick={handleComplete}
        >
          Mark as Completed
        </Button>
      </div>

      {/* Proof of Completion Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-6">
            <div className="text-center">
              <h3 className="text-slate-900 mb-2">Proof of Completion</h3>
              <p className="text-slate-600">
                Upload a photo or get a signature to confirm delivery
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center cursor-pointer hover:border-blue-400 transition-colors">
                <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Take Photo</p>
                <p className="text-slate-400">Photo of delivered package</p>
              </Card>

              <Card className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center cursor-pointer hover:border-blue-400 transition-colors">
                <CheckCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Get Signature</p>
                <p className="text-slate-400">Requester's signature</p>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl h-12"
                onClick={() => setShowProofModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl h-12"
                onClick={handleSubmitProof}
              >
                Submit & Complete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
