import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, ChevronRight, Star } from 'lucide-react';
import { projectId } from '../utils/supabase/info';

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface Recommendations {
  responsibleSourcing: 'advanced' | 'all';
  generalSolutions: 'advanced' | 'all';
  emergingTech: 'advanced' | 'all';
}

interface ModuleViewerProps {
  moduleName: string;
  accessToken: string;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export function ModuleViewer({ moduleName, accessToken, onBack, onSelectLesson }: ModuleViewerProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);

  useEffect(() => {
    fetchModuleLessons();
    fetchRecommendations();
  }, [moduleName]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/recommendations`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log('Recommendations response:', data);
      
      if (response.ok && data.recommendations) {
        setRecommendations(data.recommendations);
        console.log('Set recommendations:', data.recommendations);
      } else {
        console.log('No recommendations found or error');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchModuleLessons = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Filter lessons by category (module name)
        const moduleLessons = (data.lessons || []).filter(
          (lesson: Lesson) => lesson.category === moduleName
        );
        setLessons(moduleLessons);
      } else {
        console.error('Failed to fetch lessons:', data.error);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    onSelectLesson(lessonId);
  };

  // Check if a lesson is recommended
  const isLessonRecommended = (lesson: Lesson): boolean => {
    if (!recommendations) return true; // Show all as recommended if no quiz taken

    // Map module names to recommendation keys
    const moduleKey = 
      moduleName === 'Responsible Sourcing' ? 'responsibleSourcing' :
      moduleName === 'General Solutions' ? 'generalSolutions' :
      moduleName === 'Emerging Technology & AI Integration' ? 'emergingTech' :
      null;

    if (!moduleKey) return true;

    const recommendation = recommendations[moduleKey];
    
    // If 'all' lessons are recommended, show all
    if (recommendation === 'all') return true;

    // If 'advanced' only, check if lesson contains advanced keywords
    const title = lesson.title.toLowerCase();
    const subtitle = lesson.subtitle?.toLowerCase() || '';
    const advancedKeywords = ['advanced', 'complex', 'optimization', 'strategic', 'integration', 'ai', 'analytics', 'predictive'];
    
    return advancedKeywords.some(keyword => title.includes(keyword) || subtitle.includes(keyword));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-[var(--color-border)] flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </button>
          <h2 className="text-[var(--color-primary-dark)] mb-1">{moduleName}</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
          </p>
        </div>

        {/* Lessons List */}
        <nav className="flex-1 overflow-y-auto p-4">
          {recommendations && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span className="text-sm font-medium text-blue-900">Personalized for You</span>
              </div>
              <p className="text-xs text-blue-700">
                Starred lessons are recommended based on your knowledge assessment.
              </p>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8 text-[var(--color-text-secondary)]">
              Loading lessons...
            </div>
          ) : lessons.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-[var(--color-text-secondary)] mx-auto mb-3" />
              <p className="text-[var(--color-text-secondary)] text-sm">
                No lessons in this module yet
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {lessons.map((lesson, index) => {
                const isRecommended = isLessonRecommended(lesson);
                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => handleLessonClick(lesson.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedLessonId === lesson.id
                          ? 'bg-[var(--color-primary)] text-white shadow-md'
                          : 'hover:bg-gray-50 text-[var(--color-text)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          selectedLessonId === lesson.id
                            ? 'bg-white text-[var(--color-primary)]'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium ${
                              selectedLessonId === lesson.id ? 'text-white' : 'text-[var(--color-text)]'
                            }`}>
                              {lesson.title}
                            </span>
                            {isRecommended && recommendations && (
                              <Star className={`w-4 h-4 flex-shrink-0 ${
                                selectedLessonId === lesson.id ? 'text-yellow-300' : 'text-yellow-500'
                              }`} fill="currentColor" />
                            )}
                          </div>
                          <div className={`text-sm line-clamp-2 ${
                            selectedLessonId === lesson.id ? 'text-blue-100' : 'text-[var(--color-text-secondary)]'
                          }`}>
                            {lesson.subtitle}
                          </div>
                        </div>
                        {selectedLessonId === lesson.id && (
                          <ChevronRight className="w-5 h-5 text-white flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-12">
        <div className="text-center max-w-md">
          <BookOpen className="w-24 h-24 text-[var(--color-text-secondary)] mx-auto mb-6 opacity-50" />
          <h2 className="text-[var(--color-text)] mb-3">Select a Lesson</h2>
          <p className="text-[var(--color-text-secondary)]">
            Choose a lesson from the sidebar to begin learning
          </p>
        </div>
      </main>
    </div>
  );
}