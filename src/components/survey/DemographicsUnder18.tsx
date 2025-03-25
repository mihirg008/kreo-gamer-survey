'use client';

import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { demographicsUnder18Schema } from '@/lib/survey-validation';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const gradeOptions = [
  { value: '6th', label: '6th Grade' },
  { value: '7th', label: '7th Grade' },
  { value: '8th', label: '8th Grade' },
  { value: '9th', label: '9th Grade' },
  { value: '10th', label: '10th Grade' },
  { value: '11th', label: '11th Grade' },
  { value: '12th', label: '12th Grade' },
  { value: 'other', label: 'Other' },
];

const schoolTypeOptions = [
  { value: 'government', label: 'Government School' },
  { value: 'private', label: 'Private School' },
  { value: 'international', label: 'International School' },
  { value: 'home_schooled', label: 'Home Schooled' },
  { value: 'other', label: 'Other' },
];

const extracurricularOptions = [
  { value: 'yes_regularly', label: 'Yes, regularly' },
  { value: 'yes_occasionally', label: 'Yes, occasionally' },
  { value: 'no', label: 'No, I don\'t participate' },
];

const pocketMoneyOptions = [
  { value: 'none', label: 'I don\'t receive pocket money' },
  { value: 'under_500', label: 'Under ₹500 per month' },
  { value: '500_1000', label: '₹500 - ₹1,000 per month' },
  { value: '1000_2000', label: '₹1,000 - ₹2,000 per month' },
  { value: 'over_2000', label: 'Over ₹2,000 per month' },
];

const travelOptions = [
  { value: 'school_bus', label: 'School Bus' },
  { value: 'public_transport', label: 'Public Transport' },
  { value: 'parents_drop', label: 'Parents Drop Me Off' },
  { value: 'walk', label: 'Walk' },
  { value: 'bicycle', label: 'Bicycle' },
  { value: 'other', label: 'Other' },
];

const subjectOptions = [
  { id: 'maths', label: 'Mathematics' },
  { id: 'science', label: 'Science' },
  { id: 'computer_science', label: 'Computer Science' },
  { id: 'languages', label: 'Languages' },
  { id: 'social_studies', label: 'Social Studies' },
  { id: 'arts', label: 'Arts' },
  { id: 'physical_education', label: 'Physical Education' },
  { id: 'other', label: 'Other' },
];

const studyHoursOptions = [
  { value: 'less_than_1', label: 'Less than 1 hour' },
  { value: '1_2_hours', label: '1-2 hours' },
  { value: '2_3_hours', label: '2-3 hours' },
  { value: '3_4_hours', label: '3-4 hours' },
  { value: 'more_than_4', label: 'More than 4 hours' },
];

const parentControlOptions = [
  { value: 'strict', label: 'Yes, strictly' },
  { value: 'flexible', label: 'Yes, but flexible' },
  { value: 'no', label: 'No, I decide my own gaming schedule' },
];

export default function DemographicsUnder18() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.demographics_under18 || {}) as {
    grade?: string;
    school_type?: string;
    extracurricular?: string;
    pocket_money?: string;
    travel_to_school?: string;
    favorite_subjects?: string[];
    study_hours?: string;
    parent_control?: string;
  };

  const form = useForm<z.infer<typeof demographicsUnder18Schema>>({
    resolver: zodResolver(demographicsUnder18Schema),
    defaultValues: {
      grade: savedData.grade || '',
      school_type: savedData.school_type || '',
      extracurricular: savedData.extracurricular || '',
      pocket_money: savedData.pocket_money || '',
      travel_to_school: savedData.travel_to_school || '',
      favorite_subjects: savedData.favorite_subjects || [],
      study_hours: savedData.study_hours || '',
      parent_control: savedData.parent_control || '',
    },
  });

  function onSubmit(values: z.infer<typeof demographicsUnder18Schema>) {
    updateResponses('demographics_under18', values);
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
            Level 2
          </h2>
          <p className="text-muted-foreground mt-2">
            Ice-Breaker
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What grade/class are you in?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your grade/class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradeOptions.map((option) => (
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

{/*             <FormField
              control={form.control}
              name="school_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What type of school do you attend?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your school type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schoolTypeOptions.map((option) => (
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
              name="extracurricular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you participate in extracurricular activities?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {extracurricularOptions.map((option) => (
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
              name="pocket_money"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How much pocket money do you receive monthly?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pocketMoneyOptions.map((option) => (
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
              name="travel_to_school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How do you usually travel to school?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select how you travel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {travelOptions.map((option) => (
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
              name="favorite_subjects"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Which subjects do you enjoy the most?</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {subjectOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="favorite_subjects"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

{/*             <FormField
              control={form.control}
              name="study_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many hours do you spend studying daily (outside school hours)?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select study hours" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studyHoursOptions.map((option) => (
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
            <FormField
              control={form.control}
              name="parent_control"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do your parents control your gaming time?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      {parentControlOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <FormLabel htmlFor={option.value} className="font-normal">
                            {option.label}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
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
