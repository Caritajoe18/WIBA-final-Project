import { MapPin, Navigation } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  price: string;
  type: string;
}

interface MapViewProps {
  tasks: Task[];
  onTaskClick: () => void;
}

export default function MapView({ tasks, onTaskClick }: MapViewProps) {
  return (
    <div className="relative w-full h-full bg-slate-100 rounded-2xl overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-slate-100" />
        
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-slate-400" style={{ top: `${i * 10}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-slate-400" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {/* Current location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Task pins */}
        {tasks.slice(0, 5).map((task, index) => {
          const positions = [
            { top: '30%', left: '40%' },
            { top: '60%', left: '65%' },
            { top: '25%', left: '70%' },
            { top: '70%', left: '35%' },
            { top: '45%', left: '80%' },
          ];

          return (
            <div
              key={task.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
              style={positions[index]}
              onClick={onTaskClick}
            >
              <div className="relative">
                <MapPin className="w-8 h-8 text-green-500 fill-green-500 drop-shadow-lg group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    <p className="text-slate-900">{task.title}</p>
                    <p className="text-blue-600">${task.price}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50">
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50">
          <span className="text-slate-700">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50">
          <span className="text-slate-700">−</span>
        </button>
      </div>

      {/* Location info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white px-4 py-3 rounded-xl shadow-lg">
          <p className="text-slate-600">Showing tasks within</p>
          <p className="text-slate-900">5 km radius</p>
        </div>
      </div>
    </div>
  );
}
