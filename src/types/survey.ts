export type SurveySection = 
  | 'demographics'
  | 'gaming_preferences'
  | 'gaming_habits'
  | 'gaming_lifestyle'
  | 'gaming_family'
  | 'future_gaming';

export interface SurveyData {
  demographics: {
    ign: string;
    email: string;
    age: string;
    gender: string;
    location: string;
  };
  gaming_preferences: {
    platforms: string[];
    favorite_games: string[];
    preferred_genre: string[];
    spending_monthly: string;
    gaming_setup: string;
  };
  gaming_habits: {
    hours_weekly: string;
    play_time: string[];
    multiplayer_preference: string;
    skill_level: string;
    years_gaming: string;
  };
  gaming_lifestyle: {
    streams_content: boolean;
    platform_handles?: string[];
    merchandise_spending: string;
    gaming_events: string[];
  };
  gaming_family: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
  };
  future_gaming: {
    metaverse_interest: string;
    vr_adoption: string;
    cloud_gaming: string;
    sustainability: string;
  };
} 