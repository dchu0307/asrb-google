import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';
import { curriculumLessons } from './curriculum-seed.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Health check endpoint
app.get('/make-server-b28f81bc/health', (c) => {
  return c.json({ status: 'ok', message: 'Server is running' });
});

// User signup
app.post('/make-server-b28f81bc/signup', async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: role || 'student' },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Create a new lesson
app.post('/make-server-b28f81bc/lessons', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lessonData = await c.req.json();
    const lessonId = crypto.randomUUID();
    const lessonKey = `lesson:${user.id}:${lessonId}`;
    const userLessonsKey = `user_lessons:${user.id}`;

    // Save lesson data
    await kv.set(lessonKey, {
      ...lessonData,
      id: lessonId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Add lesson ID to user's lesson list
    const existingLessons = await kv.get(userLessonsKey) || [];
    await kv.set(userLessonsKey, [...existingLessons, lessonId]);

    return c.json({ lessonId });
  } catch (error) {
    console.log('Create lesson error:', error);
    return c.json({ error: 'Failed to create lesson' }, 500);
  }
});

// Get all lessons for a user
app.get('/make-server-b28f81bc/lessons', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      console.log('GET /lessons - No access token provided');
      return c.json({ error: 'Unauthorized - No token' }, 401);
    }
    
    console.log('GET /lessons - Attempting to verify token...');
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError) {
      console.log('GET /lessons - Auth error:', authError.message);
      return c.json({ error: 'Unauthorized - ' + authError.message }, 401);
    }
    
    if (!user) {
      console.log('GET /lessons - No user found');
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    console.log('GET /lessons - User authenticated:', user.id);
    const userLessonsKey = `user_lessons:${user.id}`;
    const lessonIds = await kv.get(userLessonsKey) || [];
    console.log('GET /lessons - Found lesson IDs:', lessonIds.length);

    const lessons = await Promise.all(
      lessonIds.map(async (id: string) => {
        const lesson = await kv.get(`lesson:${user.id}:${id}`);
        return lesson;
      })
    );

    const filteredLessons = lessons.filter(Boolean);
    console.log('GET /lessons - Returning lessons:', filteredLessons.length);
    return c.json({ lessons: filteredLessons });
  } catch (error) {
    console.log('GET /lessons - Exception:', error);
    return c.json({ error: 'Failed to retrieve lessons' }, 500);
  }
});

// Get all public lessons (from all users)
app.get('/make-server-b28f81bc/browse/lessons', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get all lesson keys
    const allLessons = await kv.getByPrefix('lesson:');
    
    // Extract lesson data and add author info
    const lessons = await Promise.all(
      allLessons.map(async (lesson: any) => {
        // Get author info
        const { data: { user: author } } = await supabase.auth.admin.getUserById(lesson.userId);
        return {
          ...lesson,
          authorName: author?.user_metadata?.name || 'Anonymous',
          authorEmail: author?.email || '',
        };
      })
    );

    return c.json({ lessons });
  } catch (error) {
    console.log('Browse lessons error:', error);
    return c.json({ error: 'Failed to retrieve lessons' }, 500);
  }
});

// Get a specific lesson
app.get('/make-server-b28f81bc/lessons/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lessonId = c.req.param('id');
    
    // First try to get the lesson for the current user
    let lessonKey = `lesson:${user.id}:${lessonId}`;
    let lesson = await kv.get(lessonKey);

    // If not found, search for the lesson across all users
    if (!lesson) {
      const allLessons = await kv.getByPrefix('lesson:');
      lesson = allLessons.find((l: any) => l.id === lessonId);
    }

    if (!lesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }

    return c.json({ lesson });
  } catch (error) {
    console.log('Get lesson error:', error);
    return c.json({ error: 'Failed to retrieve lesson' }, 500);
  }
});

// Update a lesson
app.put('/make-server-b28f81bc/lessons/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lessonId = c.req.param('id');
    const lessonKey = `lesson:${user.id}:${lessonId}`;
    const existingLesson = await kv.get(lessonKey);

    if (!existingLesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }

    const updates = await c.req.json();
    await kv.set(lessonKey, {
      ...existingLesson,
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    return c.json({ success: true });
  } catch (error) {
    console.log('Update lesson error:', error);
    return c.json({ error: 'Failed to update lesson' }, 500);
  }
});

// Delete a lesson
app.delete('/make-server-b28f81bc/lessons/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lessonId = c.req.param('id');
    const lessonKey = `lesson:${user.id}:${lessonId}`;
    
    // Remove lesson
    await kv.del(lessonKey);

    // Remove from user's lesson list
    const userLessonsKey = `user_lessons:${user.id}`;
    const lessonIds = await kv.get(userLessonsKey) || [];
    await kv.set(userLessonsKey, lessonIds.filter((id: string) => id !== lessonId));

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete lesson error:', error);
    return c.json({ error: 'Failed to delete lesson' }, 500);
  }
});

