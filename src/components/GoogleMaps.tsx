import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { X, MapPin, Navigation, Crosshair, RotateCcw, AlertTriangle, Map } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface GoogleMapsProps {
  onClose: () => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function GoogleMaps({ onClose }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [googleMapsError, setGoogleMapsError] = useState<string | null>(null);
  const [useFallbackMode, setUseFallbackMode] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyALAp5JFXaXgQkG17MvJYQkJ_ZrwbV8ctI';

  // Function to load Google Maps script with proper async loading
  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      // Check if script is already loading
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&v=weekly`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Check for billing errors or other API errors
        if (!window.google || !window.google.maps) {
          reject(new Error('Google Maps API failed to initialize'));
          return;
        }
        resolve();
      };
      
      script.onerror = () => reject(new Error('Failed to load Google Maps script'));
      
      document.head.appendChild(script);
    });
  };

  // Initialize Google Map with updated API
  const initializeMap = async (lat: number, lng: number) => {
    if (!mapRef.current || !window.google) return;

    try {
      const mapOptions = {
        center: { lat, lng },
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: false,
        mapTypeControl: false,
        gestureHandling: 'auto',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      // Create marker for user location using standard Marker for better compatibility
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: newMap,
        title: 'Your Current Location',
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
              <circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="3"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
              <circle cx="16" cy="16" r="1.5" fill="#3B82F6"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        },
        animation: window.google.maps.Animation.DROP,
        optimized: false
      });

      setUserMarker(marker);

      // Add info window with location details
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: system-ui, sans-serif; min-width: 200px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 8px; animation: pulse 2s infinite;"></div>
              <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">
                📍 Live Location
              </h3>
            </div>
            <div style="background: #f8fafc; border-radius: 6px; padding: 8px; margin-bottom: 8px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 500;">COORDINATES</p>
              <p style="margin: 2px 0 0 0; font-size: 11px; color: #475569; font-family: monospace;">
                ${lat.toFixed(6)}, ${lng.toFixed(6)}
              </p>
            </div>
            <div style="text-align: center;">
              <button onclick="navigator.clipboard.writeText('${lat.toFixed(6)}, ${lng.toFixed(6)}')" 
                      style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">
                Copy Coordinates
              </button>
            </div>
            <style>
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            </style>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(newMap, marker);
      });
      
      // Auto-open info window briefly when marker is created
      setTimeout(() => {
        infoWindow.open(newMap, marker);
        setTimeout(() => {
          infoWindow.close();
        }, 3000);
      }, 1000);

      return newMap;
    } catch (error) {
      console.error('Error initializing map:', error);
      setGoogleMapsError('Failed to initialize map');
      setUseFallbackMode(true);
    }
  };

  // Get location name from coordinates
  const getLocationName = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
      const data = await response.json();
      const name = data.city || data.locality || data.principalSubdivision || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setLocationName(name);
      return name;
    } catch (error) {
      console.warn('Failed to get location name:', error);
      const name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setLocationName(name);
      return name;
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      setIsLoading(false);
      setUseFallbackMode(true);
      return;
    }

    setIsLoading(true);
    setLocationPermissionDenied(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // Get location name
        await getLocationName(latitude, longitude);
        
        if (!useFallbackMode && !googleMapsError) {
          if (map && userMarker) {
            const newPosition = { lat: latitude, lng: longitude };
            userMarker.setPosition(newPosition);
            map.panTo(newPosition); // Use panTo for smoother movement instead of setCenter
          } else {
            await initializeMap(latitude, longitude);
          }
        }
        
        setIsLoading(false);
        toast.success('Location updated successfully!');
      },
      async (error) => {
        console.error('Error getting location:', error);
        setIsLoading(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationPermissionDenied(true);
            toast.error('Location permission denied. Please enable location access.');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out.');
            break;
          default:
            toast.error('An unknown error occurred while getting location.');
            break;
        }
        
        // Fallback to default location (Mumbai)
        const defaultLocation = { lat: 19.0760, lng: 72.8777 };
        setUserLocation(defaultLocation);
        await getLocationName(defaultLocation.lat, defaultLocation.lng);
        
        if (!useFallbackMode && !googleMapsError) {
          await initializeMap(defaultLocation.lat, defaultLocation.lng);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Start watching user location
  const startLocationTracking = () => {
    if (!navigator.geolocation) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        
        setUserLocation(newLocation);
        await getLocationName(latitude, longitude);
        
        if (userMarker && !useFallbackMode) {
          userMarker.setPosition(newLocation);
          // Smoothly update map center for location tracking
          if (map) {
            map.panTo(newLocation);
          }
        }
      },
      (error) => {
        console.warn('Error watching location:', error);
        // Don't show error toast for watch position failures as they're common
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000
      }
    );
  };

  // Center map on user location
  const centerOnUser = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(16);
      toast.success('Centered on your location');
      
      // Briefly highlight the marker
      if (userMarker) {
        userMarker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          userMarker.setAnimation(null);
        }, 2000);
      }
    } else if (userLocation && useFallbackMode) {
      toast.info('Location centered in fallback mode');
    } else {
      toast.error('Location not available');
    }
  };

  useEffect(() => {
    let mounted = true;

    // Listen for Google Maps API errors
    const handleGoogleMapsError = (event: any) => {
      console.error('Google Maps API Error:', event);
      
      if (event.error && event.error.includes('BillingNotEnabledMapError')) {
        setGoogleMapsError('Google Maps requires billing to be enabled. Using location viewer mode.');
      } else if (event.error && event.error.includes('ApiNotActivatedMapError')) {
        setGoogleMapsError('Google Maps API not activated. Using location viewer mode.');
      } else {
        setGoogleMapsError('Google Maps error occurred. Using location viewer mode.');
      }
      
      setUseFallbackMode(true);
    };

    // Add error listener
    window.addEventListener('google-maps-api-error', handleGoogleMapsError);

    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsScript();
        
        // Check if Google Maps loaded successfully
        if (window.google && window.google.maps) {
          // Google Maps loaded successfully, proceed with location
          if (mounted && !useFallbackMode) {
            getCurrentLocation();
            startLocationTracking();
          }
        } else {
          throw new Error('Google Maps API failed to load');
        }
      } catch (error: any) {
        console.error('Failed to load Google Maps:', error);
        
        // Check for specific errors
        if (error.message && (error.message.includes('billing') || error.message.includes('BillingNotEnabledMapError'))) {
          setGoogleMapsError('Google Maps billing not enabled. Using location viewer mode.');
        } else if (error.message && error.message.includes('ApiNotActivatedMapError')) {
          setGoogleMapsError('Google Maps API not activated. Using location viewer mode.');
        } else {
          setGoogleMapsError('Google Maps unavailable. Using location viewer mode.');
        }
        
        setUseFallbackMode(true);
        if (mounted) {
          getCurrentLocation(); // Still get location for fallback mode
          startLocationTracking();
        }
      }
    };

    initializeGoogleMaps();

    return () => {
      mounted = false;
      window.removeEventListener('google-maps-api-error', handleGoogleMapsError);
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [useFallbackMode]);

  const handleRefreshLocation = () => {
    getCurrentLocation();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="w-full h-full max-w-4xl max-h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-gray-900 dark:text-gray-100 font-medium text-sm md:text-base truncate">
                {useFallbackMode ? 'Location Viewer' : 'Live Location'}
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                {isLoading ? 'Getting your location...' : 
                 locationPermissionDenied ? 'Location access denied' :
                 useFallbackMode ? 'Location details and coordinates' :
                 'Your current position on the map'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshLocation}
              disabled={isLoading}
              className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 hidden md:flex"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={centerOnUser}
              disabled={!userLocation}
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 hidden md:flex"
            >
              <Crosshair className="h-4 w-4 mr-1" />
              Center
            </Button>
            
            {/* Mobile buttons - icons only */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshLocation}
              disabled={isLoading}
              className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 md:hidden w-8 h-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={centerOnUser}
              disabled={!userLocation}
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 md:hidden w-8 h-8 p-0"
            >
              <Crosshair className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 w-8 h-8 p-0"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Google Maps or Fallback Display */}
          {useFallbackMode || googleMapsError ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h3 className="text-gray-900 dark:text-gray-100 font-medium mb-2">
                  Location Information
                </h3>
                
                {googleMapsError && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        {googleMapsError}
                      </p>
                    </div>
                  </div>
                )}
                
                {userLocation ? (
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Live Location</span>
                      </div>
                      
                      <div className="space-y-2 text-left">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-gray-900 dark:text-gray-100 font-medium">{locationName || 'Getting location name...'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Latitude</p>
                            <p className="text-gray-900 dark:text-gray-100 font-mono text-sm">{userLocation.lat.toFixed(6)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Longitude</p>
                            <p className="text-gray-900 dark:text-gray-100 font-mono text-sm">{userLocation.lng.toFixed(6)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          const mapsUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
                          window.open(mapsUrl, '_blank');
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Map className="h-4 w-4 mr-2" />
                        Open in Maps
                      </Button>
                      
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(`${userLocation.lat}, ${userLocation.lng}`);
                          toast.success('Coordinates copied to clipboard!');
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Copy Coords
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">Getting your location...</p>
                )}
              </div>
            </div>
          ) : (
            <div 
              ref={mapRef} 
              className="w-full h-full"
            />
          )}
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-80 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your location...</p>
              </div>
            </div>
          )}

          {/* Permission Denied Overlay */}
          {locationPermissionDenied && (
            <div className="absolute inset-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-6 flex items-center justify-center">
              <div className="text-center max-w-md">
                <Navigation className="h-12 w-12 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
                <h3 className="text-amber-800 dark:text-amber-200 font-medium mb-2">
                  Location Access Needed
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                  To show your exact location, please enable location permissions in your browser settings and refresh.
                </p>
                <Button
                  onClick={handleRefreshLocation}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {userLocation && (
          <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="text-gray-600 dark:text-gray-400 min-w-0 flex-1 truncate">
                <span className="font-medium">
                  {locationName ? `${locationName} • ` : ''}
                </span>
                {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
              </div>
              <div className="text-green-600 dark:text-green-400 flex items-center flex-shrink-0 ml-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="hidden sm:inline">
                  {useFallbackMode ? 'Location Active' : 'Live Tracking Active'}
                </span>
                <span className="sm:hidden">Live</span>
              </div>
            </div>
            
            {useFallbackMode && (
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                Fallback mode - Interactive map unavailable
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}