import { 
  ArrowLeft, 
  Star, 
  Heart,
  Send,
  ThumbsUp
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface RateUsProps {
  onClose: () => void;
}

export function RateUs({ onClose }: RateUsProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingLabels = [
    "",
    "Poor",
    "Fair", 
    "Good",
    "Very Good",
    "Excellent"
  ];

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
      // Here you would typically send the rating to your backend
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  if (submitted) {
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
              <h2 className="text-gray-800 dark:text-gray-200 font-medium">Thank You!</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your rating has been submitted</p>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
            <ThumbsUp className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            Your {rating}-star rating helps us improve ScanYatra for everyone. We appreciate your feedback!
          </p>
          <div className="flex space-x-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`h-8 w-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white">
            Continue Using ScanYatra
          </Button>
        </div>
      </div>
    );
  }

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
            <h2 className="text-gray-800 dark:text-gray-200 font-medium">Rate ScanYatra</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Share your experience with us</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* App Info */}
        <Card className="p-6 text-center border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-sky-50 to-green-50 dark:from-sky-900 dark:to-green-900">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">SY</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">How was your experience?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your feedback helps us make ScanYatra better for everyone
          </p>
        </Card>

        {/* Rating Section */}
        <Card className="p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Rate your experience</h4>
            
            {/* Star Rating */}
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoveredRating || rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Rating Label */}
            {(hoveredRating || rating) > 0 && (
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                {ratingLabels[hoveredRating || rating]}
              </p>
            )}

            {/* Rating Description */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {rating === 0 && "Tap a star to rate"}
              {rating === 1 && "We're sorry to hear that. Please tell us how we can improve."}
              {rating === 2 && "Thanks for the feedback. We'll work on making it better."}
              {rating === 3 && "Good to know! We appreciate your honest feedback."}
              {rating === 4 && "Great! We're glad you enjoyed using ScanYatra."}
              {rating === 5 && "Awesome! Thank you for the excellent rating!"}
            </div>
          </div>
        </Card>

        {/* Feedback Section */}
        {rating > 0 && (
          <Card className="p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Additional Feedback
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(Optional)</span>
            </h4>
            <Textarea
              placeholder="Tell us more about your experience. What did you like? What could we improve?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-24 resize-none border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
              {feedback.length}/500 characters
            </p>
          </Card>
        )}

        {/* Quick Feedback Options */}
        {rating > 0 && (
          <Card className="p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Quick feedback options:</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Easy to use",
                "Helpful features", 
                "Great design",
                "Fast & reliable",
                "Good weather info",
                "Useful for travel"
              ].map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start h-8 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  onClick={() => setFeedback(prev => prev ? `${prev}, ${option}` : option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Submit Button */}
        {rating > 0 && (
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Rating
            </Button>
          </div>
        )}

        {/* Love Section */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
            <span className="text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="text-sm">for travellers</span>
          </div>
        </div>
      </div>
    </div>
  );
}