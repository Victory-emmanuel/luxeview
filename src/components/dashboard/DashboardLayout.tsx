import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Building,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Heart,
  Clock,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const adminNavItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: Home },
    { name: "Properties", path: "/dashboard/admin/properties", icon: Building },
    { name: "Users", path: "/dashboard/admin/users", icon: Users },
    {
      name: "Inquiries",
      path: "/dashboard/admin/inquiries",
      icon: MessageSquare,
    },
    {
      name: "Appointments",
      path: "/dashboard/admin/appointments",
      icon: Calendar,
    },
    { name: "Analytics", path: "/dashboard/admin/analytics", icon: BarChart3 },
  ];

  const clientNavItems = [
    { name: "Dashboard", path: "/dashboard/client", icon: Home },
    { name: "Saved Properties", path: "/dashboard/client/saved", icon: Heart },
    { name: "Viewing History", path: "/dashboard/client/history", icon: Clock },
    {
      name: "Appointments",
      path: "/dashboard/client/appointments",
      icon: Calendar,
    },
    {
      name: "Preferences",
      path: "/dashboard/client/preferences",
      icon: Settings,
    },
  ];

  const navItems =
    userProfile?.role === "admin" ? adminNavItems : clientNavItems;

  const isActive = (path: string) => location.pathname === path;

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary border-r border-accent/20 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-accent/20">
            <Link to="/" className="flex items-center">
              <h1 className="font-heading text-xl text-accent tracking-luxury">
                LuxeView Elite
              </h1>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-text-primary hover:text-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-accent/20">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.photoURL || ""}
                  alt={user?.displayName || ""}
                />
                <AvatarFallback className="bg-accent text-primary">
                  {user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-accent capitalize">
                  {userProfile?.role || "client"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-accent/10 text-accent"
                      : "text-text-primary hover:bg-accent/5 hover:text-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-body">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-accent/20 space-y-2">
            <Link
              to="/profile"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-primary hover:bg-accent/5 hover:text-accent transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-body">Profile</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-text-primary hover:bg-accent/5 hover:text-accent transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-body">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-primary border-b border-accent/20 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-text-primary hover:text-accent"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-heading text-2xl text-text-primary">
                  {userProfile?.role === "admin"
                    ? "Admin Dashboard"
                    : "My Dashboard"}
                </h1>
                <p className="text-sm text-text-primary/70 font-body">
                  Welcome back, {user?.displayName || "User"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="outline"
                className="border-accent/30 text-text-primary hover:bg-accent/10"
              >
                <Link to="/">View Website</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
