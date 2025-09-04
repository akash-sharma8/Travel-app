import { Leaf, Award, Clock, MapPin, TreePine, Car, Bus, Footprints, Train, Bike, TrendingUp, Star, Gift } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function EcoPage() {
  const ecoPoints = 1250;
  const nextRewardAt = 1500;
  const pointsToNext = nextRewardAt - ecoPoints;

  const weeklyData = {
    totalDistance: "45.8 km",
    totalTime: "6h 32m",
    carbonSavings: "12.4 kg CO₂"
  };

  const transportDistribution = [
    { mode: "Car", distance: "18.2 km", percentage: 40, icon: Car, color: "red", points: 0 },
    { mode: "Public Transport", distance: "15.6 km", percentage: 34, icon: Bus, color: "blue", points: 156 },
    { mode: "Walking", distance: "8.4 km", percentage: 18, icon: Footprints, color: "green", points: 168 },
    { mode: "Bicycle", distance: "3.6 km", percentage: 8, icon: Bike, color: "emerald", points: 108 }
  ];

  const ecoAchievements = [
    { title: "Green Warrior", description: "10 eco trips this week", icon: Award, earned: true },
    { title: "Carbon Saver", description: "Saved 50kg CO₂ this month", icon: TreePine, earned: true },
    { title: "Public Transport Pro", description: "Used public transport 20 times", icon: Bus, earned: false }
  ];

  return (
    <div className="flex-1 px-4 py-4 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-800 font-medium">Eco Travel</h2>
            <p className="text-sm text-gray-600">Earn points for sustainable travel</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700">
          <Star className="h-3 w-3 mr-1" />
          {ecoPoints} Points
        </Badge>
      </div>

      {/* Points & Rewards */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-green-600" />
            <h3 className="text-green-800 font-medium">Eco Rewards</h3>
          </div>
          <span className="text-sm text-green-600">{pointsToNext} points to next reward</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Progress to next level</span>
            <span className="text-sm text-green-700">{ecoPoints}/{nextRewardAt}</span>
          </div>
          <Progress value={(ecoPoints / nextRewardAt) * 100} className="h-2" />
        </div>
        
        <div className="mt-3 p-3 bg-white rounded-lg border border-green-100">
          <p className="text-sm text-green-800">🏆 Next Reward: Free Metro Day Pass</p>
        </div>
      </Card>

      {/* Weekly Travel Summary */}
      <Card className="p-4 bg-white border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-gray-800 font-medium">Weekly Travel Summary</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-sky-50 rounded-lg border border-sky-100">
            <MapPin className="h-5 w-5 text-sky-600 mx-auto mb-1" />
            <p className="text-xs text-sky-600">Total Distance</p>
            <p className="text-sky-800 font-medium">{weeklyData.totalDistance}</p>
          </div>
          
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-blue-600">Total Time</p>
            <p className="text-blue-800 font-medium">{weeklyData.totalTime}</p>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
            <TreePine className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-green-600">Carbon Savings</p>
            <p className="text-green-800 font-medium">{weeklyData.carbonSavings}</p>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            ⭐ You're in the top 15% of eco-friendly travelers this week!
          </p>
        </div>
      </Card>

      {/* Transport Mode Distribution */}
      <Card className="p-4 bg-white border-gray-200">
        <h3 className="text-gray-800 font-medium mb-4">Transport Mode Distribution</h3>
        
        <div className="space-y-3">
          {transportDistribution.map((transport) => {
            const Icon = transport.icon;
            return (
              <div key={transport.mode} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-8 h-8 bg-${transport.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 text-${transport.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-800">{transport.mode}</span>
                      <span className="text-sm text-gray-600">{transport.distance}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${transport.color}-500 h-2 rounded-full`}
                        style={{ width: `${transport.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    {transport.points > 0 ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        +{transport.points} pts
                      </Badge>
                    ) : (
                      <span className="text-xs text-gray-400">0 pts</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Eco Achievements */}
      <Card className="p-4 bg-white border-gray-200">
        <h3 className="text-gray-800 font-medium mb-3">Eco Achievements</h3>
        
        <div className="space-y-3">
          {ecoAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                achievement.earned 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-green-100' 
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    achievement.earned 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    achievement.earned 
                      ? 'text-green-800' 
                      : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </p>
                  <p className={`text-xs ${
                    achievement.earned 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <Badge className="bg-green-100 text-green-700">
                    ✓ Earned
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-12 bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
        >
          <Bike className="h-5 w-5 mr-2" />
          Find Bike Routes
        </Button>
        
        <Button 
          variant="outline" 
          className="h-12 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
        >
          <Bus className="h-5 w-5 mr-2" />
          Public Transport
        </Button>
      </div>

      {/* Eco Tips */}
      <Card className="p-4 bg-sky-50 border-sky-200">
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="h-4 w-4 text-sky-600" />
          <h4 className="text-sky-800 font-medium">Eco Tip of the Day</h4>
        </div>
        <p className="text-sm text-sky-700">
          💡 Walking or cycling for trips under 3km can earn you double points and improve your health!
        </p>
      </Card>
    </div>
  );
}