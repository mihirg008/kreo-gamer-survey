'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SurveySection, SurveyData } from '@/types/survey';

interface SurveyContextType {
  currentSection: SurveySection;
  responses: Partial<SurveyData>;
  setCurrentSection: (section: SurveySection) => void;
  updateResponses: (sectionId: SurveySection, data: Record<string, unknown>) => void;
  isLastSection: boolean;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  resetSurvey: () => void;
}

const SECTION_ORDER: SurveySection[] = [
  'demographics',
  'gaming_preferences',
  'gaming_habits',
  'gaming_lifestyle',
  'gaming_family',
  'future_gaming',
];

const LOCAL_STORAGE_KEYS = {
  RESPONSES: 'kreo_survey_responses',
  CURRENT_SECTION: 'kreo_survey_current_section',
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Partial<SurveyData>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Load saved responses
        const savedResponses = localStorage.getItem(LOCAL_STORAGE_KEYS.RESPONSES);
        if (savedResponses) {
          setResponses(JSON.parse(savedResponses));
        }

        // Load saved section
        const savedSection = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_SECTION);
        if (savedSection) {
          const sectionIndex = SECTION_ORDER.indexOf(savedSection as SurveySection);
          if (sectionIndex !== -1) {
            setCurrentSectionIndex(sectionIndex);
          }
        }
      } catch (error) {
        console.error('Error loading saved survey data:', error);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
    }
  }, [responses, isInitialized]);

  // Save current section to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_SECTION, 
        SECTION_ORDER[currentSectionIndex]
      );
    }
  }, [currentSectionIndex, isInitialized]);

  const currentSection = SECTION_ORDER[currentSectionIndex];
  const isLastSection = currentSectionIndex === SECTION_ORDER.length - 1;

  const goToNextSection = () => {
    console.log('Current section index:', currentSectionIndex);
    console.log('Available sections:', SECTION_ORDER);
    console.log('Is last section?', isLastSection);
    
    if (currentSectionIndex < SECTION_ORDER.length - 1) {
      console.log('Moving to section:', SECTION_ORDER[currentSectionIndex + 1]);
      setCurrentSectionIndex(prev => {
        console.log('Updating index from', prev, 'to', prev + 1);
        return prev + 1;
      });
    }
  };

  const goToPreviousSection = () => {
    console.log('Going to previous section', currentSectionIndex);
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const setCurrentSection = (section: SurveySection) => {
    const index = SECTION_ORDER.indexOf(section);
    if (index !== -1) {
      setCurrentSectionIndex(index);
    }
  };

  const updateResponses = (sectionId: SurveySection, data: Record<string, unknown>) => {
    console.log('Updating responses for', sectionId, data);
    setResponses(prev => ({
      ...prev,
      [sectionId]: data,
    }));
  };
  
  const resetSurvey = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.RESPONSES);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_SECTION);
    }
    setResponses({});
    setCurrentSectionIndex(0);
  };

  return (
    <SurveyContext.Provider
      value={{
        currentSection,
        responses,
        setCurrentSection,
        updateResponses,
        isLastSection,
        goToNextSection,
        goToPreviousSection,
        resetSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}