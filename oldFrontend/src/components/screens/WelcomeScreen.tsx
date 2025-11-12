import type { Screen } from '../../App';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Package, CheckCircle, Shield, MapPin, Zap, Users, DollarSign, TrendingUp, Star, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onUserTypeSelect: (type: 'requester' | 'tasker' | 'admin') => void;
}

export default function WelcomeScreen({ onNavigate, onUserTypeSelect }: WelcomeScreenProps) {
  const handleGetStarted = (type: 'requester' | 'tasker') => {
    onUserTypeSelect(type);
    onNavigate('kyc');
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative px-6 lg:px-12 pt-12 lg:pt-20 pb-16 lg:pb-24 text-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-green-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-4xl lg:max-w-5xl mx-auto">
          {/* Logo */}
          <div className="inline-flex items-center justify-center mb-6 lg:mb-8">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 rotate-3 transition-transform hover:rotate-6 hover:scale-105">
                <Package className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 lg:w-8 lg:h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-blue-900 mb-4 lg:mb-6 text-3xl lg:text-5xl font-bold">TaskMe</h1>
          <p className="text-slate-700 text-base lg:text-xl max-w-sm lg:max-w-2xl mx-auto mb-3 lg:mb-6">
            The decentralized marketplace connecting you with verified taskers for instant local services
          </p>
          <div className="flex items-center justify-center gap-4 lg:gap-8 text-slate-600 text-sm lg:text-base">
            <div className="flex items-center gap-1 lg:gap-2">
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500 fill-yellow-500" />
              <span>4.9 Rating</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="flex items-center gap-1 lg:gap-2">
              <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
              <span>10k+ Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 lg:px-12 pb-8 lg:pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
          <Card className="p-4 lg:p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/30">
              <Shield className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <h4 className="text-slate-900 mb-1 text-sm lg:text-base font-medium">Secure & Safe</h4>
            <p className="text-slate-600 text-xs lg:text-sm">KYC verified users & escrow payments</p>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-green-500/30">
              <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <h4 className="text-slate-900 mb-1 text-sm lg:text-base font-medium">Lightning Fast</h4>
            <p className="text-slate-600 text-xs lg:text-sm">Find nearby taskers in seconds</p>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-purple-500/30">
              <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <h4 className="text-slate-900 mb-1 text-sm lg:text-base font-medium">Live Tracking</h4>
            <p className="text-slate-600 text-xs lg:text-sm">Real-time location & progress updates</p>
          </Card>

          <Card className="p-4 lg:p-6 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
              <DollarSign className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <h4 className="text-slate-900 mb-1 text-sm lg:text-base font-medium">Fair Pricing</h4>
            <p className="text-slate-600 text-xs lg:text-sm">Transparent rates, no hidden fees</p>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-8 lg:mb-12">
          <h3 className="text-slate-900 text-center mb-6 lg:mb-8 text-xl lg:text-2xl font-semibold">How It Works</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-semibold lg:text-lg">1</span>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-slate-900 mb-1 font-medium lg:text-lg">Post Your Task</h4>
                <p className="text-slate-600 text-sm lg:text-base">Describe what you need done, set your price and deadline</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-semibold lg:text-lg">2</span>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-slate-900 mb-1 font-medium lg:text-lg">Get Matched</h4>
                <p className="text-slate-600 text-sm lg:text-base">Verified taskers nearby accept your task instantly</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-semibold lg:text-lg">3</span>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-slate-900 mb-1 font-medium lg:text-lg">Track Progress</h4>
                <p className="text-slate-600 text-sm lg:text-base">Follow real-time updates and communicate with your tasker</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-semibold lg:text-lg">4</span>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-slate-900 mb-1 font-medium lg:text-lg">Pay Securely</h4>
                <p className="text-slate-600 text-sm lg:text-base">Payment released from escrow after confirmation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <Card className="p-6 lg:p-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 mb-8 lg:mb-12 shadow-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5" />
                <p className="text-xl lg:text-3xl font-bold">98%</p>
              </div>
              <p className="text-blue-100 text-xs lg:text-sm">Success Rate</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                <p className="text-xl lg:text-3xl font-bold">15min</p>
              </div>
              <p className="text-blue-100 text-xs lg:text-sm">Avg Response</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                <p className="text-xl lg:text-3xl font-bold">50k+</p>
              </div>
              <p className="text-blue-100 text-xs lg:text-sm">Tasks Done</p>
            </div>
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 lg:space-y-4 mb-4 max-w-3xl mx-auto">
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl h-14 lg:h-16 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all text-base lg:text-lg"
            onClick={() => handleGetStarted('requester')}
          >
            <div className="flex items-center justify-center gap-2 lg:gap-3">
              <Package className="w-5 h-5 lg:w-6 lg:h-6" />
              <span>I need a task done</span>
            </div>
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl h-14 lg:h-16 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all text-base lg:text-lg"
            onClick={() => handleGetStarted('tasker')}
          >
            <div className="flex items-center justify-center gap-2 lg:gap-3">
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6" />
              <span>I want to earn money</span>
            </div>
          </Button>
        </div>

        {/* Sign In Link */}
        <button
          className="w-full text-slate-600 py-3 hover:text-blue-600 transition-colors text-sm lg:text-base"
          onClick={() => {
            onNavigate('login');
          }}
        >
          Already have an account? <span className="text-blue-600 font-medium">Sign in →</span>
        </button>
      </div>
    </div>
  );
}
