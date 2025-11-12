import { useState } from 'react';
import type { Screen } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ArrowLeft, MapPin, Calendar, DollarSign, Camera } from 'lucide-react';

interface TaskCreationScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function TaskCreationScreen({ onNavigate }: TaskCreationScreenProps) {
  const [selectedType, setSelectedType] = useState('delivery');

  const taskTypes = [
    { id: 'delivery', label: 'Delivery', icon: '📦' },
    { id: 'shopping', label: 'Shopping', icon: '🛒' },
    { id: 'errand', label: 'Errand', icon: '🚗' },
    { id: 'other', label: 'Other', icon: '✨' },
  ];

  const handleSubmit = () => {
    onNavigate('home');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 px-6 py-4 shadow-lg">
        <button onClick={() => onNavigate('home')} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Create New Task</h2>
        <p className="text-blue-100">Fill in the details below</p>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
        {/* Task Type */}
        <div>
          <label className="text-slate-700 mb-3 block">Task Type</label>
          <div className="grid grid-cols-4 gap-2">
            {taskTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <p className="text-slate-700">{type.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-slate-700 mb-2 block">Task Title</label>
          <Input 
            placeholder="e.g., Deliver package to downtown" 
            className="rounded-xl h-12"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-slate-700 mb-2 block">Description</label>
          <Textarea 
            placeholder="Provide detailed instructions for the tasker..."
            className="rounded-xl min-h-[100px] resize-none"
          />
        </div>

        {/* Locations */}
        <div className="space-y-4">
          <div>
            <label className="text-slate-700 mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Pickup Location
            </label>
            <Input 
              placeholder="Enter address or use current location" 
              className="rounded-xl h-12"
            />
          </div>
          <div>
            <label className="text-slate-700 mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              Drop-off Location
            </label>
            <Input 
              placeholder="Enter destination address" 
              className="rounded-xl h-12"
            />
          </div>
        </div>

        {/* Price and Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700 mb-2 block flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              Price
            </label>
            <Input 
              type="number"
              placeholder="25" 
              className="rounded-xl h-12"
            />
          </div>
          <div>
            <label className="text-slate-700 mb-2 block flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Deadline
            </label>
            <Input 
              type="time"
              className="rounded-xl h-12"
            />
          </div>
        </div>

        {/* Optional Media */}
        <div>
          <label className="text-slate-700 mb-2 block">Add Photos (Optional)</label>
          <Card className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center cursor-pointer hover:border-blue-400 transition-colors">
            <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Upload photos</p>
            <p className="text-slate-400">Help taskers understand the task better</p>
          </Card>
        </div>

        {/* Payment Info */}
        <Card className="p-4 rounded-2xl bg-blue-50 border-blue-100">
          <p className="text-blue-900 mb-1">Payment in Escrow</p>
          <p className="text-blue-700">
            Your payment will be held securely until the task is completed and verified.
          </p>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="p-6 bg-white border-t border-slate-200">
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl h-12"
          onClick={handleSubmit}
        >
          Post Task
        </Button>
      </div>
    </div>
  );
}
