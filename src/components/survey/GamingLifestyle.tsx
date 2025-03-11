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

const esportsOptions = [
  { id: 'league_of_legends', label: 'League of Legends' },
  { id: 'dota2', label: 'Dota 2' },
  { id: 'csgo', label: 'CS:GO' },
  { id: 'valorant', label: 'Valorant' },
  { id: 'overwatch', label: 'Overwatch' },
  { id: 'pubg', label: 'PUBG' },
  { id: 'fortnite', label: 'Fortnite' },
  { id: 'rocket_league', label: 'Rocket League' },
];

const influencerOptions = [
  { id: 'ninja', label: 'Ninja' },
  { id: 'shroud', label: 'Shroud' },
  { id: 'pokimane', label: 'Pokimane' },
  { id: 'pewdiepie', label: 'PewDiePie' },
  { id: 'drlupo', label: 'DrLupo' },
  { id: 'tfue', label: 'Tfue' },
  { id: 'indian_streamers', label: 'Indian Streamers' },
  { id: 'none', label: 'Don\'t follow influencers' },
];

const communityOptions = [
  { id: 'discord', label: 'Discord Servers' },
  { id: 'reddit', label: 'Reddit Communities' },
  { id: 'facebook', label: 'Facebook Groups' },
  { id: 'twitter', label: 'Twitter Communities' },
  { id: 'official_forums', label: 'Official Game Forums' },
  { id: 'whatsapp', label: 'WhatsApp Groups' },
  { id: 'telegram', label: 'Telegram Channels' },
];

const subscriptionOptions = [
  { id: 'game_pass', label: 'Xbox Game Pass' },
  { id: 'ps_plus', label: 'PlayStation Plus' },
  { id: 'ea_play', label: 'EA Play' },
  { id: 'ubisoft_plus', label: 'Ubisoft+' },
  { id: 'nintendo_online', label: 'Nintendo Switch Online' },
  { id: 'twitch_prime', label: 'Twitch Prime' },
  { id: 'youtube_premium', label: 'YouTube Premium' },
  { id: 'none', label: 'No subscriptions' },
];

const newsSourceOptions = [
  { id: 'ign', label: 'IGN' },
  { id: 'gamespot', label: 'GameSpot' },
  { id: 'kotaku', label: 'Kotaku' },
  { id: 'polygon', label: 'Polygon' },
  { id: 'youtube', label: 'YouTube Channels' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'discord', label: 'Discord' },
];

export default function GamingLifestyle() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_lifestyle || {}) as {
    streams_content?: boolean;
    platform_handles?: string[];
    merchandise_spending?: string;
    gaming_events?: string[];
    follows_esports?: boolean;
    favorite_esports?: string[];
    gaming_influencers?: string[];
    gaming_communities?: string[];
    gaming_subscriptions?: string[];
    gaming_news_sources?: string[];
  };

  const form = useForm<z.infer<typeof gamingLifestyleSchema>>({
    resolver: zodResolver(gamingLifestyleSchema),
    defaultValues: {
      streams_content: savedData.streams_content || false,
      platform_handles: savedData.platform_handles || [],
      merchandise_spending: savedData.merchandise_spending || '',
      gaming_events: savedData.gaming_events || [],
      follows_esports: savedData.follows_esports || false,
      favorite_esports: savedData.favorite_esports || [],
      gaming_influencers: savedData.gaming_influencers || [],
      gaming_communities: savedData.gaming_communities || [],
      gaming_subscriptions: savedData.gaming_subscriptions || [],
      gaming_news_sources: savedData.gaming_news_sources || [],
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
              name="follows_esports"
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
                      Do you follow esports?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch('follows_esports') && (
              <FormField
                control={form.control}
                name="favorite_esports"
                render={() => (
                  <FormItem>
                    <FormLabel>Favorite Esports Titles</FormLabel>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {esportsOptions.map((esport) => (
                        <FormField
                          key={esport.id}
                          control={form.control}
                          name="favorite_esports"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(esport.id)}
                                  onCheckedChange={(checked) => {
                                    const value = field.value || [];
                                    if (checked) {
                                      field.onChange([...value, esport.id]);
                                    } else {
                                      field.onChange(value.filter((val) => val !== esport.id));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {esport.label}
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
            )}

            <FormField
              control={form.control}
              name="gaming_influencers"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Influencers You Follow</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {influencerOptions.map((influencer) => (
                      <FormField
                        key={influencer.id}
                        control={form.control}
                        name="gaming_influencers"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(influencer.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, influencer.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== influencer.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {influencer.label}
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
              name="gaming_communities"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Communities You're Part Of</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {communityOptions.map((community) => (
                      <FormField
                        key={community.id}
                        control={form.control}
                        name="gaming_communities"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(community.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, community.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== community.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {community.label}
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
              name="gaming_subscriptions"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Subscriptions You Have</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {subscriptionOptions.map((subscription) => (
                      <FormField
                        key={subscription.id}
                        control={form.control}
                        name="gaming_subscriptions"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(subscription.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, subscription.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== subscription.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {subscription.label}
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
              name="gaming_news_sources"
              render={() => (
                <FormItem>
                  <FormLabel>Where Do You Get Gaming News?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {newsSourceOptions.map((source) => (
                      <FormField
                        key={source.id}
                        control={form.control}
                        name="gaming_news_sources"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(source.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, source.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== source.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {source.label}
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