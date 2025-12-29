import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Globe, MapPin, Shield, Search, RefreshCw, Database } from 'lucide-react';

interface SupplierProfile {
  id: number;
  name: string;
  location: string;
  commodity: string;
  industry: string;
  verificationStatus: string;
  adverseMedia: string[];
  positiveIndicators: string[];
  riskFactors: string[];
  correctAnswer: 'yes' | 'no';
  explanation: string;
}

const supplierProfiles: SupplierProfile[] = [
  {
    id: 1,
    name: "Congo Mineral Resources Ltd",
    location: "Kolwezi, Democratic Republic of Congo",
    commodity: "Cobalt",
    industry: "Mining",
    verificationStatus: "No independent third-party audit in past 2 years",
    adverseMedia: [
      "2023: Local NGO report documents child labor in artisanal mining sites near company operations",
      "2024: Reuters investigation links supply chain to armed groups controlling mining areas",
      "2023: Workers report unsafe tunnel conditions and lack of protective equipment"
    ],
    positiveIndicators: [
      "Low prices compared to certified suppliers",
      "Quick delivery times"
    ],
    riskFactors: [
      "High-risk region for conflict minerals",
      "No RMI (Responsible Minerals Initiative) certification",
      "Lack of transparent supply chain documentation"
    ],
    correctAnswer: 'no',
    explanation: "This supplier presents severe ethical risks. The adverse media reports of child labor and links to armed groups, combined with lack of independent verification and location in a conflict-affected region, make this an unacceptable partner. The Dodd-Frank Act and OECD Due Diligence Guidance require companies to avoid sourcing from suppliers that contribute to conflict or human rights abuses."
  },
  {
    id: 2,
    name: "Xinjiang Cotton Cooperative",
    location: "Xinjiang Uyghur Autonomous Region, China",
    commodity: "Cotton",
    industry: "Agriculture",
    verificationStatus: "Government-approved facility, no independent audit access granted",
    adverseMedia: [
      "2023: U.S. State Department report cites evidence of forced labor in Xinjiang cotton sector",
      "2024: Multiple major brands have severed ties with suppliers in this region",
      "2023: UN report documents systematic human rights concerns in the region"
    ],
    positiveIndicators: [
      "High production capacity",
      "Competitive pricing",
      "Modern processing facilities"
    ],
    riskFactors: [
      "Restricted access for independent auditors",
      "Region subject to U.S. import bans under UFLPA (Uyghur Forced Labor Prevention Act)",
      "Inability to verify voluntary labor participation"
    ],
    correctAnswer: 'no',
    explanation: "Sourcing from this region carries extreme legal and ethical risks. The U.S. UFLPA creates a rebuttable presumption that goods from Xinjiang are made with forced labor. Major brands have faced significant reputational damage and legal consequences for sourcing from this region. The inability to conduct independent audits and widespread documented concerns make this an unacceptable risk."
  },
  {
    id: 3,
    name: "ElectroTech Manufacturing Sdn Bhd",
    location: "Penang, Malaysia",
    commodity: "Semiconductors & Electronics Components",
    industry: "Electronics Manufacturing",
    verificationStatus: "RBA (Responsible Business Alliance) certified, annual third-party audits",
    adverseMedia: [
      "2024: Minor non-compliance found in recent audit (overtime hours slightly exceeded limits during peak season)",
      "Corrective action plan submitted and verified as complete"
    ],
    positiveIndicators: [
      "ISO 14001 environmental certification",
      "Workers have access to grievance mechanism",
      "Transparent supply chain documentation",
      "Living wages verified by Fair Labor Association",
      "Active worker training programs on rights and safety",
      "No passport retention policy, workers free to leave employment"
    ],
    riskFactors: [
      "Minor audit findings (corrected)",
      "Electronics sector historically associated with labor issues in Southeast Asia"
    ],
    correctAnswer: 'yes',
    explanation: "This supplier demonstrates strong ethical practices. Despite one minor audit finding (which was corrected), they have multiple certifications, transparent operations, and positive labor practices including living wages, worker rights, and no document retention. The RBA certification and regular third-party audits provide credible verification. Minor non-conformances with corrective action are normal and acceptable when properly addressed."
  },
  {
    id: 4,
    name: "Premier Garments Bangladesh",
    location: "Dhaka, Bangladesh",
    commodity: "Ready-made Garments",
    industry: "Textile & Apparel",
    verificationStatus: "Accord on Fire and Building Safety certified, WRAP (Worldwide Responsible Accredited Production) certified",
    adverseMedia: [
      "No adverse media reports in past 3 years"
    ],
    positiveIndicators: [
      "Completed all structural safety upgrades after Rana Plaza reforms",
      "SEDEX member with 'good' rating on recent SMETA audit",
      "Fair Wage Network certified - pays 15% above minimum wage",
      "On-site childcare facility for workers",
      "Transparent subcontracting policy with approved facilities only",
      "Worker committees participate in safety decisions",
      "Emergency evacuation drills conducted quarterly"
    ],
    riskFactors: [
      "Operating in country with historical safety concerns",
      "Moderate pricing (not the cheapest option)"
    ],
    correctAnswer: 'yes',
    explanation: "This supplier is an excellent partner. They have proactively addressed the systemic safety issues that plagued Bangladesh's garment sector, demonstrated by Accord certification and structural upgrades. Multiple certifications, above-minimum wages, worker participation mechanisms, and transparent operations indicate strong ethical commitment. Operating in a historically high-risk country doesn't disqualify a supplier when they demonstrate robust systems and verification."
  },
  {
    id: 5,
    name: "West African Cocoa Trading Company",
    location: "Abidjan, Côte d'Ivoire",
    commodity: "Cocoa beans",
    industry: "Agriculture",
    verificationStatus: "Claims Fair Trade certification, certificate not verifiable through Fair Trade registry",
    adverseMedia: [
      "2024: Investigation by local journalists finds children working on farms in supply network",
      "2023: Company spokesperson denies child labor allegations, refuses facility access to NGO investigators",
      "2024: GPS data shows sourcing from farms in deforestation zones"
    ],
    positiveIndicators: [
      "30% lower cost than certified suppliers",
      "Large production volumes",
      "Company website claims commitment to sustainability"
    ],
    riskFactors: [
      "Cannot verify Fair Trade certification claims",
      "Refusal to allow independent verification",
      "Credible child labor allegations",
      "Sourcing from deforestation zones",
      "West Africa cocoa sector has well-documented child labor issues",
      "No third-party audit trail"
    ],
    correctAnswer: 'no',
    explanation: "This supplier presents multiple red flags. The inability to verify certification claims, refusal of independent access, credible child labor allegations, and sourcing from deforestation zones create unacceptable risks. Cocoa from West Africa is a high-risk commodity, and legitimate suppliers must demonstrate robust monitoring systems. The significantly lower price likely reflects avoided costs of ethical practices. Major chocolate companies have faced lawsuits and reputation damage from similar suppliers."
  }
];

