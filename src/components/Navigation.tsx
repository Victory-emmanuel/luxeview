import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Home as HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getDashboardPath = () => {
    return userProfile?.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/client";
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-accent/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-heading text-2xl text-accent tracking-luxury"
            >
              LuxeView Elite
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-body text-sm tracking-wide transition-colors duration-300 relative ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-text-primary hover:text-accent"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Authentication Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Dashboard Link */}
                <Button
                  asChild
                  variant="ghost"
                  className="text-text-primary hover:text-accent font-body tracking-wide"
                >
                  <Link to={getDashboardPath()}>Dashboard</Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.photoURL || ""}
                          alt={user.displayName || ""}
                        />
                        <AvatarFallback className="bg-accent text-primary">
                          {user.displayName?.charAt(0) ||
                            user.email?.charAt(0) ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-primary border-accent/20"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-text-primary">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs leading-none text-text-primary/70">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-accent capitalize">
                          {userProfile?.role || "client"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-accent/20" />
                    <DropdownMenuItem
                      asChild
                      className="text-text-primary hover:bg-accent/10"
                    >
                      <Link to={getDashboardPath()}>
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="text-text-primary hover:bg-accent/10"
                    >
                      <Link to="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-accent/20" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-text-primary hover:bg-accent/10 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-text-primary hover:text-accent font-body tracking-wide"
                >
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-primary font-body tracking-wide"
                >
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-accent/20 py-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block font-body text-lg tracking-wide transition-colors duration-300 ${
                        isActive(item.path)
                          ? "text-accent"
                          : "text-text-primary hover:text-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile Authentication Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-accent/20"
                >
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.photoURL || ""}
                            alt={user.displayName || ""}
                          />
                          <AvatarFallback className="bg-accent text-primary">
                            {user.displayName?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-accent capitalize">
                            {userProfile?.role || "client"}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={getDashboardPath()}
                        onClick={() => setIsOpen(false)}
                        className="block font-body text-lg tracking-wide text-text-primary hover:text-accent transition-colors"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block font-body text-lg tracking-wide text-text-primary hover:text-accent transition-colors"
                      >
                        Settings
                      </Link>

                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left font-body text-lg tracking-wide text-text-primary hover:text-accent transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Link
                        to="/auth/signin"
                        onClick={() => setIsOpen(false)}
                        className="block font-body text-lg tracking-wide text-text-primary hover:text-accent transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/auth/signup"
                        onClick={() => setIsOpen(false)}
                        className="block font-body text-lg tracking-wide text-accent hover:text-accent/80 transition-colors"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