// Clear all curriculum lessons (for bulk import)
app.post('/make-server-b28f81bc/clear-curriculum-lessons', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.log('Clear curriculum - auth error:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('Clear curriculum - user:', user.id, 'role:', user.user_metadata?.role);

    // Get all lessons for this user
    const userLessonsKey = `user_lessons:${user.id}`;
    const lessonIds = await kv.get(userLessonsKey) || [];
    
    console.log('Clear curriculum - total lessons:', lessonIds.length);
    
    // Get all lessons and check which are curriculum lessons
    const curriculumCategories = [
      'Responsible Sourcing',
      'General Solutions',
      'Emerging Technology & AI Integration',
      'Personalized Modules & Report Updates'
    ];
    
    const curriculumLessonIds: string[] = [];
    for (const lessonId of lessonIds) {
      const lessonKey = `lesson:${user.id}:${lessonId}`;
      const lesson = await kv.get(lessonKey);
      if (lesson && curriculumCategories.includes(lesson.category)) {
        console.log('Clear curriculum - deleting:', lesson.title, 'category:', lesson.category);
        curriculumLessonIds.push(lessonId);
        await kv.del(lessonKey);
      }
    }
    
    // Update user's lesson list to exclude curriculum lessons
    const remainingLessonIds = lessonIds.filter((id: string) => !curriculumLessonIds.includes(id));
    await kv.set(userLessonsKey, remainingLessonIds);

    console.log('Clear curriculum - deleted:', curriculumLessonIds.length, 'remaining:', remainingLessonIds.length);

    return c.json({ 
      success: true, 
      deleted: curriculumLessonIds.length 
    });
  } catch (error) {
    console.log('Clear curriculum lessons error:', error);
    return c.json({ error: 'Failed to clear curriculum lessons' }, 500);
  }
});

// Submit essay response
app.post('/make-server-b28f81bc/essay-responses', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { lessonId, questionNumber, response } = await c.req.json();
    const responseId = crypto.randomUUID();
    const responseKey = `essay_response:${lessonId}:${questionNumber}:${responseId}`;

    await kv.set(responseKey, {
      id: responseId,
      lessonId,
      questionNumber,
      response,
      userId: user.id,
      userEmail: user.email,
      userName: user.user_metadata?.name || 'Anonymous',
      submittedAt: new Date().toISOString(),
    });

    return c.json({ success: true, responseId });
  } catch (error) {
    console.log('Submit essay response error:', error);
    return c.json({ error: 'Failed to submit essay response' }, 500);
  }
});

// Get essay responses for a lesson (for lesson creator)
app.get('/make-server-b28f81bc/essay-responses/:lessonId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lessonId = c.req.param('lessonId');
    
    // Get all responses for this lesson
    const responses = await kv.getByPrefix(`essay_response:${lessonId}:`);

    // Group responses by question number
    const groupedResponses: { [key: number]: any[] } = {};
    responses.forEach((response: any) => {
      const qNum = response.questionNumber;
      if (!groupedResponses[qNum]) {
        groupedResponses[qNum] = [];
      }
      groupedResponses[qNum].push(response);
    });

    return c.json({ responses: groupedResponses });
  } catch (error) {
    console.log('Get essay responses error:', error);
    return c.json({ error: 'Failed to retrieve essay responses' }, 500);
  }
});

// Add lesson to student dashboard (copy lesson to student's lessons)
app.post('/make-server-b28f81bc/lessons/:id/add-to-dashboard', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const lessonId = c.req.param('id');
    
    // Find the original lesson
    const allLessons = await kv.getByPrefix('lesson:');
    const originalLesson = allLessons.find((l: any) => l.id === lessonId);
    
    if (!originalLesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }

    // Create a new lesson ID for the student's copy
    const newLessonId = crypto.randomUUID();
    const newLessonKey = `lesson:${user.id}:${newLessonId}`;
    const userLessonsKey = `user_lessons:${user.id}`;

    // Copy the lesson to student's account
    await kv.set(newLessonKey, {
      ...originalLesson,
      id: newLessonId,
      userId: user.id,
      originalLessonId: lessonId,
      originalAuthorId: originalLesson.userId,
      addedAt: new Date().toISOString(),
    });

    // Add to student's lesson list
    const existingLessons = await kv.get(userLessonsKey) || [];
    await kv.set(userLessonsKey, [...existingLessons, newLessonId]);

    return c.json({ success: true, lessonId: newLessonId });
  } catch (error) {
    console.log('Add lesson to dashboard error:', error);
    return c.json({ error: 'Failed to add lesson to dashboard' }, 500);
  }
});

// Update user role (temporary utility endpoint)
app.post('/make-server-b28f81bc/update-role', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { role } = await c.req.json();
    
    // Update user metadata
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { ...user.user_metadata, role } }
    );

    if (error) {
      console.log('Update role error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Update role exception:', error);
    return c.json({ error: 'Failed to update role' }, 500);
  }
});

