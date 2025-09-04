import { Clock, Car } from "lucide-react";
import { Card } from "./ui/card";

export function TripInfo() {
  return (
    <Card className="p-4 bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-700">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sky-800 dark:text-sky-200 font-medium">Trip Number: 11</h3>
          <span className="text-xs text-sky-600 dark:text-sky-300 bg-sky-200 dark:bg-sky-800 px-2 py-1 rounded-full">Active</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Car className="h-4 w-4 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Mode</p>
              <p className="text-green-700 dark:text-green-300 font-medium">Car</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Starting Time</p>
              <p className="text-blue-700 dark:text-blue-300 font-medium">09:30 AM</p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-sky-100 dark:border-sky-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Arrival</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">11:45 AM</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">2h 15m</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}