import { 
  ArrowLeft, 
  Trash2, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Train, 
  Plane,
  AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useState } from "react";

interface TripHistoryProps {
  onClose: () => void;
}

export function TripHistory({ onClose }: TripHistoryProps) {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Mumbai to Goa",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      duration: "3 days",
      mode: "Car",
      icon: Car,
      distance: "462 km",
      status: "Completed",
      color: "green"
    },
    {
      id: 2,
      title: "Delhi to Manali",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      duration: "2 days",
      mode: "Train",
      icon: Train,
      distance: "570 km",
      status: "Completed",
      color: "blue"
    },
    {
      id: 3,
      title: "Bangalore to Chennai",
      startDate: "2024-01-05",
      endDate: "2024-01-06",
      duration: "1 day",
      mode: "Flight",
      icon: Plane,
      distance: "346 km",
      status: "Completed",
      color: "purple"
    },
    {
      id: 4,
      title: "Pune to Mumbai",
      startDate: "2024-01-02",
      endDate: "2024-01-02",
      duration: "Same day",
      mode: "Car",
      icon: Car,
      distance: "149 km",
      status: "Completed",
      color: "green"
    },
    {
      id: 5,
      title: "Kolkata to Darjeeling",
      startDate: "2023-12-28",
      endDate: "2023-12-30",
      duration: "2 days",
      mode: "Car",
      icon: Car,
      distance: "563 km",
      status: "Completed",
      color: "green"
    }
  ]);

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearHistory = () => {
    if (showClearConfirm) {
      setTrips([]);
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-medium">Trip History</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{trips.length} trips found</p>
          </div>
        </div>
        {trips.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearHistory}
            className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear History
          </Button>
        )}
      </div>

      {/* Clear Confirmation Alert */}
      {showClearConfirm && (
        <div className="p-4">
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-red-800 dark:text-red-200">Are you sure you want to clear all trip history?</span>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowClearConfirm(false)}
                    className="text-gray-600 border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleClearHistory}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Trip List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {trips.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-2">No Trip History</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Your completed trips will appear here. Start planning your next adventure!
            </p>
          </div>
        ) : (
          trips.map((trip) => {
            const Icon = trip.icon;
            return (
              <Card key={trip.id} className="p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-12 h-12 bg-${trip.color}-100 dark:bg-${trip.color}-900 rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 text-${trip.color}-600 dark:text-${trip.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-1">{trip.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(trip.startDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{trip.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={`bg-${trip.color}-100 text-${trip.color}-700 dark:bg-${trip.color}-900 dark:text-${trip.color}-300`}
                        >
                          {trip.mode}
                        </Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{trip.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {trip.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Stats Footer */}
      {trips.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Trips</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">{trips.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Distance</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {trips.reduce((total, trip) => total + parseInt(trip.distance), 0)} km
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Year</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {trips.filter(trip => trip.startDate.includes('2024')).length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}