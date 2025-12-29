import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Target, TrendingUp, Award, RefreshCw } from 'lucide-react';

interface Question {
  id: string;
  section: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'essay';
  options?: string[];
  correctAnswer?: number | string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 'a1',
    section: 'A',
    question: 'Which evidence showed undisclosed Tier-2 processing?',
    type: 'multiple-choice',
    options: [
      'Fabric rolls with two different batch numbers',
      'Packing slips bearing two supplier names',
      'No transport documentation from the second mill',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'All of the above evidence indicated undisclosed Tier-2 processing. The two different batch numbers, packing slips with two supplier names, and missing transport documentation all pointed to unauthorized subcontracting. Additionally, operators revealing "overflow dyeing" done by an undisclosed Tier-2 site confirmed the issue.'
  },
  {
    id: 'a2',
    section: 'A',
    question: 'Why are mismatched batch numbers a traceability risk?',
    type: 'multiple-choice',
    options: [
      'They indicate potential quality issues',
      'They suggest unauthorized subcontracting and break the chain of custody',
      'They are difficult to read',
      'They increase shipping costs'
    ],
    correctAnswer: 1,
    explanation: 'Mismatched batch numbers are a critical traceability risk because they suggest unauthorized subcontracting and break the chain of custody. When batch numbers don\'t match, it becomes impossible to verify the true origin of materials, creating gaps in traceability that can hide compliance violations, forced labor, or other supply chain risks.'
  },
  {
    id: 'b1',
    section: 'B',
    question: 'Why might suppliers hide Tier-2 subcontractors?',
    type: 'multiple-choice',
    options: [
      'To reduce costs and avoid compliance requirements',
      'To speed up production',
      'To improve quality',
      'To simplify documentation'
    ],
    correctAnswer: 0,
    explanation: 'Suppliers may hide Tier-2 subcontractors to reduce costs and avoid compliance requirements. By using unauthorized subcontractors, they can bypass audits, avoid meeting labor standards, use cheaper (potentially non-compliant) facilities, and avoid the documentation and verification processes required for disclosed suppliers.'
  },
  {
    id: 'b2',
    section: 'B',
    question: 'How does poor documentation create UFLPA risk?',
    type: 'multiple-choice',
    options: [
      'It slows down shipping',
      'It makes it impossible to verify that goods are not from prohibited regions or made with forced labor',
      'It increases costs',
      'It improves traceability'
    ],
    correctAnswer: 1,
    explanation: 'Poor documentation creates UFLPA (Uyghur Forced Labor Prevention Act) risk because it makes it impossible to verify that goods are not from prohibited regions or made with forced labor. Without proper documentation showing origin, chain of custody, and labor conditions, companies cannot prove compliance with UFLPA requirements, risking import bans and legal consequences.'
  },
  {
    id: 'c1',
    section: 'C',
    question: 'Which control BEST ensures batch-level traceability?',
    type: 'multiple-choice',
    options: [
      'Random spot checks',
      'QR-coded batch IDs for each roll of fabric',
      'Centralized digital storage',
      'Mandatory disclosure of subcontractors'
    ],
    correctAnswer: 1,
    explanation: 'QR-coded batch IDs for each roll of fabric BEST ensures batch-level traceability because they provide unique, scannable identifiers that can be tracked through the entire supply chain. This creates an immutable record linking each batch to its origin, processing steps, and final destination, enabling real-time verification and preventing batch number mismatches.'
  },
  {
    id: 'd1',
    section: 'D',
    question: 'Outline a corrective action plan for incomplete traceability.',
    type: 'essay',
    explanation: 'A comprehensive corrective action plan should include: (1) Immediate actions: audit all current suppliers, identify gaps in documentation, suspend shipments from non-compliant suppliers; (2) Short-term: implement mandatory Tier-2 disclosure, establish QR-coded batch tracking, create centralized digital documentation system; (3) Medium-term: conduct random batch audits, train suppliers on traceability requirements, phase out unauthorized subcontractors; (4) Long-term: establish continuous monitoring, integrate traceability into supplier contracts, build supplier capability in documentation practices.'
  }
];

