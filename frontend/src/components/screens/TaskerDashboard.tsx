import { useState } from 'react';
import type { Screen } from '../../App';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import BottomNav from '../BottomNav';
import { 
  DollarSign, 
  Star, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Package,
  Award
} from 'lucide-react';

interface TaskerDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export default function TaskerDashboard({ onNavigate }: TaskerDashboardProps) {
  const [isAvailable, setIsAvailable] = useState(true);

  const activeTask = {
    id: '1',
    title: 'Deliver package to downtown',
    status: 'in-progress',
    price: '25',
    deadline: '2 hours',
  };

  const completedTasks = [
    {
      id: '2',
      title: 'Grocery shopping for elderly',
      completedDate: 'Yesterday',
      price: '30',
      rating: 5,
    },
    {
      id: '3',
      title: 'Pick up prescription',
      completedDate: '2 days ago',
      price: '15',
      rating: 5,
    },
    {
      id: '4',
      title: 'Deliver documents',
      completedDate: '3 days ago',
      price: '20',
      rating: 4,
    },
  ];

  const stats = {
    totalEarnings: '485.00',
    thisWeek: '125.00',
    tasksCompleted: 23,
    rating: 4.9,
    successRate: 98,
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-14 h-14 border-2 border-white">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-green-600">
                SM
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white">Sarah Miller</h2>
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white">{stats.rating}</span>
                <span className="text-green-100">• {stats.tasksCompleted} tasks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <Card className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Availability Status</p>
              <p className="text-green-100">
                {isAvailable ? 'Available for tasks' : 'Not available'}
              </p>
            </div>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
              className="data-[state=checked]:bg-green-400"
            />
          </div>
        </Card>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 pb-20 space-y-6">
        {/* Earnings Overview */}
        <div>
          <h3 className="text-slate-900 mb-4">Earnings Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-green-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-green-900">${stats.totalEarnings}</p>
              <p className="text-green-700">Total Earned</p>
            </Card>

            <Card className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-blue-900">${stats.thisWeek}</p>
              <p className="text-blue-700">This Week</p>
            </Card>
          </div>
        </div>

        {/* Reputation Score */}
        <Card className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-900">Reputation Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-purple-700">{stats.rating}</span>
                  </div>
                  <span className="text-purple-600">• {stats.successRate}% success rate</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Task */}
        {activeTask && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900">Active Task</h3>
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                1 Active
              </Badge>
            </div>
            <Card 
              className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50 cursor-pointer hover:shadow-md transition-all"
              onClick={() => onNavigate('taskProgress')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-slate-900 mb-1">{activeTask.title}</h4>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{activeTask.deadline}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-900">${activeTask.price}</p>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full">
                In Progress
              </Badge>
            </Card>
          </div>
        )}

        {/* Recent Completed Tasks */}
        <div>
          <h3 className="text-slate-900 mb-4">Recent Completed</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card 
                key={task.id} 
                className="p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <h4 className="text-slate-900">{task.title}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-slate-500">{task.completedDate}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(task.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">+${task.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 rounded-2xl border border-slate-200 text-center">
            <Package className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-slate-900">{stats.tasksCompleted}</p>
            <p className="text-slate-600">Tasks</p>
          </Card>
          <Card className="p-4 rounded-2xl border border-slate-200 text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-slate-900">{stats.rating}</p>
            <p className="text-slate-600">Rating</p>
          </Card>
          <Card className="p-4 rounded-2xl border border-slate-200 text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-slate-900">{stats.successRate}%</p>
            <p className="text-slate-600">Success</p>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        currentScreen="taskerDashboard" 
        onNavigate={onNavigate} 
        userType="tasker"
      />
    </div>
  );
}
