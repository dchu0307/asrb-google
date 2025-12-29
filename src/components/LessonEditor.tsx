import { useState, useEffect } from 'react';
import { GraduationCap, Save, X, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { RichTextEditor } from './RichTextEditor';

interface Question {
  question: string;
  type: 'multiple-choice' | 'essay';
  options: string[];
  correctAnswer: number;
  explanation: string;
  optionExplanations?: string[]; // Individual explanations for each option
}

interface LessonEditorProps {
  accessToken: string;
  lessonId?: string;
  onSave: () => void;
  onCancel: () => void;
}

export function LessonEditor({ accessToken, lessonId, onSave, onCancel }: LessonEditorProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Lesson metadata
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  
  // Lesson content
  const [sections, setSections] = useState<Array<{ heading: string; content: string }>>([
    { heading: '', content: '' }
  ]);
  
  // Questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    }
  ]);

  useEffect(() => {
    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  const fetchLesson = async () => {
    if (!lessonId) return;
    
    setLoading(true);
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
        const lesson = data.lesson;
        setTitle(lesson.title || '');
        setSubtitle(lesson.subtitle || '');
        setCategory(lesson.category || '');
        setSections(lesson.sections || [{ heading: '', content: '' }]);
        setQuestions(lesson.questions || [{
          question: '',
          type: 'multiple-choice',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: '',
        }]);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const lessonData = {
        title,
        subtitle,
        category,
        sections,
        questions,
      };

      const url = lessonId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons/${lessonId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons`;

      const response = await fetch(url, {
        method: lessonId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(lessonData),
      });

      if (response.ok) {
        onSave();
      } else {
        const data = await response.json();
        console.error('Failed to save lesson:', data.error);
        alert('Failed to save lesson. Please try again.');
      }
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('An error occurred while saving. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setSections([...sections, { heading: '', content: '' }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: 'heading' | 'content', value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateQuestionOption = (qIndex: number, optIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const updateOptionExplanation = (qIndex: number, optIndex: number, value: string) => {
    const newQuestions = [...questions];
    if (!newQuestions[qIndex].optionExplanations) {
      newQuestions[qIndex].optionExplanations = ['', '', '', ''];
    }
    newQuestions[qIndex].optionExplanations![optIndex] = value;
    setQuestions(newQuestions);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">Loading lesson...</div>
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
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-[var(--color-primary)]" />
              <span className="font-['Outfit'] text-xl text-[var(--color-primary-dark)]">
                {lessonId ? 'Edit Lesson' : 'Create Lesson'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-[var(--color-text-secondary)] hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Lesson'}
            </button>
          </div>
        </div>
      </header>

      {/* Editor Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Basic Info */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-6">
          <h2 className="mb-4">Lesson Information</h2>
          
          <div className="mb-4">
            <label className="block text-sm mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Business Ethics, Science, History"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lesson title"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description of the lesson"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </section>

        {/* Content Sections */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="m-0">Content Sections</h2>
            <button
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-[var(--color-primary)] rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-6 p-4 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--color-text-secondary)]">Section {index + 1}</span>
                {sections.length > 1 && (
                  <button
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="mb-3">
                <label className="block text-sm mb-2">Section Heading</label>
                <RichTextEditor
                  value={section.heading}
                  onChange={(value) => updateSection(index, 'heading', value)}
                  placeholder="Section heading"
                  minHeight="60px"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Section Content</label>
                <RichTextEditor
                  value={section.content}
                  onChange={(value) => updateSection(index, 'content', value)}
                  placeholder="Section content"
                  minHeight="200px"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Questions */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="m-0">Quiz Questions</h2>
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-[var(--color-primary)] rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--color-text-secondary)]">Question {qIndex + 1}</span>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-2">Question</label>
                <RichTextEditor
                  value={q.question}
                  onChange={(value) => updateQuestion(qIndex, 'question', value)}
                  placeholder="Enter your question"
                  minHeight="80px"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-2">Question Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={q.type === 'multiple-choice'}
                      onChange={() => updateQuestion(qIndex, 'type', 'multiple-choice')}
                      className="cursor-pointer"
                    />
                    <span>Multiple Choice</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={q.type === 'essay'}
                      onChange={() => updateQuestion(qIndex, 'type', 'essay')}
                      className="cursor-pointer"
                    />
                    <span>Essay / Open-Ended</span>
                  </label>
                </div>
              </div>

              {q.type === 'multiple-choice' ? (
                <>
                  <div className="mb-3">
                    <label className="block text-sm mb-2">Answer Options</label>
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.correctAnswer === optIndex}
                            onChange={() => updateQuestion(qIndex, 'correctAnswer', optIndex)}
                            className="flex-shrink-0 mt-3"
                          />
                          <div className="flex-1">
                            <label className="block text-xs text-[var(--color-text-secondary)] mb-1">
                              Option {String.fromCharCode(65 + optIndex)}
                            </label>
                            <RichTextEditor
                              value={option}
                              onChange={(value) => updateQuestionOption(qIndex, optIndex, value)}
                              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              minHeight="60px"
                            />
                          </div>
                        </div>
                        <div className="ml-7">
                          <label className="block text-xs text-[var(--color-text-secondary)] mb-1">
                            Option {String.fromCharCode(65 + optIndex)} Explanation (optional)
                          </label>
                          <RichTextEditor
                            value={q.optionExplanations?.[optIndex] || ''}
                            onChange={(value) => updateOptionExplanation(qIndex, optIndex, value)}
                            placeholder={`Explanation for option ${String.fromCharCode(65 + optIndex)} (leave blank to use general explanation)`}
                            minHeight="60px"
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                      Select the correct answer using the radio button
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-2">General Explanation</label>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                      This explanation will be used for any option that doesn't have its own specific explanation
                    </p>
                    <RichTextEditor
                      value={q.explanation}
                      onChange={(value) => updateQuestion(qIndex, 'explanation', value)}
                      placeholder="General explanation (used as fallback if option explanations are not provided)"
                      minHeight="80px"
                    />
                  </div>
                </>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Students will provide a written response to this question. You'll be able to view all responses in the lesson viewer.
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}