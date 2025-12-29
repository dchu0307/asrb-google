import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Target, Link as LinkIcon, RefreshCw, Award } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  primaryFunction: string;
}

interface Problem {
  id: string;
  description: string;
  correctTool: string;
  explanation: string;
}

const tools: Tool[] = [
  {
    id: 'sourcemap',
    name: 'Sourcemap',
    description: 'Supply Chain Regulatory Software',
    primaryFunction: 'Tier mapping + supply chain visualization'
  },
  {
    id: 'trustrace',
    name: 'TrusTrace',
    description: 'Traceability Platform',
    primaryFunction: 'Batch-level tracking for apparel & electronics'
  },
  {
    id: 'everstream',
    name: 'Everstream Analytics',
    description: 'Supply Chain Risk Intelligence',
    primaryFunction: 'Detects illegal subcontracting & geopolitical risks'
  }
];

const problems: Problem[] = [
  {
    id: 'problem1',
    description: 'Need to visualize and map all tiers of your supply chain from raw materials to finished products',
    correctTool: 'sourcemap',
    explanation: 'Sourcemap specializes in tier mapping and supply chain visualization, allowing companies to map and monitor upstream suppliers and verify chain of custody data from raw materials to finished products.'
  },
  {
    id: 'problem2',
    description: 'Need to track individual batches of products through the supply chain for apparel or electronics',
    correctTool: 'trustrace',
    explanation: 'TrusTrace provides batch-level tracking specifically designed for apparel and electronics supply chains, enabling detailed traceability of individual product batches.'
  },
  {
    id: 'problem3',
    description: 'Need to detect unauthorized subcontracting and assess geopolitical risks in your supply chain',
    correctTool: 'everstream',
    explanation: 'Everstream Analytics uses advanced analytics to detect illegal subcontracting and monitor geopolitical risks, providing intelligence on supply chain vulnerabilities.'
  },
  {
    id: 'problem4',
    description: 'Need to create a visual representation of your multi-tier supplier network',
    correctTool: 'sourcemap',
    explanation: 'Sourcemap excels at creating visual maps of supply chain networks, helping companies understand their supplier relationships across all tiers.'
  },
  {
    id: 'problem5',
    description: 'Need to verify the authenticity and origin of specific product batches in fashion supply chains',
    correctTool: 'trustrace',
    explanation: 'TrusTrace provides detailed batch-level tracking and verification capabilities, making it ideal for fashion and textile supply chains where batch authenticity is critical.'
  },
  {
    id: 'problem6',
    description: 'Need to identify potential compliance violations and geopolitical risks that could disrupt supply',
    correctTool: 'everstream',
    explanation: 'Everstream Analytics specializes in risk detection, including identifying compliance violations, illegal subcontracting, and geopolitical factors that could impact supply chain continuity.'
  }
];

