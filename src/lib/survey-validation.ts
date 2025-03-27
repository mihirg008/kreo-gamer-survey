import * as z from 'zod';

export const demographicsSchema = z.object({
  ign: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  age: z.string({ required_error: 'Please select your age' }),
  gender: z.string({ required_error: 'Please select your gender' }),
  location: z.string().min(2, { message: 'Location is required' }),
});

export const demographicsUnder18Schema = z.object({
  grade: z.string({ required_error: 'Please select your grade/class' }),
  //school_type: z.string({ required_error: 'Please select your school type' }),
  //extracurricular: z.string({ required_error: 'Please select an option' }),
  //pocket_money: z.string({ required_error: 'Please select an amount' }),
  //travel_to_school: z.string({ required_error: 'Please select an option' }),
  //favorite_subjects: z.array(z.string()).min(1, { message: 'Select at least one subject' }),
  //study_hours: z.string({ required_error: 'Please select your study hours' }),
  //parent_control: z.string({ required_error: 'Please select an option' }),
  igfr: z.string({ required_error: 'Please select an option' }),
});

export const demographics18to24Schema = z.object({
  //education_level: z.string({ required_error: 'Please select your education level' }),
  //field_of_study: z.string({ required_error: 'Please select your field of study' }),
  //current_status: z.string({ required_error: 'Please select your current status' }),
  //living_situation: z.string({ required_error: 'Please select your living situation' }),
  //monthly_income: z.string({ required_error: 'Please select your monthly income' }),
  //income_source: z.string({ required_error: 'Please select your income source' }),
  //relationship_status: z.string({ required_error: 'Please select your relationship status' }),
  //career_aspirations: z.string({ required_error: 'Please select your career aspirations' }),
  occupation: z.string({ required_error: 'Please select your occupation' }),
  igfr: z.string({ required_error: 'Please select an option' }),
});

export const demographics25PlusSchema = z.object({
  //education_level: z.string({ required_error: 'Please select your education level' }),
  //employment_status: z.string({ required_error: 'Please select your employment status' }),
  //industry_sector: z.string({ required_error: 'Please select your industry sector' }),
  //annual_income: z.string({ required_error: 'Please select your annual income' }),
  marital_status: z.string({ required_error: 'Please select your marital status' }),
  //number_of_children: z.string({ required_error: 'Please select the number of children' }),
  //housing_type: z.string({ required_error: 'Please select your housing type' }),
  //financial_responsibilities: z.array(z.string()).min(1, { message: 'Select at least one responsibility' }),
  occupation: z.string({ required_error: 'Please select your occupation' }),
  igfr: z.string({ required_error: 'Please select an option' }),
});

export const gamingPreferencesSchema = z.object({
  platforms: z.array(z.string()).min(1, { message: 'Select at least one platform' }),
  favorite_games: z.array(z.string()).min(1, { message: 'Select at least one game' }),
  preferred_genre: z.array(z.string()).min(1, { message: 'Select at least one genre' }),
  spending_monthly: z.string({ required_error: 'Please select your monthly spending' }),
  gaming_setup: z.string().min(10, { message: 'Please describe your gaming setup' }),
  device_ownership: z.array(z.string()).min(1, { message: 'Select at least one device' }),
  gaming_peripherals: z.array(z.string()).min(1, { message: 'Select at least one peripheral' }),
  internet_speed: z.string({ required_error: 'Please select your internet speed' }),
  favorite_developers: z.array(z.string()),
  payment_methods: z.array(z.string()).min(1, { message: 'Select at least one payment method' }),
});

export const gamingHabitsSchema = z.object({
  hours_weekly: z.string({ required_error: 'Please select your weekly gaming hours' }),
  play_time: z.array(z.string()).min(1, { message: 'Select at least one time slot' }),
  multiplayer_preference: z.string({ required_error: 'Please select your preference' }),
  skill_level: z.string({ required_error: 'Please select your skill level' }),
  years_gaming: z.string({ required_error: 'Please select your gaming experience' }),
  gaming_frequency: z.string({ required_error: 'Please select how often you play' }),
  gaming_sessions: z.string({ required_error: 'Please select your average session length' }),
  competitive_play: z.boolean(),
  rage_quit_frequency: z.string({ required_error: 'Please select how often you rage quit' }),
  gaming_breaks: z.string({ required_error: 'Please select your break frequency' }),
});

