'use client';

import React from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { Progress } from '@/components/ui/progress';


const sections = [
  { id: 'demographics', label: 'Demographics' },
  { id: 'gaming_preferences', label: 'Gaming Preferences' },
  { id: 'gaming_habits', label: 'Gaming Habits' },
  { id: 'gaming_lifestyle', label: 'Gaming Lifestyle' },
  { id: 'gaming_family', label: 'Gaming & Family' },
  { id: 'future_gaming', label: 'Future of Gaming' },
];

export default function ProgressIndicator() {
  const { currentSection } = useSurvey();
  const currentIndex = sections.findIndex(s => s.id === currentSection);
  const progress = ((currentIndex + 1) / sections.length) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {sections.length}
          </span>
          <span className="text-sm font-medium">{sections[currentIndex]?.label}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
} 