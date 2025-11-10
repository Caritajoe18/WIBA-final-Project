import type { Screen } from '../../App';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowLeft, MapPin, Clock, Star, CheckCircle, Package, DollarSign } from 'lucide-react';

interface TaskDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  userType: 'requester' | 'tasker' | 'admin';
}

export default function TaskDetailScreen({ onNavigate, userType }: TaskDetailScreenProps) {
  const handleAcceptTask = () => {
    onNavigate('taskProgress');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 px-6 lg:px-12 py-4 lg:py-6 shadow-lg">
        <button onClick={() => onNavigate('home')} className="mb-4 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </button>
        <h2 className="text-white text-xl lg:text-3xl">Task Details</h2>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Task Image */}
        <div className="h-48 lg:h-64 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <Package className="w-16 h-16 lg:w-24 lg:h-24 text-blue-500" />
        </div>

        <div className="px-6 lg:px-12 py-6 lg:py-8 space-y-6 lg:space-y-8 max-w-5xl mx-auto">
          {/* Title and Status */}
          <div>
            <div className="flex items-start justify-between mb-2 gap-4">
              <h3 className="text-slate-900 flex-1 text-lg lg:text-2xl font-semibold">Deliver package to downtown</h3>
              <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm lg:text-base whitespace-nowrap">
                Available
              </Badge>
            </div>
            <p className="text-slate-600 text-sm lg:text-base">
              Need someone to pick up a package from my office and deliver it to 123 Main St.
              Package is small and lightweight.
            </p>
          </div>

          {/* Requester Info */}
          <Card className="p-4 lg:p-6 rounded-2xl border border-slate-200">
            <p className="text-slate-500 mb-3 text-sm lg:text-base">Requested by</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4">
                <Avatar className="w-12 h-12 lg:w-14 lg:h-14">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-base lg:text-lg">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 font-medium lg:text-lg">John Doe</p>
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-slate-600 text-sm lg:text-base">4.8 (127 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Task Details */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="text-slate-900 font-semibold lg:text-xl">Task Information</h4>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-sm lg:text-base">Pickup</p>
                  <p className="text-slate-900 lg:text-lg">456 Office Plaza, Suite 200</p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-sm lg:text-base">Drop-off</p>
                  <p className="text-slate-900 lg:text-lg">123 Main Street, Downtown</p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-sm lg:text-base">Deadline</p>
                  <p className="text-slate-900 lg:text-lg">Today, 5:00 PM (2 hours)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-sm lg:text-base">Payment</p>
                  <p className="text-slate-900 lg:text-lg">$25.00 (held in escrow)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Distance Info */}
          <Card className="p-4 lg:p-6 rounded-2xl bg-blue-50 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-900 mb-1 font-medium lg:text-lg">Total Distance</p>
                <p className="text-blue-700 text-sm lg:text-base">2.3 km • ~15 min drive</p>
              </div>
              <div className="text-blue-600">
                <MapPin className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Button */}
      {userType === 'tasker' && (
        <div className="p-6 lg:p-8 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto">
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl h-12 lg:h-14 text-base lg:text-lg"
              onClick={handleAcceptTask}
            >
              Accept Task
            </Button>
            <p className="text-center text-slate-500 mt-2 text-sm lg:text-base">
              You can only have one active task at a time
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