export function SupplierEthicsActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'yes' | 'no' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completedSuppliers, setCompletedSuppliers] = useState<number[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [showTools, setShowTools] = useState(false);

  // Get random supplier profile
  const getRandomSupplier = () => {
    if (usedIndices.length === supplierProfiles.length) {
      // All suppliers used, reset
      setUsedIndices([]);
    }
    
    let availableIndices = supplierProfiles
      .map((_, idx) => idx)
      .filter(idx => !usedIndices.includes(idx));
    
    if (availableIndices.length === 0) {
      availableIndices = supplierProfiles.map((_, idx) => idx);
      setUsedIndices([]);
    }
    
    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedIndices([...usedIndices, randomIdx]);
    setCurrentIndex(randomIdx);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowTools(false);
  };

  useEffect(() => {
    // Start with a random supplier on mount
    const availableIndices = supplierProfiles.map((_, idx) => idx);
    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setCurrentIndex(randomIdx);
    setUsedIndices([randomIdx]);
  }, []);

  const currentSupplier = supplierProfiles[currentIndex];
  const allCompleted = completedSuppliers.length === supplierProfiles.length;

  const handleAnswer = (answer: 'yes' | 'no') => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentSupplier.correctAnswer) {
      setScore(score + 1);
    }

    if (!completedSuppliers.includes(currentSupplier.id)) {
      setCompletedSuppliers([...completedSuppliers, currentSupplier.id]);
    }
  };

  const handleNext = () => {
    if (completedSuppliers.length < supplierProfiles.length) {
      getRandomSupplier();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCompletedSuppliers([]);
    setUsedIndices([]);
    setShowTools(false);
    getRandomSupplier();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white mt-0 mb-0">Quiz on Choosing the Right Supplier</h2>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
            <Shield className="w-5 h-5" />
            <span className="font-['Outfit']">Score: {score}/{supplierProfiles.length}</span>
          </div>
        </div>
        <p className="m-0 text-green-100">
          Use Adverse Media & Supplier Selecting software (like Scoutbee) to determine if suppliers are ethically safe to invest in
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Supplier {currentIndex + 1} of {supplierProfiles.length}
          </span>
          <span className="text-sm text-gray-600">
            {completedSuppliers.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / supplierProfiles.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border-2 border-dashed border-green-500 p-6 mx-8 mt-6 rounded-lg">
        <p className="text-gray-800 mb-0">
          Participants will be given a random profile where they will have to use both <strong className="underline">Adverse media</strong> & <strong className="underline">Supplier Selecting softwares like Scoutbee</strong> to determine if it is ethically safe to invest in.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {!allCompleted ? (
          <>
            {/* Tools Section */}
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setShowTools(!showTools)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Search className="w-4 h-4" />
                {showTools ? 'Hide' : 'Show'} Research Tools
              </button>
              <button
                onClick={getRandomSupplier}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Get Random Profile
              </button>
            </div>

            {showTools && (
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h4 className="mt-0 mb-2 text-blue-900 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Research Tools Available
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-blue-800">Adverse Media Monitoring:</strong>
                    <p className="text-blue-700 m-0 mt-1">Search news articles, NGO reports, and regulatory findings</p>
                  </div>
                  <div>
                    <strong className="text-blue-800">Scoutbee Supplier Intelligence:</strong>
                    <p className="text-blue-700 m-0 mt-1">Verify certifications, audit history, and compliance records</p>
                  </div>
                </div>
              </div>
            )}

            {/* Supplier Profile Card - File Folder Style */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: File Folder Visual */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="relative">
                  <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-6 shadow-lg transform rotate-[-2deg]">
                    <div className="bg-white rounded p-4 border border-gray-300">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-6 h-6 text-amber-700" />
                        <span className="text-sm font-semibold text-amber-900">Supplier Profile</span>
                      </div>
                      <div className="h-32 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Case File</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Supplier Information */}
              <div className="md:col-span-2 space-y-4">
                {/* Supplier Info Box */}
                <div className="bg-green-600 text-white p-4 rounded-lg">
                  <h3 className="mt-0 mb-2 text-lg">{currentSupplier.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="m-0"><strong>Supplier:</strong> {currentSupplier.commodity} supplier in {currentSupplier.location.split(',')[currentSupplier.location.split(',').length - 1]}</p>
                    <p className="m-0"><strong>Supplier Verification:</strong> {currentSupplier.verificationStatus}</p>
                    <p className="m-0"><strong>Adverse media surrounding that factory:</strong> {currentSupplier.adverseMedia.length} report{currentSupplier.adverseMedia.length !== 1 ? 's' : ''} found</p>
                  </div>
                </div>

                {/* Decision Box */}
                <div className="bg-green-600 text-white p-4 rounded-lg">
                  <h4 className="mt-0 mb-3 text-lg">Do we push forward with this supplier?</h4>
                  {!showFeedback ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAnswer('yes')}
                        className="flex-1 py-3 px-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer('no')}
                        className="flex-1 py-3 px-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-lg ${selectedAnswer === currentSupplier.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedAnswer === currentSupplier.correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-6 h-6" />
                            <strong>Correct!</strong>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6" />
                            <strong>Incorrect</strong>
                          </>
                        )}
                      </div>
                      <p className="m-0 text-sm">
                        <strong>The correct answer is: {currentSupplier.correctAnswer === 'yes' ? 'Yes' : 'No'}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Information (Expandable) */}
            {showFeedback && (
              <div className="mt-6 space-y-4">
                {/* Verification Status */}
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                  <div className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="mt-0 mb-1 text-sm text-gray-700 font-semibold">Supplier Verification (Scoutbee)</h4>
                      <p className="m-0 text-sm text-gray-600">{currentSupplier.verificationStatus}</p>
                    </div>
                  </div>
                </div>

                {/* Adverse Media */}
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="mt-0 mb-2 text-sm text-red-900 font-semibold">Adverse Media Findings</h4>
                      <ul className="list-disc pl-6 space-y-2 mb-0">
                        {currentSupplier.adverseMedia.map((item, idx) => (
                          <li key={idx} className="text-sm text-red-800">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Positive Indicators */}
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="mt-0 mb-2 text-sm text-green-900 font-semibold">Positive Indicators</h4>
                      <ul className="list-disc pl-6 space-y-2 mb-0">
                        {currentSupplier.positiveIndicators.map((item, idx) => (
                          <li key={idx} className="text-sm text-green-800">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                  <div className="flex items-start gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="mt-0 mb-2 text-sm text-amber-900 font-semibold">Risk Factors</h4>
                      <ul className="list-disc pl-6 space-y-2 mb-0">
                        {currentSupplier.riskFactors.map((item, idx) => (
                          <li key={idx} className="text-sm text-amber-800">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="mt-0 mb-2 text-sm text-blue-900 font-semibold">Detailed Explanation</h4>
                  <p className="m-0 text-sm text-blue-800">{currentSupplier.explanation}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-6">
              <button
                onClick={getRandomSupplier}
                className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-green-500 transition-colors font-['Outfit'] flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Random Profile
              </button>
              
              {showFeedback && (
                <button
                  onClick={handleNext}
                  disabled={completedSuppliers.length === supplierProfiles.length}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
                >
                  {completedSuppliers.length === supplierProfiles.length ? 'View Results →' : 'Next Supplier →'}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Results Summary */
          <div className="text-center py-8">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${score >= 4 ? 'bg-green-100' : score >= 3 ? 'bg-yellow-100' : 'bg-red-100'} mb-4`}>
                <span className={`text-4xl ${score >= 4 ? 'text-green-700' : score >= 3 ? 'text-yellow-700' : 'text-red-700'}`}>
                  {score >= 4 ? '🎉' : score >= 3 ? '👍' : '📚'}
                </span>
              </div>
              <h2 className="mt-0 mb-2">Assessment Complete!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You scored <strong className="text-indigo-600">{score} out of {supplierProfiles.length}</strong>
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="mt-0 mb-4">Key Takeaways from Using Adverse Media & Supplier Selection Tools:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-0 text-sm">
                <li><strong>Adverse Media Monitoring:</strong> Always search news articles, NGO reports, and regulatory findings to identify hidden risks</li>
                <li><strong>Supplier Verification Tools (Scoutbee):</strong> Verify certifications through independent registries and check audit history</li>
                <li><strong>Red Flags:</strong> Low prices may indicate cutting corners on ethical practices; refusal to allow independent verification is a major concern</li>
                <li><strong>Positive Signals:</strong> Third-party audits and transparent operations are strong indicators of ethical practices</li>
                <li><strong>Context Matters:</strong> Operating in high-risk regions requires extra verification, not automatic rejection</li>
                <li><strong>Due Diligence:</strong> Use both tools together to make informed decisions about supplier partnerships</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-['Outfit']"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedAnswer(null);
                  setShowFeedback(false);
                  setCompletedSuppliers([]);
                }}
                className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-['Outfit']"
              >
                Review Suppliers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}