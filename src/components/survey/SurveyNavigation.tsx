'use client';

import { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';

interface SurveyNavigationProps {
  onValidate?: () => boolean;
}

export default function SurveyNavigation({ onValidate }: SurveyNavigationProps) {
  const { currentSection, setCurrentSection } = useSurvey();
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (onValidate) {
      setIsLoading(true);
      const isValid = onValidate();
      if (!isValid) {
        setIsLoading(false);
        return;
      }
    }
    setCurrentSection(currentSection + 1);
    setIsLoading(false);
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentSection === 1 || isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-75"
      >
        {isLoading ? 'Saving...' : 'Next'}
      </button>
    </div>
  );
} 