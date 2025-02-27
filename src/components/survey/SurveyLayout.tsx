'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurvey } from '@/context/SurveyContext';
import ProgressIndicator from './ProgressIndicator';
import BasicDemographics from './BasicDemographics';
import GamingPreferences from './GamingPreferences';
import GamingHabits from './GamingHabits';
import GamingLifestyle from './GamingLifestyle';
import GamingFamily from './GamingFamily';
import FutureGaming from './FutureGaming';
import ThankYou from './ThankYou';
import ResumePrompt from './ResumePrompt';

export default function SurveyLayout() {
  const { currentSection } = useSurvey();

  const renderSection = () => {
    switch (currentSection) {
      case 'demographics':
        return <BasicDemographics />;
      case 'gaming_preferences':
        return <GamingPreferences />;
      case 'gaming_habits':
        return <GamingHabits />;
      case 'gaming_lifestyle':
        return <GamingLifestyle />;
      case 'gaming_family':
        return <GamingFamily />;
      case 'future_gaming':
        return <FutureGaming />;
      default:
        return <ThankYou />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator />
      <ResumePrompt />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 