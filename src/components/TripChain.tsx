import { useState, useEffect } from "react";
import { X, Route, Clock, MapPin, ArrowRight, Calendar, Share2, BarChart3, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner@2.0.3";

interface Trip {
  id: string;
  origin: string;
  destination: string;
  mode: string;
  startTime: string;
  endTime: string;
  connected: boolean;
}

interface TripChainProps {
  onClose: () => void;
}

export function TripChain({ onClose }: TripChainProps) {
  const [tripChain, setTripChain] = useState<Trip[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock trip data for current day
  const mockTrips: Trip[] = [
    {
      id: "1",
      origin: "Home",
      destination: "Bus Stop",
      mode: "Walk",
      startTime: "08:00",
      endTime: "08:10",
      connected: true
    },
    {
      id: "2", 
      origin: "Bus Stop",
      destination: "Office",
      mode: "Bus",
      startTime: "08:15",
      endTime: "08:50",
      connected: true
    },
    {
      id: "3",
      origin: "Office",
      destination: "Market",
      mode: "Metro",
      startTime: "18:00",
      endTime: "18:30",
      connected: true
    },
    {
      id: "4",
      origin: "Market",
      destination: "Home",
      mode: "Walk",
      startTime: "18:40",
      endTime: "19:00",
      connected: false
    }
  ];

  useEffect(() => {
    // Simulate fetching and processing trips
    const processedTrips = processTripsIntoChain(mockTrips);
    setTripChain(processedTrips);
  }, []);

  const processTripsIntoChain = (trips: Trip[]): Trip[] => {
    // Sort trips by start time
    const sortedTrips = trips.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    // Mark connections between trips
    for (let i = 0; i < sortedTrips.length - 1; i++) {
      const currentTrip = sortedTrips[i];
      const nextTrip = sortedTrips[i + 1];
      
      // Check if destination matches next origin (or is very close)
      const isConnected = currentTrip.destination.toLowerCase() === nextTrip.origin.toLowerCase() ||
                         isLocationClose(currentTrip.destination, nextTrip.origin);
      
      sortedTrips[i].connected = isConnected;
    }
    
    return sortedTrips;
  };

  const isLocationClose = (loc1: string, loc2: string): boolean => {
    // Simple proximity check - in real implementation, use geolocation
    const commonLocations = [
      ["Bus Stop", "Metro Station"],
      ["Office", "Work Place"],
      ["Market", "Shopping Center"]
    ];
    
    return commonLocations.some(pair => 
      (pair.includes(loc1) && pair.includes(loc2))
    );
  };

  const getModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'walk':
        return '🚶';
      case 'bus':
        return '🚌';
      case 'metro':
        return '🚇';
      case 'car':
        return '🚗';
      case 'bike':
        return '🚴';
      default:
        return '🚶';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'walk':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'bus':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'metro':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'car':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'bike':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleAnalyzePattern = () => {
    toast.info("Trip pattern analysis will be available in the next update");
  };

  const handleShareChain = () => {
    const chainSummary = `My trip chain for ${formatDate(currentDate)}:\n${tripChain.map((trip, index) => 
      `${index + 1}. ${trip.origin} → ${trip.destination} (${trip.mode}, ${trip.startTime}-${trip.endTime})`
    ).join('\n')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Trip Chain',
        text: chainSummary
      });
    } else {
      navigator.clipboard.writeText(chainSummary);
      toast.success("Trip chain copied to clipboard!");
    }
  };

  const handleExportData = () => {
    toast.info("Export functionality will be available soon");
  };

  const handlePreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
    toast.info("Loading previous day's trips...");
    // In real app, this would fetch different data
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const today = new Date();
    
    if (nextDay <= today) {
      setCurrentDate(nextDay);
      toast.info("Loading next day's trips...");
      // In real app, this would fetch different data
    } else {
      toast.info("Cannot view future dates");
    }
  };

  const getTotalDuration = () => {
    if (tripChain.length === 0) return "0 min";
    
    const firstTrip = tripChain[0];
    const lastTrip = tripChain[tripChain.length - 1];
    
    const start = new Date(`2024-01-01 ${firstTrip.startTime}`);
    const end = new Date(`2024-01-01 ${lastTrip.endTime}`);
    
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} min`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Route className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="font-medium text-gray-900 dark:text-gray-100">Trip Chain</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handlePreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 min-w-24 text-center">
                {formatDate(currentDate)}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNextDay}
                disabled={currentDate.toDateString() === new Date().toDateString()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {tripChain.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Trips</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
              {getTotalDuration()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium text-green-600 dark:text-green-400">
              {tripChain.filter(trip => trip.connected).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Connected</div>
          </div>
        </div>
      </div>

      {/* Trip Chain List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {tripChain.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400 space-y-2">
                <Calendar className="h-12 w-12 mx-auto opacity-50" />
                <p>No trips found for today</p>
                <p className="text-sm">Start your journey to see trip chains!</p>
              </div>
            </Card>
          ) : (
            tripChain.map((trip, index) => (
              <div key={trip.id} className="relative">
                <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getModeIcon(trip.mode)}</div>
                      <div>
                        <Badge className={`text-xs ${getModeColor(trip.mode)}`}>
                          {trip.mode}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{trip.startTime} - {trip.endTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {trip.origin}
                        </span>
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {trip.destination}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Connection Indicator */}
                {index < tripChain.length - 1 && (
                  <div className="flex justify-center my-2">
                    {trip.connected ? (
                      <div className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400">
                        <div className="w-2 h-6 bg-green-200 dark:bg-green-700 rounded-full"></div>
                        <span>Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-xs text-orange-600 dark:text-orange-400">
                        <div className="w-2 h-6 bg-orange-200 dark:bg-orange-700 rounded-full border-2 border-dashed border-orange-300 dark:border-orange-600"></div>
                        <span>Gap</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      {tripChain.length > 0 && (
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={handleAnalyzePattern}>
              <BarChart3 className="h-4 w-4 mr-1" />
              Analyze
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareChain}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}