import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import scanYatraLogo from 'figma:asset/2513ef81051124f88459396929a29b801a9234ad.png';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onGoogleAuthSuccess?: () => void;
}

export function AuthPage({ onAuthSuccess, onGoogleAuthSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'auth' | 'otp'>('auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    otp: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignup = () => {
    // Mock Google signup - in real app would integrate with Google OAuth
    console.log("Google signup initiated");
    // For Google signup, we'll directly complete the authentication
    // skipping the personal details form since Google provides this info
    if (onGoogleAuthSuccess) {
      onGoogleAuthSuccess();
    } else {
      onAuthSuccess();
    }
  };

  const handleEmailAuth = () => {
    if (!formData.email || !formData.password || (!isLogin && !formData.mobile)) {
      return;
    }
    
    if (isLogin) {
      // Mock login success
      onAuthSuccess();
    } else {
      // Proceed to OTP verification for signup
      setStep('otp');
    }
  };

  const handleOTPVerification = () => {
    if (formData.otp.length === 6) {
      // Mock OTP verification success
      onAuthSuccess();
    }
  };

  const handleResendOTP = () => {
    console.log("OTP resent to", formData.mobile);
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg">
              <img 
                src={scanYatraLogo} 
                alt="ScanYatra Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardTitle className="text-sky-800 dark:text-sky-200">Verify Your Mobile</CardTitle>
            <CardDescription>
              We've sent a 6-digit OTP to {formData.mobile}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter OTP
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            
            <Button 
              onClick={handleOTPVerification}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white"
              disabled={formData.otp.length !== 6}
            >
              Verify OTP
            </Button>
            
            <div className="text-center">
              <button
                onClick={handleResendOTP}
                className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
              >
                Didn't receive OTP? Resend
              </button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setStep('auth')}
              className="w-full"
            >
              Back to Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg">
            <img 
              src={scanYatraLogo} 
              alt="ScanYatra Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-2xl text-sky-800 dark:text-sky-200">
            Welcome to ScanYatra
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Sign Up/In Button */}
          <Button
            onClick={handleGoogleSignup}
            variant="outline"
            className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 h-12"
          >
            <div className="w-5 h-5 mr-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="font-medium">
              {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
            </span>
          </Button>
          
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-sm text-gray-500">
              or
            </span>
          </div>
          
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Mobile Input (only for signup) */}
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}
          
          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <Button 
            onClick={handleEmailAuth}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
            disabled={!formData.email || !formData.password || (!isLogin && !formData.mobile)}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          
          {/* Toggle between login/signup */}
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
          
          {/* Terms and Privacy */}
          {!isLogin && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Privacy Policy</a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}