'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingPreferencesSchema } from '@/lib/survey-validation';
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

const platforms = [
  { id: 'pc', label: 'PC Gaming' },
  { id: 'playstation', label: 'PlayStation' },
  { id: 'xbox', label: 'Xbox' },
  { id: 'nintendo', label: 'Nintendo Switch' },
  { id: 'mobile', label: 'Mobile Gaming' },
];

const genres = [
  { id: 'action', label: 'Action' },
  { id: 'rpg', label: 'RPG' },
  { id: 'fps', label: 'FPS' },
  { id: 'moba', label: 'MOBA' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'sports', label: 'Sports' },
  { id: 'racing', label: 'Racing' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'puzzle', label: 'Puzzle' },
];

const spendingOptions = [
  { value: 'none', label: 'No spending' },
  { value: 'under_1000', label: 'Under ₹1,000' },
  { value: '1000_5000', label: '₹1,000 - ₹5,000' },
  { value: 'above_5000', label: 'Above ₹5,000' },
];

const popularGames = [
  { id: 'valorant', label: 'Valorant' },
  { id: 'csgo', label: 'CS:GO' },
  { id: 'gta5', label: 'GTA V' },
  { id: 'minecraft', label: 'Minecraft' },
  { id: 'fortnite', label: 'Fortnite' },
  { id: 'cod', label: 'Call of Duty' },
  { id: 'pubg', label: 'PUBG' },
  { id: 'league', label: 'League of Legends' },
  { id: 'roblox', label: 'Roblox' },
  { id: 'apex', label: 'Apex Legends' },
];

const deviceOptions = [
  { id: 'gaming_pc', label: 'Gaming PC' },
  { id: 'laptop', label: 'Gaming Laptop' },
  { id: 'console', label: 'Console' },
  { id: 'smartphone', label: 'Smartphone' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'handheld_console', label: 'Handheld Console' },
];

const peripheralOptions = [
  { id: 'gaming_mouse', label: 'Gaming Mouse' },
  { id: 'mechanical_keyboard', label: 'Mechanical Keyboard' },
  { id: 'gaming_headset', label: 'Gaming Headset' },
  { id: 'controller', label: 'Controller' },
  { id: 'gaming_chair', label: 'Gaming Chair' },
  { id: 'vr_headset', label: 'VR Headset' },
  { id: 'gaming_monitor', label: 'Gaming Monitor' },
  { id: 'streaming_equipment', label: 'Streaming Equipment' },
];

const internetSpeedOptions = [
  { value: 'below_50mbps', label: 'Below 50 Mbps' },
  { value: '50_100mbps', label: '50-100 Mbps' },
  { value: '100_300mbps', label: '100-300 Mbps' },
  { value: 'above_300mbps', label: 'Above 300 Mbps' },
  { value: 'unsure', label: 'Not sure' },
];

const developerOptions = [
  { id: 'riot', label: 'Riot Games' },
  { id: 'valve', label: 'Valve' },
  { id: 'blizzard', label: 'Blizzard' },
  { id: 'ea', label: 'Electronic Arts' },
  { id: 'ubisoft', label: 'Ubisoft' },
  { id: 'rockstar', label: 'Rockstar Games' },
  { id: 'nintendo', label: 'Nintendo' },
  { id: 'epic', label: 'Epic Games' },
  { id: 'activision', label: 'Activision' },
  { id: 'cdpr', label: 'CD Projekt Red' },
];

const paymentMethodOptions = [
  { id: 'credit_card', label: 'Credit Card' },
  { id: 'debit_card', label: 'Debit Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'netbanking', label: 'Net Banking' },
  { id: 'wallet', label: 'Digital Wallet' },
  { id: 'gift_cards', label: 'Gift Cards' },
  { id: 'cod', label: 'Cash on Delivery' },
];

export default function GamingPreferences() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();
  
  const savedData = (responses.gaming_preferences || {}) as {
    platforms?: string[];
    favorite_games?: string[];
    preferred_genre?: string[];
    spending_monthly?: string;
    gaming_setup?: string;
    device_ownership?: string[];
    gaming_peripherals?: string[];
    internet_speed?: string;
    favorite_developers?: string[];
    payment_methods?: string[];
  };

  const form = useForm<z.infer<typeof gamingPreferencesSchema>>({
    resolver: zodResolver(gamingPreferencesSchema),
    defaultValues: {
      platforms: savedData.platforms || [],
      favorite_games: savedData.favorite_games || [],
      preferred_genre: savedData.preferred_genre || [],
      spending_monthly: savedData.spending_monthly || '',
      gaming_setup: savedData.gaming_setup || '',
      device_ownership: savedData.device_ownership || [],
      gaming_peripherals: savedData.gaming_peripherals || [],
      internet_speed: savedData.internet_speed || '',
      favorite_developers: savedData.favorite_developers || [],
      payment_methods: savedData.payment_methods || [],
    },
  });

  function onSubmit(values: z.infer<typeof gamingPreferencesSchema>) {
    console.log('Form submitted with values:', values);
    updateResponses('gaming_preferences', values);
    goToNextSection();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 pt-24"
    >
      <Card className="w-full max-w-2xl glassmorphism space-y-8 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Gaming Preferences
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming setup and preferences
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="platforms"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Platforms</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {platforms.map((platform) => (
                      <FormField
                        key={platform.id}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(platform.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, platform.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== platform.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {platform.label}
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
              name="device_ownership"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Devices Owned</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {deviceOptions.map((device) => (
                      <FormField
                        key={device.id}
                        control={form.control}
                        name="device_ownership"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(device.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, device.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== device.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {device.label}
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
              name="gaming_peripherals"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Peripherals You Own</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {peripheralOptions.map((peripheral) => (
                      <FormField
                        key={peripheral.id}
                        control={form.control}
                        name="gaming_peripherals"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(peripheral.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, peripheral.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== peripheral.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {peripheral.label}
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
              name="favorite_games"
              render={() => (
                <FormItem>
                  <FormLabel>Favorite Games</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {popularGames.map((game) => (
                      <FormField
                        key={game.id}
                        control={form.control}
                        name="favorite_games"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(game.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, game.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== game.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {game.label}
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
              name="favorite_developers"
              render={() => (
                <FormItem>
                  <FormLabel>Favorite Game Developers</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {developerOptions.map((developer) => (
                      <FormField
                        key={developer.id}
                        control={form.control}
                        name="favorite_developers"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(developer.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, developer.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== developer.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {developer.label}
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
              name="preferred_genre"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Genres</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {genres.map((genre) => (
                      <FormField
                        key={genre.id}
                        control={form.control}
                        name="preferred_genre"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(genre.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, genre.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== genre.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {genre.label}
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
              name="internet_speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Internet Speed</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your internet speed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {internetSpeedOptions.map((option) => (
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
              name="spending_monthly"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Gaming Spending</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your monthly spending" />
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
              name="payment_methods"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Payment Methods for Gaming</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {paymentMethodOptions.map((method) => (
                      <FormField
                        key={method.id}
                        control={form.control}
                        name="payment_methods"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, method.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== method.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {method.label}
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
              name="gaming_setup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe Your Gaming Setup</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your gaming setup, including hardware, peripherals, and environment..."
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