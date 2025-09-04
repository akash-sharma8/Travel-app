import { useState } from "react";
import { ArrowLeft, User, Mail, Phone, Edit, Save, X, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface AccountSettingsProps {
  onClose: () => void;
}

export function AccountSettings({ onClose }: AccountSettingsProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "Passionate traveler exploring the world one destination at a time.",
    avatar: "",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001"
  });

  const [editedProfile, setEditedProfile] = useState(profileData);

  const handleSaveProfile = () => {
    setProfileData(editedProfile);
    setIsEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleSaveContact = () => {
    setProfileData(editedProfile);
    setIsEditingContact(false);
    toast.success("Contact details updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedProfile(profileData);
    setIsEditingProfile(false);
    setIsEditingContact(false);
  };

  return (
    <div className="h-full bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile">Profile Management</TabsTrigger>
            <TabsTrigger value="contact">Contact & Security</TabsTrigger>
          </TabsList>

          {/* Profile Management Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-sky-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-lg bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{profileData.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Profile Photo</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                {/* Profile Form */}
                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <Textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        placeholder="Tell us about yourself"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-sky-600 hover:bg-sky-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-900 dark:text-white">{profileData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <p className="text-gray-900 dark:text-white">{profileData.bio}</p>
                    </div>
                    <Button 
                      onClick={() => setIsEditingProfile(true)}
                      className="bg-sky-600 hover:bg-sky-700"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact & Security Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Update your email, phone number, and address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditingContact ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <Textarea
                        value={editedProfile.address}
                        onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                        placeholder="Enter your address"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveContact} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <p className="text-gray-900 dark:text-white">{profileData.address}</p>
                    </div>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => setIsEditingContact(true)}
                        className="bg-green-600 hover:bg-green-700 w-full"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Contact Details
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900">
                          <Mail className="h-4 w-4 mr-2" />
                          Change Email
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900">
                          <Phone className="h-4 w-4 mr-2" />
                          Change Phone
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}