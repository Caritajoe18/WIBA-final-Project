import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Plus, User, ArrowLeft, Package } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isWelcome = location.pathname === "/";

  if (isWelcome) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold">DropIt</span>
          </button>

          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
          <NavLink
            to="/home"
            className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </NavLink>

          <NavLink
            to="/create-task"
            className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <div className="bg-primary text-primary-foreground rounded-full p-3 -mt-6 shadow-lg">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Create</span>
          </NavLink>

          <NavLink
            to="/profile"
            className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;