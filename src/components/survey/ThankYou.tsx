'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl glassmorphism space-y-8 p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Thank You for Participating! 🎮
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Your responses will help us understand the Indian gaming community better.
          </p>
          
          <div className="space-y-4">
            <p className="text-lg">
              Want to stay updated with our findings?
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-32"
              >
                Home
              </Button>
              <Button 
                className="w-48 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  alert("Newsletter signup feature is not yet implemented.");
                }}
              >
                Follow Updates
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          <p>Share this survey with your fellow gamers!</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank')}>
              Share on Facebook
            </Button>
            <Button onClick={() => window.open('https://twitter.com/intent/tweet?url=' + window.location.href, '_blank')}>
              Share on Twitter
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
} 