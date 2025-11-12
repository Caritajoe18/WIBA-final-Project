import type { Screen } from '../App';
import { Home, Briefcase, User, Shield } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: Screen) => void;
  userType: 'requester' | 'tasker' | 'admin';
}

export default function BottomNav({ currentScreen, onNavigate, userType }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, screen: 'home' as Screen },
    { id: 'tasks', label: 'Tasks', icon: Briefcase, screen: userType === 'tasker' ? 'taskerDashboard' as Screen : 'home' as Screen },
    { id: 'profile', label: 'Profile', icon: User, screen: 'home' as Screen },
  ];

  if (userType === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin', icon: Shield, screen: 'adminDashboard' as Screen });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md lg:max-w-none bg-white border-t border-slate-200 px-6 lg:px-12 py-3 lg:py-4 shadow-lg">
      <div className="flex items-center justify-around lg:justify-center lg:gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || currentScreen === item.screen;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 py-2 px-4 lg:px-6 rounded-xl transition-all hover:bg-slate-50"
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className={`text-xs lg:text-base ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
