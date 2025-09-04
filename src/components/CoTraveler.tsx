import { Plus, Users, X, User, Calendar, UserCheck, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { AddCoTraveler } from "./AddCoTraveler";
import { toast } from "sonner@2.0.3";

export function CoTraveler() {
  const [showDetails, setShowDetails] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [travellers, setTravellers] = useState([
    {
      id: 1,
      name: "Alex Kumar",
      initial: "A",
      age: 28,
      gender: "Male",
      phone: "+91 98765 43210",
      relation: "Friend",
      joinedDate: "Jan 2024"
    },
    {
      id: 2,
      name: "Sarah Patel",
      initial: "S", 
      age: 26,
      gender: "Female",
      phone: "+91 87654 32109",
      relation: "Colleague",
      joinedDate: "Jan 2024"
    }
  ]);

  const handleRemoveTraveler = (id: number) => {
    setTravellers(prev => prev.filter(traveler => traveler.id !== id));
    toast.success("Co-traveler removed successfully!");
  };

  const handleAddTraveler = (travelerData: any) => {
    const newTraveler = {
      id: Date.now(),
      name: travelerData.name,
      initial: travelerData.name.charAt(0).toUpperCase(),
      age: Number(travelerData.age),
      gender: travelerData.gender,
      phone: travelerData.phone || "Not provided",
      relation: travelerData.relation || "Not specified",
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    
    setTravellers(prev => [...prev, newTraveler]);
    setShowAddForm(false);
  };

  if (showDetails) {
    return (
      <>
        <Card className="p-0 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-green-100 dark:bg-green-900/50 border-b border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="text-green-800 dark:text-green-100 font-medium">Co-Traveller Details</h3>
                <p className="text-xs text-green-600 dark:text-green-400">{travellers.length} travellers in your group</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowDetails(false)}
              className="text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Traveller List */}
          <div className="p-4 space-y-3">
            {travellers.map((traveller) => (
              <Card key={traveller.id} className="p-4 bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow-sm transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center">
                    <span className="text-green-700 dark:text-green-200 font-medium">{traveller.initial}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-gray-800 dark:text-gray-200 font-medium">{traveller.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200">
                          {traveller.relation}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTraveler(traveller.id)}
                          className="h-6 w-6 p-0 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Age</p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">{traveller.age} years</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Gender</p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">{traveller.gender}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Phone: {traveller.phone}</span>
                        <span className="text-green-600 dark:text-green-400">Joined {traveller.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Add New Traveller Button */}
            <Button 
              variant="outline" 
              className="w-full h-12 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 border-dashed"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Co-Traveller
            </Button>
          </div>

          {/* Stats Footer */}
          <div className="p-4 bg-green-100 dark:bg-green-900/50 border-t border-green-200 dark:border-green-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Total</p>
                <p className="text-green-800 dark:text-green-200 font-medium">{travellers.length} People</p>
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Male</p>
                <p className="text-green-800 dark:text-green-200 font-medium">{travellers.filter(t => t.gender === 'Male').length}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Female</p>
                <p className="text-green-800 dark:text-green-200 font-medium">{travellers.filter(t => t.gender === 'Female').length}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Add Co-Traveler Form */}
        {showAddForm && (
          <AddCoTraveler
            onClose={() => setShowAddForm(false)}
            onAdd={handleAddTraveler}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Card className="p-4 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <h3 className="text-green-800 dark:text-green-100 font-medium">Co-Traveller</h3>
              <p className="text-xs text-green-600 dark:text-green-400">{travellers.length} people added</p>
            </div>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => setShowDetails(true)}
            className="bg-green-600 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700 text-white h-8 w-8 p-0 rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-3 flex space-x-2">
          {travellers.slice(0, 2).map((traveller) => (
            <div key={traveller.id} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-green-100 dark:border-green-700 flex-1">
              <div className="w-6 h-6 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center">
                <span className="text-xs text-green-700 dark:text-green-200 font-medium">{traveller.initial}</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-200 truncate">{traveller.name}</span>
            </div>
          ))}
        </div>
        
        {travellers.length > 2 && (
          <div className="mt-2 text-center">
            <span className="text-xs text-green-600 dark:text-green-400">+{travellers.length - 2} more</span>
          </div>
        )}
      </Card>

      {/* Add Co-Traveler Form */}
      {showAddForm && (
        <AddCoTraveler
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddTraveler}
        />
      )}
    </>
  );
}