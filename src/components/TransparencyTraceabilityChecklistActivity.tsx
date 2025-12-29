import { useState } from 'react';
import { CheckCircle2, XCircle, Award, FileText, AlertTriangle, Target, TrendingUp } from 'lucide-react';

interface ChecklistItem {
  id: number;
  question: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 1,
    question: "Do you have a complete Tier-1 supplier list?"
  },
  {
    id: 2,
    question: "Can you trace high-risk materials to Tier-2 or Tier-3 sources?"
  },
  {
    id: 3,
    question: "Do you conduct spot-checks on critical raw-material origins?"
  },
  {
    id: 4,
    question: "Do you disclose subcontractors and validate their compliance?"
  },
  {
    id: 5,
    question: "Do you check for red flags (duplicate paperwork, missing batch IDs)?"
  },
  {
    id: 6,
    question: "Do you screen suppliers using UFLPA?"
  }
];

export function TransparencyTraceabilityChecklistActivity() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const calculateScore = () => {
    if (checklistItems.length === 0) return 0;
    return Math.round((checkedItems.length / checklistItems.length) * 100);
  };

  const getMaturityLevel = (score: number) => {
    if (score >= 80) return 'advanced';
    if (score >= 50) return 'developing';
    return 'foundational';
  };

  const getMaturityDetails = (level: string) => {
    switch (level) {
      case 'advanced':
        return {
          title: 'Advanced',
          description: 'Eligible for Google Recognition Certificate',
          color: 'from-green-600 to-emerald-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-800',
          icon: Award,
          passing: true
        };
      case 'developing':
        return {
          title: 'Developing',
          description: 'Requires an Action Plan',
          color: 'from-yellow-600 to-amber-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-800',
          icon: TrendingUp,
          passing: true
        };
      case 'foundational':
        return {
          title: 'Foundational',
          description: 'Mandatory follow-up training',
          color: 'from-red-600 to-orange-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-800',
          icon: AlertTriangle,
          passing: false
        };
      default:
        return {
          title: 'Unknown',
          description: '',
          color: 'from-gray-600 to-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-800',
          icon: FileText,
          passing: false
        };
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setCheckedItems([]);
    setShowResults(false);
  };

  const score = calculateScore();
  const maturityLevel = getMaturityLevel(score);
  const maturityDetails = getMaturityDetails(maturityLevel);
  const MaturityIcon = maturityDetails.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Transparency & Traceability Self-Assessment Checklist</h2>
        </div>
        <p className="m-0 text-blue-100">
          Evaluate your organization's transparency and traceability practices. Complete the checklist to receive your maturity score and recommendations.
        </p>
      </div>

      <div className="p-8">
        {!showResults ? (
          <>
            {/* Instructions */}
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="mt-0 mb-2 text-blue-900">How to Use This Checklist:</h4>
              <ul className="list-disc pl-5 space-y-1 mb-0 text-sm text-blue-800">
                <li>Review each question and check all items that apply to your organization</li>
                <li>Be honest in your assessment - this helps identify areas for improvement</li>
                <li>Your score will be calculated as a percentage based on checked items</li>
                <li>You'll receive a maturity level and specific recommendations based on your score</li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="mb-6">
              <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg">
                <h3 className="mt-0 mb-0 text-center font-semibold">Checklist</h3>
              </div>
              <div className="border-2 border-dashed border-green-500 rounded-b-lg p-6 bg-white">
                <div className="space-y-4">
                  {checklistItems.map((item, index) => {
                    const isChecked = checkedItems.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isChecked
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            isChecked
                              ? 'bg-green-600 border-green-600'
                              : 'bg-white border-gray-400'
                          }`}>
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <span className="text-gray-600 font-semibold">{index + 1}</span>
                            )}
                          </div>
                          <span className={`flex-1 ${isChecked ? 'text-green-800 font-semibold' : 'text-gray-700'}`}>
                            {item.question}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Progress</span>
                <span className="text-sm font-semibold text-gray-700">
                  {checkedItems.length} of {checklistItems.length} items checked
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(checkedItems.length / checklistItems.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={checkedItems.length === 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  checkedItems.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                }`}
              >
                Calculate Score & Get Results
              </button>
            </div>
          </>
        ) : (
          /* Results View */
          <div>
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className={`inline-block bg-gradient-to-r ${maturityDetails.color} text-white rounded-full px-8 py-4 mb-4 shadow-lg`}>
                <div className="text-5xl font-bold mb-2">{score}%</div>
                <div className="text-lg">Maturity Score</div>
              </div>
            </div>

            {/* Maturity Level Card */}
            <div className={`mb-6 ${maturityDetails.bgColor} border-l-4 ${maturityDetails.borderColor} rounded-lg p-6`}>
              <div className="flex items-center gap-3 mb-3">
                <MaturityIcon className={`w-8 h-8 ${maturityDetails.textColor}`} />
                <div>
                  <h3 className={`mt-0 mb-1 ${maturityDetails.textColor} text-2xl font-bold`}>
                    {maturityDetails.title}
                  </h3>
                  <p className={`m-0 ${maturityDetails.textColor} font-semibold`}>
                    {maturityDetails.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Pass/Fail Status */}
            <div className={`mb-6 p-6 rounded-lg border-2 ${
              maturityDetails.passing
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center gap-3">
                {maturityDetails.passing ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="mt-0 mb-1 text-green-900 font-bold text-lg">Status: Passing</h4>
                      <p className="m-0 text-green-800">
                        Your organization meets the minimum requirements for transparency and traceability practices.
                        {maturityLevel === 'advanced' && ' Congratulations on achieving advanced maturity!'}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h4 className="mt-0 mb-1 text-red-900 font-bold text-lg">Status: Not Passing</h4>
                      <p className="m-0 text-red-800">
                        Your organization needs to improve transparency and traceability practices. Follow-up training is required to reach minimum standards.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
                <h3 className="mt-0 mb-0 text-indigo-900">Recommendations</h3>
              </div>
              {maturityLevel === 'advanced' ? (
                <ul className="list-disc pl-5 space-y-2 mb-0 text-sm text-indigo-800">
                  <li>Maintain your current practices and continue monitoring for continuous improvement</li>
                  <li>Consider applying for the Google Recognition Certificate to showcase your commitment</li>
                  <li>Share best practices with your supply chain partners to raise industry standards</li>
                  <li>Explore deeper traceability for additional high-risk materials or regions</li>
                </ul>
              ) : maturityLevel === 'developing' ? (
                <ul className="list-disc pl-5 space-y-2 mb-0 text-sm text-indigo-800">
                  <li>Develop a comprehensive action plan to address gaps in your transparency and traceability practices</li>
                  <li>Prioritize implementing Tier-2 and Tier-3 traceability for high-risk materials</li>
                  <li>Establish regular spot-check procedures for critical raw-material origins</li>
                  <li>Implement red flag detection systems for documentation verification</li>
                  <li>Set up UFLPA screening processes for all suppliers</li>
                </ul>
              ) : (
                <ul className="list-disc pl-5 space-y-2 mb-0 text-sm text-indigo-800">
                  <li><strong>Mandatory:</strong> Complete follow-up training on transparency and traceability fundamentals</li>
                  <li>Start by creating a complete Tier-1 supplier list if you don't have one</li>
                  <li>Begin implementing basic traceability for your highest-risk materials</li>
                  <li>Establish documentation verification processes to catch red flags</li>
                  <li>Develop a roadmap to reach developing maturity level (50%+)</li>
                  <li>Consider working with a consultant or using compliance tools to accelerate progress</li>
                </ul>
              )}
            </div>

            {/* Scoring Breakdown */}
            <div className="mb-6 bg-gray-50 rounded-lg p-6">
              <h4 className="mt-0 mb-4 text-gray-900">Scoring Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                  <span className="text-sm text-gray-700">Items Checked</span>
                  <span className="font-semibold text-gray-900">
                    {checkedItems.length} / {checklistItems.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                  <span className="text-sm text-gray-700">Percentage Score</span>
                  <span className="font-semibold text-gray-900">{score}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                  <span className="text-sm text-gray-700">Maturity Level</span>
                  <span className={`font-semibold ${maturityDetails.textColor}`}>
                    {maturityDetails.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}

        {/* Key Learning Points */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-blue-600" />
            <h3 className="mt-0 mb-0 text-blue-900">Understanding Transparency & Traceability Maturity</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mt-0 mb-2 text-blue-700">Maturity Levels:</h4>
              <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
                <li><strong>Advanced (80-100%):</strong> Eligible for Google Recognition Certificate</li>
                <li><strong>Developing (50-79%):</strong> Requires an Action Plan</li>
                <li><strong>Foundational (&lt;50%):</strong> Mandatory follow-up training</li>
              </ul>
            </div>
            <div>
              <h4 className="mt-0 mb-2 text-blue-700">Key Practices:</h4>
              <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
                <li>Maintain complete supplier lists and documentation</li>
                <li>Trace high-risk materials to source</li>
                <li>Conduct regular spot-checks and validations</li>
                <li>Screen for compliance with regulations like UFLPA</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

