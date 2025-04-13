'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import chatbotpic from '../../../public/chatbot.png'
import {
  BookHeart,
  BarChart3,
  Brain,
  Menu,
  X,
  UserCircle,
  Bell,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import Script from "next/script";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moodSummary, setMoodSummary] = useState({
    calm: 4,
    stressed: 3,
    total: 7,
  });
  const router = useRouter();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    } else {
      sendnewuserdetail();
      getmoodsummary();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  const quickActions = [
    {
      title: 'Write Journal',
      href: '/Journal',
      icon: <BookHeart className="w-8 h-8 text-indigo-500" />,
      bgColor: 'bg-indigo-50',
      description: 'Record your thoughts and feelings',
    },
    {
      title: 'View Mood History',
      href: '/MoodTracker',
      icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
      bgColor: 'bg-emerald-50',
      description: 'Track your emotional journey',
    },
    {
      title: 'AI Recommendations',
      href: '/Recommendation',
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      bgColor: 'bg-purple-50',
      description: 'Get personalized insights',
    },
  ];

  const sendnewuserdetail = async () => {
    try {
      const response = await fetch('/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
        }),
      });
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const getmoodsummary = async () => {
    try {
      const response = await fetch('/api/user/moodsummary', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMoodSummary(data);
    } catch (error) {
      console.error('Error fetching mood summary:', error);
    }
  };
  const username = user.username;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">Mindful</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-6 w-6 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Hi {username} 👋</h2>
          <p className="text-gray-600">How are you feeling today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              href={action.href}
              key={index}
              className={`${action.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] block`}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Summary</h3>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{
                    width: `${(moodSummary.calm / moodSummary.total) * 100}%`,
                  }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600">
              You felt calm {moodSummary.calm} days this week and stressed {moodSummary.stressed} times
            </span>
          </div>
          <div className="mt-4 flex space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              🙂 Calm
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              😟 Stressed
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">✨ Daily Wellness Tip</h3>
          <p className="text-gray-700">
            Take a 10-minute break from screens and do a quick stretch. It helps your mind reset and your body relax.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🧘‍♀ Suggested Activities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-1">Breathing Exercise</h4>
              <p className="text-sm text-gray-700">
                Try the 4-7-8 technique to reduce anxiety and improve focus.
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-1">Nature Walk</h4>
              <p className="text-sm text-gray-700">
                Spend 15 minutes walking in nature to boost your mood.
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-700 mb-1">Gratitude Journal</h4>
              <p className="text-sm text-gray-700">
                Write down 3 things you're grateful for today.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 Mood Progress</h3>
          <p className="text-sm text-gray-600 mb-2">Your emotional trend this week:</p>
          <div className="h-24 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-xl flex items-center justify-center text-gray-800 font-medium">
            Coming soon: Interactive graph for mood patterns!
          </div>
        </div>
      </main>

      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-20 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 z-50"
      >
        <Image src={chatbotpic} alt="Chatbot" width={50} height={50} />
      </button>

      {isChatbotOpen && (
        <div className="fixed bottom-24 right-8 bg-white rounded-lg shadow-xl p-4 w-[400px] h-[600px] z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <Script
            type="module"
            src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
            strategy="lazyOnload"
          />
          <zapier-interfaces-chatbot-embed
            is-popup="false"
            chatbot-id="cm9emlr7b000nz0vew03zrj3f"
            height="550px"
            width="380px"
          />
        </div>
      )}
    </div>
  );
}