// Save onboarding quiz results and generate recommendations
app.post('/make-server-b28f81bc/onboarding-quiz', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const answers = await c.req.json();
    
    // Generate recommendations based on scores
    // High score (4-5) = advanced only
    // Medium/Low score (1-3) = all lessons
    const recommendations = {
      responsibleSourcing: answers.responsibleSourcing >= 4 ? 'advanced' : 'all',
      generalSolutions: answers.generalSolutions >= 4 ? 'advanced' : 'all',
      emergingTech: answers.emergingTech >= 4 ? 'advanced' : 'all',
    };

    // Save quiz results
    await kv.set(`quiz_results:${user.id}`, {
      answers,
      recommendations,
      completedAt: new Date().toISOString(),
    });

    // Update user metadata to mark quiz as completed
    await supabase.auth.admin.updateUserById(
      user.id,
      { 
        user_metadata: { 
          ...user.user_metadata, 
          onboardingComplete: true,
          recommendations 
        } 
      }
    );

    return c.json({ success: true, recommendations });
  } catch (error) {
    console.log('Save onboarding quiz error:', error);
    return c.json({ error: 'Failed to save quiz results' }, 500);
  }
});

// Get user recommendations
app.get('/make-server-b28f81bc/recommendations', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const quizResults = await kv.get(`quiz_results:${user.id}`);
    
    if (!quizResults) {
      return c.json({ recommendations: null });
    }

    return c.json({ recommendations: quizResults.recommendations });
  } catch (error) {
    console.log('Get recommendations error:', error);
    return c.json({ error: 'Failed to retrieve recommendations' }, 500);
  }
});

// Initialize curriculum lessons for a user (auto-seed on first login)
app.post('/make-server-b28f81bc/init-curriculum', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('[init-curriculum] Starting curriculum initialization for user:', user.id);

    // Check if curriculum already initialized (unless force parameter is provided)
    const url = new URL(c.req.url);
    const force = url.searchParams.get('force') === 'true';
    
    const initKey = `curriculum_initialized:${user.id}`;
    const userLessonsKey = `user_lessons:${user.id}`;
    const alreadyInitialized = await kv.get(initKey);
    
    if (alreadyInitialized && !force) {
      console.log('[init-curriculum] Curriculum already initialized, skipping');
      return c.json({ 
        success: true, 
        message: 'Curriculum already initialized', 
        skipped: true,
        expectedLessonCount: curriculumLessons.length
      });
    }

    if (force) {
      console.log('[init-curriculum] Force flag set, re-initializing curriculum');
      
      // Delete all existing curriculum lessons
      const existingLessonsToCheck = await kv.get(userLessonsKey) || [];
      const lessonsToKeep: string[] = [];
      
      for (const lessonId of existingLessonsToCheck) {
        const lessonKey = `lesson:${user.id}:${lessonId}`;
        const lesson = await kv.get(lessonKey);
        
        if (lesson?.isCurriculumLesson) {
          // Delete curriculum lesson
          await kv.del(lessonKey);
          console.log(`[init-curriculum] Deleted old curriculum lesson: ${lesson.title}`);
        } else {
          // Keep user-created lessons
          lessonsToKeep.push(lessonId);
        }
      }
      
      // Update lesson list to only keep user-created lessons
      await kv.set(userLessonsKey, lessonsToKeep);
      console.log(`[init-curriculum] Kept ${lessonsToKeep.length} user-created lessons`);
    }

    const existingLessons = await kv.get(userLessonsKey) || [];

    let successCount = 0;
    const newLessonIds: string[] = [];

    console.log('[init-curriculum] Creating', curriculumLessons.length, 'curriculum lessons');

    for (const lesson of curriculumLessons) {
      try {
        const lessonId = crypto.randomUUID();
        const lessonKey = `lesson:${user.id}:${lessonId}`;

        await kv.set(lessonKey, {
          ...lesson,
          id: lessonId,
          userId: user.id,
          isCurriculumLesson: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        newLessonIds.push(lessonId);
        successCount++;
        console.log(`[init-curriculum] ✓ Created: ${lesson.title}`);
      } catch (error) {
        console.error(`[init-curriculum] ✗ Failed to create lesson: ${lesson.title}`, error);
      }
    }

    // Update user's lesson list
    await kv.set(userLessonsKey, [...existingLessons, ...newLessonIds]);

    // Mark curriculum as initialized
    await kv.set(initKey, {
      initialized: true,
      timestamp: new Date().toISOString(),
      lessonCount: successCount
    });

    console.log(`[init-curriculum] Complete: ${successCount} lessons created`);

    return c.json({ 
      success: true, 
      message: `Successfully initialized ${successCount} curriculum lessons`,
      lessonCount: successCount,
      expectedLessonCount: curriculumLessons.length
    });
  } catch (error) {
    console.error('[init-curriculum] Error:', error);
    return c.json({ error: 'Failed to initialize curriculum' }, 500);
  }
});

Deno.serve(app.fetch);