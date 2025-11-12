import { useState } from 'react';
import type { Screen } from '../../App';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import BottomNav from '../BottomNav';
import {
  Users,
  //FileCheck, 
  AlertCircle,
  //TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('kyc');

  const stats = {
    totalUsers: 1247,
    pendingKYC: 23,
    activeDisputes: 5,
    totalTasks: 3456,
    todayTasks: 87,
  };

  const pendingKYC = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.j@email.com',
      submittedDate: '2 hours ago',
      type: 'tasker',
    },
    {
      id: '2',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      submittedDate: '5 hours ago',
      type: 'requester',
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      submittedDate: '1 day ago',
      type: 'tasker',
    },
  ];

  const disputes = [
    {
      id: '1',
      taskTitle: 'Package delivery dispute',
      requester: 'John Doe',
      tasker: 'Sarah Miller',
      reason: 'Package not delivered on time',
      amount: '25',
      status: 'pending',
      submittedDate: '1 hour ago',
    },
    {
      id: '2',
      taskTitle: 'Payment dispute',
      requester: 'Jane Smith',
      tasker: 'Mike Wilson',
      reason: 'Task completed but payment held',
      amount: '40',
      status: 'investigating',
      submittedDate: '3 hours ago',
    },
  ];

  const handleApproveKYC = (id: string) => {
    console.log('Approved KYC:', id);
  };

  const handleRejectKYC = (id: string) => {
    console.log('Rejected KYC:', id);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 lg:px-12 pt-6 lg:pt-8 pb-8 lg:pb-10 rounded-b-3xl shadow-lg">
        <h2 className="text-white mb-2 text-xl lg:text-3xl">Admin Dashboard</h2>
        <p className="text-purple-100 lg:text-lg">Platform Management</p>
      </div>

      <div className="flex-1 overflow-auto px-6 lg:px-12 py-6 lg:py-8 pb-20 lg:pb-24 space-y-6 lg:space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="p-4 lg:p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
            <p className="text-blue-900 text-xl lg:text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-blue-700 text-sm lg:text-base">Total Users</p>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
            <p className="text-green-900 text-xl lg:text-3xl font-bold">{stats.todayTasks}</p>
            <p className="text-green-700 text-sm lg:text-base">Tasks Today</p>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
            <p className="text-yellow-900 text-xl lg:text-3xl font-bold">{stats.pendingKYC}</p>
            <p className="text-yellow-700 text-sm lg:text-base">Pending KYC</p>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
            <p className="text-red-900 text-xl lg:text-3xl font-bold">{stats.activeDisputes}</p>
            <p className="text-red-700 text-sm lg:text-base">Active Disputes</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-slate-100 rounded-xl p-1 lg:p-1.5">
            <TabsTrigger value="kyc" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 text-sm lg:text-base py-2 lg:py-3">
              KYC Requests
            </TabsTrigger>
            <TabsTrigger value="disputes" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 text-sm lg:text-base py-2 lg:py-3">
              Disputes
            </TabsTrigger>
          </TabsList>

          {/* KYC Requests */}
          <TabsContent value="kyc" className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 text-lg lg:text-xl font-semibold">Pending Verifications</h3>
              <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm lg:text-base">
                {pendingKYC.length} Pending
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {pendingKYC.map((request) => (
                <Card key={request.id} className="p-4 lg:p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="w-12 h-12 lg:w-14 lg:h-14">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-base lg:text-lg">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-slate-900 font-medium lg:text-lg">{request.name}</h4>
                      <p className="text-slate-600 text-sm lg:text-base">{request.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full capitalize text-xs lg:text-sm">
                          {request.type}
                        </Badge>
                        <span className="text-slate-500 text-xs lg:text-sm">{request.submittedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="rounded-xl border-red-300 text-red-600 hover:bg-red-50 text-sm lg:text-base"
                      onClick={() => handleRejectKYC(request.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm lg:text-base"
                      onClick={() => handleApproveKYC(request.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Disputes */}
          <TabsContent value="disputes" className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 text-lg lg:text-xl font-semibold">Active Disputes</h3>
              <Badge className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm lg:text-base">
                {disputes.length} Active
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {disputes.map((dispute) => (
                <Card key={dispute.id} className="p-4 lg:p-5 rounded-2xl border-2 border-red-200 bg-red-50">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-slate-900">{dispute.taskTitle}</h4>
                        <Badge className={`px-2 py-1 rounded-full ${dispute.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                          }`}>
                          {dispute.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600">{dispute.reason}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-slate-600">
                      <div>
                        <p className="text-slate-500">Requester</p>
                        <p>{dispute.requester}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Tasker</p>
                        <p>{dispute.tasker}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-red-200">
                      <div>
                        <p className="text-slate-500">Amount in dispute</p>
                        <p className="text-red-900">${dispute.amount}</p>
                      </div>
                      <span className="text-slate-500">{dispute.submittedDate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button variant="outline" className="rounded-xl">
                        View Details
                      </Button>
                      <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Task Statistics */}
        <Card className="p-4 rounded-2xl border border-slate-200">
          <h3 className="text-slate-900 mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500">Total Tasks</p>
              <p className="text-slate-900">{stats.totalTasks}</p>
            </div>
            <div>
              <p className="text-slate-500">Success Rate</p>
              <p className="text-green-600">96.5%</p>
            </div>
            <div>
              <p className="text-slate-500">Avg Task Value</p>
              <p className="text-slate-900">$28.50</p>
            </div>
            <div>
              <p className="text-slate-500">Active Users</p>
              <p className="text-blue-600">892</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen="adminDashboard"
        onNavigate={onNavigate}
        userType="admin"
      />
    </div>
  );
}
