import { useState, useEffect } from 'react';
import { projectId } from '../utils/supabase/info';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface BulkLessonImporterProps {
  accessToken: string;
  onComplete: () => void;
}

export function BulkLessonImporter({ accessToken, onComplete }: BulkLessonImporterProps) {
  const [importing, setImporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: []
  });
  const [completed, setCompleted] = useState(false);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [lessonsByModule, setLessonsByModule] = useState<Record<string, any[]>>({});

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      console.log('Loading curriculum data via dynamic import...');
      
      // Use dynamic imports which work better in this environment
      const [rsModule, gsModule, etModule, pmModule] = await Promise.all([
        import('../data/responsible-sourcing-lessons.json'),
        import('../data/general-solutions-lessons.json'),
        import('../data/emerging-tech-lessons.json'),
        import('../data/personalized-modules-lessons.json')
      ]);
      
      // Extract the default export or the module itself
      const rs = rsModule.default || rsModule;
      const gs = gsModule.default || gsModule;
      const et = etModule.default || etModule;
      const pm = pmModule.default || pmModule;
      
      console.log('Responsible Sourcing:', Array.isArray(rs) ? rs.length : 'not an array', rs);
      console.log('General Solutions:', Array.isArray(gs) ? gs.length : 'not an array', gs);
      console.log('Emerging Tech:', Array.isArray(et) ? et.length : 'not an array', et);
      console.log('Personalized Modules:', Array.isArray(pm) ? pm.length : 'not an array', pm);
      
      const responsibleSourcingLessons = Array.isArray(rs) ? rs : [];
      const generalSolutionsLessons = Array.isArray(gs) ? gs : [];
      const emergingTechLessons = Array.isArray(et) ? et : [];
      const personalizedModulesLessons = Array.isArray(pm) ? pm : [];
      
      const combined = [
        ...responsibleSourcingLessons,
        ...generalSolutionsLessons,
        ...emergingTechLessons,
        ...personalizedModulesLessons
      ];

      console.log('Total lessons to import:', combined.length);

      setAllLessons(combined);
      setLessonsByModule({
        'Responsible Sourcing': responsibleSourcingLessons,
        'General Solutions': generalSolutionsLessons,
        'Emerging Technology & AI Integration': emergingTechLessons,
        'Personalized Modules & Report Updates': personalizedModulesLessons
      });
      setLoading(false);
    } catch (error) {
      console.error('[BulkLessonImporter] Error loading lesson data files:', error);
      setLoading(false);
      // Set empty data so the component can still render
      setAllLessons([]);
      setLessonsByModule({});
    }
  };

  const importLessons = async () => {
    setImporting(true);
    const errors: string[] = [];
    let successCount = 0;
    let failedCount = 0;

    try {
      // First, clear existing curriculum lessons
      console.log('Clearing existing curriculum lessons...');
      const clearResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/clear-curriculum-lessons`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!clearResponse.ok) {
        const errorData = await clearResponse.json();
        console.error('Error clearing curriculum:', errorData);
        // Continue with import even if clear fails
      } else {
        const clearData = await clearResponse.json();
        console.log(`✓ Cleared ${clearData.deleted} existing curriculum lessons`);
      }
    } catch (error) {
      console.error('Error clearing curriculum:', error);
      // Continue with import even if clear fails
    }

    console.log(`Starting import of ${allLessons.length} lessons...`);

    // Now import all lessons
    for (const lesson of allLessons) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b28f81bc/lessons`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: lesson.title,
              subtitle: lesson.subtitle,
              category: lesson.category,
              content: lesson.content,
              quiz: lesson.quiz,
            }),
          }
        );

        if (response.ok) {
          successCount++;
          console.log(`✓ Imported: ${lesson.title}`);
        } else {
          const errorData = await response.json();
          failedCount++;
          errors.push(`${lesson.title}: ${errorData.error || 'Unknown error'}`);
          console.error(`✗ Failed: ${lesson.title}`, errorData);
        }
      } catch (error) {
        failedCount++;
        errors.push(`${lesson.title}: ${error}`);
        console.error(`✗ Exception: ${lesson.title}`, error);
      }

      // Update progress
      setResults({
        success: successCount,
        failed: failedCount,
        errors: [...errors]
      });
    }

    console.log(`Import complete: ${successCount} successful, ${failedCount} failed`);
    setImporting(false);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border border-[var(--color-border)]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h1 className="mb-2">Import All Curriculum Lessons</h1>
          <p className="text-[var(--color-text-secondary)]">
            {loading ? 'Loading lessons...' : `Import ${allLessons.length} pre-built lessons across 3 modules`}
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 text-[var(--color-primary)] animate-spin mx-auto mb-4" />
            <p className="text-[var(--color-text-secondary)]">Loading curriculum data...</p>
          </div>
        )}

        {!loading && !importing && !completed && (
          <div className="space-y-6">
            {/* Show lessons grouped by module */}
            {Object.entries(lessonsByModule)
              .filter(([, lessons]) => lessons.length > 0)
              .map(([moduleName, lessons]) => (
              <div key={moduleName} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-3">
                  {moduleName} ({lessons.length} lessons)
                </h3>
                <ul className="text-sm text-blue-700 space-y-1 ml-4">
                  {lessons.map((lesson: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>
                        {lesson.title} 
                        <span className="ml-2 text-xs bg-blue-200 px-2 py-0.5 rounded">
                          {lesson.difficulty}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
              <p className="font-medium">Total: {allLessons.length} lessons across 4 modules</p>
              <p className="text-sm text-blue-100 mt-1">
                This will populate your entire curriculum with comprehensive content
              </p>
            </div>

            <button
              onClick={importLessons}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Import All {allLessons.length} Lessons
            </button>

            <button
              onClick={onComplete}
              className="w-full text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {importing && (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 text-[var(--color-primary)] animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Importing lessons...</p>
            <p className="text-[var(--color-text-secondary)]">
              {results.success + results.failed} of {allLessons.length} processed
            </p>
            
            {/* Progress bar */}
            <div className="mt-6 mb-4">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--color-primary)] transition-all duration-300"
                  style={{ width: `${((results.success + results.failed) / allLessons.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>{results.success} successful</span>
              </div>
              {results.failed > 0 && (
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{results.failed} failed</span>
                </div>
              )}
            </div>
          </div>
        )}

        {completed && (
          <div className="text-center py-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              results.failed === 0 ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {results.failed === 0 ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              )}
            </div>
            
            <h2 className="mb-2">Import Complete!</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Successfully imported {results.success} of {allLessons.length} lessons
            </p>

            {results.failed > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left max-h-48 overflow-y-auto">
                <h3 className="text-sm font-medium text-red-900 mb-2">Errors ({results.failed}):</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {results.errors.map((error, index) => (
                    <li key={index} className="font-mono text-xs">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={onComplete}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Done - View Curriculum
            </button>
          </div>
        )}
      </div>
    </div>
  );
}