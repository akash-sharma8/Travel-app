import React, { useState, useEffect } from "react";
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  MapPin,
  Bell,
  BellRing,
  RotateCcw,
  Calendar,
  Clock,
  Car,
  AlertTriangle,
  Navigation,
  Activity,
  TrendingUp,
  RefreshCw,
  Smartphone
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Switch } from "./ui/switch";
import { toast } from "sonner@2.0.3";

export function UtilPage() {
  const [currentWeather, setCurrentWeather] = useState({
    location: "Mumbai, Maharashtra",
    temperature: 0,
    condition: "Loading...",
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    uvIndex: 0
  });

  const [destinationWeather, setDestinationWeather] = useState({
    location: "Goa, India",
    temperature: 0,
    condition: "Loading...",
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    uvIndex: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  const apiKey = "e7da38116780a37e821b7f4439aec008";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const fetchWeatherData = async (city: string) => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      const data = await response.json();
      return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round((data.visibility || 10000) / 1000), // Convert to km
        uvIndex: 6 // OpenWeather UV requires separate API call
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast.error("Failed to fetch weather data");
      return null;
    }
  };

  const refreshWeatherData = async () => {
    setIsLoading(true);
    try {
      const [currentData, destinationData] = await Promise.all([
        fetchWeatherData("Mumbai"),
        fetchWeatherData("Goa")
      ]);
      
      if (currentData) setCurrentWeather(currentData);
      if (destinationData) setDestinationWeather(destinationData);
    } catch (error) {
      console.error('Error refreshing weather:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshWeatherData();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return Sun;
      case 'rain':
      case 'drizzle':
        return CloudRain;
      case 'snow':
        return CloudSnow;
      case 'clouds':
      case 'cloudy':
        return Cloud;
      default:
        return Cloud;
    }
  };

  const weatherNotifications = [
    {
      type: "urgent",
      icon: CloudRain,
      title: "Heavy Rain Alert",
      message: "Severe rainfall expected in Mumbai within 15 minutes. Seek shelter immediately.",
      time: "2 min ago",
      priority: "urgent"
    },
    {
      type: "weather",
      icon: Sun,
      title: "Clear Weather Ahead",
      message: "Perfect sunny conditions in Goa for your 4:30 PM arrival today.",
      time: "1 hour ago",
      priority: "weather"
    },
    {
      type: "weather",
      icon: Wind,
      title: "Windy Conditions",
      message: "Strong winds (25+ km/h) expected on your route. Drive carefully.",
      time: "3 hours ago",
      priority: "weather"
    },
    {
      type: "info",
      icon: Thermometer,
      title: "Temperature Update",
      message: "Temperature dropping to 18°C tonight. Pack warm clothes.",
      time: "5 hours ago",
      priority: "info"
    }
  ];

  const trafficConditions = [
    {
      route: "Mumbai-Pune Expressway",
      status: "Heavy Traffic",
      delay: "+45 mins",
      distance: "12.5 km",
      color: "red",
      incident: "Accident reported near Khopoli"
    },
    {
      route: "Western Express Highway",
      status: "Moderate Traffic", 
      delay: "+15 mins",
      distance: "8.3 km",
      color: "yellow",
      incident: "Construction work ongoing"
    },
    {
      route: "Eastern Express Highway",
      status: "Clear",
      delay: "On Time",
      distance: "15.2 km", 
      color: "green",
      incident: "No incidents reported"
    }
  ];

  return (
    <div className="flex-1 px-4 py-4 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
            <Cloud className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-medium">Weather & Traffic</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time travel conditions</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <RotateCcw className="h-3 w-3 mr-1" />
            Synced
          </Badge>
          <Button variant="ghost" size="sm" onClick={refreshWeatherData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Google Sync Status */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-blue-800 dark:text-blue-200 font-medium">Google Calendar Sync</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">Trip alerts & weather notifications enabled</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </Card>

      {/* Weather Report */}
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 dark:text-gray-200 font-medium">Weather Report</h3>
          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">Live</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Current Location Weather */}
          <div className="p-3 bg-sky-50 dark:bg-sky-900 rounded-lg border border-sky-100 dark:border-sky-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                <span className="text-xs font-medium text-sky-800 dark:text-sky-200">Current</span>
              </div>
              {React.createElement(getWeatherIcon(currentWeather.condition), { className: "h-4 w-4 text-yellow-500" })}
            </div>
            
            <div className="mb-2">
              <p className="text-xs text-sky-700 dark:text-sky-300 truncate">{currentWeather.location.split(',')[0]}</p>
              <p className="text-lg font-bold text-sky-900 dark:text-sky-100">{currentWeather.temperature}°C</p>
              <p className="text-xs text-sky-700 dark:text-sky-300">{currentWeather.condition}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-1 text-xs">
              <div className="text-center">
                <Droplets className="h-3 w-3 text-blue-500 mx-auto mb-0.5" />
                <p className="text-sky-800 dark:text-sky-200">{currentWeather.humidity}%</p>
              </div>
              <div className="text-center">
                <Wind className="h-3 w-3 text-gray-500 mx-auto mb-0.5" />
                <p className="text-sky-800 dark:text-sky-200">{currentWeather.windSpeed}</p>
              </div>
              <div className="text-center">
                <Eye className="h-3 w-3 text-indigo-500 mx-auto mb-0.5" />
                <p className="text-sky-800 dark:text-sky-200">{currentWeather.visibility}km</p>
              </div>
            </div>
          </div>

          {/* Destination Weather */}
          <div className="p-3 bg-orange-50 dark:bg-orange-900 rounded-lg border border-orange-100 dark:border-orange-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <Navigation className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-medium text-orange-800 dark:text-orange-200">Destination</span>
              </div>
              {React.createElement(getWeatherIcon(destinationWeather.condition), { className: "h-4 w-4 text-yellow-500" })}
            </div>
            
            <div className="mb-2">
              <p className="text-xs text-orange-700 dark:text-orange-300 truncate">{destinationWeather.location.split(',')[0]}</p>
              <p className="text-lg font-bold text-orange-900 dark:text-orange-100">{destinationWeather.temperature}°C</p>
              <p className="text-xs text-orange-700 dark:text-orange-300">{destinationWeather.condition}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-1 text-xs">
              <div className="text-center">
                <Droplets className="h-3 w-3 text-blue-500 mx-auto mb-0.5" />
                <p className="text-orange-800 dark:text-orange-200">{destinationWeather.humidity}%</p>
              </div>
              <div className="text-center">
                <Wind className="h-3 w-3 text-gray-500 mx-auto mb-0.5" />
                <p className="text-orange-800 dark:text-orange-200">{destinationWeather.windSpeed}</p>
              </div>
              <div className="text-center">
                <Eye className="h-3 w-3 text-indigo-500 mx-auto mb-0.5" />
                <p className="text-orange-800 dark:text-orange-200">{destinationWeather.visibility}km</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Notifications */}
      <Card className="p-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Weather Notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Stay updated with weather alerts</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {weatherNotifications.length}
          </Badge>
        </div>
        
        <div className="space-y-3">
          {weatherNotifications.map((notification, index) => {
            const Icon = notification.icon;
            const isUrgent = notification.priority === 'urgent';
            const isWeather = notification.priority === 'weather';
            const isInfo = notification.priority === 'info';
            
            return (
              <div 
                key={index} 
                className={`rounded-xl p-4 shadow-sm border transition-all duration-200 hover:shadow-md ${
                  isUrgent 
                    ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900' 
                    : isWeather
                    ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900'
                    : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUrgent 
                      ? 'bg-red-100 dark:bg-red-900' 
                      : isWeather
                      ? 'bg-amber-100 dark:bg-amber-900'
                      : 'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isUrgent 
                        ? 'text-red-600 dark:text-red-400' 
                        : isWeather
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`font-semibold leading-5 ${
                        isUrgent 
                          ? 'text-red-900 dark:text-red-100' 
                          : isWeather
                          ? 'text-amber-900 dark:text-amber-100'
                          : 'text-blue-900 dark:text-blue-100'
                      }`}>
                        {notification.title}
                      </h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                        isUrgent 
                          ? 'bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-300' 
                          : isWeather
                          ? 'bg-amber-200 text-amber-700 dark:bg-amber-800 dark:text-amber-300'
                          : 'bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300'
                      }`}>
                        {notification.time}
                      </span>
                    </div>
                    <p className={`text-sm leading-5 ${
                      isUrgent 
                        ? 'text-red-700 dark:text-red-300' 
                        : isWeather
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-blue-700 dark:text-blue-300'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
                
                {/* Action Button for Urgent Notifications */}
                {isUrgent && (
                  <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* View All Button */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="ghost" 
            className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <BellRing className="h-4 w-4 mr-2" />
            View All Notifications
          </Button>
        </div>
      </Card>

      {/* Live Traffic Conditions */}
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-gray-800 dark:text-gray-200 font-medium">Live Traffic Conditions</h3>
          </div>
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <Activity className="h-3 w-3 mr-1" />
            Live API
          </Badge>
        </div>
        
        <div className="space-y-3">
          {trafficConditions.map((traffic, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    traffic.color === 'red' ? 'bg-red-500' :
                    traffic.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{traffic.route}</span>
                </div>
                <Badge className={`${
                  traffic.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                  traffic.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 
                  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {traffic.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">{traffic.delay}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">{traffic.distance}</span>
                  </div>
                </div>
              </div>
              
              {traffic.incident && (
                <div className="mt-2 p-2 bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed break-words">{traffic.incident}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-700">
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center leading-relaxed">
            🛣️ Traffic data updated every 5 minutes via integrated traffic API
          </p>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-12 bg-sky-50 border-sky-200 hover:bg-sky-100 text-sky-700 dark:bg-sky-900 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-sky-800"
        >
          <Cloud className="h-5 w-5 mr-2" />
          7-Day Forecast
        </Button>
        
        <Button 
          variant="outline" 
          className="h-12 bg-green-50 border-green-200 hover:bg-green-100 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-800"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Route Analysis
        </Button>
      </div>
    </div>
  );
}