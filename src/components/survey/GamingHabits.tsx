'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingHabitsSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const gameStart = [
  { id: 'less_than_1', label: 'Less than a year ago' },
  { id: '1-3', label: '1-3 years ago' },
  { id: '3-5', label: '3-5 years ago' },
  { id: '5_plus', label: 'More than 5 years ago' },
];

const gType = [
  { id: 'single', label: 'Single Player - I Play solo' },
  { id: 'co-op', label: 'Co-op modes ++' },
  { id: 'Multiplayer', label: 'Multiplayer' },
  { id: 'Any', label: 'Any - I just like to play!' },
];

const buyingPref = [
  { id: 'buy_offline', label: 'Buy physical copy' },
  { id: 'buy_offline', label: 'Buy online' },
  { id: 'crack', label: 'Use cracked version' },
];

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'few_times_week', label: 'Few times a week' },
  { value: 'occasionally', label: 'Occasionally' },
];

const modPref = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const hoursOptions = [
  { value: 'under_7', label: 'Under 7 hours' },
  { value: '7_14', label: '7-14 hours' },
  { value: '15_28', label: '15-28 hours' },
  { value: 'above_28', label: 'Above 28 hours' },
];

const timeSlots = [
  { id: 'morning', label: 'Morning (6 AM - 12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
  { id: 'evening', label: 'Evening (5 PM - 10 PM)' },
  { id: 'night', label: 'Night (10 PM - 6 AM)' },
];

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'professional', label: 'Professional' },
];

const yearsGaming = [
  { value: 'less_than_1', label: 'Less than 1 year' },
  { value: '1_3', label: '1-3 years' },
  { value: '4_7', label: '4-7 years' },
  { value: 'more_than_7', label: 'More than 7 years' },
];



const sessionLengthOptions = [
  { value: 'under_1_hour', label: 'Under 1 hour' },
  { value: '1_2_hours', label: '1-2 hours' },
  { value: '2_4_hours', label: '2-4 hours' },
  { value: '4_6_hours', label: '4-6 hours' },
  { value: 'above_6_hours', label: 'Above 6 hours' },
];

const rageQuitOptions = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'often', label: 'Often' },
  { value: 'very_often', label: 'Very often' },
];

const gamingBreakOptions = [
  { value: 'hourly', label: 'Every hour' },
  { value: 'every_few_hours', label: 'Every few hours' },
  { value: 'when_tired', label: 'Only when tired' },
  { value: 'rarely', label: 'Rarely take breaks' },
  { value: 'no_breaks', label: 'No breaks during gaming' },
];

export default function GamingHabits() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_habits || {}) as {
    hours_weekly?: string;
    play_time?: string[];
    multiplayer_preference?: string;
    skill_level?: string;
    years_gaming?: string;
    gaming_frequency?: string;
    gaming_sessions?: string;
    competitive_play?: boolean;
    rage_quit_frequency?: string;
    gaming_breaks?: string;
  };

  const form = useForm<z.infer<typeof gamingHabitsSchema>>({
    resolver: zodResolver(gamingHabitsSchema),
    defaultValues: {
      hours_weekly: savedData.hours_weekly || '',
      play_time: savedData.play_time || [],
      multiplayer_preference: savedData.multiplayer_preference || '',
      skill_level: savedData.skill_level || '',
      years_gaming: savedData.years_gaming || '',
      gaming_frequency: savedData.gaming_frequency || '',
      gaming_sessions: savedData.gaming_sessions || '',
      competitive_play: savedData.competitive_play || false,
      rage_quit_frequency: savedData.rage_quit_frequency || '',
      gaming_breaks: savedData.gaming_breaks || '',
    },
  });

  function onSubmit(values: z.infer<typeof gamingHabitsSchema>) {
    updateResponses('gaming_habits', values);
    goToNextSection();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl glassmorphism space-y-8 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Gaming Habits
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming routine and experience
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="gaming_start"
              render={() => (
                <FormItem>
                  <FormLabel>When did you first start gaming?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {gameStart.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="gaming_start"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gaming_frequency"
              render={() => (
                <FormItem>
                  <FormLabel>How often do you play games?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {frequencyOptions.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="gaming_frequency"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="game_type"
              render={() => (
                <FormItem>
                  <FormLabel>Do you prefer single-player or multiplayer games?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {gType.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="game_type"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="game_buy"
              render={() => (
                <FormItem>
                  <FormLabel>Do you prefer buying a game (disk, online) or using a cracked version?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {buyingPref.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="game_buy"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="mod_controller"
              render={() => (
                <FormItem>
                  <FormLabel>Do you use modified/experimental gaming controllers?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {modPref.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="mod_controller"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            
            
{/*             <FormField
              control={form.control}
              name="gaming_frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How often do you play games?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your gaming frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="hours_weekly"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Gaming Hours</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select weekly hours" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hoursOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="gaming_sessions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Gaming Session Length</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your average session length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sessionLengthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="play_time"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Gaming Time</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {timeSlots.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="play_time"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="competitive_play"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Do you play games competitively (tournaments, ranked modes, etc.)?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
 */}
{/*             <FormField
              control={form.control}
              name="skill_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaming Skill Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your skill level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="rage_quit_frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How often do you rage quit games?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your rage quit frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rageQuitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
 */}
{/*             <FormField
              control={form.control}
              name="gaming_breaks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How often do you take breaks while gaming?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your break frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gamingBreakOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="years_gaming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaming Experience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select years of gaming" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearsGaming.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={goToPreviousSection}
                className="w-32"
              >
                Previous Level
              </Button>
              <Button 
                type="submit"
                className="w-32 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Level Up!
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 
