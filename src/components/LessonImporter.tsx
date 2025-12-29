import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { curriculumModules } from '../data/curriculum-lessons';

interface LessonImporterProps {
  accessToken: string;
  onComplete: () => void;
}

export function LessonImporter({ accessToken, onComplete }: LessonImporterProps) {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<{ total: number; completed: number; current: string }>({
    total: 0,
    completed: 0,
    current: ''
  });
  const [results, setResults] = useState<{ success: string[]; failed: string[] }>({
    success: [],
    failed: []
  });
  const [completed, setCompleted] = useState(false);

  const importLessons = async () => {
    setImporting(true);
    setCompleted(false);
    const successList: string[] = [];
    const failedList: string[] = [];

    // Get all lessons from all modules
    const allLessons = Object.entries(curriculumModules).flatMap(([module, lessons]) => 
      lessons.map(lesson => ({ ...lesson, module }))
    );

    setProgress({ total: allLessons.length, completed: 0, current: '' });

    for (const lesson of allLessons) {
      setProgress(prev => ({ ...prev, current: lesson.title }));

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
              sections: lesson.sections,
              questions: lesson.questions,
            }),
          }
        );

        if (response.ok) {
          successList.push(lesson.title);
        } else {
          const errorData = await response.json();
          console.error(`Failed to import ${lesson.title}:`, errorData);
          failedList.push(lesson.title);
        }
      } catch (error) {
        console.error(`Error importing ${lesson.title}:`, error);
        failedList.push(lesson.title);
      }

      setProgress(prev => ({ ...prev, completed: prev.completed + 1 }));
    }

    setResults({ success: successList, failed: failedList });
    setImporting(false);
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-[var(--color-primary)] mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              Import Complete
            </h1>

            <div className="space-y-6">
              {results.success.length > 0 && (
                <div>
                  <h2 className="text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Successfully Imported ({results.success.length})
                  </h2>
                  <ul className="space-y-2">
                    {results.success.map((title, index) => (
                      <li key={index} className="text-[var(--color-text-secondary)] pl-4">
                        • {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.failed.length > 0 && (
                <div>
                  <h2 className="text-red-600 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Failed to Import ({results.failed.length})
                  </h2>
                  <ul className="space-y-2">
                    {results.failed.map((title, index) => (
                      <li key={index} className="text-red-600 pl-4">
                        • {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={onComplete}
                className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-[var(--color-primary)] mb-6 flex items-center gap-3">
            <Upload className="w-8 h-8" />
            Import Curriculum Lessons
          </h1>

          {!importing ? (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-blue-900 mb-3">Ready to Import</h3>
                <p className="text-blue-800 mb-4">
                  This will import the following lessons into your account:
                </p>
                <div className="space-y-4">
                  {Object.entries(curriculumModules).map(([module, lessons]) => (
                    <div key={module}>
                      <h4 className="text-blue-900 mb-2">{module} ({lessons.length} lessons)</h4>
                      <ul className="space-y-1 pl-4">
                        {lessons.map((lesson, index) => (
                          <li key={index} className="text-blue-700 text-sm">
                            • {lesson.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={importLessons}
                className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Start Import
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[var(--color-primary)]">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Importing lessons...</span>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between text-sm text-[var(--color-text-secondary)] mb-2">
                  <span>Progress: {progress.completed} / {progress.total}</span>
                  <span>{Math.round((progress.completed / progress.total) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-3">
                  <div 
                    className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  />
                </div>
                {progress.current && (
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Currently importing: <span className="font-medium">{progress.current}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}