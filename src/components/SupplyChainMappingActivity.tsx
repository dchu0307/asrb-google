import { useState } from 'react';
import { Map, Layers, FileText, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

interface Tier {
  id: number;
  name: string;
  description: string;
  example: string;
}

interface MappingScenario {
  id: number;
  product: string;
  industry: string;
  tiers: Tier[];
  hardestTier: number;
  verificationDocuments: string[];
  redFlags: string[];
  explanation: string;
}

const scenarios: MappingScenario[] = [
  {
    id: 1,
    product: "Cotton T-Shirt",
    industry: "Textile & Apparel",
    tiers: [
      { id: 0, name: "Tier 0: Final Assembly", description: "Garment manufacturing and finishing", example: "Garment factory in Bangladesh" },
      { id: 1, name: "Tier 1: Direct Supplier", description: "Fabric supplier", example: "Textile mill in India" },
      { id: 2, name: "Tier 2: Fabric Mill / Component Vendor", description: "Yarn spinning and dyeing", example: "Yarn spinning facility" },
      { id: 3, name: "Tier 3: Raw-Material Processor", description: "Cotton ginning and processing", example: "Cotton gin in Uzbekistan" },
      { id: 4, name: "Tier 4: Farm/Mine", description: "Cotton farming", example: "Cotton farms in Xinjiang, China" }
    ],
    hardestTier: 4,
    verificationDocuments: [
      "Farm-level purchase receipts with GPS coordinates",
      "Third-party certification (Better Cotton Initiative, Organic)",
      "Transportation records linking farms to gins",
      "Ginning facility audit reports",
      "Batch tracking from farm to finished product"
    ],
    redFlags: [
      "Duplicate farm addresses across multiple suppliers",
      "Missing batch IDs on cotton bales",
      "Inconsistent harvest dates (e.g., cotton harvested in winter)",
      "Farm locations in regions with known forced labor",
      "No third-party verification of farm ownership",
      "Gaps in transportation records between tiers"
    ],
    explanation: "Tier 4 (farm level) is typically the hardest to trace because cotton comes from thousands of smallholder farms, often in remote areas with limited documentation. Verification requires farm-level receipts, GPS coordinates, and third-party certifications. Red flags include duplicate addresses, missing batch IDs, and inconsistent dates that suggest documentation fraud."
  },
  {
    id: 2,
    product: "Smartphone",
    industry: "Electronics",
    tiers: [
      { id: 0, name: "Tier 0: Final Assembly", description: "Device assembly and testing", example: "Assembly facility in China" },
      { id: 1, name: "Tier 1: Direct Supplier", description: "Component manufacturers", example: "Battery, screen, processor suppliers" },
      { id: 2, name: "Tier 2: Fabric Mill / Component Vendor", description: "Sub-component suppliers", example: "Semiconductor foundries, display panel makers" },
      { id: 3, name: "Tier 3: Raw-Material Processor", description: "Mineral processing and refining", example: "Cobalt refineries, rare earth processors" },
      { id: 4, name: "Tier 4: Farm/Mine", description: "Mining operations", example: "Cobalt mines in DRC, rare earth mines" }
    ],
    hardestTier: 4,
    verificationDocuments: [
      "Mine site audit reports (RMI, CFSI)",
      "Chain of custody documentation",
      "Mineral origin certificates",
      "Refinery processing records",
      "Component-level batch tracking"
    ],
    redFlags: [
      "Mines located in conflict-affected regions without certification",
      "Missing chain of custody between mine and refinery",
      "Inconsistent mineral origin claims",
      "No Responsible Minerals Initiative (RMI) certification",
      "Refinery unable to trace mineral sources",
      "Duplicate mine site addresses"
    ],
    explanation: "Tier 4 (mine level) is hardest to trace due to artisanal and small-scale mining operations, complex supply chains, and conflict-affected regions. Verification requires mine site audits, chain of custody documentation, and certifications like RMI. Red flags include missing certifications, inconsistent origin claims, and inability to trace minerals through the supply chain."
  },
  {
    id: 3,
    product: "Chocolate Bar",
    industry: "Food & Beverage",
    tiers: [
      { id: 0, name: "Tier 0: Final Assembly", description: "Chocolate manufacturing and packaging", example: "Chocolate factory in Switzerland" },
      { id: 1, name: "Tier 1: Direct Supplier", description: "Cocoa bean processors", example: "Cocoa processing facility" },
      { id: 2, name: "Tier 2: Fabric Mill / Component Vendor", description: "Cocoa traders and aggregators", example: "Trading companies in West Africa" },
      { id: 3, name: "Tier 3: Raw-Material Processor", description: "Cocoa fermentation and drying", example: "Fermentation facilities" },
      { id: 4, name: "Tier 4: Farm/Mine", description: "Cocoa farming", example: "Smallholder cocoa farms in Côte d'Ivoire" }
    ],
    hardestTier: 4,
    verificationDocuments: [
      "Farm-level GPS coordinates and farmer registration",
      "Fair Trade or Rainforest Alliance certification",
      "Cooperative membership records",
      "Bean lot tracking from farm to processor",
      "Third-party audit reports of farming practices"
    ],
    redFlags: [
      "Farms in regions with documented child labor",
      "Missing farmer registration or GPS coordinates",
      "Inconsistent harvest dates or volumes",
      "No certification or unable to verify certification claims",
      "Gaps in bean lot tracking",
      "Cooperative unable to identify individual farms"
    ],
    explanation: "Tier 4 (farm level) is hardest to trace because cocoa comes from thousands of smallholder farms (often less than 2 hectares), with limited documentation and infrastructure. Verification requires farmer registration, GPS coordinates, certifications, and lot tracking. Red flags include farms in high-risk regions, missing documentation, and inability to verify certifications."
  }
];

export function SupplyChainMappingActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHardestTier, setSelectedHardestTier] = useState<number | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [selectedRedFlags, setSelectedRedFlags] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const currentScenario = scenarios[currentIndex];
  const allCompleted = completedScenarios.length === scenarios.length;

  const toggleDocument = (index: number) => {
    if (selectedDocuments.includes(index)) {
      setSelectedDocuments(selectedDocuments.filter(i => i !== index));
    } else {
      setSelectedDocuments([...selectedDocuments, index]);
    }
  };

  const toggleRedFlag = (index: number) => {
    if (selectedRedFlags.includes(index)) {
      setSelectedRedFlags(selectedRedFlags.filter(i => i !== index));
    } else {
      setSelectedRedFlags([...selectedRedFlags, index]);
    }
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    
    let points = 0;
    if (selectedHardestTier === currentScenario.hardestTier) points += 1;
    if (selectedDocuments.length === currentScenario.verificationDocuments.length) points += 1;
    if (selectedRedFlags.length === currentScenario.redFlags.length) points += 1;
    
    setScore(score + points);
    
    if (!completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios([...completedScenarios, currentScenario.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedHardestTier(null);
      setSelectedDocuments([]);
      setSelectedRedFlags([]);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedHardestTier(null);
      setSelectedDocuments([]);
      setSelectedRedFlags([]);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedHardestTier(null);
    setSelectedDocuments([]);
    setSelectedRedFlags([]);
    setShowFeedback(false);
    setScore(0);
    setCompletedScenarios([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Map className="w-8 h-8" />
            <h2 className="text-white mt-0 mb-0">Supply Chain Mapping Exercise</h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-['Outfit']">Score: {score}/{scenarios.length * 3}</span>
          </div>
        </div>
        <p className="m-0 text-green-100">
          Practice mapping multi-tier supply chains and identifying traceability challenges
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
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {!allCompleted ? (
          <>
            {/* Product Header */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mt-0 mb-2">{currentScenario.product}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Layers className="w-4 h-4" />
                    <span>{currentScenario.industry}</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-['Outfit']">
                  Mapping Exercise
                </div>
              </div>
            </div>

            {/* Supply Chain Tiers */}
            <div className="mb-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="mt-0 mb-3 text-blue-900">Supply Chain Tiers</h4>
              <div className="space-y-2">
                {currentScenario.tiers.map((tier) => (
                  <div key={tier.id} className="bg-white rounded p-3 border border-blue-200">
                    <div className="font-semibold text-sm text-blue-900 mb-1">{tier.name}</div>
                    <div className="text-xs text-gray-700 mb-1">{tier.description}</div>
                    <div className="text-xs text-gray-600 italic">Example: {tier.example}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 1: Hardest Tier to Trace */}
            <div className="mb-6 bg-indigo-50 rounded-xl p-6">
              <h3 className="mt-0 mb-4 text-indigo-900">
                Which tier is hardest to trace? Why?
              </h3>
              <div className="space-y-2">
                {currentScenario.tiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedHardestTier(tier.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors font-['Outfit'] ${
                      selectedHardestTier === tier.id
                        ? 'border-indigo-600 bg-indigo-100'
                        : 'border-gray-300 bg-white hover:border-indigo-400'
                    } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className={`mt-4 p-4 rounded-lg ${
                  selectedHardestTier === currentScenario.hardestTier
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedHardestTier === currentScenario.hardestTier ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-700" />
                        <span className="font-semibold text-green-900">Correct!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-red-700" />
                        <span className="font-semibold text-red-900">Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 m-0">
                    <strong>Correct answer:</strong> {currentScenario.tiers.find(t => t.id === currentScenario.hardestTier)?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Question 2: Verification Documents */}
            <div className="mb-6 bg-purple-50 rounded-xl p-6">
              <h3 className="mt-0 mb-4 text-purple-900">
                Which documents verify Tier-2 authenticity? (Select all that apply)
              </h3>
              <div className="space-y-2">
                {currentScenario.verificationDocuments.map((doc, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDocument(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm ${
                      selectedDocuments.includes(index)
                        ? 'border-purple-600 bg-purple-100'
                        : 'border-gray-300 bg-white hover:border-purple-400'
                    } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedDocuments.includes(index) && (
                        <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      )}
                      <span>{doc}</span>
                    </div>
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-800 m-0">
                    <strong>All documents listed are important for verification.</strong> These documents help establish chain of custody and verify the authenticity of materials moving through Tier 2.
                  </p>
                </div>
              )}
            </div>

            {/* Question 3: Red Flags */}
            <div className="mb-6 bg-amber-50 rounded-xl p-6">
              <h3 className="mt-0 mb-4 text-amber-900">
                What red flags might appear? (Select all that apply)
              </h3>
              <div className="space-y-2">
                {currentScenario.redFlags.map((flag, index) => (
                  <button
                    key={index}
                    onClick={() => toggleRedFlag(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm ${
                      selectedRedFlags.includes(index)
                        ? 'border-amber-600 bg-amber-100'
                        : 'border-gray-300 bg-white hover:border-amber-400'
                    } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedRedFlags.includes(index) && (
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      )}
                      <span>{flag}</span>
                    </div>
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-800 m-0">
                    <strong>All items listed are potential red flags.</strong> These indicate documentation fraud, traceability gaps, or compliance issues that require investigation.
                  </p>
                </div>
              )}
            </div>

            {/* Explanation */}
            {showFeedback && (
              <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                <h4 className="mt-0 mb-2 text-indigo-900">Explanation</h4>
                <p className="text-sm text-indigo-800 m-0">{currentScenario.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedHardestTier === null || selectedDocuments.length === 0 || selectedRedFlags.length === 0}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentIndex === scenarios.length - 1}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
                >
                  {currentIndex === scenarios.length - 1 ? 'View Results →' : 'Next Scenario →'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Results Summary */
          <div className="text-center py-8">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${score >= scenarios.length * 2 ? 'bg-green-100' : score >= scenarios.length ? 'bg-yellow-100' : 'bg-red-100'} mb-4`}>
                <span className={`text-4xl ${score >= scenarios.length * 2 ? 'text-green-700' : score >= scenarios.length ? 'text-yellow-700' : 'text-red-700'}`}>
                  {score >= scenarios.length * 2 ? '🎉' : score >= scenarios.length ? '👍' : '📚'}
                </span>
              </div>
              <h2 className="mt-0 mb-2">Mapping Exercise Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You scored <strong className="text-green-600">{score} out of {scenarios.length * 3}</strong>
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="mt-0 mb-4">Key Takeaways:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-0 text-sm">
                <li>Tier 4 (farm/mine level) is typically the hardest to trace due to scale and documentation challenges</li>
                <li>Verification requires multiple documents: certifications, GPS coordinates, batch tracking, and audit reports</li>
                <li>Red flags include duplicate addresses, missing batch IDs, inconsistent dates, and gaps in documentation</li>
                <li>Building supplier capability in mapping helps identify and mitigate multi-tier risks</li>
                <li>Technology solutions (blockchain, IoT, RFID) can help but require proper implementation</li>
                <li>Transparency builds trust and enables proactive risk management</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-['Outfit']"
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

