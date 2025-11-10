import { useState } from 'react';
import type { Screen } from '../../App';
//import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import TaskCard from '../TaskCard';
import MapView from '../MapView';
import BottomNav from '../BottomNav';
import { Search, SlidersHorizontal, MapIcon, List, Plus } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  userType: 'requester' | 'tasker' | 'admin';
}

export default function HomeScreen({ onNavigate, userType }: HomeScreenProps) {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = ['all', 'delivery', 'errand', 'shopping', 'other'];

  const tasks = [
    {
      id: '1',
      title: 'Deliver package to downtown',
      description: 'Need someone to pick up a package from my office and deliver it to 123 Main St',
      price: '25',
      distance: '2.3 km',
      type: 'delivery',
      deadline: '2 hours',
      verified: true
    },
    {
      id: '2',
      title: 'Grocery shopping for elderly',
      description: 'Help with weekly grocery shopping, list will be provided',
      price: '30',
      distance: '1.5 km',
      type: 'shopping',
      deadline: '4 hours',
      verified: true
    },
    {
      id: '3',
      title: 'Pick up prescription',
      description: 'Quick errand to pick up prescription from pharmacy',
      price: '15',
      distance: '0.8 km',
      type: 'errand',
      deadline: '1 hour',
      verified: true
    }
  ];

  const filteredTasks = selectedFilter === 'all'
    ? tasks
    : tasks.filter(task => task.type === selectedFilter);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 px-6 lg:px-12 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm lg:text-base">Welcome back</p>
            <h2 className="text-white text-xl lg:text-3xl">Find Tasks Nearby</h2>
          </div>
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full absolute top-0 right-0" />
            <span className="text-white text-xl lg:text-2xl">👤</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl lg:mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search for tasks..."
            className="pl-12 pr-12 rounded-xl bg-white border-0 h-12 lg:h-14 text-base"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <SlidersHorizontal className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex gap-2 bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setView('map')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${view === 'map'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600'
              }`}
          >
            <MapIcon className="w-4 h-4" />
            <span className="hidden lg:inline">Map</span>
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${view === 'list'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600'
              }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden lg:inline">List</span>
          </button>
        </div>

        <p className="text-slate-600 text-sm lg:text-base">{filteredTasks.length} tasks available</p>
      </div>

      {/* Filters */}
      <div className="px-6 lg:px-12 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(filter => (
            <Badge
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full cursor-pointer capitalize whitespace-nowrap ${selectedFilter === filter
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 lg:px-12 pb-20 lg:pb-24">
        {view === 'map' ? (
          <MapView tasks={filteredTasks} onTaskClick={() => onNavigate('taskDetail')} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onNavigate('taskDetail')}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {userType === 'requester' && (
        <button
          onClick={() => onNavigate('taskCreation')}
          className="fixed bottom-24 right-6 lg:bottom-8 lg:right-12 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-50"
        >
          <Plus className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </button>
      )}

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen="home"
        onNavigate={onNavigate}
        userType={userType}
      />
    </div>
  );
}
