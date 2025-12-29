import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase/client';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { LessonEditor } from './components/LessonEditor';
import { LessonViewer } from './components/LessonViewer';
import { BrowseLessons } from './components/BrowseLessons';
import { EssayResponses } from './components/EssayResponses';
import { ModuleViewer } from './components/ModuleViewer';
import { OnboardingQuiz } from './components/OnboardingQuiz';

type Page = 
  | { type: 'auth' }
  | { type: 'onboarding' }
  | { type: 'dashboard' }
  | { type: 'browse' }
  | { type: 'create' }
  | { type: 'edit'; lessonId: string }
  | { type: 'view'; lessonId: string }
  | { type: 'responses'; lessonId: string }
  | { type: 'module'; moduleName: string };

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<'creator' | 'student'>('student');
  const [userId, setUserId] = useState<string>('');
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'auth' });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkSession();
    
    // Set up auth state listener to handle token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session ? 'session exists' : 'no session');
      
      if (event === 'SIGNED_OUT') {
        setAccessToken(null);
        setUserName('');
        setUserId('');
        setCurrentPage({ type: 'auth' });
      } else if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        if (session) {
          console.log('Token refreshed or signed in, updating access token');
          setAccessToken(session.access_token);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      console.log('Checking for existing session...');
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('Session found:', { 
          userId: session.user.id, 
          role: session.user.user_metadata?.role,
          tokenLength: session.access_token?.length 
        });
        setAccessToken(session.access_token);
        setUserName(session.user.user_metadata?.name || 'User');
        const role = session.user.user_metadata?.role || 'student';
        const onboarded = session.user.user_metadata?.onboardingComplete || false;
        
        setUserRole(role);
        setUserId(session.user.id);
        setOnboardingComplete(onboarded);
        
        // If student and hasn't completed onboarding, show quiz
        if (role === 'student' && !onboarded) {
          console.log('Student needs onboarding');
          setCurrentPage({ type: 'onboarding' });
        } else {
          console.log('Redirecting to dashboard');
          setCurrentPage({ type: 'dashboard' });
        }
      } else {
        console.log('No active session found');
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleAuthSuccess = (token: string, name: string) => {
    console.log('handleAuthSuccess called:', { 
      hasToken: !!token, 
      tokenLength: token?.length,
      name 
    });
    setAccessToken(token);
    setUserName(name);
    // Get the user ID and role from the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log('Got user session after auth:', {
          userId: session.user.id,
          role: session.user.user_metadata?.role
        });
        setUserId(session.user.id);
        const role = session.user.user_metadata?.role || 'student';
        const onboarded = session.user.user_metadata?.onboardingComplete || false;
        
        setUserRole(role);
        setOnboardingComplete(onboarded);
        
        // If student and hasn't completed onboarding, show quiz
        if (role === 'student' && !onboarded) {
          setCurrentPage({ type: 'onboarding' });
        } else {
          setCurrentPage({ type: 'dashboard' });
        }
      }
    });
  };

  const handleQuizComplete = async (answers: any) => {
    if (!accessToken) return;

    console.log('Quiz completed with answers:', answers);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/onboarding-quiz`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers),
        }
      );

      const data = await response.json();
      console.log('Quiz save response:', data);
      
      if (response.ok) {
        setOnboardingComplete(true);
        setCurrentPage({ type: 'dashboard' });
        
        // Refresh session to get updated metadata
        const { data: sessionData } = await supabase.auth.refreshSession();
        console.log('Refreshed session:', sessionData);
      } else {
        console.error('Failed to save quiz:', data);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAccessToken(null);
    setUserName('');
    setUserId('');
    setCurrentPage({ type: 'auth' });
  };

  const handleCreateLesson = () => {
    setCurrentPage({ type: 'create' });
  };

  const handleEditLesson = (lessonId: string) => {
    setCurrentPage({ type: 'edit', lessonId });
  };

  const handleViewLesson = (lessonId: string) => {
    setCurrentPage({ type: 'view', lessonId });
  };

  const handleSaveLesson = () => {
    setCurrentPage({ type: 'dashboard' });
  };

  const handleCancelEdit = () => {
    setCurrentPage({ type: 'dashboard' });
  };

  const handleBackToDashboard = () => {
    setCurrentPage({ type: 'dashboard' });
  };

  const handleBrowseLessons = () => {
    setCurrentPage({ type: 'browse' });
  };

  const handleViewResponses = (lessonId: string) => {
    setCurrentPage({ type: 'responses', lessonId });
  };

  const handleViewModule = (moduleName: string) => {
    setCurrentPage({ type: 'module', moduleName });
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">Loading...</div>
      </div>
    );
  }

  if (!accessToken) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const page = currentPage;

  // Render current page
  if (page.type === 'onboarding') {
    return (
      <OnboardingQuiz
        accessToken={accessToken}
        onComplete={handleQuizComplete}
      />
    );
  }

  if (page.type === 'auth') {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  switch (page.type) {
    case 'dashboard':
      return (
        <Dashboard
          accessToken={accessToken}
          userName={userName}
          userRole={userRole}
          onLogout={handleLogout}
          onCreateLesson={handleCreateLesson}
          onEditLesson={handleEditLesson}
          onViewLesson={handleViewLesson}
          onBrowseLessons={handleBrowseLessons}
          onViewResponses={handleViewResponses}
          onViewModule={handleViewModule}
        />
      );

    case 'browse':
      return (
        <BrowseLessons
          accessToken={accessToken}
          userRole={userRole}
          currentUserId={userId}
          onViewLesson={handleViewLesson}
          onBack={handleBackToDashboard}
        />
      );

    case 'create':
      return (
        <LessonEditor
          accessToken={accessToken}
          onSave={handleSaveLesson}
          onCancel={handleCancelEdit}
        />
      );

    case 'edit':
      return (
        <LessonEditor
          accessToken={accessToken}
          lessonId={page.lessonId}
          onSave={handleSaveLesson}
          onCancel={handleCancelEdit}
        />
      );

    case 'view':
      return (
        <LessonViewer
          accessToken={accessToken}
          lessonId={page.lessonId}
          onBack={handleBackToDashboard}
        />
      );

    case 'responses':
      return (
        <EssayResponses
          accessToken={accessToken}
          lessonId={page.lessonId}
          onBack={handleBackToDashboard}
        />
      );

    case 'module':
      return (
        <ModuleViewer
          accessToken={accessToken}
          moduleName={page.moduleName}
          onBack={handleBackToDashboard}
          onSelectLesson={handleViewLesson}
        />
      );

    default:
      return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }
}