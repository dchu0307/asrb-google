import { useState } from 'react';
import { GraduationCap, ChevronRight, Leaf, Users, Lightbulb, Brain } from 'lucide-react';

interface QuizAnswers {
  overallSustainability: number;
  responsibleSourcing: number;
  generalSolutions: number;
  emergingTech: number;
}

interface OnboardingQuizProps {
  accessToken: string;
  onComplete: (answers: QuizAnswers) => void;
}

export function OnboardingQuiz({ accessToken, onComplete }: OnboardingQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSelection, setCurrentSelection] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    overallSustainability: 0,
    generalSolutions: 0,
    responsibleSourcing: 0,
    emergingTech: 0,
  });

  const questions = [
    {
      id: 'overallSustainability',
      title: 'Overall Sustainability Knowledge',
      description: 'How would you rate your overall understanding of sustainability in supply chain management?',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'responsibleSourcing',
      title: 'Responsible Sourcing',
      description: 'This module covers ethical labor practices, human rights, transparency & traceability, environmental management, and the business rationale for responsible sourcing.',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'generalSolutions',
      title: 'General Solutions',
      description: 'This module explores OECD Due Diligence Guidance, Comply Chain frameworks, third-party auditing processes, supplier codes of conduct, supplier training programs, and ESG reporting standards.',
      icon: Lightbulb,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 'emergingTech',
      title: 'Emerging Technology & AI Integration',
      description: 'This module covers data analytics for proactive risk management, optimization through predictive analytics and live monitoring, management with digital twins and control towers, and leveraging key AI tools for supply chain sustainability.',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion.icon;

  const handleRating = (rating: number) => {
    setCurrentSelection(rating);
  };

  const handleContinue = () => {
    if (currentSelection === 0) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: currentSelection,
    };
    setAnswers(updatedAnswers);

    // Move to next question or complete
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSelection(0); // Reset selection for next question
    } else {
      onComplete(updatedAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-12 h-12 text-[var(--color-primary)]" />
            <span className="font-['Outfit'] text-3xl text-[var(--color-primary-dark)]">Welcome!</span>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Let's personalize your learning experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-[var(--color-text-secondary)]">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-primary)] transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[var(--color-border)]">
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 rounded-xl ${currentQuestion.bgColor}`}>
              <Icon className={`w-8 h-8 ${currentQuestion.color}`} />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">{currentQuestion.title}</h2>
              <p className="text-[var(--color-text-secondary)]">
                {currentQuestion.description}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-center mb-4">
              How would you rate your current knowledge in this area?
            </p>
          </div>

          {/* Rating Buttons */}
          <div className="space-y-3 mb-6">
            {[
              { value: 1, label: 'Beginner', description: 'Little to no experience' },
              { value: 2, label: 'Novice', description: 'Some basic knowledge' },
              { value: 3, label: 'Intermediate', description: 'Moderate understanding' },
              { value: 4, label: 'Advanced', description: 'Strong knowledge and experience' },
              { value: 5, label: 'Expert', description: 'Extensive expertise' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleRating(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:border-[var(--color-primary)] hover:bg-blue-50 group ${
                  currentSelection === option.value
                    ? 'border-[var(--color-primary)] bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      currentSelection === option.value
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-gray-100 text-[var(--color-text-secondary)] group-hover:bg-[var(--color-primary)] group-hover:text-white'
                    }`}>
                      {option.value}
                    </div>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">{option.description}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all ${
                    currentSelection === option.value
                      ? 'text-[var(--color-primary)] translate-x-1'
                      : 'text-gray-300 group-hover:text-[var(--color-primary)] group-hover:translate-x-1'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={currentSelection === 0}
            className={`w-full py-4 rounded-xl font-medium transition-all ${
              currentSelection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-lg hover:shadow-xl'
            }`}
          >
            {currentStep < questions.length - 1 ? 'Continue' : 'Complete Quiz'}
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-[var(--color-primary)]'
                  : index < currentStep
                  ? 'w-2 bg-[var(--color-primary)] opacity-50'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}