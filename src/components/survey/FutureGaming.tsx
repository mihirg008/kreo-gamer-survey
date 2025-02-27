'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { futureGamingSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import ThankYou from './ThankYou';

const interestOptions = [
  { value: 'very_interested', label: 'Very Interested' },
  { value: 'somewhat_interested', label: 'Somewhat Interested' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'not_interested', label: 'Not Interested' },
];

const vrAdoptionOptions = [
  { value: 'already_use', label: 'Already using VR' },
  { value: 'planning_soon', label: 'Planning to buy soon' },
  { value: 'interested', label: 'Interested but no plans' },
  { value: 'not_interested', label: 'Not interested' },
];

const cloudGamingOptions = [
  { value: 'prefer_cloud', label: 'Prefer cloud gaming' },
  { value: 'mix', label: 'Mix of cloud and traditional' },
  { value: 'prefer_traditional', label: 'Prefer traditional gaming' },
  { value: 'undecided', label: 'Undecided' },
];

const sustainabilityOptions = [
  { value: 'very_important', label: 'Very Important' },
  { value: 'somewhat_important', label: 'Somewhat Important' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'not_important', label: 'Not Important' },
];

export default function FutureGaming() {
  const { updateResponses, goToPreviousSection } = useSurvey();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof futureGamingSchema>>({
    resolver: zodResolver(futureGamingSchema),
    defaultValues: {
      metaverse_interest: '',
      vr_adoption: '',
      cloud_gaming: '',
      sustainability: '',
    },
  });

  function onSubmit(values: z.infer<typeof futureGamingSchema>) {
    console.log('Submitting final form', values);
    updateResponses('future_gaming', values);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return <ThankYou />;
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
            The Future of Gaming
          </h2>
          <p className="text-muted-foreground mt-2">
            Share your thoughts on upcoming gaming trends
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="metaverse_interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest in Metaverse Gaming</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your interest level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {interestOptions.map((option) => (
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
              name="vr_adoption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VR Gaming Plans</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your VR plans" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vrAdoptionOptions.map((option) => (
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
              name="cloud_gaming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cloud Gaming Preference</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cloudGamingOptions.map((option) => (
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
              name="sustainability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importance of Gaming Sustainability</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select importance level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sustainabilityOptions.map((option) => (
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
                onClick={() => {
                  console.log('Form submitted');
                  form.handleSubmit(onSubmit)();
                }}
                className="w-32 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}