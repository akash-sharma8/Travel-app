import { useState } from "react";
import { ArrowLeft, Phone, MapPin, Share2, AlertTriangle, Users, MapIcon, Clock, Car } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";

interface SafetyProps {
  onClose: () => void;
}

export function Safety({ onClose }: SafetyProps) {
  const [liveLocationEnabled, setLiveLocationEnabled] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  const emergencyContacts = [
    { id: "1", name: "Mom", phone: "+91 98765 43210", relationship: "Family" },
    { id: "2", name: "Dad", phone: "+91 98765 43211", relationship: "Family" },
    { id: "3", name: "Rahul", phone: "+91 98765 43212", relationship: "Friend" },
    { id: "4", name: "Priya", phone: "+91 98765 43213", relationship: "Co-worker" }
  ];

  const currentTrip = {
    tripNumber: "TRP001",
    startPoint: "Mumbai Central",
    destination: "Pune Station",
    mode: "Train",
    coTravelers: ["Rahul", "Priya"]
  };

  const handleEmergencyCall = () => {
    // In a real app, this would initiate a call to 112
    toast.success("Emergency call initiated to 112");
  };

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleLiveLocationShare = () => {
    if (selectedContacts.length === 0) {
      toast.error("Please select at least one contact to share location");
      return;
    }
    setLiveLocationEnabled(true);
    toast.success(`Live location sharing enabled for ${selectedContacts.length} contacts`);
  };

  const handleTripInfoShare = () => {
    if (selectedContacts.length === 0) {
      toast.error("Please select at least one contact to share trip info");
      return;
    }
    toast.success(`Trip information shared with ${selectedContacts.length} contacts`);
  };

  const handlePanicAlert = () => {
    if (selectedContacts.length === 0) {
      toast.error("Please set up emergency contacts first");
      return;
    }
    toast.success("Panic alert sent to all emergency contacts!");
  };

  return (
    <div className="h-full bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
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
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Safety Center</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Emergency Call */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Phone className="h-5 w-5" />
              Emergency Call
            </CardTitle>
            <CardDescription>
              Quick access to emergency services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 112 Emergency
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Emergency Call Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will immediately dial 112 emergency services. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleEmergencyCall}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Call Now
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Live Location Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-sky-600" />
              Live Location Sharing
            </CardTitle>
            <CardDescription>
              Share your real-time location with trusted contacts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Enable Live Sharing</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {liveLocationEnabled ? "Currently sharing location" : "Location sharing disabled"}
                </p>
              </div>
              <Switch
                checked={liveLocationEnabled}
                onCheckedChange={setLiveLocationEnabled}
              />
            </div>
            <Button 
              onClick={handleLiveLocationShare}
              className="w-full bg-sky-600 hover:bg-sky-700"
              disabled={selectedContacts.length === 0}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Share with Selected Contacts
            </Button>
          </CardContent>
        </Card>

        {/* Current Trip Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-green-600" />
              Share Trip Information
            </CardTitle>
            <CardDescription>
              Share current trip details with emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{currentTrip.tripNumber}</Badge>
                <Car className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{currentTrip.mode}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapIcon className="h-4 w-4 text-green-600" />
                <span className="text-gray-900 dark:text-white">{currentTrip.startPoint}</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-900 dark:text-white">{currentTrip.destination}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  Co-travelers: {currentTrip.coTravelers.join(", ")}
                </span>
              </div>
            </div>
            <Button 
              onClick={handleTripInfoShare}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={selectedContacts.length === 0}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Trip Details
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Select Emergency Contacts
            </CardTitle>
            <CardDescription>
              Choose contacts for location sharing and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleContactToggle(contact.id)}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{contact.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</p>
                    <Badge variant="secondary" className="text-xs">
                      {contact.relationship}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            {selectedContacts.length > 0 && (
              <div className="mt-4 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                <p className="text-sm text-sky-700 dark:text-sky-300">
                  {selectedContacts.length} contact(s) selected for emergency alerts
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Panic Alert */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Panic Alert
            </CardTitle>
            <CardDescription>
              Send immediate alert to all emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={selectedContacts.length === 0}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Send Panic Alert
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Send Panic Alert</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will immediately send an emergency alert with your location to all selected contacts. 
                    They will receive your current location and trip information.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handlePanicAlert}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Send Alert
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}