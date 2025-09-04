import { MapPin, RefreshCw, Navigation, Target, Route } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { GoogleMaps } from "./GoogleMaps";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

export function LocationActions() {
  const [showGoogleMaps, setShowGoogleMaps] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Getting location...");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const handleShowLocation = () => {
    // Update location before showing map for most current data
    updateLocation(false);
    setShowGoogleMaps(true);
    toast.success('Opening live location map...');
  };

  const handleCloseMap = () => {
    setShowGoogleMaps(false);
  };

  const updateLocation = async (showToast = true) => {
    if (!navigator.geolocation) {
      if (showToast) toast.error('Geolocation is not supported by this browser');
      setCurrentLocation("Location unavailable");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Use reverse geocoding to get location name
      try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        const locationName = data.city || data.locality || data.principalSubdivision || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setCurrentLocation(locationName);
        if (showToast) toast.success('Location updated successfully!');
      } catch (geocodeError) {
        setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        if (showToast) toast.success('Location coordinates updated!');
      }
      
    } catch (error: any) {
      console.error('Error getting location:', error);
      
      if (error.code === 1) {
        setCurrentLocation("Location access denied");
        if (showToast) toast.error('Location permission denied. Please enable location access.');
      } else if (error.code === 2) {
        setCurrentLocation("Location unavailable");
        if (showToast) toast.error('Location information is unavailable.');
      } else if (error.code === 3) {
        setCurrentLocation("Location timeout");
        if (showToast) toast.error('Location request timed out.');
      } else {
        setCurrentLocation("Andheri, Mumbai"); // Fallback location
        if (showToast) toast.error('Failed to get location, using default');
      }
    }
  };

  const handleRefreshLocation = async () => {
    setIsRefreshing(true);
    await updateLocation(true);
    setIsRefreshing(false);
  };

  // Auto-update location on component mount
  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      updateLocation(false); // Don't show toast on initial load
    }
  }, [hasInitialized]);

  return (
    <>
      <div className="space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300"
            onClick={handleShowLocation}
          >
            <MapPin className="h-5 w-5 mr-2" />
            Show Location
          </Button>
        
        <Button 
          variant="outline" 
          className="h-12 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300"
          onClick={handleRefreshLocation}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Updating...' : 'Refresh'}
        </Button>
      </div>
      
      {/* Location Details */}
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-800 dark:text-gray-200 font-medium">Trip Details</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Navigation className="h-4 w-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Location</p>
                <p className="text-green-700 dark:text-green-300 font-medium text-sm">{currentLocation}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Destination</p>
                <p className="text-red-700 dark:text-red-300 font-medium text-sm">Bandra, Mumbai</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg border border-sky-100 dark:border-sky-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Route className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span className="text-sm text-sky-800 dark:text-sky-200 font-medium">Distance</span>
              </div>
              <span className="text-sky-800 dark:text-sky-200 font-medium">12.5 km</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-sky-600 dark:text-sky-400">ETA: 35 minutes</span>
              <span className="text-xs text-sky-600 dark:text-sky-400">via Western Express Highway</span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    {/* Google Maps Modal */}
    {showGoogleMaps && (
      <GoogleMaps onClose={handleCloseMap} />
    )}
  </>
  );
}