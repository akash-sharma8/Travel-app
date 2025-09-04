import { 
  X, 
  Globe, 
  Moon, 
  Sun, 
  History, 
  Info, 
  Star,
  ChevronRight,
  Languages,
  Trash2
} from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onModalOpen: (modalType: string) => void;
  onClearHistory?: () => void;
}

export function SideMenu({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  onToggleDarkMode, 
  language, 
  onLanguageChange,
  onModalOpen,
  onClearHistory
}: SideMenuProps) {
  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" }
  ];

  const menuItems = [
    {
      icon: Languages,
      title: "Language",
      description: "Change app language",
      action: "language",
      hasSubmenu: true
    },
    {
      icon: isDarkMode ? Sun : Moon,
      title: "Theme",
      description: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      action: "theme",
      hasSubmenu: false
    },
    {
      icon: History,
      title: "Trip History",
      description: "View all past trips",
      action: "tripHistory",
      hasSubmenu: false
    },
    {
      icon: Trash2,
      title: "Clear History",
      description: "Clear all trip history",
      action: "clearHistory",
      hasSubmenu: false
    },
    {
      icon: Info,
      title: "About Us",
      description: "Learn about ScanYatra",
      action: "aboutUs",
      hasSubmenu: false
    },
    {
      icon: Star,
      title: "Rate Us",
      description: "Rate our app",
      action: "rateUs",
      hasSubmenu: false
    }
  ];

  const handleItemClick = (action: string) => {
    switch (action) {
      case "theme":
        onToggleDarkMode();
        break;
      case "clearHistory":
        if (onClearHistory) {
          onClearHistory();
        }
        break;
      case "tripHistory":
      case "aboutUs":
      case "rateUs":
        onModalOpen(action);
        onClose();
        break;
      default:
        break;
    }
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <>
      {/* Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-4/5 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h2 className="text-gray-800 dark:text-gray-200 font-medium">Settings</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">Customize your experience</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">U</span>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">User Name</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">user@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              
              // Special handling for theme item to avoid button nesting
              if (item.action === "theme") {
                return (
                  <Card key={index} className="p-0 border border-gray-200 dark:border-gray-700">
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-3 w-full">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-gray-800 dark:text-gray-200 font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                        <Switch 
                          checked={isDarkMode}
                          onCheckedChange={onToggleDarkMode}
                        />
                      </div>
                    </div>
                  </Card>
                );
              }
              
              return (
                <Card key={index} className="p-0 border border-gray-200 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-4 h-auto hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleItemClick(item.action)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        {item.action === "language" && currentLanguage && (
                          <Badge variant="secondary" className="mt-1">
                            {currentLanguage.nativeName}
                          </Badge>
                        )}
                      </div>
                      {item.hasSubmenu ? (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Language Selection (shown when language is expanded) */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Select Language</h3>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-xs"
                  onClick={() => onLanguageChange(lang.code)}
                >
                  <span className="font-medium">{lang.nativeName}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">ScanYatra v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}