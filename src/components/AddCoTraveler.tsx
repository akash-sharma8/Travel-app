import { useState } from "react";
import { X, User, Phone, Calendar, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";

interface CoTravelerData {
  name: string;
  age: string;
  gender: string;
  phone: string;
  relation: string;
}

export function AddCoTraveler({ onClose, onAdd }: { 
  onClose: () => void; 
  onAdd: (traveler: CoTravelerData) => void; 
}) {
  const [formData, setFormData] = useState<CoTravelerData>({
    name: "",
    age: "",
    gender: "",
    phone: "",
    relation: ""
  });

  const [errors, setErrors] = useState<Partial<CoTravelerData>>({});

  const validateForm = () => {
    const newErrors: Partial<CoTravelerData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = "Please enter a valid age (1-120)";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (formData.phone && formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd(formData);
      toast.success("Co-traveler added successfully!");
      onClose();
    }
  };

  const handleInputChange = (field: keyof CoTravelerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const relations = [
    "Spouse", "Parent", "Child", "Sibling", "Friend", 
    "Colleague", "Relative", "Other"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-900 dark:text-gray-100">Add New Co-Traveler</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center space-x-2">
              <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Name *</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Age *</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              className={`${errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.age && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.age}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Gender *</span>
            </Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger className={`${errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
            )}
          </div>

          {/* Phone Number Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>Phone No. (optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.phone && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Relation Field (Optional) */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span>Relation (optional)</span>
            </Label>
            <Select value={formData.relation} onValueChange={(value) => handleInputChange("relation", value)}>
              <SelectTrigger className="border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select relation" />
              </SelectTrigger>
              <SelectContent>
                {relations.map((relation) => (
                  <SelectItem key={relation} value={relation}>
                    {relation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Information Note */}
          <Card className="p-3 bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-700">
            <p className="text-sm text-sky-800 dark:text-sky-200">
              ℹ️ Fields marked with * are required. This information will be used for travel documentation and emergency contacts.
            </p>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800"
            >
              Add Co-Traveler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}