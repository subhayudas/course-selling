
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Menu, X, ChevronDown, User, Settings, LogOut, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white dark:bg-gray-900 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-purple-600 to-blue-500"></div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              EduHub
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/courses">Courses</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Development</DropdownMenuItem>
                <DropdownMenuItem>Data Science</DropdownMenuItem>
                <DropdownMenuItem>Business</DropdownMenuItem>
                <DropdownMenuItem>Design</DropdownMenuItem>
                <DropdownMenuItem>Marketing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View All</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={isSearchOpen ? "bg-gray-100 dark:bg-gray-800" : ""}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Authentication Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/my-purchases" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 border border-gray-200 dark:border-gray-700"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.user_metadata?.full_name || user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-purchases">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>My Purchases</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account-settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Expanded Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for courses, topics or instructors..."
                className="pl-10 w-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
            <Link to="/" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              Home
            </Link>
            <Link to="/courses" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              Courses
            </Link>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <Link to="/about" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              About
            </Link>
            <Link to="/contact" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
              Contact
            </Link>
            {!user && (
              <>
                <Link to="/login" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <>
                <Link to="/dashboard" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Dashboard
                </Link>
                <Link to="/account-settings" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Account Settings
                </Link>
                <Link to="/my-purchases" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                  My Purchases
                </Link>
                <div 
                  onClick={handleSignOut} 
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  Log Out
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
