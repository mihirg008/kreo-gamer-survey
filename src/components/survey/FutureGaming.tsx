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

const aiInterestOptions = [
  { value: 'very_excited', label: 'Very excited about AI in games' },
  { value: 'somewhat_excited', label: 'Somewhat excited' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'concerned', label: 'Concerned about AI in games' },
  { value: 'very_concerned', label: 'Very concerned about AI in games' },
];

const blockchainOptions = [
  { value: 'very_interested', label: 'Very interested in blockchain/NFT games' },
  { value: 'somewhat_interested', label: 'Somewhat interested' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'not_interested', label: 'Not interested' },
  { value: 'opposed', label: 'Opposed to blockchain in gaming' },
];

const subscriptionOptions = [
  { value: 'prefer_subscription', label: 'Prefer subscription services (Game Pass, etc.)' },
  { value: 'prefer_ownership', label: 'Prefer to own individual games' },
  { value: 'mix', label: 'Prefer a mix of both' },
  { value: 'undecided', label: 'Undecided' },
];

const spendingOptions = [
  { value: 'increase', label: 'Likely to increase spending on gaming' },
  { value: 'same', label: 'Likely to maintain same spending level' },
  { value: 'decrease', label: 'Likely to decrease spending on gaming' },
  { value: 'unsure', label: 'Unsure about future spending' },
];

export default function FutureGaming() {
  const { updateResponses, goToPreviousSection, goToNextSection, responses } = useSurvey();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const savedData = (responses.future_gaming || {}) as {
    metaverse_interest?: string;
    vr_adoption?: string;
    cloud_gaming?: string;
    sustainability?: string;
    ai_in_games?: string;
    blockchain_gaming?: string;
    subscription_services?: string;
    future_spending?: string;
  };

  const form = useForm<z.infer<typeof futureGamingSchema>>({
    resolver: zodResolver(futureGamingSchema),
    defaultValues: {
      metaverse_interest: savedData.metaverse_interest || '',
      vr_adoption: savedData.vr_adoption || '',
      cloud_gaming: savedData.cloud_gaming || '',
      sustainability: savedData.sustainability || '',
      ai_in_games: savedData.ai_in_games || '',
      blockchain_gaming: savedData.blockchain_gaming || '',
      subscription_services: savedData.subscription_services || '',
      future_spending: savedData.future_spending || '',
    },
  });

  function onSubmit(values: z.infer<typeof futureGamingSchema>) {
    console.log('Submitting final form', values);
    updateResponses('future_gaming', values);
    goToNextSection();
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
              name="ai_in_games"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thoughts on AI in Games</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your thoughts on AI" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {aiInterestOptions.map((option) => (
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
              name="blockchain_gaming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest in Blockchain Gaming</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your interest in blockchain gaming" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {blockchainOptions.map((option) => (
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
              name="subscription_services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Services vs. Game Ownership</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subscriptionOptions.map((option) => (
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
              name="future_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Future Gaming Spending Plans</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your future spending plans" />
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