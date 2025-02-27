'use client';

import React from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { Button } from '@/components/ui/button';

export default function ResumePrompt() {
  const { responses, currentSection, resetSurvey } = useSurvey();
  const hasResponses = Object.keys(responses).length > 0;
  
  if (!hasResponses) return null;

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
          <Button size="sm">Continue</Button>
        </div>
      </div>
    </div>
  );
} 