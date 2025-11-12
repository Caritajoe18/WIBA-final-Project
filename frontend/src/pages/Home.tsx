import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, DollarSign, TrendingUp, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockTasks = [
  {
    id: "1",
    title: "Deliver documents to downtown office",
    description: "Need someone to pick up and deliver important documents by 3 PM today.",
    location: "Manhattan, NYC",
    distance: "2.3 km",
    price: "25",
    deadline: "2 hours",
    status: "open",
    requester: {
      name: "Sarah J.",
      verified: true,
      rating: 4.8,
    },
  },
  {
    id: "2",
    title: "Grocery pickup from Whole Foods",
    description: "Pick up pre-ordered groceries and deliver to my apartment.",
    location: "Brooklyn, NYC",
    distance: "1.8 km",
    price: "15",
    deadline: "3 hours",
    status: "open",
    requester: {
      name: "Mike T.",
      verified: true,
      rating: 4.9,
    },
  },
  {
    id: "3",
    title: "Package return to UPS Store",
    description: "Return a package to the nearest UPS store. Prepaid label included.",
    location: "Queens, NYC",
    distance: "3.1 km",
    price: "12",
    deadline: "4 hours",
    status: "open",
    requester: {
      name: "Emma R.",
      verified: true,
      rating: 4.7,
    },
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">DropIt</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-bold">48</div>
            <div className="text-xs opacity-90">Active Tasks</div>
          </div>
          <div className="h-10 w-px bg-primary-foreground/20" />
          <div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs opacity-90">Nearby</div>
          </div>
          <div className="h-10 w-px bg-primary-foreground/20" />
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <div className="text-2xl font-bold">+8</div>
            <div className="text-xs opacity-90">Today</div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => navigate(`/task/${task.id}`)}
            className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {task.status}
                </Badge>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{task.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.deadline}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                    {task.requester.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {task.requester.name}
                      </span>
                      {task.requester.verified && (
                        <Badge variant="outline" className="h-5 px-1 text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ⭐ {task.requester.rating}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">${task.price}</div>
                  <div className="text-xs text-muted-foreground">USDC</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
