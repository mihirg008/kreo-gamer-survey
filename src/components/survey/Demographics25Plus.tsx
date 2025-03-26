'use client';

import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { demographics25PlusSchema } from '@/lib/survey-validation';
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
import { Checkbox } from '@/components/ui/checkbox';

const educationLevelOptions = [
  { value: 'high_school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'phd', label: 'PhD' },
  { value: 'vocational', label: 'Vocational Training' },
  { value: 'other', label: 'Other' },
];

const employmentStatusOptions = [
  { value: 'full_time', label: 'Full-time Employed' },
  { value: 'part_time', label: 'Part-time Employed' },
  { value: 'self_employed', label: 'Self-employed/Freelancer' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'homemaker', label: 'Homemaker' },
  { value: 'retired', label: 'Retired' },
  { value: 'student', label: 'Student' },
];

const industrySectorOptions = [
  { value: 'tech', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance/Banking' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail/E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'entertainment', label: 'Entertainment/Media' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' },
];

const annualIncomeOptions = [
  { value: 'below_5l', label: 'Below ₹5 lakhs' },
  { value: '5l_10l', label: '₹5 - ₹10 lakhs' },
  { value: '10l_15l', label: '₹10 - ₹15 lakhs' },
  { value: '15l_25l', label: '₹15 - ₹25 lakhs' },
  { value: '25l_plus', label: 'Above ₹25 lakhs' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const maritalStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'relationship', label: 'In a Relationship' },
  { value: 'married', label: 'Married' },
  { value: 'married_with_kids', label: 'Married with Kids' },
  { value: 'complicated', label: 'It\'s complicated' },
];

const childrenOptions = [
  { value: 'none', label: 'No children' },
  { value: 'one', label: '1 child' },
  { value: 'two', label: '2 children' },
  { value: 'three', label: '3 children' },
  { value: 'more', label: '4 or more children' },
];

const housingOptions = [
  { value: 'owned', label: 'Owned house/apartment' },
  { value: 'rented', label: 'Rented house/apartment' },
  { value: 'family', label: 'Living with family' },
  { value: 'company', label: 'Company provided' },
  { value: 'other', label: 'Other' },
];

const financialResponsibilitiesOptions = [
  { id: 'mortgage', label: 'Mortgage/Rent' },
  { id: 'loans', label: 'Loans (Education, Car, etc.)' },
  { id: 'children', label: 'Children\'s Expenses' },
  { id: 'parent_support', label: 'Supporting Parents' },
  { id: 'investments', label: 'Investments' },
  { id: 'insurance', label: 'Insurance Premiums' },
  { id: 'utilities', label: 'Utilities & Bills' },
  { id: 'other', label: 'Other Significant Expenses' },
];

const occupationOptions = [
  { value: 'software_engineer', label: 'Software Engineer' },
  { value: 'designer_marketer', label: 'Designer/Marketer' },
  { value: 'content_creator', label: 'Content Creator' },
  { value: 'doctor_lawyer', label: 'Doctor/Lawyer' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'founder_director', label: 'Founder/Director' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'other', label: 'Other' },
];

const igfriends = [
  { value: 'solo', label: 'I ride solo. No random folks' },
  { value: 'in_game_only', label: 'No. In-Game only!' },
  { value: 'online', label: 'Online - Off Game' },
  { value: 'acqintance', label: 'I know who they are..' },
  { value: 'met_them', label: 'Of Course - have met them offline' },
];


export default function Demographics25Plus() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.demographics_25plus || {}) as {
    education_level?: string;
    employment_status?: string;
    industry_sector?: string;
    annual_income?: string;
    marital_status?: string;
    number_of_children?: string;
    housing_type?: string;
    financial_responsibilities?: string[];
    occupation?: string;
  };

  const form = useForm<z.infer<typeof demographics25PlusSchema>>({
    resolver: zodResolver(demographics25PlusSchema),
    defaultValues: {
      education_level: savedData.education_level || '',
      employment_status: savedData.employment_status || '',
      industry_sector: savedData.industry_sector || '',
      annual_income: savedData.annual_income || '',
      marital_status: savedData.marital_status || '',
      number_of_children: savedData.number_of_children || '',
      housing_type: savedData.housing_type || '',
      financial_responsibilities: savedData.financial_responsibilities || [],
      occupation: savedData.occupation || '',
    },
  });

  function onSubmit(values: z.infer<typeof demographics25PlusSchema>) {
    updateResponses('demographics_25plus', values);
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
                  <FormLabel>What is your highest education level completed?</FormLabel>
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
            /> */}

{/*             <FormField
              control={form.control}
              name="employment_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your current employment status?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your employment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employmentStatusOptions.map((option) => (
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
              name="industry_sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Which industry sector do you work in?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your industry sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industrySectorOptions.map((option) => (
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
              name="annual_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your annual income bracket?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your income bracket" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {annualIncomeOptions.map((option) => (
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
              name="number_of_children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many children do you have?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select number of children" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {childrenOptions.map((option) => (
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
              name="housing_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What type of housing do you currently have?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your housing type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {housingOptions.map((option) => (
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
              name="financial_responsibilities"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">What are your primary financial responsibilities?</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {financialResponsibilitiesOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="financial_responsibilities"
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

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you do when you're not gaming? (Occupation)</FormLabel>
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
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your Marital Status?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maritalStatusOptions.map((option) => (
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
              name="occupation"
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
