import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Zap, Target, BarChart3, Shield } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  ululaData: {
    workerConcerns: string[];
    complianceScore: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  iotData: {
    emissions: number;
    waterUsage: number;
    energyConsumption: number;
    alerts: string[];
  };
  options: {
    id: number;
    text: string;
    description: string;
    impact: {
      workerSatisfaction: number;
      environmentalScore: number;
      cost: number;
      ecoVadisRating: 'poor' | 'fair' | 'good' | 'excellent';
    };
    correct: boolean;
  }[];
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "High Water Usage Alert at Textile Facility",
    description: "Your IoT environmental sensors detect unusually high water consumption at a Tier 2 textile mill in India. Simultaneously, Ulula worker feedback indicates concerns about water quality and availability affecting local communities.",
    ululaData: {
      workerConcerns: [
        "Workers report water quality issues affecting local community",
        "Concerns about water scarcity during dry season",
        "Requests for water conservation measures"
      ],
      complianceScore: 65,
      riskLevel: 'high'
    },
    iotData: {
      emissions: 120,
      waterUsage: 850,
      energyConsumption: 320,
      alerts: [
        "Water usage 40% above baseline",
        "Water quality sensors showing elevated contaminants",
        "Community water source levels declining"
      ]
    },
    options: [
      {
        id: 1,
        text: "Immediately halt production until water usage returns to normal",
        description: "Stop all operations to address the issue immediately",
        impact: {
          workerSatisfaction: 3,
          environmentalScore: 4,
          cost: 2,
          ecoVadisRating: 'good'
        },
        correct: false
      },
      {
        id: 2,
        text: "Engage with facility management and local community to implement water recycling system",
        description: "Work with stakeholders to install water treatment and recycling infrastructure",
        impact: {
          workerSatisfaction: 5,
          environmentalScore: 5,
          cost: 3,
          ecoVadisRating: 'excellent'
        },
        correct: true
      },
      {
        id: 3,
        text: "Ignore the alerts as they may be sensor malfunctions",
        description: "Assume the IoT sensors are providing false readings",
        impact: {
          workerSatisfaction: 1,
          environmentalScore: 1,
          cost: 5,
          ecoVadisRating: 'poor'
        },
        correct: false
      },
      {
        id: 4,
        text: "Request a report from the facility but take no immediate action",
        description: "Ask for documentation but delay response",
        impact: {
          workerSatisfaction: 2,
          environmentalScore: 2,
          cost: 4,
          ecoVadisRating: 'fair'
        },
        correct: false
      }
    ],
    explanation: "The correct approach combines IoT data with worker voice data from Ulula. Engaging with facility management and the local community to implement water recycling addresses both environmental concerns (IoT alerts) and social concerns (worker feedback). This proactive, collaborative approach demonstrates strong sustainability management and would result in an excellent EcoVadis rating. Ignoring alerts or delaying action would harm both environmental performance and worker relations."
  },
  {
    id: 2,
    title: "Worker Safety Concerns with Normal Environmental Metrics",
    description: "Ulula reports indicate worker safety concerns at a manufacturing facility, but IoT environmental sensors show normal emissions, energy, and water usage. The facility appears environmentally compliant but has social compliance issues.",
    ululaData: {
      workerConcerns: [
        "Workers report inadequate safety equipment",
        "Concerns about emergency evacuation procedures",
        "Requests for safety training programs"
      ],
      complianceScore: 55,
      riskLevel: 'high'
    },
    iotData: {
      emissions: 95,
      waterUsage: 100,
      energyConsumption: 98,
      alerts: [
        "All environmental metrics within normal range",
        "No environmental alerts detected"
      ]
    },
    options: [
      {
        id: 1,
        text: "Focus only on environmental metrics since they're normal",
        description: "Prioritize environmental performance over worker concerns",
        impact: {
          workerSatisfaction: 1,
          environmentalScore: 4,
          cost: 4,
          ecoVadisRating: 'poor'
        },
        correct: false
      },
      {
        id: 2,
        text: "Conduct immediate safety audit and implement corrective actions based on worker feedback",
        description: "Address worker safety concerns proactively using Ulula data",
        impact: {
          workerSatisfaction: 5,
          environmentalScore: 4,
          cost: 3,
          ecoVadisRating: 'excellent'
        },
        correct: true
      },
      {
        id: 3,
        text: "Wait for annual audit to address safety issues",
        description: "Defer action until scheduled compliance audit",
        impact: {
          workerSatisfaction: 2,
          environmentalScore: 4,
          cost: 4,
          ecoVadisRating: 'fair'
        },
        correct: false
      },
      {
        id: 4,
        text: "Request facility to investigate but take no further action",
        description: "Ask facility to look into concerns without follow-up",
        impact: {
          workerSatisfaction: 2,
          environmentalScore: 4,
          cost: 4,
          ecoVadisRating: 'fair'
        },
        correct: false
      }
    ],
    explanation: "EcoVadis evaluates both environmental AND social performance. Even when environmental metrics are normal, worker safety concerns from Ulula require immediate attention. Conducting a safety audit and implementing corrective actions demonstrates strong social responsibility and would result in an excellent EcoVadis rating. Ignoring worker concerns because environmental metrics are good would result in poor social performance ratings."
  },
  {
    id: 3,
    title: "Spike in Emissions with Worker Productivity Concerns",
    description: "IoT sensors detect a sudden spike in emissions at a production facility. Ulula data shows workers reporting increased production pressure and concerns about work-life balance. The facility is trying to meet a tight deadline.",
    ululaData: {
      workerConcerns: [
        "Workers report excessive overtime requirements",
        "Concerns about work-life balance",
        "Requests for better production planning"
      ],
      complianceScore: 60,
      riskLevel: 'medium'
    },
    iotData: {
      emissions: 180,
      waterUsage: 110,
      energyConsumption: 150,
      alerts: [
        "Emissions 80% above baseline",
        "Energy consumption significantly elevated",
        "Pattern suggests extended operating hours"
      ]
    },
    options: [
      {
        id: 1,
        text: "Demand immediate production reduction to lower emissions",
        description: "Force facility to cut production to meet environmental targets",
        impact: {
          workerSatisfaction: 2,
          environmentalScore: 4,
          cost: 2,
          ecoVadisRating: 'fair'
        },
        correct: false
      },
      {
        id: 2,
        text: "Work with facility to optimize production schedule and improve efficiency to address both emissions and worker concerns",
        description: "Collaborate on better planning and efficiency improvements",
        impact: {
          workerSatisfaction: 4,
          environmentalScore: 5,
          cost: 3,
          ecoVadisRating: 'excellent'
        },
        correct: true
      },
      {
        id: 3,
        text: "Accept the temporary spike as necessary to meet deadlines",
        description: "Allow elevated emissions and worker stress for business needs",
        impact: {
          workerSatisfaction: 2,
          environmentalScore: 2,
          cost: 4,
          ecoVadisRating: 'poor'
        },
        correct: false
      },
      {
        id: 4,
        text: "Focus only on emissions reduction, ignore worker concerns",
        description: "Address environmental issues without considering social impact",
        impact: {
          workerSatisfaction: 2,
          environmentalScore: 4,
          cost: 3,
          ecoVadisRating: 'fair'
        },
        correct: false
      }
    ],
    explanation: "The best approach integrates both IoT environmental data and Ulula worker feedback. Working collaboratively with the facility to optimize production schedules and improve efficiency addresses emissions (IoT data) while also reducing worker stress (Ulula data). This holistic approach balances environmental and social performance, resulting in an excellent EcoVadis rating. Focusing on only one dimension or accepting poor performance would result in lower ratings."
  }
];

