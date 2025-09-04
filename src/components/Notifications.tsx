import { useState } from "react";
import { ArrowLeft, Bell, AlertTriangle, MapPin, Calendar, Users, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface NotificationsProps {
  onClose: () => void;
}

export function Notifications({ onClose }: NotificationsProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "trip",
      title: "Trip Reminder",
      message: "Your trip to Mumbai starts tomorrow at 10:00 AM",
      time: "2 hours ago",
      icon: Calendar,
      color: "text-sky-600",
      bgColor: "bg-sky-100 dark:bg-sky-900",
      unread: true
    },
    {
      id: 2,
      type: "weather",
      title: "Weather Alert",
      message: "Heavy rain expected in your destination area",
      time: "4 hours ago",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      unread: true
    },
    {
      id: 3,
      type: "location",
      title: "Location Update",
      message: "You've reached your checkpoint successfully",
      time: "6 hours ago",
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
      unread: false
    },
    {
      id: 4,
      type: "cotraveler",
      title: "Co-traveler Update",
      message: "Rahul has joined your trip to Goa",
      time: "1 day ago",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      unread: false
    },
    {
      id: 5,
      type: "safety",
      title: "Safety Check",
      message: "Emergency contact verification completed",
      time: "2 days ago",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900",
      unread: false
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="h-full bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
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
              <Bell className="h-5 w-5 text-sky-600" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={markAllAsRead}>
                Mark all as read
              </DropdownMenuItem>
              <DropdownMenuItem onClick={clearAll} className="text-red-600">
                Clear all
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Bell className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
            <p className="text-gray-500 dark:text-gray-400">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 hover:shadow-md ${
                    notification.unread ? 'ring-2 ring-sky-200 dark:ring-sky-800' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${notification.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                              {notification.unread && (
                                <span className="ml-2 h-2 w-2 bg-sky-500 rounded-full inline-block"></span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-1">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {notification.unread && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}