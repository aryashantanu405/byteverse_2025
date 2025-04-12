"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Book, Send, Sparkles } from 'lucide-react';

const mockEntries = [
  {
    id: '1',
    content: "Today was incredibly productive! I finally completed the project I've been working on for weeks.",
    date: new Date('2024-03-10'),
    emotion: 'Happy 😊'
  },
  {
    id: '2',
    content: "Feeling a bit overwhelmed with all the deadlines approaching. Need to take deep breaths and tackle one task at a time.",
    date: new Date('2024-03-09'),
    emotion: 'Anxious 😟'
  }
];

const emotionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function JournalPage() {
  const [entries, setEntries] = useState(mockEntries);
  const [currentEntry, setCurrentEntry] = useState('');
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!currentEntry.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call for emotion detection
    await new Promise(resolve => setTimeout(resolve, 1500));
    const emotions = ['Happy 😊', 'Sad 😢', 'Excited 🎉', 'Anxious 😟', 'Peaceful 😌'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    const newEntry = {
      id: Date.now().toString(),
      content: currentEntry,
      date: new Date(),
      emotion: randomEmotion
    };

    setDetectedEmotion(randomEmotion);
    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 md:p-12"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex items-center gap-3 mb-8"
          variants={pageVariants}
        >
          <Book className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800">My Journal</h1>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-xl p-6 mb-8"
          variants={pageVariants}
        >
          <div className="relative">
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="How are you feeling today?"
              className="w-full min-h-[200px] p-4 bg-gray-50 rounded-lg border-2 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 resize-none text-gray-700"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                lineHeight: "32px",
                paddingTop: "16px"
              }}
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="absolute bottom-4 right-4 bg-purple-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Sparkles className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit</span>
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {detectedEmotion && (
              <motion.div
                variants={emotionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4 text-center"
              >
                <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
                  Detected Emotion: {detectedEmotion}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={pageVariants}
        >
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-500">
                  {format(entry.date, 'MMMM d, yyyy')}
                </span>
                <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  {entry.emotion}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{entry.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}