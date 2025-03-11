'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingFamily25PlusFemaleSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const perceptionOptions = [
  { value: 'waste_of_time', label: 'A waste of time' },
  { value: 'fun_hobby', label: 'A fun hobby' },
  { value: 'potential_career', label: 'A potential career' },
  { value: 'dont_care', label: 'They don\'t care' },
];

const characterOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_human', label: 'Non-human' },
  { value: 'custom', label: 'Custom avatar' },
];

const reasonOptions = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'socializing', label: 'Socializing' },
  { value: 'competitive', label: 'Competitive gaming' },
  { value: 'stress_relief', label: 'Stress relief' },
];

const frequencyOptions = [
  { value: 'always', label: 'Always' },
  { value: 'often', label: 'Often' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'Never' },
];

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'Sometimes' },
];

const impactOptions = [
  { value: 'very_positive', label: 'Very positively' },
  { value: 'somewhat_positive', label: 'Somewhat positively' },
  { value: 'neutral', label: 'Neutral - no effect' },
  { value: 'somewhat_negative', label: 'Somewhat negatively' },
  { value: 'very_negative', label: 'Very negatively' },
  { value: 'mixed', label: 'Mixed - both positive and negative' },
];

const balanceOptions = [
  { value: 'very_well', label: 'Very well - I have a good balance' },
  { value: 'somewhat_well', label: 'Somewhat well - Occasional conflicts' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'somewhat_difficult', label: 'Somewhat difficult - Regular conflicts' },
  { value: 'very_difficult', label: 'Very difficult - Significant conflicts' },
];

const representationOptions = [
  { value: 'well_represented', label: 'Well represented' },
  { value: 'somewhat_represented', label: 'Somewhat represented' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'somewhat_underrepresented', label: 'Somewhat underrepresented' },
  { value: 'very_underrepresented', label: 'Very underrepresented' },
];

const communityOptions = [
  { value: 'very_supportive', label: 'Very supportive' },
  { value: 'somewhat_supportive', label: 'Somewhat supportive' },
  { value: 'neutral', label: 'Neutral/mixed' },
  { value: 'somewhat_unsupportive', label: 'Somewhat unsupportive' },
  { value: 'very_unsupportive', label: 'Very unsupportive' },
  { value: 'avoid', label: 'I avoid gaming communities' },
];

const stereotypeNavigationOptions = [
  { value: 'challenge', label: 'I actively challenge stereotypes' },
  { value: 'ignore', label: 'I ignore stereotypes' },
  { value: 'hide_gender', label: 'I hide my gender while gaming' },
  { value: 'women_only', label: 'I mostly play in women-friendly spaces' },
  { value: 'adapt', label: 'I adapt my behavior to fit in' },
  { value: 'other', label: 'Other approach' },
];

export default function GamingFamily25PlusFemale() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_family_25plus_female || {}) as {
    family_perception?: string;
    family_gamers?: boolean;
    gaming_impact?: string;
    character_preference?: string;
    gender_bias?: string;
    primary_reason?: string;
    game_with_partner?: string;
    female_experience?: string;
    family_balance?: string;
    perspective_change?: string;
    gender_interactions?: string;
    representation?: string;
    gaming_networking?: string;
    community_support?: string;
    stereotype_navigation?: string;
  };

  const form = useForm<z.infer<typeof gamingFamily25PlusFemaleSchema>>({
    resolver: zodResolver(gamingFamily25PlusFemaleSchema),
    defaultValues: {
      family_perception: savedData.family_perception || '',
      family_gamers: savedData.family_gamers || false,
      gaming_impact: savedData.gaming_impact || '',
      character_preference: savedData.character_preference || '',
      gender_bias: savedData.gender_bias || '',
      primary_reason: savedData.primary_reason || '',
      game_with_partner: savedData.game_with_partner || '',
      female_experience: savedData.female_experience || '',
      family_balance: savedData.family_balance || '',
      perspective_change: savedData.perspective_change || '',
      gender_interactions: savedData.gender_interactions || '',
      representation: savedData.representation || '',
      gaming_networking: savedData.gaming_networking || '',
      community_support: savedData.community_support || '',
      stereotype_navigation: savedData.stereotype_navigation || '',
    },
  });

  function onSubmit(values: z.infer<typeof gamingFamily25PlusFemaleSchema>) {
    updateResponses('gaming_family_25plus_female', values);
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
            Gaming & Life Balance
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming life as an adult woman
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="family_perception"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How does your partner/family view your gaming?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select perception" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {perceptionOptions.map((option) => (
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
              name="game_with_partner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you game with your partner/spouse?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
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
            />

            <FormField
              control={form.control}
              name="female_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How does being female affect your gaming experience?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select impact" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {impactOptions.map((option) => (
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
              name="family_balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How well do you balance gaming with family responsibilities?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {balanceOptions.map((option) => (
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
              name="perspective_change"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How has your perspective on gaming changed as you've grown older?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how your gaming interests, habits, or community engagement have evolved..."
                      className="bg-background/50 min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender_interactions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you experienced gender-based interactions in multiplayer games?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select frequency" />
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
            />

            <FormField
              control={form.control}
              name="representation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you feel represented in the games you play?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select level of representation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {representationOptions.map((option) => (
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
              name="gaming_networking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you use gaming for professional or personal networking?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your answer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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
              name="community_support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How supportive have gaming communities been for you?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select level of support" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {communityOptions.map((option) => (
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
              name="stereotype_navigation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How do you navigate gaming stereotypes?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your approach" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stereotypeNavigationOptions.map((option) => (
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
              name="primary_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary reason to play games?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your primary reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reasonOptions.map((option) => (
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
              name="gender_bias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you experience gender bias in gaming communities?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="gender_bias_yes" />
                        <FormLabel htmlFor="gender_bias_yes" className="font-normal">
                          Yes
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="gender_bias_no" />
                        <FormLabel htmlFor="gender_bias_no" className="font-normal">
                          No
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="character_preference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In-game character preference?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your character preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {characterOptions.map((option) => (
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
              name="family_gamers"
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
                      Do you involve your children/family in gaming?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gaming_impact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How has gaming influenced your adult life and relationships?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how gaming impacts your professional life, family dynamics, or personal identity..."
                      className="bg-background/50 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
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