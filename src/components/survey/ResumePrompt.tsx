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
    <div className="fixed top-14 left-0 right-0 z-40 bg-amber-100 border-b border-amber-300 p-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h3 className="font-medium">Welcome back!</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ve restored your previous progress. You left off at the {currentSection.replace('_', ' ')} section.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetSurvey}
          >
            Start Over
          </Button>
          <Button 
            size="sm"
            onClick={() => setShowPrompt(false)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
} 