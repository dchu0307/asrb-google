import { useState, useEffect } from 'react';
import { GraduationCap, Search, BookOpen, User, ArrowLeft, Filter, Plus, Check } from 'lucide-react';
import { projectId } from '../utils/supabase/info';

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  createdAt: string;
  userId: string;
}

interface BrowseLessonsProps {
  accessToken: string;
  userRole: 'creator' | 'student';
  currentUserId: string;
  onViewLesson: (lessonId: string) => void;
  onBack: () => void;
}

export function BrowseLessons({ accessToken, userRole, currentUserId, onViewLesson, onBack }: BrowseLessonsProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [addingLesson, setAddingLesson] = useState<string | null>(null);
  const [addedLessons, setAddedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAllLessons();
  }, []);

  const fetchAllLessons = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/browse/lessons`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok && data.lessons) {
        setLessons(data.lessons);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['All Categories', ...new Set(lessons.map(l => l.category).filter(Boolean))];

  // Filter lessons based on search and category
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = searchQuery === '' || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.authorName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || lesson.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group lessons by category
  const lessonsByCategory: { [key: string]: Lesson[] } = {};
  filteredLessons.forEach(lesson => {
    const cat = lesson.category || 'Uncategorized';
    if (!lessonsByCategory[cat]) {
      lessonsByCategory[cat] = [];
    }
    lessonsByCategory[cat].push(lesson);
  });

  // Sort categories alphabetically
  const sortedCategories = Object.keys(lessonsByCategory).sort();

  const handleAddLesson = async (lessonId: string) => {
    setAddingLesson(lessonId);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons/${lessonId}/add-to-dashboard`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (response.ok && data.success) {
        setAddedLessons(prev => new Set([...prev, lessonId]));
      }
    } catch (error) {
      console.error('Error adding lesson:', error);
    } finally {
      setAddingLesson(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-[var(--color-primary)]" />
                <span className="font-['Outfit'] text-xl text-[var(--color-primary-dark)]">Browse All Lessons</span>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons by title, category, or author..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white appearance-none cursor-pointer min-w-[200px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12 text-[var(--color-text-secondary)]">
            Loading lessons...
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4 opacity-50" />
            <p className="text-[var(--color-text-secondary)] mb-2">No lessons found</p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}
                className="text-[var(--color-primary)] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-6 text-[var(--color-text-secondary)]">
              Showing {filteredLessons.length} {filteredLessons.length === 1 ? 'lesson' : 'lessons'}
            </div>

            {/* Lessons grouped by category */}
            {sortedCategories.map(category => (
              <div key={category} className="mb-10">
                <h2 className="mb-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm">
                    {lessonsByCategory[category].length}
                  </span>
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessonsByCategory[category].map(lesson => (
                    <div
                      key={lesson.id}
                      onClick={() => onViewLesson(lesson.id)}
                      className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-primary)] transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
                          {lesson.userId === currentUserId && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Your Lesson
                            </span>
                          )}
                        </div>
                        {userRole === 'student' && lesson.userId !== currentUserId && !addedLessons.has(lesson.id) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddLesson(lesson.id);
                            }}
                            disabled={addingLesson === lesson.id}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                            title="Add to My Lessons"
                          >
                            {addingLesson === lesson.id ? (
                              <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Plus className="w-5 h-5 text-[var(--color-primary)]" />
                            )}
                          </button>
                        )}
                        {addedLessons.has(lesson.id) && (
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                      </div>
                      
                      <h3 className="mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {lesson.title}
                      </h3>
                      
                      {lesson.subtitle && (
                        <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                          {lesson.subtitle}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)]">
                        <User className="w-4 h-4" />
                        <span>{lesson.authorName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}