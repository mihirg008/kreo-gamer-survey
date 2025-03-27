'use client';

import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { demographics18to24Schema } from '@/lib/survey-validation';
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

const educationLevelOptions = [
  { value: 'high_school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'vocational', label: 'Vocational Training' },
  { value: 'other', label: 'Other' },
];

const fieldOfStudyOptions = [
  { value: 'computer_science', label: 'Computer Science/IT' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'business', label: 'Business/Commerce' },
  { value: 'arts_humanities', label: 'Arts & Humanities' },
  { value: 'medicine', label: 'Medicine & Healthcare' },
  { value: 'law', label: 'Law' },
  { value: 'science', label: 'Science' },
  { value: 'other', label: 'Other' },
];

const currentStatusOptions = [
  { value: 'studying', label: 'Only Studying' },
  { value: 'working', label: 'Only Working' },
  { value: 'both', label: 'Both Studying and Working' },
  { value: 'neither', label: 'Neither' },
];

const livingSituationOptions = [
  { value: 'with_parents', label: 'Living with Parents' },
  { value: 'hostel', label: 'Hostel/Dormitory' },
  { value: 'rented_roommates', label: 'Rented with Roommates' },
  { value: 'rented_alone', label: 'Rented Alone' },
  { value: 'own_place', label: 'Own Place' },
];

const monthlyIncomeOptions = [
  { value: 'no_income', label: 'No Income' },
  { value: 'under_10k', label: 'Under ₹10,000' },
  { value: '10k_20k', label: '₹10,000 - ₹20,000' },
  { value: '20k_40k', label: '₹20,000 - ₹40,000' },
  { value: '40k_plus', label: 'Above ₹40,000' },
];

const incomeSourceOptions = [
  { value: 'job', label: 'Job/Employment' },
  { value: 'allowance', label: 'Allowance from Family' },
  { value: 'freelancing', label: 'Freelancing/Part-time Work' },
  { value: 'scholarship', label: 'Scholarship/Grant' },
  { value: 'business', label: 'Own Business' },
  { value: 'other', label: 'Other' },
];

const relationshipStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'dating', label: 'Dating' },
  { value: 'committed', label: 'In a Committed Relationship' },
  { value: 'engaged', label: 'Engaged' },
  { value: 'married', label: 'Married' },
  { value: 'complicated', label: 'It\'s Complicated' },
];

const careerAspirationOptions = [
  { value: 'corporate', label: 'Corporate Career' },
  { value: 'startup', label: 'Startup/Entrepreneurship' },
  { value: 'academic', label: 'Academic/Research' },
  { value: 'creative', label: 'Creative Fields' },
  { value: 'gaming_esports', label: 'Gaming/Esports' },
  { value: 'undecided', label: 'Undecided' },
  { value: 'other', label: 'Other' },
];

const occupationOptions = [
  { value: 'college_student', label: 'College Student' },
  { value: 'software_engineer', label: 'Software Engineer' },
  { value: 'designer_marketer', label: 'Designer/Marketer' },
  { value: 'content_creator', label: 'Content Creator' },
  { value: 'doctor_lawyer', label: 'Doctor/Lawyer' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'founder_director', label: 'Founder/Director' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'other', label: 'Other' },
];

const igfriends = [
  { value: 'solo', label: 'I ride solo. No random folks' },
  { value: 'in_game_only', label: 'No. In-Game only!' },
  { value: 'online', label: 'Online - Off Game' },
  { value: 'acqintance', label: 'I know who they are..' },
  { value: 'met_them', label: 'Of Course - have met them offline' },
];