const caseStudy = {
  case: {
    title: 'Case',
    initialClaim: 'A Tier-1 apparel factory claims all fabric comes from "Mill A."',
    discovery: [
      'Fabric rolls with two different batch numbers',
      'Packing slips bearing two supplier names',
      'No transport documentation from the second mill',
      'Operators reveal "overflow dyeing" done by an undisclosed Tier-2 site'
    ]
  },
  actions: {
    title: 'Actions Taken',
    items: [
      'Mandatory disclosure of all Tier-2 subcontractors',
      'QR-coded batch IDs for each roll of fabric',
      'Random batch audits by compliance team',
      'Centralized digital storage of traceability evidence',
      'Phased removal of unauthorized subcontractor'
    ]
  },
  impact: {
    title: 'Impact (12 months)',
    items: [
      '100% traceability for fabric',
      'Zero unauthorized subcontracting',
      'Audit closure time reduced by 40%',
      'Documentation errors reduced by 70%'
    ]
  }
};

export function SupplierCaseStudyActivity() {
  const [currentSection, setCurrentSection] = useState<string>('case');
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitAnswer = (questionId: string) => {
    setShowFeedback(prev => ({
      ...prev,
      [questionId]: true
    }));

    const question = questions.find(q => q.id === questionId);
    if (question && question.type === 'multiple-choice') {
      const section = question.section;
      if (!completedSections.includes(section)) {
        setCompletedSections(prev => [...prev, section]);
      }
    }
  };

  const handleSubmitEssay = (questionId: string) => {
    setShowFeedback(prev => ({
      ...prev,
      [questionId]: true
    }));
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const section = question.section;
      if (!completedSections.includes(section)) {
        setCompletedSections(prev => [...prev, section]);
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    questions.forEach(question => {
      if (question.type === 'multiple-choice') {
        total++;
        if (answers[question.id] === question.correctAnswer) {
          correct++;
        }
      }
    });
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowFeedback({});
    setCompletedSections([]);
    setShowResults(false);
    setCurrentSection('case');
  };

  const score = calculateScore();
  const allMultipleChoiceAnswered = questions
    .filter(q => q.type === 'multiple-choice')
    .every(q => answers[q.id] !== undefined && showFeedback[q.id]);
  const essayAnswered = questions
    .filter(q => q.type === 'essay')
    .some(q => answers[q.id] && showFeedback[q.id]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Supplier Case Study: Traceability Challenge</h2>
        </div>
        <p className="m-0 text-green-100">
          Analyze a real-world traceability case, identify risks, analyze root causes, and develop corrective actions
        </p>
      </div>

      {!showResults ? (
        <div className="p-8">
          {/* Case Study Overview */}
          {currentSection === 'case' && (
            <div>
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="mt-0 mb-2 text-blue-900">Instructions:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-0 text-sm text-blue-800">
                  <li>Read the case study carefully, including the case, actions taken, and impact</li>
                  <li>Answer questions in each section: Risk Identification, Root-Cause Analysis, Preventive Action, and Long-Form Case Question</li>
                  <li>Submit each answer to receive immediate feedback</li>
                  <li>Review the impact achieved after implementing the corrective actions</li>
                </ul>
              </div>

              {/* Case Section */}
              <div className="mb-6 bg-gray-100 rounded-lg p-6 border-2 border-dashed border-green-500">
                <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-4">
                  <h3 className="mt-0 mb-0 text-center font-semibold">{caseStudy.case.title}</h3>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-3">Initial Claim:</p>
                  <p className="text-gray-700 mb-4 italic">{caseStudy.case.initialClaim}</p>
                  <p className="font-semibold text-gray-900 mb-3">Discovery during spot checks:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-0">
                    {caseStudy.case.discovery.map((item, idx) => (
                      <li key={idx} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions Section */}
              <div className="mb-6 bg-gray-100 rounded-lg p-6 border-2 border-dashed border-green-500">
                <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-4">
                  <h3 className="mt-0 mb-0 text-center font-semibold">{caseStudy.actions.title}</h3>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <ul className="list-disc pl-5 space-y-2 mb-0">
                    {caseStudy.actions.items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Impact Section */}
              <div className="mb-6 bg-gray-100 rounded-lg p-6 border-2 border-dashed border-green-500">
                <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg -mt-6 -mx-6 mb-4">
                  <h3 className="mt-0 mb-0 text-center font-semibold">{caseStudy.impact.title}</h3>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <ul className="list-disc pl-5 space-y-2 mb-0">
                    {caseStudy.impact.items.map((item, idx) => (
                      <li key={idx} className="text-gray-700 font-semibold">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentSection('questions')}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors font-semibold shadow-lg"
                >
                  Begin Case Study Test
                </button>
              </div>
            </div>
          )}

          {/* Questions Section */}
          {currentSection === 'questions' && (
            <div>
              <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                <h3 className="mt-0 mb-2 text-indigo-900">Case Study Test</h3>
                <p className="text-sm text-indigo-800 m-0">
                  Answer the questions below based on the case study. Submit each answer to receive feedback.
                </p>
              </div>

              <div className="space-y-8">
                {questions.map((question) => {
                  const userAnswer = answers[question.id];
                  const feedbackShown = showFeedback[question.id];
                  const isCorrect = question.type === 'multiple-choice' && userAnswer === question.correctAnswer;

                  return (
                    <div
                      key={question.id}
                      className={`border-2 rounded-lg p-6 ${
                        feedbackShown
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-indigo-600 text-white px-3 py-1 rounded font-semibold text-sm">
                              SECTION {question.section}
                            </span>
                            {feedbackShown && question.type === 'multiple-choice' && (
                              isCorrect ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                              )
                            )}
                          </div>
                          <h4 className="mt-0 mb-0 text-gray-900 font-semibold">{question.question}</h4>
                        </div>
                      </div>

                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(question.id, idx)}
                              disabled={feedbackShown}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                userAnswer === idx
                                  ? 'border-blue-600 bg-blue-100 font-semibold'
                                  : 'border-gray-300 bg-white hover:border-blue-400'
                              } ${feedbackShown ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {question.type === 'essay' && (
                        <div className="mb-4">
                          <textarea
                            value={userAnswer as string || ''}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            disabled={feedbackShown}
                            placeholder="Type your answer here... Be comprehensive and include specific actions from the case study."
                            className={`w-full p-4 border-2 rounded-lg resize-none ${
                              feedbackShown ? 'opacity-75 cursor-not-allowed' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            rows={8}
                          />
                        </div>
                      )}

                      {!feedbackShown && (
                        <button
                          onClick={() => question.type === 'essay' ? handleSubmitEssay(question.id) : handleSubmitAnswer(question.id)}
                          disabled={userAnswer === undefined || userAnswer === ''}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Answer
                        </button>
                      )}

                      {feedbackShown && (
                        <div className={`mt-4 p-4 rounded-lg ${
                          question.type === 'multiple-choice'
                            ? isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                            : 'bg-blue-100 border-2 border-blue-500'
                        }`}>
                          <p className={`text-sm m-0 ${
                            question.type === 'multiple-choice'
                              ? isCorrect ? 'text-green-800' : 'text-red-800'
                              : 'text-blue-800'
                          }`}>
                            <strong>{question.type === 'multiple-choice' ? (isCorrect ? 'Correct! ' : 'Incorrect. ') : 'Answer Submitted. '}</strong>
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Results Button */}
              {(allMultipleChoiceAnswered || essayAnswered) && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleViewResults}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors font-semibold shadow-lg"
                  >
                    View Results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              score.percentage >= 80 ? 'bg-green-100' : score.percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-4xl ${
                score.percentage >= 80 ? 'text-green-700' : score.percentage >= 60 ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {score.percentage >= 80 ? '🎉' : score.percentage >= 60 ? '👍' : '📚'}
              </span>
            </div>
            <h2 className="mt-0 mb-2">Case Study Test Complete!</h2>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {score.correct} / {score.total} Correct
            </div>
            <div className="text-xl text-gray-600">
              Score: {score.percentage}%
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-6">
            <h3 className="mt-0 mb-4 text-indigo-900">Key Takeaways from This Case Study</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Risk Identification</h4>
                <p className="text-gray-700 m-0">
                  Multiple red flags (mismatched batch numbers, multiple supplier names, missing documentation) often indicate unauthorized subcontracting. Spot checks and operator interviews are critical for uncovering hidden Tier-2 activities.
                </p>
              </div>
              <div>
                <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Root Causes</h4>
                <p className="text-gray-700 m-0">
                  Suppliers may hide subcontractors to reduce costs and avoid compliance requirements. Poor documentation creates UFLPA and other regulatory risks by making it impossible to verify origin and labor conditions.
                </p>
              </div>
              <div>
                <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Preventive Actions</h4>
                <p className="text-gray-700 m-0">
                  QR-coded batch IDs, mandatory Tier-2 disclosure, random audits, and centralized digital documentation create robust traceability systems that prevent unauthorized subcontracting and ensure compliance.
                </p>
              </div>
              <div>
                <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Impact</h4>
                <p className="text-gray-700 m-0">
                  Proper traceability systems can achieve 100% traceability, eliminate unauthorized subcontracting, reduce audit closure time by 40%, and cut documentation errors by 70%—demonstrating both compliance and operational efficiency benefits.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-['Outfit'] flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