export const gamingLifestyleSchema = z.object({
  streams_content: z.boolean(),
  platform_handles: z.array(z.string()).optional(),
  merchandise_spending: z.string({ required_error: 'Please select your spending' }),
  gaming_events: z.array(z.string()),
  follows_esports: z.boolean(),
  favorite_esports: z.array(z.string()),
  gaming_influencers: z.array(z.string()),
  gaming_communities: z.array(z.string()),
  gaming_subscriptions: z.array(z.string()),
  gaming_news_sources: z.array(z.string()).min(1, { message: 'Select at least one news source' }),
});

export const gamingFamilyUnder18MaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  parent_gaming_rules: z.string({ required_error: 'Please select an option' }),
  parents_play_games: z.string({ required_error: 'Please select an option' }),
  gaming_with_siblings: z.string({ required_error: 'Please select frequency' }),
  homework_compromise: z.string({ required_error: 'Please select an option' }),
  friends_parents_rules: z.string({ required_error: 'Please select an option' }),
  gaming_arguments: z.string({ required_error: 'Please select an option' }),
});

export const gamingFamilyUnder18FemaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  parents_supportive: z.string({ required_error: 'Please rate your parents support' }),
  different_rules: z.string({ required_error: 'Please select an option' }),
  play_with_family: z.string({ required_error: 'Please select an option' }),
  hidden_gaming: z.string({ required_error: 'Please select an option' }),
  female_friends_play: z.string({ required_error: 'Please select an option' }),
  gender_comments: z.string({ required_error: 'Please select an option' }),
  family_encouragement: z.string({ required_error: 'Please select an option' }),
});

export const gamingFamily18to24MaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  social_relationships: z.string({ required_error: 'Please describe the impact' }),
  game_with_roommates: z.string({ required_error: 'Please select frequency' }),
  balance_gaming: z.string({ required_error: 'Please select an option' }),
  influence_friends: z.string({ required_error: 'Please select an option' }),
  college_events: z.string({ required_error: 'Please select frequency' }),
  replace_social: z.string({ required_error: 'Please select frequency' }),
  gaming_career: z.string({ required_error: 'Please select an option' }),
});

export const gamingFamily18to24FemaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  peers_reaction: z.string({ required_error: 'Please select a reaction' }),
  women_communities: z.string({ required_error: 'Please select an option' }),
  dating_supportive: z.string({ required_error: 'Please select an option' }),
  gender_interactions: z.string({ required_error: 'Please select frequency' }),
  hide_gender: z.string({ required_error: 'Please select frequency' }),
  academic_networking: z.string({ required_error: 'Please describe the impact' }),
  feel_represented: z.string({ required_error: 'Please select an option' }),
});

export const gamingFamily25PlusMaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  game_with_partner: z.string({ required_error: 'Please select frequency' }),
  time_management: z.string({ required_error: 'Please select how well you manage time' }),
  parenting_approach: z.string({ required_error: 'Please select your approach' }),
  pattern_changes: z.string({ required_error: 'Please select how patterns have changed' }),
  work_perception: z.string({ required_error: 'Please select how gaming is viewed' }),
  stress_relief: z.string({ required_error: 'Please select frequency' }),
  use_for_networking: z.string({ required_error: 'Please select an option' }),
  monthly_spending: z.string({ required_error: 'Please select spending amount' }),
});

export const gamingFamily25PlusFemaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  game_with_partner: z.string({ required_error: 'Please select frequency' }),
  female_experience: z.string({ required_error: 'Please select impact' }),
  family_balance: z.string({ required_error: 'Please select how well you balance' }),
  perspective_change: z.string().min(10, { message: 'Please describe how your perspective has changed' }),
  gender_interactions: z.string({ required_error: 'Please select frequency' }),
  representation: z.string({ required_error: 'Please select level of representation' }),
  gaming_networking: z.string({ required_error: 'Please select an option' }),
  community_support: z.string({ required_error: 'Please select level of support' }),
  stereotype_navigation: z.string({ required_error: 'Please select your approach' }),
});

export const gamingFamilySchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string().optional(),
  gender_bias: z.string().optional(),
});

export const futureGamingSchema = z.object({
  metaverse_interest: z.string({ required_error: 'Please rate your interest' }),
  vr_adoption: z.string({ required_error: 'Please select your VR plans' }),
  cloud_gaming: z.string({ required_error: 'Please select your preference' }),
  sustainability: z.string({ required_error: 'Please rate importance' }),
  ai_in_games: z.string({ required_error: 'Please rate your interest in AI' }),
  blockchain_gaming: z.string({ required_error: 'Please rate your interest in blockchain gaming' }),
  subscription_services: z.string({ required_error: 'Please select your preference' }),
  future_spending: z.string({ required_error: 'Please select your future spending plans' }),
}); 