export function TraceabilityToolsMatchingActivity() {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleMatch = (problemId: string, toolId: string) => {
    if (showResults) return;
    
    setMatches(prev => ({
      ...prev,
      [problemId]: toolId
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    problems.forEach(problem => {
      if (matches[problem.id] === problem.correctTool) {
        correct++;
      }
    });
    
    setScore(correct);
    setShowResults(true);
    setCompleted(true);
  };

  const handleReset = () => {
    setMatches({});
    setShowResults(false);
    setScore(0);
    setCompleted(false);
  };

  const allMatched = problems.every(problem => matches[problem.id]);
  const correctMatches = problems.filter(problem => matches[problem.id] === problem.correctTool).length;
  const percentage = problems.length > 0 ? Math.round((correctMatches / problems.length) * 100) : 0;

  const getToolById = (toolId: string) => tools.find(t => t.id === toolId);
  const getProblemById = (problemId: string) => problems.find(p => p.id === problemId);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <LinkIcon className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Digital Traceability Tools Matching Exercise</h2>
        </div>
        <p className="m-0 text-blue-100">
          Match each traceability tool to the specific problem it solves best
        </p>
      </div>

      {/* Instructions */}
      <div className="p-8">
        {!completed ? (
          <>
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="mt-0 mb-2 text-blue-900">Instructions:</h4>
              <ul className="list-disc pl-5 space-y-1 mb-0 text-sm text-blue-800">
                <li>Review the three digital traceability tools and their primary functions</li>
                <li>Read each traceability problem carefully</li>
                <li>Match each problem to the tool that best solves it</li>
                <li>Each tool can be matched to multiple problems</li>
                <li>Submit when you've matched all problems</li>
              </ul>
            </div>

            {/* Tools Section */}
            <div className="mb-8">
              <h3 className="mt-0 mb-4 text-gray-900">Digital Traceability Tools</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-5">
                    <h4 className="mt-0 mb-2 text-indigo-900 font-bold text-lg">{tool.name}</h4>
                    <p className="text-sm text-indigo-700 mb-3">{tool.description}</p>
                    <div className="bg-white rounded p-3 border border-indigo-200">
                      <p className="text-xs font-semibold text-indigo-600 mb-1">Primary Function:</p>
                      <p className="text-sm text-gray-800 m-0 font-semibold">{tool.primaryFunction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problems Section */}
            <div className="mb-6">
              <h3 className="mt-0 mb-4 text-gray-900">Interactive Exercise: Match Each Tool to a Specific Traceability Problem</h3>
              <div className="space-y-4">
                {problems.map((problem) => {
                  const selectedTool = matches[problem.id];
                  const isCorrect = showResults && selectedTool === problem.correctTool;
                  const isIncorrect = showResults && selectedTool && selectedTool !== problem.correctTool;
                  
                  return (
                    <div
                      key={problem.id}
                      className={`border-2 rounded-lg p-5 transition-all ${
                        isCorrect
                          ? 'border-green-500 bg-green-50'
                          : isIncorrect
                          ? 'border-red-500 bg-red-50'
                          : selectedTool
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium mb-0">{problem.description}</p>
                        </div>
                        {showResults && (
                          <div className="ml-4">
                            {isCorrect ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Tool Selection */}
                      <div className="grid md:grid-cols-3 gap-3">
                        {tools.map((tool) => {
                          const isSelected = selectedTool === tool.id;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => handleMatch(problem.id, tool.id)}
                              disabled={showResults}
                              className={`p-3 rounded-lg border-2 text-left transition-all text-sm ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-100 font-semibold'
                                  : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                              } ${showResults ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <div className="font-semibold text-gray-900">{tool.name}</div>
                              <div className="text-xs text-gray-600 mt-1">{tool.primaryFunction}</div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback */}
                      {showResults && (
                        <div className={`mt-4 p-3 rounded ${
                          isCorrect ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <p className={`text-sm m-0 ${
                            isCorrect ? 'text-green-800' : 'text-red-800'
                          }`}>
                            <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {problem.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!allMatched || showResults}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  allMatched && !showResults
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {showResults ? 'Results Submitted' : allMatched ? 'Submit Matches' : `Match All Problems (${Object.keys(matches).length}/${problems.length})`}
              </button>
            </div>
          </>
        ) : (
          /* Results View */
          <div>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <span className={`text-4xl ${
                  percentage >= 80 ? 'text-green-700' : percentage >= 60 ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
                </span>
              </div>
              <h2 className="mt-0 mb-2">Matching Exercise Complete!</h2>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {correctMatches} / {problems.length} Correct
              </div>
              <div className="text-xl text-gray-600">
                Score: {percentage}%
              </div>
            </div>

            {/* Summary */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-6">
              <h3 className="mt-0 mb-4 text-indigo-900">Key Takeaways</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Sourcemap</h4>
                  <p className="text-gray-700 m-0">
                    Best for tier mapping and supply chain visualization. Use when you need to map and monitor upstream suppliers and verify chain of custody data from raw materials to finished products.
                  </p>
                </div>
                <div>
                  <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">TrusTrace</h4>
                  <p className="text-gray-700 m-0">
                    Best for batch-level tracking in apparel and electronics. Use when you need detailed traceability of individual product batches and verification of authenticity in fashion and textile supply chains.
                  </p>
                </div>
                <div>
                  <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Everstream Analytics</h4>
                  <p className="text-gray-700 m-0">
                    Best for detecting illegal subcontracting and geopolitical risks. Use when you need to identify compliance violations, unauthorized subcontracting, and geopolitical factors that could disrupt supply chain continuity.
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-['Outfit'] flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

