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
  parent_control: z.string({ required_error: 'Please select an option' }),
});

export const demographics18to24Schema = z.object({
  occupation: z.string({ required_error: 'Please select your occupation' }),
});

export const demographics25PlusSchema = z.object({
  occupation: z.string({ required_error: 'Please select your occupation' }),
  marital_status: z.string({ required_error: 'Please select your marital status' }),
});

export const gamingPreferencesSchema = z.object({
  platforms: z.array(z.string()).min(1, { message: 'Select at least one platform' }),
  favorite_games: z.array(z.string()).min(1, { message: 'Select at least one game' }),
  preferred_genre: z.array(z.string()).min(1, { message: 'Select at least one genre' }),
  spending_monthly: z.string({ required_error: 'Please select your monthly spending' }),
  gaming_setup: z.string().min(10, { message: 'Please describe your gaming setup' }),
});

export const gamingHabitsSchema = z.object({
  hours_weekly: z.string({ required_error: 'Please select your weekly gaming hours' }),
  play_time: z.array(z.string()).min(1, { message: 'Select at least one time slot' }),
  multiplayer_preference: z.string({ required_error: 'Please select your preference' }),
  skill_level: z.string({ required_error: 'Please select your skill level' }),
  years_gaming: z.string({ required_error: 'Please select your gaming experience' }),
});

export const gamingLifestyleSchema = z.object({
  streams_content: z.boolean(),
  platform_handles: z.array(z.string()).optional(),
  merchandise_spending: z.string({ required_error: 'Please select your spending' }),
  gaming_events: z.array(z.string()),
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
}); 