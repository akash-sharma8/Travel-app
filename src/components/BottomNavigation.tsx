import { Home, FileText, Leaf, User, Wrench } from "lucide-react";
import { Button } from "./ui/button";

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { icon: Home, label: "Home", page: "home" },
    { icon: FileText, label: "Doc", page: "doc" },
    { icon: Wrench, label: "Util", page: "util" },
    { icon: Leaf, label: "Eco", page: "eco" },
    { icon: User, label: "Me", page: "me" }
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => onPageChange(item.page)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                isActive 
                  ? 'text-sky-600 bg-sky-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-sky-600 rounded-full"></div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}