import { useState } from "react";
import { User, Camera, Edit3, MapPin, Phone, Mail, Calendar, Users, Settings, ChevronRight, Shield, Bell, Plane, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AccountSettings } from "./AccountSettings";
import { PrivacySecurity } from "./PrivacySecurity";
import { toast } from "sonner@2.0.3";

export function MePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'account' | 'privacy'>('main');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const userStats = [
    { label: "Trips Completed", value: "12", icon: MapPin },
    { label: "Cities Visited", value: "8", icon: MapPin },
    { label: "Travel Buddies", value: "5", icon: Users }
  ];

  const handleSignOut = () => {
    localStorage.removeItem('scanyatra-onboarded');
    toast.success("Signed out successfully!");
    // Force page reload to reset authentication state
    window.location.reload();
  };

  const settingsOptions = [
    { label: "Account Settings", icon: User, action: () => setCurrentView('account') },
    { label: "Privacy & Security", icon: Shield, action: () => setCurrentView('privacy') },
    { label: "Notification Preferences", icon: Bell, action: () => {} },
    { label: "Travel Preferences", icon: Plane, action: () => {} }
  ];

  // Render different views based on current state
  if (currentView === 'account') {
    return <AccountSettings onClose={() => setCurrentView('main')} />;
  }

  if (currentView === 'privacy') {
    return <PrivacySecurity onClose={() => setCurrentView('main')} />;
  }

  return (
    <div className="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto">
      {/* Profile Header */}
      <Card className="p-6 bg-gradient-to-r from-sky-50 to-green-50 dark:from-sky-900/20 dark:to-green-900/20 border-sky-200 dark:border-sky-700">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-sky-100 dark:bg-sky-800 border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden flex items-center justify-center">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-sky-600 dark:text-sky-400" />
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* User Name */}
          <div className="text-center">
            <h2 className="text-sky-900 dark:text-sky-100">Uday</h2>
            <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Verified Traveler
            </Badge>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-gray-100">Contact Information</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Phone className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
              <p className="text-gray-900 dark:text-gray-100">XXXXXXXX42</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Mail className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-gray-100">example@gmail.com</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Details */}
      <Card className="p-4">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">Personal Details</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
              <p className="text-gray-900 dark:text-gray-100">XYZ, Pune, Maharashtra</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                <p className="text-sm text-gray-900 dark:text-gray-100">Male</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="text-sm text-gray-900 dark:text-gray-100">19/01/2004</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Travel Stats */}
      <Card className="p-4">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">Travel Statistics</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {userStats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-gradient-to-b from-sky-50 to-green-50 dark:from-sky-900/20 dark:to-green-900/20 rounded-lg">
              <stat.icon className="w-6 h-6 text-sky-600 dark:text-sky-400 mx-auto mb-2" />
              <p className="text-lg text-sky-900 dark:text-sky-100">{stat.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-4">
        <h3 className="text-gray-900 dark:text-gray-100 mb-4">Account Settings</h3>
        
        <div className="space-y-2">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <option.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">{option.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </Card>

      {/* Sign Out */}
      <Card className="p-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </Card>

      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">ScanYatra v2.1.0</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Build 2024.09.04</p>
      </div>
    </div>
  );
}