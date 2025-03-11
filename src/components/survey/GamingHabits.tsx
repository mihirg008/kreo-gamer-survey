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

export default function GamingHabits() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_habits || {}) as {
    hours_weekly?: string;
    play_time?: string[];
    multiplayer_preference?: string;
    skill_level?: string;
    years_gaming?: string;
  };

  const form = useForm<z.infer<typeof gamingHabitsSchema>>({
    resolver: zodResolver(gamingHabitsSchema),
    defaultValues: {
      hours_weekly: savedData.hours_weekly || '',
      play_time: savedData.play_time || [],
      multiplayer_preference: savedData.multiplayer_preference || '',
      skill_level: savedData.skill_level || '',
      years_gaming: savedData.years_gaming || '',
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
            />

            <FormField
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
            />

            <FormField
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
            />

            <FormField
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
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={goToPreviousSection}
                className="w-32"
              >
                Previous
              </Button>
              <Button 
                type="submit"
                className="w-32 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 