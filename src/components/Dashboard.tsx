import { useState, useEffect } from 'react';
import { GraduationCap, Plus, Edit, Trash2, LogOut, BookOpen, Search, FileText, Upload, Folder, ChevronRight } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { supabase } from '../utils/supabase/client';

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardProps {
  accessToken: string;
  userName: string;
  userRole: 'creator' | 'student';
  onLogout: () => void;
  onCreateLesson: () => void;
  onEditLesson: (lessonId: string) => void;
  onViewLesson: (lessonId: string) => void;
  onBrowseLessons: () => void;
  onViewResponses: (lessonId: string) => void;
  onViewModule: (moduleName: string) => void;
}

export function Dashboard({ 
  accessToken, 
  userName,
  userRole,
  onLogout, 
  onCreateLesson, 
  onEditLesson,
  onViewLesson,
  onBrowseLessons,
  onViewResponses,
  onViewModule
}: DashboardProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [expectedLessonCount, setExpectedLessonCount] = useState<number | null>(null);

  // Define the four modules
  const modules = [
    {
      name: 'Responsible Sourcing',
      description: 'Ethical labor, transparency, environmental management, and business rationale',
      color: 'from-blue-600 to-blue-700',
      icon: '🌍',
      lessonCount: 0
    },
    {
      name: 'General Solutions',
      description: 'OECD guidance, Comply Chain, auditing, codes of conduct, training, and ESG reporting',
      color: 'from-purple-600 to-purple-700',
      icon: '⚙️',
      lessonCount: 0
    },
    {
      name: 'Emerging Technology & AI Integration',
      description: 'Data analytics, optimization, predictive monitoring, and AI tools for supply chain management',
      color: 'from-emerald-600 to-emerald-700',
      icon: '🤖',
      lessonCount: 0
    },
    {
      name: 'Personalized Modules & Report Updates',
      description: 'Custom modules and reporting updates tailored to your organization',
      color: 'from-amber-600 to-amber-700',
      icon: '📊',
      lessonCount: 0
    }
  ];

  // Calculate lesson count per module
  const modulesWithCounts = modules.map(module => ({
    ...module,
    lessonCount: lessons.filter(lesson => lesson.category === module.name).length
  }));

  useEffect(() => {
    const initialize = async () => {
      console.log('[Dashboard] Starting initialization for role:', userRole);
      await initializeCurriculum();
      console.log('[Dashboard] Curriculum init complete, now fetching lessons...');
      await fetchLessons();
      console.log('[Dashboard] Initialization complete');
    };
    initialize();
  }, []);

  // Initialize curriculum on first login
  const initializeCurriculum = async () => {
    try {
      const token = await getFreshToken();
      if (!token) {
        console.error('[Dashboard] No token available for curriculum init');
        return;
      }

      console.log('[Dashboard] Initializing curriculum for role:', userRole);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/init-curriculum`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('[Dashboard] Curriculum init response:', data);
        if (data.expectedLessonCount) {
          setExpectedLessonCount(data.expectedLessonCount);
        }
        if (!data.skipped) {
          console.log(`[Dashboard] ✓ Initialized ${data.lessonCount} curriculum lessons`);
        } else {
          console.log('[Dashboard] ✓ Curriculum already initialized');
        }
      } else {
        const errorText = await response.text();
        console.error('[Dashboard] Failed to initialize curriculum:', response.status, errorText);
      }
    } catch (error) {
      console.error('[Dashboard] Error initializing curriculum:', error);
    }
  };

  // Helper function to get a fresh access token
  const getFreshToken = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('Got fresh token from session');
        return session.access_token;
      }
      
      // Fallback to the prop if session not found
      if (accessToken) {
        console.log('Using accessToken from props as fallback');
        return accessToken;
      }
      
      console.error('No session found and no accessToken prop available');
      return null;
    } catch (error) {
      console.error('Error getting fresh token:', error);
      // Final fallback to prop
      if (accessToken) {
        console.log('Exception occurred, using accessToken from props');
        return accessToken;
      }
      return null;
    }
  };

  const fetchLessons = async () => {
    try {
      // Get a fresh token to ensure it's not expired
      const token = await getFreshToken();
      if (!token) {
        console.error('Failed to get fresh token');
        setLoading(false);
        return;
      }

      console.log('Fetching lessons with token...');
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers.get('content-type'));

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response (first 500 chars):', text.substring(0, 500));
        
        // Try health check to see if server is running
        console.log('Checking server health...');
        try {
          const healthResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/health`);
          const healthData = await healthResponse.json();
          console.log('Health check response:', healthData);
          console.error('Server is running but /lessons endpoint returned HTML. This may be a Supabase Edge Function deployment issue.');
        } catch (healthError) {
          console.error('Health check failed. Server may not be deployed or running:', healthError);
          console.error('SOLUTION: The Edge Function server needs to be deployed. This is handled automatically by Figma Make.');
        }
        
        setLessons([]);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (response.ok) {
        console.log('Successfully loaded lessons:', data.lessons?.length || 0);
        setLessons(data.lessons || []);
      } else {
        console.error('Failed to fetch lessons:', data.error);
        // If unauthorized, it might be a session issue
        if (response.status === 401) {
          console.error('Authorization error - token may be expired. Please log out and log back in.');
        }
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
      // Set empty lessons array on error to prevent UI issues
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons/${lessonId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setLessons(lessons.filter(l => l.id !== lessonId));
        setDeleteConfirm(null);
      } else {
        console.error('Failed to delete lesson');
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Manual curriculum load for existing accounts
  const handleLoadCurriculum = async () => {
    setLoadingCurriculum(true);
    try {
      const token = await getFreshToken();
      if (!token) {
        console.error('[LoadCurriculum] No token available');
        setLoadingCurriculum(false);
        return;
      }

      console.log('[LoadCurriculum] Loading curriculum with force flag...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/init-curriculum?force=true`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('[LoadCurriculum] Success:', data);
        if (data.expectedLessonCount) {
          setExpectedLessonCount(data.expectedLessonCount);
        }
        alert(`Successfully loaded ${data.lessonCount} curriculum lessons!`);
        // Refresh lessons
        await fetchLessons();
      } else {
        const errorText = await response.text();
        console.error('[LoadCurriculum] Failed:', response.status, errorText);
        alert('Failed to load curriculum. Please check console for details.');
      }
    } catch (error) {
      console.error('[LoadCurriculum] Error:', error);
      alert('Error loading curriculum. Please check console for details.');
    } finally {
      setLoadingCurriculum(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-[var(--color-primary)]" />
            <span className="font-['Outfit'] text-xl text-[var(--color-primary-dark)]">EduLearn</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--color-text-secondary)]">Welcome, {userName}</span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Reload Curriculum Banner - Shows for all users */}
        {lessons.length > 0 && expectedLessonCount !== null && lessons.length < expectedLessonCount && (
          <div className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white mb-2">🎉 New Content Available!</h3>
                <p className="text-green-100 m-0">
                  We've added new interactive activities to the curriculum. Reload to get {expectedLessonCount - lessons.length} new lesson{expectedLessonCount - lessons.length !== 1 ? 's' : ''}!
                </p>
              </div>
              <button
                onClick={handleLoadCurriculum}
                disabled={loadingCurriculum}
                className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 hover:bg-green-50 rounded-lg transition-colors font-['Outfit'] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <Upload className="w-5 h-5" />
                {loadingCurriculum ? 'Loading...' : 'Reload Curriculum'}
              </button>
            </div>
          </div>
        )}

        {/* Browse All Lessons Banner */}
        <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-2">Explore the Library</h2>
              <p className="text-purple-100 m-0">
                Browse lessons created by educators from around the world
              </p>
            </div>
            <button
              onClick={onBrowseLessons}
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-700 hover:bg-purple-50 rounded-lg transition-colors font-['Outfit']"
            >
              <Search className="w-5 h-5" />
              Browse All Lessons
            </button>
          </div>
        </div>

        {/* My Lessons Section - Only show for creators or if student has lessons */}
        {userRole === 'creator' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1>My Lessons</h1>
                <p className="text-[var(--color-text-secondary)] text-lg">
                  Create, edit, and manage your interactive lessons
                </p>
              </div>
              <button
                onClick={onCreateLesson}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Lesson
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-[var(--color-text-secondary)]">
                Loading lessons...
              </div>
            ) : lessons.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-border)] mb-16">
                <BookOpen className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4" />
                <h3 className="mb-2">No lessons found</h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Load the built-in curriculum{expectedLessonCount ? ` (${expectedLessonCount} lessons)` : ''} or create your own
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleLoadCurriculum}
                    disabled={loadingCurriculum}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-5 h-5" />
                    {loadingCurriculum ? 'Loading...' : 'Load Curriculum (15 Lessons)'}
                  </button>
                  <button
                    onClick={onCreateLesson}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Custom Lesson
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-blue-100 text-[var(--color-primary)] rounded-full text-sm mb-3">
                        {lesson.category}
                      </div>
                      <h3 className="mb-2 line-clamp-2">{lesson.title}</h3>
                      <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                        {lesson.subtitle}
                      </p>
                      <div className="text-xs text-[var(--color-text-secondary)] mb-4">
                        Updated {formatDate(lesson.updatedAt)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewLesson(lesson.id)}
                          className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onViewResponses(lesson.id)}
                          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                          title="View Student Responses"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditLesson(lesson.id)}
                          className="px-4 py-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {deleteConfirm === lesson.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(lesson.id)}
                              className="px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(lesson.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Student Dashboard - Show saved lessons */}
        {userRole === 'student' && lessons.length > 0 && (
          <>
            <div className="mb-8">
              <h1>My Saved Lessons</h1>
              <p className="text-[var(--color-text-secondary)] text-lg">
                Lessons you've added from the library
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-[var(--color-primary)] rounded-full text-sm mb-3">
                      {lesson.category}
                    </div>
                    <h3 className="mb-2 line-clamp-2">{lesson.title}</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                      {lesson.subtitle}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewLesson(lesson.id)}
                        className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] rounded-lg transition-colors"
                      >
                        Start Learning
                      </button>
                      {deleteConfirm === lesson.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(lesson.id)}
                            className="px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors text-sm"
                            title="Confirm Delete"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(lesson.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from My Lessons"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modules Section */}
        <div className="mt-16">
          <h2 className="mb-6">Curriculum Modules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {modulesWithCounts.map(module => (
              <button
                key={module.name}
                onClick={() => onViewModule(module.name)}
                className={`bg-gradient-to-br ${module.color} rounded-2xl p-8 text-white text-left hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{module.icon}</div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {module.lessonCount} {module.lessonCount === 1 ? 'lesson' : 'lessons'}
                  </div>
                </div>
                <h3 className="text-white mb-3">{module.name}</h3>
                <p className="text-white/90 text-sm mb-6">
                  {module.description}
                </p>
                <div className="flex items-center gap-2 text-white font-medium">
                  <span>Explore Module</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}