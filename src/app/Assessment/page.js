'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Heart, Coffee, Moon, Users, Battery, Sparkles } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: 'How often do you feel overwhelmed by your daily responsibilities?',
    icon: <Brain className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    id: 2,
    question: 'How would you rate your overall emotional well-being?',
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    id: 3,
    question: 'How often do you experience difficulty sleeping?',
    icon: <Moon className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    id: 4,
    question: 'How would you rate your energy levels throughout the day?',
    icon: <Battery className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    id: 5,
    question: 'How satisfied are you with your social connections?',
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    id: 6,
    question: 'How often do you engage in activities you enjoy?',
    icon: <Coffee className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
];

const options = [
  { value: '1', label: 'Rarely' },
  { value: '2', label: 'Sometimes' },
  { value: '3', label: 'Often' },
  { value: '4', label: 'Very Often' },
];

export default function Assessment() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  const progress = useMemo(() => (currentStep / questions.length) * 100, [currentStep]);

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
    const maxScore = questions.length * 4;
    const percentage = (total / maxScore) * 100;

    if (percentage <= 33) {
      return {
        level: 'Low😊',
        description: 'Your responses suggest low levels of stress. Keep maintaining your healthy habits!',
        icon: <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-green-500" />,
      };
    } else if (percentage <= 66) {
      return {
        level: 'Moderate😢',
        description: 'Your responses indicate moderate stress levels. Consider incorporating more self-care practices.',
        icon: <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-yellow-500" />,
      };
    } else {
      return {
        level: 'High😞',
        description: 'Your responses suggest high stress levels. We recommend speaking with a mental health professional.',
        icon: <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-red-500" />,
      };
    }
  };

  const currentQuestion = questions[currentStep - 1];

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  if (!isSignedIn) return null;

  if (showResults) {
    const result = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center space-y-6 p-8 md:p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center"
              >
                {result.icon}
              </motion.div>
              <CardTitle className="text-3xl md:text-4xl lg:text-5xl mb-4">Assessment Results</CardTitle>
              <CardDescription className="text-xl md:text-2xl">
                Stress Level: <span className="font-semibold">{result.level}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8 md:p-12">
              <p className="text-center text-lg md:text-xl text-muted-foreground">{result.description}</p>
              <Button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                  setAnswers({});
                }}
                className="w-full mt-8 py-6 text-lg"
                size="lg"
              >
                Take Test Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 md:p-8 lg:p-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-xl">
          <CardHeader className="space-y-6 p-8 md:p-12">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl">Mental Health Assessment</CardTitle>
              <span className="text-lg md:text-xl text-muted-foreground">Question {currentStep} of {questions.length}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardHeader>
          <CardContent className="space-y-8 p-8 md:p-12">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-6 mb-8"
            >
              {currentQuestion.icon}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium">{currentQuestion.question}</h2>
            </motion.div>

            <RadioGroup
              value={answers[currentStep] || ''}
              onValueChange={(value) => setAnswers({ ...answers, [currentStep]: value })}
              className="space-y-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value={option.value} id={`option-${option.value}`} className="w-6 h-6" />
                  <Label htmlFor={`option-${option.value}`} className="text-lg md:text-xl cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                size="lg"
                className="text-lg px-8 py-6"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentStep]}
                size="lg"
                className="text-lg px-8 py-6"
              >
                {currentStep === questions.length ? 'View Results' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}