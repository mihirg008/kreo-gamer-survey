import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp, 
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { SurveyData, SurveySection } from '@/types/survey';

// Generate a unique ID for the survey response
const generateResponseId = () => {
  return `response_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Get or create a response ID from localStorage
const getResponseId = () => {
  if (typeof window === 'undefined') return null;
  
  let responseId = localStorage.getItem('survey_response_id');
  if (!responseId) {
    responseId = generateResponseId();
    localStorage.setItem('survey_response_id', responseId);
  }
  return responseId;
};

// Save survey responses to Firestore
export const saveSurveyResponses = async (
  responses: Partial<SurveyData>,
  currentSection: SurveySection
) => {
  try {
    const responseId = getResponseId();
    if (!responseId) return;

    const responseRef = doc(collection(db, 'responses'), responseId);
    
    // Check if document exists
    const docSnap = await getDoc(responseRef);
    
    if (!docSnap.exists()) {
      // Create new document with user info
      await setDoc(responseRef, {
        user_info: {
          session_id: responseId,
          start_time: serverTimestamp(),
          last_updated: serverTimestamp(),
          completion_status: 'in_progress',
          completion_percentage: calculateCompletionPercentage(responses),
          current_section: currentSection
        },
        ...responses
      });
    } else {
      // Update existing document
      await updateDoc(responseRef, {
        ...responses,
        'user_info.last_updated': serverTimestamp(),
        'user_info.completion_percentage': calculateCompletionPercentage(responses),
        'user_info.current_section': currentSection
      });
    }
    
    return responseId;
  } catch (error) {
    console.error('Error saving survey responses:', error);
    return null;
  }
};

// Calculate completion percentage based on filled sections
const calculateCompletionPercentage = (responses: Partial<SurveyData>) => {
  const totalSections = 6; // Total number of survey sections
  const completedSections = Object.keys(responses).length;
  return Math.round((completedSections / totalSections) * 100);
};

// Mark survey as completed
export const markSurveyCompleted = async (responseId: string) => {
  try {
    const responseRef = doc(collection(db, 'responses'), responseId);
    await updateDoc(responseRef, {
      'user_info.completion_status': 'completed',
      'user_info.completion_percentage': 100,
      'user_info.completion_time': serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking survey as completed:', error);
  }
}; 