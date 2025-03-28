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

const activityOptions = [
  {id:'anime',label:'Anime'},
{id:'esports',label:'Esports'},
{id:'streaming',label:'Streaming'},
{id:'fitness',label:'Fitness'},
{id:'technology',label:'Technology'},
{id:'music',label:'Music'},
{id:'cosplay',label:'Cosplay'},
{id:'collectibles',label:'Collectibles'},
{id:'board_games',label:'Board Games'},
{id:'fantasy_sports',label:'Fantasy Sports'},
{id:'coding',label:'Coding'},
{id:'movies',label:'Movies'},
{id:'tv_shows',label:'TV Shows'},
{id:'fashion',label:'Fashion'},
{id:'travel',label:'Travel'},
{id:'photography',label:'Photography'},
];



const contentcreatorOptions = [
  { id: 'full_time', label: 'Yes, full-time' },
  { id: 'part_time', label: 'Yes, part-time' },
  { id: 'no_but_want_to', label: 'No, but I want to' },
  { id: 'not_interested', label: 'No, not interested' },
];


const custopmPerOptions = [
  { id: 'ninja', label: 'Yes, already use' },
  { id: 'shroud', label: 'Would like to try' },
  { id: 'pokimane', label: '' },
  { id: 'pewdiepie', label: 'PewDiePie' },
  { id: 'drlupo', label: 'DrLupo' },
  { id: 'tfue', label: 'Tfue' },
  { id: 'indian_streamers', label: 'Indian Streamers' },
  { id: 'none', label: 'Don\'t follow influencers' },
];


const spendingOptions = [
  { value: 'none', label: 'No spending' },
  { value: 'under_500', label: 'Under ₹500' },
  { value: '500_2000', label: '₹500 - ₹2,000' },
  { value: 'above_2000', label: 'Above ₹2,000' },
];


const esportpartOptions = [
  { value: 'none', label: 'Yes, regularly' },
  { value: 'under_500', label: 'Occasionally' },
  { value: '500_2000', label: 'No, but I want to' },
  { value: 'above_2000', label: ' No, not interested' },
];

const contentwatchOptions = [
  { id: 'daily', label: 'Daily' },
  { id: 'few_times_a_week', label: 'Few times a week' },
  { id: 'rarely', label: 'Rarely' },
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


const foodOptions = [
  { id: 'fast_food', label: 'Fast food (McDonald’s, KFC, Dominos...)' },
  { id: 'snacks', label: 'Snacks (Lays, Kurkure, Pringles..)' },
  { id: 'healthy', label: 'Healthy options (Nuts, Protein bars, Fruits...)' },
];

const drinksOptions = [
  { id: 'energy', label: 'Energy drinks (Redbull, Monster.. even Sting counts' },
  { id: 'homemade', label: ' (Hot/Cold) Tea, Coffee, Lassi, Buttermilk...' },
  { id: 'water', label: 'Water' },
  { id: 'others', label: 'Coke, Mazza, Frooti, Paperboat...' },
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


const merchspendsOptions = [
  { id: 'zero', label: '₹0 - I don’t buy merch' },
  { id: '500_to_2000', label: '₹500-2000 - Occasional buyer ' },
  { id: '2000_to_5000', label: '₹2000-5000 - Enthusiast' },
  { id: '5000_plus', label: ' ₹5000+ - Hardcore collector' },
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


const contentconsumeOptions = [
  { id: 'yt', label: 'YouTube' },
  { id: 'twitch', label: 'Twitch' },
  { id: 'fb_insta', label: ' Facebook/Instagram' },
  { id: 'rooter', label: 'Rooter' },
  { id: 'loco', label: 'Loco' },
  { id: 'other', label: 'Other' },
];



const igsOptions = [
  { id: 'zero', label: '₹0 - I’m strictly F2P ' },
  { id: '100_to_500', label: '₹100-500 - Casual spender' },
  { id: '500_to_2000', label: '₹500-2000 - Invested in the grind' },
  { id: '2000_plus', label: ' ₹2000+ - Take my money, devs!' },
];


const collectOptions = [
  { id: 'yes', label: 'Yes, actively' },
  { id: 'occasionally', label: 'Occasionally' },
  { id: 'not_interested', label: 'No, not interested'},
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
           
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Apart from gaming, what do you follow?</h3>
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Select one of the options!</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-white">
                          <SelectValue placeholder="Select your first favorite game" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                        <div className="p-2">
                          <Input
                            placeholder="Search themes..."
                            className="mb-2 bg-[#2A2A2A] border-[#333333] text-white"
                            onChange={(e) => {
                              const searchTerm = e.target.value.toLowerCase();
                              setFilteredActivity(
                                activityOptions.filter(activity => 
                                  activity.label.toLowerCase().includes(searchTerm)
                                )
                              );
                            }}
                          />
                        </div>
                        {filteredActivity.map((option) => (
                          <SelectItem key={option.id} value={option.id} className="text-white hover:bg-[#2A2A2A]">
                            {option.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="other" className="text-white hover:bg-[#2A2A2A]">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {field.value === 'other' && (
                      <FormField
                        control={form.control}
                        name="interest"
                        render={({ field: otherField }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input
                                {...otherField}
                                placeholder="Enter your favorite activity"
                                className="bg-[#1A1A1A] border-[#333333] text-white"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />            
            </div>
            
            <FormField
              control={form.control}
              name="customised_peripherals"
              render={() => (
                <FormItem>
                  <FormLabel>Do you use customised peripherals of topics you are interested in? Would you like to?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {customPerOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="customised_peripherals"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="gaming_food"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guilty gaming food?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select spending range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodOptions.map((option) => (
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
              name="gaming_drink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guilty gaming drink?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select spending range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {drinkOptions.map((option) => (
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
              name="watch_content"
              render={() => (
                <FormItem>
                  <FormLabel>How much time do you spend watching gaming content?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {contentwatchOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="watch_content"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="fav_creator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite gaming creator, streamer?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter names of the top creators, streamers you follow!"
                      className="bg-background/50 min-h-[20px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  

            <FormField
              control={form.control}
              name="esp_participation"
              render={() => (
                <FormItem>
                  <FormLabel>Have you ever participated in an eSports tournament?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {esportpartOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="esp_participation"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="is_content_c"
              render={() => (
                <FormItem>
                  <FormLabel>Do you stream or create gaming content?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {contentcreatorOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="is_content_c"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="watch_content"
              render={() => (
                <FormItem>
                  <FormLabel>Which platforms do you use for streaming/watching gaming content?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {contentconsumeOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="watch_content"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="in_game_spends"
              render={() => (
                <FormItem>
                  <FormLabel>How much do you spend on in-game purchases per month?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {igsOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="in_game_spends"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="merch_spends"
              render={() => (
                <FormItem>
                  <FormLabel>How much do you spend on gaming merchandise (apparel, collectibles, accessories) per month or 2 months?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {merchspendsOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="merch_spends"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
{/* collectibles */}
            <FormField
              control={form.control}
              name="collectibles"
              render={() => (
                <FormItem>
                  <FormLabel>Do you collect gaming-related items (cards, figurines, posters, in-game collectibles)?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {collectOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="collectibles"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
