'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingLifestyleSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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

const spendingOptions = [
  { value: 'none', label: 'No spending' },
  { value: 'under_500', label: 'Under ₹500' },
  { value: '500_2000', label: '₹500 - ₹2,000' },
  { value: 'above_2000', label: 'Above ₹2,000' },
];

const eventTypes = [
  { id: 'tournaments', label: 'Gaming Tournaments' },
  { id: 'conventions', label: 'Gaming Conventions' },
  { id: 'meetups', label: 'Community Meetups' },
  { id: 'esports', label: 'Esports Events' },
];

export default function GamingLifestyle() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_lifestyle || {}) as {
    streams_content?: boolean;
    platform_handles?: string[];
    merchandise_spending?: string;
    gaming_events?: string[];
  };

  const form = useForm<z.infer<typeof gamingLifestyleSchema>>({
    resolver: zodResolver(gamingLifestyleSchema),
    defaultValues: {
      streams_content: savedData.streams_content || false,
      platform_handles: savedData.platform_handles || [],
      merchandise_spending: savedData.merchandise_spending || '',
      gaming_events: savedData.gaming_events || [],
    },
  });

  function onSubmit(values: z.infer<typeof gamingLifestyleSchema>) {
    updateResponses('gaming_lifestyle', values);
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
            Gaming Lifestyle
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming content creation and community involvement
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="streams_content"
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
                      Do you create gaming content or stream?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch('streams_content') && (
              <FormField
                control={form.control}
                name="platform_handles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Handles</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your YouTube, Twitch, or other handles"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                        className="bg-background/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="merchandise_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Merchandise Spending</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select spending range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {spendingOptions.map((option) => (
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
              name="gaming_events"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Events Participation</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {eventTypes.map((event) => (
                      <FormField
                        key={event.id}
                        control={form.control}
                        name="gaming_events"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(event.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, event.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== event.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {event.label}
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