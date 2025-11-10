import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, CheckCircle, Package, ShoppingBag, Truck } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  price: string;
  distance: string;
  type: string;
  deadline: string;
  verified: boolean;
}

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const getTypeIcon = () => {
    switch (task.type) {
      case 'delivery':
        return <Package className="w-4 h-4" />;
      case 'shopping':
        return <ShoppingBag className="w-4 h-4" />;
      case 'errand':
        return <Truck className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (task.type) {
      case 'delivery':
        return 'bg-blue-100 text-blue-700';
      case 'shopping':
        return 'bg-green-100 text-green-700';
      case 'errand':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card 
      className="p-4 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-slate-900">{task.title}</h4>
            {task.verified && (
              <CheckCircle className="w-4 h-4 text-blue-500" />
            )}
          </div>
          <p className="text-slate-600">{task.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge className={`${getTypeColor()} px-3 py-1 rounded-full capitalize`}>
          {getTypeIcon()}
          <span className="ml-1">{task.type}</span>
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{task.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{task.deadline}</span>
          </div>
        </div>
        <div className="text-blue-600">
          <span className="text-slate-900">${task.price}</span>
        </div>
      </div>
    </Card>
  );
}
