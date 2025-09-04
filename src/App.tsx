import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TripInfo } from "./components/TripInfo";
import { CoTraveler } from "./components/CoTraveler";
import { RecentTrip } from "./components/RecentTrip";
import { TripChainCard } from "./components/TripChainCard";
import { TripChain } from "./components/TripChain";
import { LocationActions } from "./components/LocationActions";
import { BottomNavigation } from "./components/BottomNavigation";
import { DocPage } from "./components/DocPage";
import { EcoPage } from "./components/EcoPage";
import { UtilPage } from "./components/UtilPage";
import { MePage } from "./components/MePage";
import { SideMenu } from "./components/SideMenu";
import { TripHistory } from "./components/TripHistory";
import { AboutUs } from "./components/AboutUs";
import { RateUs } from "./components/RateUs";
import { Notifications } from "./components/Notifications";
import { Safety } from "./components/Safety";
import { AuthPage } from "./components/AuthPage";
import { PersonalDetailsForm } from "./components/PersonalDetailsForm";
import { ConsentPermissions } from "./components/ConsentPermissions";
import { toast } from "sonner@2.0.3";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Authentication and onboarding state
  const [authStep, setAuthStep] = useState<'auth' | 'details' | 'permissions' | 'complete'>('auth');
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check if user is returning (simulate checking localStorage)
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('scanyatra-onboarded');
    if (hasCompletedOnboarding) {
      setIsFirstTime(false);
      setAuthStep('complete');
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setActiveModal(null);
  };

  const handleModalOpen = (modalType: string) => {
    setActiveModal(modalType);
  };

  const handleClearHistory = () => {
    // Clear history logic here
    toast.success("Trip history cleared successfully!");
    setIsMenuOpen(false);
  };

  const handleNotificationClick = () => {
    setActiveModal("notifications");
  };

  const handleSafetyClick = () => {
    setActiveModal("safety");
  };

  const handleTripChainClick = () => {
    setActiveModal("tripChain");
  };

  // Authentication flow handlers
  const handleAuthSuccess = () => {
    setAuthStep('details');
  };

  // Direct Google auth success - skip personal details
  const handleGoogleAuthSuccess = () => {
    setAuthStep('permissions');
    toast.success("Google account connected successfully!");
  };

  const handleDetailsComplete = () => {
    setAuthStep('permissions');
  };

  const handlePermissionsComplete = () => {
    setAuthStep('complete');
    setIsFirstTime(false);
    localStorage.setItem('scanyatra-onboarded', 'true');
    toast.success("Welcome to ScanYatra! Your account is ready.");
  };

  const renderContent = () => {
    if (activeModal === "tripHistory") {
      return <TripHistory onClose={handleMenuClose} />;
    }
    if (activeModal === "aboutUs") {
      return <AboutUs onClose={handleMenuClose} />;
    }
    if (activeModal === "rateUs") {
      return <RateUs onClose={handleMenuClose} />;
    }
    if (activeModal === "notifications") {
      return <Notifications onClose={handleMenuClose} />;
    }
    if (activeModal === "safety") {
      return <Safety onClose={handleMenuClose} />;
    }
    if (activeModal === "tripChain") {
      return <TripChain onClose={() => setActiveModal(null)} />;
    }

    switch (currentPage) {
      case "doc":
        return <DocPage />;
      case "util":
        return <UtilPage />;
      case "eco":
        return <EcoPage />;
      case "me":
        return <MePage />;
      default:
        return (
          <div className="flex-1 px-4 py-4 space-y-4">
            <TripInfo />
            <CoTraveler />
            <RecentTrip />
            <TripChainCard onOpenTripChain={handleTripChainClick} />
            <LocationActions />
          </div>
        );
    }
  };

  // Show authentication and onboarding flow for first-time users
  if (isFirstTime || authStep !== 'complete') {
    switch (authStep) {
      case 'auth':
        return <AuthPage onAuthSuccess={handleAuthSuccess} onGoogleAuthSuccess={handleGoogleAuthSuccess} />;
      case 'details':
        return <PersonalDetailsForm onComplete={handleDetailsComplete} />;
      case 'permissions':
        return <ConsentPermissions onComplete={handlePermissionsComplete} />;
      default:
        break;
    }
  }

  return (
    <div className="h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header 
          onMenuToggle={handleMenuToggle} 
          onNotificationClick={handleNotificationClick}
          onSafetyClick={handleSafetyClick}
        />
      </div>
      
      {/* Main Content with blur effect when menu is open - scrollable area */}
      <div className={`flex-1 flex flex-col pt-[120px] pb-[80px] ${isMenuOpen ? 'blur-sm' : ''} transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      {!activeModal && (
        <div className="fixed bottom-0 left-0 right-0 z-30">
          <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* Side Menu */}
      <SideMenu 
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        language={language}
        onLanguageChange={setLanguage}
        onModalOpen={handleModalOpen}
        onClearHistory={handleClearHistory}
      />
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleMenuClose}
        />
      )}
    </div>
  );
}