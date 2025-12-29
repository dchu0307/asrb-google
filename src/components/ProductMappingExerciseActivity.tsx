import { useState } from 'react';
import { Map, Layers, FileText, AlertTriangle, CheckCircle2, ArrowRight, Building2, Factory, Package, Leaf, Pickaxe, Edit3, Trash2 } from 'lucide-react';

interface TierMapping {
  id: number;
  name: string;
  description: string;
  userInput: string;
}

interface ProductOption {
  id: string;
  name: string;
  category: string;
  icon: any;
}

const productOptions: ProductOption[] = [
  { id: 'tshirt', name: 'Cotton T-Shirt', category: 'Textile & Apparel', icon: Package },
  { id: 'smartphone', name: 'Smartphone', category: 'Electronics', icon: Package },
  { id: 'chocolate', name: 'Chocolate Bar', category: 'Food & Beverage', icon: Package },
  { id: 'coffee', name: 'Coffee', category: 'Food & Beverage', icon: Package },
  { id: 'shoes', name: 'Leather Shoes', category: 'Footwear', icon: Package }
];

const tierTemplates = [
  { id: 0, name: 'Tier 0: Final Assembly', description: 'Final assembly and finishing', icon: Factory },
  { id: 1, name: 'Tier 1: Direct Supplier', description: 'Direct supplier', icon: Building2 },
  { id: 2, name: 'Tier 2: Fabric Mill / Component Vendor', description: 'Fabric mill or component vendor', icon: Factory },
  { id: 3, name: 'Tier 3: Raw-Material Processor', description: 'Raw-material processor', icon: Factory },
  { id: 4, name: 'Tier 4: Farm/Mine', description: 'Farm or mine', icon: Pickaxe }
];

