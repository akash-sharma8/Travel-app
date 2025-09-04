import { Bell, Menu, Shield } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "figma:asset/2513ef81051124f88459396929a29b801a9234ad.png";

interface HeaderProps {
  onMenuToggle: () => void;
  onNotificationClick?: () => void;
  onSafetyClick?: () => void;
}

export function Header({ onMenuToggle, onNotificationClick, onSafetyClick }: HeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-sky-100 dark:border-gray-700">
      {/* Logo and App Name */}
      <div className="px-4 py-3 border-b border-sky-50 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-3">
          <img src={logoImage} alt="ScanYatra" className="w-12 h-12" />
          <h1 className="text-green-700 dark:text-green-400 text-xl font-semibold">ScanYatra</h1>
        </div>
      </div>
      
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-gray-700 dark:text-gray-300">Good Morning User</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
            onClick={onSafetyClick}
          >
            <Shield className="h-4 w-4 mr-1" />
            Safety
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            onClick={onNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}