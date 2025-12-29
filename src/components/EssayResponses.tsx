import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, User, Calendar } from 'lucide-react';
import { projectId } from '../utils/supabase/info';

interface EssayResponse {
  id: string;
  lessonId: string;
  questionNumber: number;
  response: string;
  userId: string;
  userEmail: string;
  userName: string;
  submittedAt: string;
}

interface Lesson {
  id: string;
  title: string;
  questions: Array<{
    question: string;
    type: string;
  }>;
}

interface EssayResponsesProps {
  accessToken: string;
  lessonId: string;
  onBack: () => void;
}

export function EssayResponses({ accessToken, lessonId, onBack }: EssayResponsesProps) {
  const [responses, setResponses] = useState<{ [key: number]: EssayResponse[] }>({});
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [lessonId]);

  const fetchData = async () => {
    try {
      // Fetch lesson details
      const lessonResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons/${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const lessonData = await lessonResponse.json();
      if (lessonResponse.ok && lessonData.lesson) {
        setLesson(lessonData.lesson);
      }

      // Fetch essay responses
      const responsesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/essay-responses/${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const responsesData = await responsesResponse.json();
      if (responsesResponse.ok && responsesData.responses) {
        setResponses(responsesData.responses);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">Loading responses...</div>
      </div>
    );
  }

  // Filter essay questions only
  const essayQuestions = lesson?.questions.filter((q, idx) => q.type === 'essay').map((q, essayIdx) => {
    // Find the original index in the questions array
    const originalIndex = lesson.questions.findIndex((question, i) => question === q);
    return { ...q, questionNumber: originalIndex + 1 };
  }) || [];

  const totalResponses = Object.values(responses).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-[var(--color-primary)]" />
              <span className="font-['Outfit'] text-xl text-[var(--color-primary-dark)]">Student Responses</span>
            </div>
          </div>
          <div className="ml-14">
            <h2 className="m-0 mb-1">{lesson?.title}</h2>
            <p className="text-[var(--color-text-secondary)] m-0">
              {totalResponses} {totalResponses === 1 ? 'response' : 'responses'} submitted
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {essayQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-border)]">
            <FileText className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4 opacity-50" />
            <h3 className="mb-2">No essay questions in this lesson</h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              This lesson doesn't have any essay-style questions.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : totalResponses === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-border)]">
            <FileText className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4 opacity-50" />
            <h3 className="mb-2">No responses yet</h3>
            <p className="text-[var(--color-text-secondary)]">
              Students haven't submitted any responses to the essay questions yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {essayQuestions.map((question) => {
              const questionResponses = responses[question.questionNumber] || [];
              
              return (
                <div key={question.questionNumber} className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
                  <div className="flex items-start gap-3 mb-6">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
                      {question.questionNumber}
                    </span>
                    <div className="flex-1">
                      <div 
                        className="prose prose-blue max-w-none"
                        dangerouslySetInnerHTML={{ __html: question.question }}
                      />
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        {questionResponses.length} {questionResponses.length === 1 ? 'response' : 'responses'}
                      </p>
                    </div>
                  </div>

                  {questionResponses.length === 0 ? (
                    <div className="ml-11 p-4 bg-gray-50 rounded-lg text-[var(--color-text-secondary)] text-sm">
                      No responses yet for this question
                    </div>
                  ) : (
                    <div className="ml-11 space-y-4">
                      {questionResponses.map((resp) => (
                        <div 
                          key={resp.id}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-4 mb-3 text-sm text-[var(--color-text-secondary)]">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{resp.userName}</span>
                              <span className="text-xs">({resp.userEmail})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(resp.submittedAt)}</span>
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded border border-gray-200 whitespace-pre-wrap">
                            {resp.response}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