export function ProductMappingExerciseActivity() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [tierMappings, setTierMappings] = useState<TierMapping[]>([]);
  const [editingTier, setEditingTier] = useState<number | null>(null);
  const [hardestTierAnswer, setHardestTierAnswer] = useState<string>('');
  const [verificationDocsAnswer, setVerificationDocsAnswer] = useState<string>('');
  const [redFlagsAnswer, setRedFlagsAnswer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState<'product' | 'mapping' | 'questions' | 'results'>('product');

  const selectedProductData = productOptions.find(p => p.id === selectedProduct);

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    // Initialize tier mappings
    setTierMappings(tierTemplates.map(tier => ({
      id: tier.id,
      name: tier.name,
      description: tier.description,
      userInput: ''
    })));
    setCurrentStep('mapping');
  };

  const handleTierInput = (tierId: number, value: string) => {
    setTierMappings(tierMappings.map(tier => 
      tier.id === tierId ? { ...tier, userInput: value } : tier
    ));
  };

  const handleStartMapping = () => {
    setCurrentStep('mapping');
  };

  const handleCompleteMapping = () => {
    const allFilled = tierMappings.every(tier => tier.userInput.trim() !== '');
    if (allFilled) {
      setCurrentStep('questions');
    } else {
      alert('Please fill in all tier mappings before proceeding.');
    }
  };

  const handleSubmitAnswers = () => {
    if (hardestTierAnswer.trim() && verificationDocsAnswer.trim() && redFlagsAnswer.trim()) {
      setShowResults(true);
      setCurrentStep('results');
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setTierMappings([]);
    setHardestTierAnswer('');
    setVerificationDocsAnswer('');
    setRedFlagsAnswer('');
    setShowResults(false);
    setCurrentStep('product');
  };

  const getExpectedHardestTier = () => {
    // Tier 4 is typically hardest to trace
    return 'Tier 4: Farm/Mine';
  };

  const getExpectedVerificationDocs = () => {
    return [
      'Purchase receipts with GPS coordinates',
      'Third-party certifications',
      'Transportation records',
      'Audit reports',
      'Batch tracking documentation',
      'Chain of custody records'
    ];
  };

  const getExpectedRedFlags = () => {
    return [
      'Duplicate addresses',
      'Missing batch IDs',
      'Inconsistent dates',
      'Gaps in documentation',
      'Unable to verify certifications',
      'Missing chain of custody'
    ];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Map className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Product Mapping Exercise</h2>
        </div>
        <p className="m-0 text-green-100">
          Choose a simple product and map it through your supply chain tiers, then answer key traceability questions
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${currentStep === 'product' ? 'text-green-600 font-semibold' : currentStep !== 'product' ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'product' ? 'bg-green-600 text-white' : currentStep !== 'product' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {currentStep !== 'product' ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <span className="text-sm">Choose Product</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className={`flex items-center gap-2 ${currentStep === 'mapping' ? 'text-green-600 font-semibold' : currentStep === 'questions' || currentStep === 'results' ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'mapping' ? 'bg-green-600 text-white' : currentStep === 'questions' || currentStep === 'results' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {currentStep === 'questions' || currentStep === 'results' ? <CheckCircle2 className="w-5 h-5" /> : '2'}
            </div>
            <span className="text-sm">Map Tiers</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className={`flex items-center gap-2 ${currentStep === 'questions' ? 'text-green-600 font-semibold' : currentStep === 'results' ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'questions' ? 'bg-green-600 text-white' : currentStep === 'results' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {currentStep === 'results' ? <CheckCircle2 className="w-5 h-5" /> : '3'}
            </div>
            <span className="text-sm">Answer Questions</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {currentStep === 'product' && (
          <div>
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="mt-0 mb-2 text-blue-900">Instructions:</h4>
              <p className="text-sm text-blue-800 m-0">
                Choose a simple product from the list below. You'll then map this product through your supply chain tiers (Tier 0-4) and answer questions about traceability challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {productOptions.map((product) => {
                const Icon = product.icon;
                return (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className="p-6 bg-white border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="mt-0 mb-0 text-lg font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600 m-0">{product.category}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 'mapping' && selectedProductData && (
          <div>
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="mt-0 mb-1 text-green-900">Mapping Exercise</h4>
                  <p className="text-sm text-green-800 m-0">
                    Map your <strong>{selectedProductData.name}</strong> through the supply chain tiers. For each tier, describe what happens at that level.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep('product')}
                  className="text-sm text-green-700 hover:text-green-900 underline"
                >
                  Change Product
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {tierMappings.map((tier) => {
                const tierTemplate = tierTemplates.find(t => t.id === tier.id);
                const TierIcon = tierTemplate?.icon || Building2;
                return (
                  <div key={tier.id} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-green-100 p-2 rounded">
                        <TierIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mt-0 mb-1 text-gray-900 font-semibold">{tier.name}</h4>
                        <p className="text-sm text-gray-600 m-0 mb-3">{tier.description}</p>
                        <textarea
                          value={tier.userInput}
                          onChange={(e) => handleTierInput(tier.id, e.target.value)}
                          placeholder={`Describe what happens at ${tier.name.toLowerCase()} for ${selectedProductData.name}...`}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCompleteMapping}
                disabled={!tierMappings.every(tier => tier.userInput.trim() !== '')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit'] flex items-center gap-2"
              >
                Continue to Questions
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'questions' && (
          <div>
            <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
              <h4 className="mt-0 mb-2 text-indigo-900">Answer These Questions:</h4>
              <p className="text-sm text-indigo-800 m-0">
                Based on your mapping exercise, answer the following questions about traceability challenges.
              </p>
            </div>

            {/* Question 1 */}
            <div className="mb-6 bg-white border-2 border-dashed border-green-500 rounded-lg p-6">
              <h3 className="mt-0 mb-4 text-gray-900">
                Which tier is hardest to trace? Why?
              </h3>
              <textarea
                value={hardestTierAnswer}
                onChange={(e) => setHardestTierAnswer(e.target.value)}
                placeholder="Explain which tier is hardest to trace and why..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                rows={4}
              />
            </div>

            {/* Question 2 */}
            <div className="mb-6 bg-white border-2 border-dashed border-green-500 rounded-lg p-6">
              <h3 className="mt-0 mb-4 text-gray-900">
                Which documents verify Tier-2 authenticity?
              </h3>
              <textarea
                value={verificationDocsAnswer}
                onChange={(e) => setVerificationDocsAnswer(e.target.value)}
                placeholder="List the documents needed to verify Tier-2 authenticity..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                rows={4}
              />
            </div>

            {/* Question 3 */}
            <div className="mb-6 bg-white border-2 border-dashed border-green-500 rounded-lg p-6">
              <h3 className="mt-0 mb-4 text-gray-900">
                What red flags might appear (duplicate addresses, missing batch IDs, inconsistent dates)?
              </h3>
              <textarea
                value={redFlagsAnswer}
                onChange={(e) => setRedFlagsAnswer(e.target.value)}
                placeholder="List potential red flags that might indicate traceability issues..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmitAnswers}
                disabled={!hardestTierAnswer.trim() || !verificationDocsAnswer.trim() || !redFlagsAnswer.trim()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit'] flex items-center gap-2"
              >
                Submit Answers
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="mt-0 mb-2">Mapping Exercise Complete!</h2>
              <p className="text-gray-600 mb-0">Review your answers and key learning points below.</p>
            </div>

            {/* Your Answers */}
            <div className="mb-6 bg-blue-50 rounded-lg p-6">
              <h3 className="mt-0 mb-4 text-blue-900">Your Answers</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Which tier is hardest to trace? Why?</h4>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded border border-blue-200 m-0">{hardestTierAnswer || 'No answer provided'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Which documents verify Tier-2 authenticity?</h4>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded border border-blue-200 m-0">{verificationDocsAnswer || 'No answer provided'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">What red flags might appear?</h4>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded border border-blue-200 m-0">{redFlagsAnswer || 'No answer provided'}</p>
                </div>
              </div>
            </div>

            {/* Key Learning Points */}
            <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h3 className="mt-0 mb-0 text-indigo-900">Key Learning Points</h3>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Hardest Tier to Trace:</h4>
                  <p className="text-gray-700 m-0">
                    <strong>Tier 4 (Farm/Mine)</strong> is typically the hardest to trace because:
                  </p>
                  <ul className="list-disc pl-5 mt-2 mb-0 text-gray-700 space-y-1">
                    <li>Thousands of smallholder farms or artisanal mines with limited documentation</li>
                    <li>Remote locations with limited infrastructure</li>
                    <li>Complex aggregation and trading networks</li>
                    <li>Limited technology adoption at source level</li>
                    <li>Scale makes individual farm/mine tracking challenging</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Verification Documents for Tier-2:</h4>
                  <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
                    {getExpectedVerificationDocs().map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mt-0 mb-2 text-indigo-700 font-semibold">Common Red Flags:</h4>
                  <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
                    {getExpectedRedFlags().map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <h4 className="mt-0 mb-2 text-green-900">Exercise Summary</h4>
              <p className="text-sm text-green-800 m-0">
                This exercise builds supplier capability in visualizing multi-tier risk. By mapping products through all tiers and identifying traceability challenges, you develop a deeper understanding of where risks emerge and what documentation is needed to verify authenticity. Regular mapping exercises help identify gaps and prioritize traceability improvements.
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-['Outfit']"
              >
                Start New Exercise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

