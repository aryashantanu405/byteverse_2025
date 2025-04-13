'use client';

import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Wind, Quote, RefreshCw, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
const recommendations = [
  {
    music: {
      title: "Weightless",
      artist: "Marconi Union",
      url: "https://open.spotify.com/track/1ZqHjApl3pfzwjweTfMi0g"
    },
    breathing: {
      url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60",
      description: "4-7-8 Breathing Exercise"
    },
    affirmation: "You are capable of amazing things. Take a moment to breathe and reset."
  },
  {
    music: {
      title: "Clair de Lune",
      artist: "Debussy",
      url: "https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L"
    },
    breathing: {
      url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&auto=format&fit=crop&q=60",
      description: "Box Breathing"
    },
    affirmation: "Your peace is a priority. Take care of yourself first."
  }
];

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentRecommendation = recommendations[currentIndex];

  const refreshRecommendation = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  if (!isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Heart className="text-pink-500" />
              Mindful Moment
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshRecommendation}
              className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
            >
              <RefreshCw size={20} />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Music Recommendation */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Music className="text-purple-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">Musical Therapy</h2>
                  <p className="text-gray-600 text-sm">
                    {currentRecommendation.music.title} by {currentRecommendation.music.artist}
                  </p>
                  <a
                    href={currentRecommendation.music.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 text-sm hover:underline inline-block mt-1"
                  >
                    Listen on Spotify →
                  </a>
                </div>
              </div>

              {/* Breathing Exercise */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Wind className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">Breathing Exercise</h2>
                  <div className="mt-2 rounded-lg overflow-hidden">
                    <Image
                      src={currentRecommendation.breathing.url}
                      alt="Calming scene"
                      className="w-full h-32 object-cover"
                      width={400}
                      height={200}
                    />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    {currentRecommendation.breathing.description}
                  </p>
                </div>
              </div>

              {/* Affirmation */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Quote className="text-green-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">Daily Affirmation</h2>
                  <p className="text-gray-600 mt-1">{currentRecommendation.affirmation}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