export default function Demographics18to24() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.demographics_18to24 || {}) as {
    education_level?: string;
    field_of_study?: string;
    current_status?: string;
    living_situation?: string;
    monthly_income?: string;
    income_source?: string;
    relationship_status?: string;
    career_aspirations?: string;
    occupation?: string;
  };

  const form = useForm<z.infer<typeof demographics18to24Schema>>({
    resolver: zodResolver(demographics18to24Schema),
    defaultValues: {
      education_level: savedData.education_level || '',
      field_of_study: savedData.field_of_study || '',
      current_status: savedData.current_status || '',
      living_situation: savedData.living_situation || '',
      monthly_income: savedData.monthly_income || '',
      income_source: savedData.income_source || '',
      relationship_status: savedData.relationship_status || '',
      career_aspirations: savedData.career_aspirations || '',
      occupation: savedData.occupation || '',
    },
  });

  function onSubmit(values: z.infer<typeof demographics18to24Schema>) {
    updateResponses('demographics_18to24', values);
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
            Level 1
          </h2>
          <p className="text-muted-foreground mt-2">
            Ice-Breaker
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
{/*             <FormField
              control={form.control}
              name="education_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your education level?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationLevelOptions.map((option) => (
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
              name="field_of_study"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your field of study/major?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your field of study" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fieldOfStudyOptions.map((option) => (
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
            // <FormField
            //   control={form.control}
            //   name="current_status"
            //   render={({ field }) => (
            //     <FormItem>
            //       <FormLabel>What is your current status?</FormLabel>
            //       <Select onValueChange={field.onChange} defaultValue={field.value}>
            //         <FormControl>
            //           <SelectTrigger className="bg-background/50">
            //             <SelectValue placeholder="Select your current status" />
            //           </SelectTrigger>
            //         </FormControl>
            //         <SelectContent>
            //           {currentStatusOptions.map((option) => (
            //             <SelectItem key={option.value} value={option.value}>
            //               {option.label}
            //             </SelectItem>
            //           ))}
            //         </SelectContent>
            //       </Select>
            //       <FormMessage />
            //     </FormItem>
            //   )}
            // />

            // <FormField
            //   control={form.control}
            //   name="living_situation"
            //   render={({ field }) => (
            //     <FormItem>
            //       <FormLabel>What is your living situation?</FormLabel>
            //       <Select onValueChange={field.onChange} defaultValue={field.value}>
            //         <FormControl>
            //           <SelectTrigger className="bg-background/50">
            //             <SelectValue placeholder="Select your living situation" />
            //           </SelectTrigger>
            //         </FormControl>
            //         <SelectContent>
            //           {livingSituationOptions.map((option) => (
            //             <SelectItem key={option.value} value={option.value}>
            //               {option.label}
            //             </SelectItem>
            //           ))}
            //         </SelectContent>
            //       </Select>
            //       <FormMessage />
            //     </FormItem>
            //   )}
            // />

{/*             <FormField
              control={form.control}
              name="monthly_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your monthly disposable income?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your income range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {monthlyIncomeOptions.map((option) => (
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
              name="income_source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your main source of income?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your income source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incomeSourceOptions.map((option) => (
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
              name="relationship_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your relationship status?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your relationship status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationshipStatusOptions.map((option) => (
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
            // <FormField
            //   control={form.control}
            //   name="career_aspirations"
            //   render={({ field }) => (
            //     <FormItem>
            //       <FormLabel>What are your career aspirations?</FormLabel>
            //       <Select onValueChange={field.onChange} defaultValue={field.value}>
            //         <FormControl>
            //           <SelectTrigger className="bg-background/50">
            //             <SelectValue placeholder="Select your career aspiration" />
            //           </SelectTrigger>
            //         </FormControl>
            //         <SelectContent>
            //           {careerAspirationOptions.map((option) => (
            //             <SelectItem key={option.value} value={option.value}>
            //               {option.label}
            //             </SelectItem>
            //           ))}
            //         </SelectContent>
            //       </Select>
            //       <FormMessage />
            //     </FormItem>
            //   )}
            // />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you do when you&apos;re not gaming? (Occupation)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your occupation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {occupationOptions.map((option) => (
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
              name="igfr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you met your in-game friends? (Occupation)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Vibe check" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {igfriends.map((option) => (
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
