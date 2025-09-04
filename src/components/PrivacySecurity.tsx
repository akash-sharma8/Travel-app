import { useState } from "react";
import { ArrowLeft, Shield, Lock, MapPin, Download, Heart, FileText, Trash2, UserX, Smartphone, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";

interface PrivacySecurityProps {
  onClose: () => void;
}

export function PrivacySecurity({ onClose }: PrivacySecurityProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [locationPermission, setLocationPermission] = useState(true);
  const [liveLocationSharing, setLiveLocationSharing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const recentDevices = [
    { id: 1, device: "iPhone 15 Pro", location: "New York, NY", lastActive: "Active now", current: true },
    { id: 2, device: "MacBook Pro", location: "New York, NY", lastActive: "2 hours ago", current: false },
    { id: 3, device: "Chrome Browser", location: "Chicago, IL", lastActive: "3 days ago", current: false }
  ];

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match!");
      return;
    }
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    toast.success("Password changed successfully!");
  };

  const handleSignOutDevice = (deviceId: number) => {
    toast.success("Device signed out successfully!");
  };

  const handleDownloadData = () => {
    toast.success("Data download request initiated. You'll receive an email shortly.");
  };

  const handleEmergencyContactSetup = () => {
    toast.success("Emergency contact setup saved!");
  };

  return (
    <div className="h-full bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>

          {/* Account & Login Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-sky-600" />
                  Password & Authentication
                </CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Current password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Input
                      type="password"
                      placeholder="New password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                    <Button 
                      onClick={handlePasswordChange}
                      className="bg-sky-600 hover:bg-sky-700"
                    >
                      Change Password
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      toast.success(checked ? "Two-factor authentication enabled!" : "Two-factor authentication disabled!");
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  Login Activity & Devices
                </CardTitle>
                <CardDescription>
                  View and manage devices that have access to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDevices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{device.device}</h4>
                          {device.current && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{device.location}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{device.lastActive}</p>
                      </div>
                      {!device.current && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSignOutDevice(device.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          Sign Out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Privacy Controls Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sky-600" />
                  Location Permissions
                </CardTitle>
                <CardDescription>
                  Control how the app accesses your location data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">GPS Access</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow the app to access your current location
                    </p>
                  </div>
                  <Switch
                    checked={locationPermission}
                    onCheckedChange={(checked) => {
                      setLocationPermission(checked);
                      toast.success(checked ? "Location access enabled!" : "Location access disabled!");
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-600" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Download or manage your personal data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Download My Data</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Get a copy of all your data including trips, documents, and preferences
                    </p>
                    <Button 
                      onClick={handleDownloadData}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Request Data Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Features Tab */}
          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Emergency Features
                </CardTitle>
                <CardDescription>
                  Configure emergency contacts and safety features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Emergency Contact Setup</h4>
                  <div className="space-y-3">
                    <Input placeholder="Emergency contact name" />
                    <Input placeholder="Emergency contact phone" />
                    <Button 
                      onClick={handleEmergencyContactSetup}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Save Emergency Contact
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Share Live Location</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow emergency contacts to see your real-time location
                    </p>
                  </div>
                  <Switch
                    checked={liveLocationSharing}
                    onCheckedChange={(checked) => {
                      setLiveLocationSharing(checked);
                      toast.success(checked ? "Live location sharing enabled!" : "Live location sharing disabled!");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consent & Legal Tab */}
          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-sky-600" />
                  Legal Documents
                </CardTitle>
                <CardDescription>
                  Review our policies and terms of service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Terms of Service
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <UserX className="h-5 w-5" />
                  Account Actions
                </CardTitle>
                <CardDescription>
                  Permanently delete or temporarily deactivate your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900">
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deactivate Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your account will be temporarily deactivated. You can reactivate it anytime by logging in again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-orange-600 hover:bg-orange-700">
                        Deactivate
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account Permanently
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Account Permanently</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. All your data, trips, documents, and preferences will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Delete Permanently
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}