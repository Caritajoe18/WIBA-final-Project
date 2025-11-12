import { useState } from 'react';
import type { Screen } from '../../App';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star, CheckCircle } from 'lucide-react';

interface RatingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function RatingsScreen({ onNavigate }: RatingsScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('home');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-slate-900 mb-2">Payment Released!</h2>
        <p className="text-slate-600 text-center max-w-xs mb-4">
          Your review has been submitted and payment has been released from escrow.
        </p>
        <div className="text-center">
          <p className="text-slate-500">Task completed</p>
          <p className="text-green-600">+$25.00</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 px-6 py-6 shadow-lg">
        <h2 className="text-white mb-2">Rate Your Experience</h2>
        <p className="text-blue-100">Help us maintain quality service</p>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
        {/* Task Summary */}
        <Card className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500">Task Completed</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-slate-900">Deliver package to downtown</p>
        </Card>

        {/* Tasker Info */}
        <div>
          <p className="text-slate-500 mb-3">Rate Tasker</p>
          <Card className="p-4 rounded-2xl border border-slate-200">
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
                <p className="text-slate-600">Tasker</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Star Rating */}
        <div className="text-center">
          <p className="text-slate-700 mb-4">How was your experience?</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-slate-600">
              {rating === 5
                ? 'Excellent!'
                : rating === 4
                ? 'Great!'
                : rating === 3
                ? 'Good'
                : rating === 2
                ? 'Fair'
                : 'Poor'}
            </p>
          )}
        </div>

        {/* Quick Feedback */}
        {rating > 0 && (
          <div>
            <p className="text-slate-700 mb-3">What did you like?</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Professional',
                'On time',
                'Friendly',
                'Careful handling',
                'Good communication',
                'Fast service',
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comment */}
        <div>
          <label className="text-slate-700 mb-2 block">
            Additional Comments (Optional)
          </label>
          <Textarea
            placeholder="Share more details about your experience..."
            className="rounded-xl min-h-[120px] resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Payment Info */}
        <Card className="p-4 rounded-2xl bg-green-50 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-900 mb-1">Escrow Payment</p>
              <p className="text-green-700">
                $25.00 will be released to tasker after review
              </p>
            </div>
            <div className="text-green-600 text-right">
              <p className="text-green-900">$25.00</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="p-6 bg-white border-t border-slate-200">
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl h-12 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit Review & Release Payment
        </Button>
      </div>
    </div>
  );
}
