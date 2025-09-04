import { 
  ArrowLeft, 
  MapPin, 
  Shield, 
  Users, 
  Leaf, 
  Award,
  Heart,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface AboutUsProps {
  onClose: () => void;
}

export function AboutUs({ onClose }: AboutUsProps) {
  const features = [
    {
      icon: MapPin,
      title: "Smart Travel Planning",
      description: "Plan your trips with real-time weather and traffic updates"
    },
    {
      icon: Shield,
      title: "Secure Document Storage",
      description: "Store and manage your travel documents safely"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Travel",
      description: "Earn rewards for choosing sustainable transportation"
    },
    {
      icon: Users,
      title: "Co-Traveler Management",
      description: "Easily manage and coordinate with fellow travelers"
    }
  ];

  const stats = [
    { label: "Happy Travellers", value: "50K+", icon: Users },
    { label: "Cities Covered", value: "1000+", icon: MapPin },
    { label: "Carbon Saved", value: "2.5M kg", icon: Leaf },
    { label: "User Rating", value: "4.8/5", icon: Award }
  ];

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
            <h2 className="text-gray-800 dark:text-gray-200 font-medium">About Us</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn about ScanYatra</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* App Logo & Description */}
        <Card className="p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">SY</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">ScanYatra</h1>
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mb-4">
            v1.0.0
          </Badge>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Your ultimate travel companion that makes journey planning smarter, safer, and more sustainable. 
            Experience the future of travel management with our comprehensive suite of features.
          </p>
        </Card>

        {/* Mission Statement */}
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Our Mission</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To revolutionize travel experiences by providing innovative, eco-friendly, and user-centric solutions 
            that make every journey memorable, safe, and sustainable.
          </p>
        </Card>

        {/* Key Features */}
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Key Features</h3>
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Our Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Icon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Get in Touch</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">support@scanyatra.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">+91 1800-SCAN-YATRA</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">www.scanyatra.com</span>
            </div>
          </div>
        </Card>

        {/* Team & Credits */}
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Development Team</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Built with ❤️ by a passionate team of developers, designers, and travel enthusiasts 
            committed to making travel better for all travellers.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Supabase</Badge>
            <Badge variant="secondary">PWA</Badge>
          </div>
        </Card>

        {/* Legal */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-2">
          <p>© 2024 ScanYatra. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <button className="hover:text-sky-600 dark:hover:text-sky-400">Privacy Policy</button>
            <button className="hover:text-sky-600 dark:hover:text-sky-400">Terms of Service</button>
            <button className="hover:text-sky-600 dark:hover:text-sky-400">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}