import { Route, ChevronRight, Clock, MapPin, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface TripChainCardProps {
  onOpenTripChain: () => void;
}

export function TripChainCard({ onOpenTripChain }: TripChainCardProps) {
  // Mock data for preview - in real app, this would come from state/API
  const todayTripsCount = 4;
  const connectedTrips = 3;
  const lastTripTime = "7:00 PM";
  const totalDuration = "11h";
  const chainEfficiency = Math.round((connectedTrips / todayTripsCount) * 100);

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 dark:from-blue-900/20 dark:via-sky-900/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200">
      <Button
        variant="ghost"
        className="w-full h-auto p-0 hover:bg-transparent"
        onClick={onOpenTripChain}
      >
        <div className="w-full space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-800/30 rounded-xl">
                <Route className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Trip Chain
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Today's journey
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-blue-100 dark:border-blue-800">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {todayTripsCount}
                </span>
                <MapPin className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Trips</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-lg font-medium text-green-600 dark:text-green-400">
                  {connectedTrips}
                </span>
                <Route className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Linked</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {lastTripTime}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last</p>
            </div>
          </div>

          {/* Efficiency Indicator */}
          <div className="pt-2 border-t border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Chain Efficiency</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                  {chainEfficiency}%
                </div>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${chainEfficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Mini Timeline Preview */}
            <div className="mt-3">
              <div className="flex items-center justify-center space-x-1">
                <div className="flex items-center space-x-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm"></div>
                  <div className="w-6 h-0.5 bg-blue-300 dark:bg-blue-600"></div>
                </div>
                <div className="flex items-center space-x-0.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-sm"></div>
                  <div className="w-6 h-0.5 bg-blue-300 dark:bg-blue-600"></div>
                </div>
                <div className="flex items-center space-x-0.5">
                  <div className="w-2 h-2 bg-purple-400 rounded-full shadow-sm"></div>
                  <div className="w-6 h-0.5 bg-orange-300 dark:bg-orange-600 border-dashed border border-orange-400 dark:border-orange-500"></div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm"></div>
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                🚶 Bus 🚌 Metro 🚇 Walk
              </p>
            </div>
          </div>
        </div>
      </Button>
    </Card>
  );
}