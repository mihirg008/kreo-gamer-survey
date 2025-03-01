'use client';

import React, { useEffect, useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { Button } from '@/components/ui/button';

export default function ResumePrompt() {
  const { responses, currentSection, resetSurvey } = useSurvey();
  const [showPrompt, setShowPrompt] = useState(false);
  const hasResponses = Object.keys(responses).length > 0;

  useEffect(() => {
    // Check if user is returning to the page
    const isReturningUser = localStorage.getItem('survey_left_page') === 'true';
    
    if (isReturningUser && hasResponses) {
      setShowPrompt(true);
      // Reset the flag
      localStorage.removeItem('survey_left_page');
    }
  }, [hasResponses]);

  // Add page leave detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasResponses) {
        localStorage.setItem('survey_left_page', 'true');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasResponses]);

  if (!showPrompt) return null;

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-amber-100 border-b border-amber-300 p-3 pt-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
        <div className="w-full sm:w-auto">
          <h3 className="font-medium text-lg">Welcome back!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We&apos;ve restored your previous progress. You left off at the{' '}
            <span className="font-medium">
              {currentSection.replace('_', ' ')}
            </span>{' '}
            section.
          </p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetSurvey}
            className="flex-1 sm:flex-none"
          >
            Start Over
          </Button>
          <Button 
            size="sm"
            onClick={() => setShowPrompt(false)}
            className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
} 