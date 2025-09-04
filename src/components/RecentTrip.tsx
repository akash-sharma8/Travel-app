import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function RecentTrip() {
  const recentTrips = [
    {
      id: 10,
      destination: "Mumbai to Pune",
      date: "Dec 28, 2024",
      status: "Completed",
      duration: "3h 20m"
    },
    {
      id: 9,
      destination: "Delhi to Gurgaon",
      date: "Dec 25, 2024", 
      status: "Completed",
      duration: "1h 45m"
    }
  ];

  return (
    <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-gray-800 dark:text-gray-200 font-medium">Recent Trips</h3>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {recentTrips.map((trip) => (
          <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Trip #{trip.id}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{trip.destination}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{trip.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded-full">
                {trip.status}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{trip.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}