export function MonitoringSimulationActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const currentScenario = scenarios[currentIndex];
  const allCompleted = completedScenarios.length === scenarios.length;

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    
    if (selectedOption && currentScenario.options.find(opt => opt.id === selectedOption)?.correct) {
      setScore(score + 1);
    }
    
    if (!completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios([...completedScenarios, currentScenario.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setCompletedScenarios([]);
  };

  const selectedOptionData = selectedOption 
    ? currentScenario.options.find(opt => opt.id === selectedOption)
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8" />
            <h2 className="text-white mt-0 mb-0">Monitoring Simulation Game</h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
            <Shield className="w-5 h-5" />
            <span className="font-['Outfit']">Score: {score}/{scenarios.length}</span>
          </div>
        </div>
        <p className="m-0 text-orange-100">
          Make decisions based on Ulula worker data and Environmental IoT device alerts
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Scenario {currentIndex + 1} of {scenarios.length}
          </span>
          <span className="text-sm text-gray-600">
            {completedScenarios.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {!allCompleted ? (
          <>
            {/* Scenario Header */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <h3 className="mt-0 mb-3">{currentScenario.title}</h3>
              <p className="text-gray-700 mb-0">{currentScenario.description}</p>
            </div>

            {/* Data Sources Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Ulula Data */}
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h4 className="mt-0 mb-0 text-blue-900">Ulula Worker Data</h4>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Compliance Score:</span>
                    <span className={`font-semibold ${
                      currentScenario.ululaData.complianceScore >= 80 ? 'text-green-600' :
                      currentScenario.ululaData.complianceScore >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {currentScenario.ululaData.complianceScore}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-700">Risk Level:</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      currentScenario.ululaData.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      currentScenario.ululaData.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {currentScenario.ululaData.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-blue-900 mb-2">Worker Concerns:</h5>
                  <ul className="list-disc pl-5 space-y-1 mb-0">
                    {currentScenario.ululaData.workerConcerns.map((concern, idx) => (
                      <li key={idx} className="text-xs text-blue-800">{concern}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* IoT Data */}
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h4 className="mt-0 mb-0 text-green-900">Environmental IoT Data</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Emissions</div>
                    <div className="text-lg font-semibold text-green-700">{currentScenario.iotData.emissions}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Water</div>
                    <div className="text-lg font-semibold text-green-700">{currentScenario.iotData.waterUsage}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">Energy</div>
                    <div className="text-lg font-semibold text-green-700">{currentScenario.iotData.energyConsumption}%</div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-green-900 mb-2">Alerts:</h5>
                  <ul className="list-disc pl-5 space-y-1 mb-0">
                    {currentScenario.iotData.alerts.map((alert, idx) => (
                      <li key={idx} className="text-xs text-green-800">{alert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Decision Options */}
            <div className="mb-6 bg-indigo-50 rounded-xl p-6">
              <h3 className="mt-0 mb-4 text-indigo-900">
                How will you address this issue? (Your decision will be evaluated on EcoVadis)
              </h3>
              <div className="space-y-3">
                {currentScenario.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      selectedOption === option.id
                        ? 'border-indigo-600 bg-indigo-100'
                        : 'border-gray-300 bg-white hover:border-indigo-400'
                    } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 ${
                        selectedOption === option.id
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-gray-400'
                      }`}>
                        {selectedOption === option.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{option.text}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            {showFeedback && selectedOptionData && (
              <div className={`mb-6 p-6 rounded-lg border-2 ${
                selectedOptionData.correct
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {selectedOptionData.correct ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-green-700" />
                      <h4 className="mt-0 mb-0 text-green-900">Correct Decision!</h4>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-6 h-6 text-red-700" />
                      <h4 className="mt-0 mb-0 text-red-900">Incorrect Decision</h4>
                    </>
                  )}
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-semibold mb-2">Expected Impact:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Worker Satisfaction: {selectedOptionData.impact.workerSatisfaction}/5</div>
                    <div>Environmental Score: {selectedOptionData.impact.environmentalScore}/5</div>
                    <div>Cost Impact: {selectedOptionData.impact.cost}/5</div>
                    <div>EcoVadis Rating: <span className="font-semibold capitalize">{selectedOptionData.impact.ecoVadisRating}</span></div>
                  </div>
                </div>

                <div className="bg-white/50 rounded p-4">
                  <h5 className="text-sm font-semibold mb-2">Explanation:</h5>
                  <p className="text-sm text-gray-800 m-0">{currentScenario.explanation}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
              >
                ← Previous
              </button>
              
              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
                >
                  Submit Decision
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentIndex === scenarios.length - 1}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
                >
                  {currentIndex === scenarios.length - 1 ? 'View Results →' : 'Next Scenario →'}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Results Summary */
          <div className="text-center py-8">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${score >= 2 ? 'bg-green-100' : score >= 1 ? 'bg-yellow-100' : 'bg-red-100'} mb-4`}>
                <span className={`text-4xl ${score >= 2 ? 'text-green-700' : score >= 1 ? 'text-yellow-700' : 'text-red-700'}`}>
                  {score >= 2 ? '🎉' : score >= 1 ? '👍' : '📚'}
                </span>
              </div>
              <h2 className="mt-0 mb-2">Simulation Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You scored <strong className="text-orange-600">{score} out of {scenarios.length}</strong>
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="mt-0 mb-4">Key Takeaways:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-0 text-sm">
                <li>Effective supply chain management requires integrating both environmental (IoT) and social (Ulula) data</li>
                <li>EcoVadis evaluates both environmental AND social performance - both matter equally</li>
                <li>Proactive, collaborative approaches with facilities yield better results than reactive or punitive measures</li>
                <li>Worker voice data from Ulula provides critical insights that IoT sensors cannot detect</li>
                <li>Environmental IoT devices and worker feedback systems complement each other for comprehensive monitoring</li>
                <li>Best decisions balance environmental, social, and business objectives</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-['Outfit']"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

