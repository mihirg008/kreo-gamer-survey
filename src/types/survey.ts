export type SurveySection = 
  | 'demographics'
  | 'demographics_under18'
  | 'demographics_18to24'
  | 'demographics_25plus'
  | 'gaming_preferences'
  | 'gaming_habits'
  | 'gaming_lifestyle'
  | 'gaming_family_under18_male'
  | 'gaming_family_under18_female'
  | 'gaming_family_18to24_male'
  | 'gaming_family_18to24_female'
  | 'gaming_family_25plus_male'
  | 'gaming_family_25plus_female'
  | 'future_gaming';

export interface DemographicsBase {
  ign: string;
  email: string;
  age: string;
  gender: string;
  location: string;
}

export interface DemographicsUnder18 {
  grade: string;
  parent_control: string;
}

export interface Demographics18to24 {
  occupation: string;
}

export interface Demographics25Plus {
  occupation: string;
  marital_status: string;
}

export interface SurveyData {
  demographics: DemographicsBase;
  demographics_under18?: DemographicsUnder18;
  demographics_18to24?: Demographics18to24;
  demographics_25plus?: Demographics25Plus;
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
    character_preference?: string;
    gender_bias?: string;
  };
  future_gaming: {
    metaverse_interest: string;
    vr_adoption: string;
    cloud_gaming: string;
    sustainability: string;
  };
} 