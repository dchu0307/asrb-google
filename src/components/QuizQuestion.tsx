import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { projectId } from '../utils/supabase/info';

interface QuizQuestionProps {
  question: string;
  type: 'multiple-choice' | 'essay';
  options: string[];
  correctAnswer: number;
  explanation: string;
  optionExplanations?: string[];
  questionNumber: number;
  lessonId: string;
  accessToken: string;
}

export function QuizQuestion({ 
  question, 
  type,
  options, 
  correctAnswer, 
  explanation,
  optionExplanations,
  questionNumber,
  lessonId,
  accessToken
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set());
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [essayResponse, setEssayResponse] = useState('');
  const [essaySubmitted, setEssaySubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    
    if (index === correctAnswer) {
      setIsAnsweredCorrectly(true);
    } else {
      setWrongAnswers(prev => new Set(prev).add(index));
    }
  };

  const handleEssaySubmit = async () => {
    if (!essayResponse.trim()) return;
    
    setSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/essay-responses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            lessonId,
            questionNumber,
            response: essayResponse,
          }),
        }
      );

      if (response.ok) {
        setEssaySubmitted(true);
      } else {
        console.error('Failed to submit essay response');
      }
    } catch (error) {
      console.error('Error submitting essay:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const showFeedback = selectedAnswer !== null;
  const isCorrect = selectedAnswer === correctAnswer;

  // Get the appropriate explanation for the selected answer
  const getExplanation = () => {
    if (selectedAnswer === null) return '';
    
    // Check if there's a specific explanation for the selected option
    const optionSpecificExplanation = optionExplanations?.[selectedAnswer];
    
    // Use option-specific explanation if it exists and is not empty, otherwise use general explanation
    if (optionSpecificExplanation && optionSpecificExplanation.trim() !== '') {
      return optionSpecificExplanation;
    }
    
    return explanation;
  };

  const displayExplanation = getExplanation();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
          {questionNumber}
        </span>
        <div 
          className="flex-1 prose prose-blue max-w-none m-0"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      {type === 'multiple-choice' ? (
        <>
          <div className="space-y-3 ml-11">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === correctAnswer;
              const wasTriedAndWrong = wrongAnswers.has(index);
              
              let buttonStyles = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
              
              if (isAnsweredCorrectly) {
                // After correct answer, highlight correct one and dim others
                if (isCorrectAnswer) {
                  buttonStyles += "border-[var(--color-success)] bg-green-50";
                } else {
                  buttonStyles += "border-[var(--color-border)] opacity-50";
                }
              } else if (wasTriedAndWrong && isSelected) {
                // Currently selected wrong answer
                buttonStyles += "border-[var(--color-error)] bg-red-50";
              } else if (wasTriedAndWrong) {
                // Previously tried wrong answer
                buttonStyles += "border-[var(--color-error)] bg-red-50 opacity-70";
              } else {
                // Untried answer
                buttonStyles += "border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-blue-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnsweredCorrectly}
                  className={buttonStyles}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <div 
                        className="prose prose-blue max-w-none"
                        dangerouslySetInnerHTML={{ __html: option }}
                      />
                    </span>
                    {isAnsweredCorrectly && isCorrectAnswer && (
                      <Check className="w-5 h-5 text-[var(--color-success)]" />
                    )}
                    {wasTriedAndWrong && (
                      <X className="w-5 h-5 text-[var(--color-error)]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div 
              className={`ml-11 mt-4 p-4 rounded-lg ${
                isCorrect 
                  ? 'bg-green-50 border border-[var(--color-success)]' 
                  : 'bg-orange-50 border border-[var(--color-accent)]'
              }`}
            >
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-1" />
                ) : (
                  <X className="w-5 h-5 text-[var(--color-error)] flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className={`m-0 mb-2 ${isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite right. Try again!'}
                  </p>
                  <div 
                    className="prose prose-blue max-w-none m-0 text-[var(--color-text-secondary)]"
                    dangerouslySetInnerHTML={{ __html: displayExplanation }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="ml-11">
          {essaySubmitted ? (
            <div className="p-4 bg-green-50 border border-[var(--color-success)] rounded-lg">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[var(--color-success)] m-0 mb-2">Response submitted!</p>
                  <p className="text-[var(--color-text-secondary)] text-sm m-0 mb-3">
                    Your response has been saved and will be reviewed by the lesson creator.
                  </p>
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm text-[var(--color-text-secondary)] m-0 mb-1">Your response:</p>
                    <p className="m-0 whitespace-pre-wrap">{essayResponse}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <textarea
                value={essayResponse}
                onChange={(e) => setEssayResponse(e.target.value)}
                placeholder="Type your response here..."
                className="w-full min-h-[200px] p-4 border-2 border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-y"
              />
              <button
                onClick={handleEssaySubmit}
                disabled={!essayResponse.trim() || submitting}
                className="mt-3 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Response'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}