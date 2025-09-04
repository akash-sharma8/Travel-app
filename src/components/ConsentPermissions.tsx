import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Navigation, 
  Bell, 
  Camera, 
  FileText, 
  Shield, 
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface ConsentPermissionsProps {
  onComplete: () => void;
}

export function ConsentPermissions({ onComplete }: ConsentPermissionsProps) {
  const [permissions, setPermissions] = useState({
    location: false,
    autoTripDetection: false,
    notifications: false,
    camera: false,
    storage: false
  });

  const [step, setStep] = useState<'permissions' | 'final'>('permissions');

  const handlePermissionToggle = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const requestPermissions = async () => {
    // Mock permission requests - in real app would use actual browser APIs
    if (permissions.location) {
      try {
        await navigator.geolocation.getCurrentPosition(() => {}, () => {});
        console.log("Location permission granted");
      } catch (error) {
        console.log("Location permission denied");
      }
    }

    if (permissions.notifications) {
      try {
        const permission = await Notification.requestPermission();
        console.log("Notification permission:", permission);
      } catch (error) {
        console.log("Notification permission denied");
      }
    }

    setStep('final');
  };

  const handleComplete = () => {
    console.log("Permissions configured:", permissions);
    onComplete();
  };

  if (step === 'final') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200">All Set!</CardTitle>
            <CardDescription>
              Your ScanYatra account is ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-sky-800 dark:text-sky-200 mb-3">Quick Tips:</h4>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-sky-600 rounded-full mt-2 flex-shrink-0" />
                  Add your first trip from the Home page
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-sky-600 rounded-full mt-2 flex-shrink-0" />
                  Upload travel documents in the Doc section
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-sky-600 rounded-full mt-2 flex-shrink-0" />
                  Check weather and traffic in Utilities
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-sky-600 rounded-full mt-2 flex-shrink-0" />
                  Manage co-travelers for group trips
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={handleComplete}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Start Using ScanYatra
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-sky-600 dark:text-sky-400" />
          </div>
          <CardTitle className="text-sky-800 dark:text-sky-200">App Permissions</CardTitle>
          <CardDescription>
            Grant permissions to enable ScanYatra's smart features
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Location Permission */}
          <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Location Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Required for trip tracking, distance calculation, and location-based features
                </p>
                <Badge variant="secondary" className="mt-2">
                  Essential
                </Badge>
              </div>
            </div>
            <Switch
              checked={permissions.location}
              onCheckedChange={() => handlePermissionToggle('location')}
            />
          </div>

          {/* Auto Trip Detection */}
          <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Automatic Trip Detection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Automatically detect and log your trips in the background
                </p>
                <Badge variant="outline" className="mt-2">
                  Recommended
                </Badge>
              </div>
            </div>
            <Switch
              checked={permissions.autoTripDetection}
              onCheckedChange={() => handlePermissionToggle('autoTripDetection')}
            />
          </div>

          {/* Notifications */}
          <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Get alerts for trip updates, weather changes, and safety notifications
                </p>
                <Badge variant="outline" className="mt-2">
                  Recommended
                </Badge>
              </div>
            </div>
            <Switch
              checked={permissions.notifications}
              onCheckedChange={() => handlePermissionToggle('notifications')}
            />
          </div>

          {/* Camera Access */}
          <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Camera Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Scan documents and capture travel memories
                </p>
                <Badge variant="outline" className="mt-2">
                  Optional
                </Badge>
              </div>
            </div>
            <Switch
              checked={permissions.camera}
              onCheckedChange={() => handlePermissionToggle('camera')}
            />
          </div>

          {/* Storage Access */}
          <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">File Storage</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Upload and store travel documents securely
                </p>
                <Badge variant="outline" className="mt-2">
                  Optional
                </Badge>
              </div>
            </div>
            <Switch
              checked={permissions.storage}
              onCheckedChange={() => handlePermissionToggle('storage')}
            />
          </div>

          {/* Privacy Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200">Privacy Notice</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Your data is encrypted and stored securely. You can change these permissions anytime in Settings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep('final')}
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button
              onClick={requestPermissions}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white"
            >
              Grant Permissions
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            You can modify these settings later in the app
          </p>
        </CardContent>
      </Card>
    </div>
  );
}