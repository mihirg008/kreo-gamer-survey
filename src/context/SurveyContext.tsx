'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { SurveySection, SurveyData } from '@/types/survey';
import { saveSurveyResponses, markSurveyCompleted } from '@/lib/survey-service';

interface SurveyContextType {
  currentSection: SurveySection;
  responses: Partial<SurveyData>;
  setCurrentSection: (section: SurveySection) => void;
  updateResponses: (sectionId: SurveySection, data: Record<string, unknown>) => void;
  isLastSection: boolean;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  resetSurvey: () => void;
  isSaving: boolean;
  lastSaved: Date | null;
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
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Ref for tracking user inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to save data to Firebase - MOVED UP HERE
  const saveToFirebase = useCallback(async () => {
    if (Object.keys(responses).length === 0) return;
    
    setIsSaving(true);
    try {
      await saveSurveyResponses(responses, SECTION_ORDER[currentSectionIndex]);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    } finally {
      setIsSaving(false);
    }
  }, [responses, currentSectionIndex]);
  
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
      
      // Start inactivity timer for auto-save
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      inactivityTimerRef.current = setTimeout(() => {
        saveToFirebase();
      }, 10000); // 10 seconds of inactivity
    }
    
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [responses, isInitialized, saveToFirebase]);

  // Save current section to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_SECTION, 
        SECTION_ORDER[currentSectionIndex]
      );
      
      // Save to Firebase when section changes
      saveToFirebase();
    }
  }, [currentSectionIndex, isInitialized, saveToFirebase]);
  
  const currentSection = SECTION_ORDER[currentSectionIndex];
  const isLastSection = currentSectionIndex === SECTION_ORDER.length - 1;

  const goToNextSection = () => {
    console.log('Going to next section', currentSectionIndex, SECTION_ORDER.length);
    if (currentSectionIndex < SECTION_ORDER.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else if (currentSectionIndex === SECTION_ORDER.length - 1) {
      // If this is the last section, mark as completed
      const responseId = localStorage.getItem('survey_response_id');
      if (responseId) {
        markSurveyCompleted(responseId);
      }
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
      localStorage.removeItem('survey_response_id');
    }
    setResponses({});
    setCurrentSectionIndex(0);
    setLastSaved(null);
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
        isSaving,
        lastSaved,
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