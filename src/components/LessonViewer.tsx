import { useState, useEffect } from 'react';
import { BookOpen, Clock, GraduationCap, ArrowLeft } from 'lucide-react';
import { QuizQuestion } from './QuizQuestion';
import { SupplierEthicsActivity } from './SupplierEthicsActivity';
import { SupplyChainMapActivity } from './SupplyChainMapActivity';
import { AIDetectiveDeskActivity } from './AIDetectiveDeskActivity';
import { DigitalTwinFactoryActivity } from './DigitalTwinFactoryActivity';
import { SupplyChainCompassActivity } from './SupplyChainCompassActivity';
import { SupplyChainMappingActivity } from './SupplyChainMappingActivity';
import { MonitoringSimulationActivity } from './MonitoringSimulationActivity';
import { GeospatialMappingActivity } from './GeospatialMappingActivity';
import { TransparencyTraceabilityChecklistActivity } from './TransparencyTraceabilityChecklistActivity';
import { ProductMappingExerciseActivity } from './ProductMappingExerciseActivity';
import { TraceabilityToolsMatchingActivity } from './TraceabilityToolsMatchingActivity';
import { SupplierCaseStudyActivity } from './SupplierCaseStudyActivity';
import { projectId } from '../utils/supabase/info';

interface Question {
  question: string;
  type?: 'multiple-choice' | 'essay';
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  optionExplanations?: string[];
  isEssay?: boolean;
}

interface Section {
  heading: string;
  content: string;
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'interactive-activity';
  text?: string;
  items?: string[];
  component?: 'SupplierEthicsActivity' | 'SupplyChainMapActivity' | 'AIDetectiveDeskActivity' | 'DigitalTwinFactoryActivity' | 'SupplyChainCompassActivity' | 'SupplyChainMappingActivity' | 'MonitoringSimulationActivity' | 'GeospatialMappingActivity' | 'TransparencyTraceabilityChecklistActivity' | 'ProductMappingExerciseActivity' | 'TraceabilityToolsMatchingActivity' | 'SupplierCaseStudyActivity';
}

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty?: string;
  objectives?: string[];
  sections?: Section[];
  content?: ContentBlock[];
  questions?: Question[];
  quiz?: Question[];
}

interface LessonViewerProps {
  accessToken: string;
  lessonId: string;
  onBack: () => void;
}

export function LessonViewer({ accessToken, lessonId, onBack }: LessonViewerProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons/${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok && data.lesson) {
        setLesson(data.lesson);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text-secondary)] mb-4">Lesson not found</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-[var(--color-primary)]" />
              <span className="font-['Outfit'] text-xl text-[var(--color-primary-dark)]">EduLearn</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">15 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Lesson</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-8">
          {lesson.category && (
            <div className="inline-block px-3 py-1 bg-blue-100 text-[var(--color-primary)] rounded-full text-sm mb-4">
              {lesson.category}
            </div>
          )}
          <h1>{lesson.title}</h1>
          {lesson.subtitle && (
            <p className="text-[var(--color-text-secondary)] text-lg">
              {lesson.subtitle}
            </p>
          )}
        </div>

        {/* Learning Objectives - for curriculum lessons */}
        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-10">
            <h3 className="mt-0 mb-4 text-blue-900">Learning Objectives</h3>
            <ul className="list-disc pl-6 space-y-2 mb-0">
              {lesson.objectives.map((objective, index) => (
                <li key={index} className="text-blue-900">{objective}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Blocks - for curriculum lessons */}
        {lesson.content && lesson.content.map((block, index) => (
          <div key={index} className="mb-6">
            {block.type === 'heading' && (
              <h2 className="mt-8 mb-4">{block.text}</h2>
            )}
            {block.type === 'paragraph' && (
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                {block.text}
              </p>
            )}
            {block.type === 'list' && block.items && (
              <ul className="list-disc pl-6 space-y-3 mb-6">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[var(--color-text)] leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'SupplierEthicsActivity' && (
              <section className="mb-12">
                <SupplierEthicsActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'SupplyChainMapActivity' && (
              <section className="mb-12">
                <SupplyChainMapActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'AIDetectiveDeskActivity' && (
              <section className="mb-12">
                <AIDetectiveDeskActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'DigitalTwinFactoryActivity' && (
              <section className="mb-12">
                <DigitalTwinFactoryActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'SupplyChainCompassActivity' && (
              <section className="mb-12">
                <SupplyChainCompassActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'SupplyChainMappingActivity' && (
              <section className="mb-12">
                <SupplyChainMappingActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'MonitoringSimulationActivity' && (
              <section className="mb-12">
                <MonitoringSimulationActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'GeospatialMappingActivity' && (
              <section className="mb-12">
                <GeospatialMappingActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'TransparencyTraceabilityChecklistActivity' && (
              <section className="mb-12">
                <TransparencyTraceabilityChecklistActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'ProductMappingExerciseActivity' && (
              <section className="mb-12">
                <ProductMappingExerciseActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'TraceabilityToolsMatchingActivity' && (
              <section className="mb-12">
                <TraceabilityToolsMatchingActivity />
              </section>
            )}
            {block.type === 'interactive-activity' && (block as any).component === 'SupplierCaseStudyActivity' && (
              <section className="mb-12">
                <SupplierCaseStudyActivity />
              </section>
            )}
          </div>
        ))}

        {/* Content Sections - for custom lessons */}
        {lesson.sections && lesson.sections.map((section, index) => (
          <section key={index} className="mb-10">
            {section.heading && (
              <div 
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: section.heading }}
              />
            )}
            {section.content && (
              <div 
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </section>
        ))}

        {/* Quiz Section - handle both 'quiz' and 'questions' arrays, but skip if this is an interactive activity */}
        {!lesson.title?.includes('Interactive Activity:') && ((lesson.quiz && lesson.quiz.length > 0) || (lesson.questions && lesson.questions.length > 0)) && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
              <h2 className="text-white mt-0">Test Your Knowledge</h2>
              <p className="m-0 text-blue-100">
                Answer the following questions to check your understanding. Click on your answer choice to see immediate feedback!
              </p>
            </div>

            {(lesson.quiz || lesson.questions || []).map((q, index) => (
              <QuizQuestion
                key={index}
                question={q.question}
                type={q.isEssay ? 'essay' : (q.type || 'multiple-choice')}
                options={q.options || []}
                correctAnswer={q.correctAnswer}
                explanation={q.explanation || ''}
                questionNumber={index + 1}
                optionExplanations={q.optionExplanations}
                lessonId={lessonId}
                accessToken={accessToken}
              />
            ))}
          </section>
        )}

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] pt-8 mt-12">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}