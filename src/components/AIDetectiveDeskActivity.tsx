import { Brain, Search, FileSearch, AlertCircle, Sparkles, Target } from 'lucide-react';

export function AIDetectiveDeskActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">AI-Powered Supply Chain Investigation</h2>
        </div>
        <p className="m-0 text-purple-100">
          Experience hands-on how AI tools analyze and detect supply chain risks
        </p>
      </div>

      {/* Information Section */}
      <div className="p-6 bg-indigo-50 border-b border-indigo-200">
        <h3 className="mt-0 mb-3 text-indigo-900">About This Interactive Experience</h3>
        <p className="mb-4 text-sm text-gray-700">
          This detective-style AI tool demonstrates the <strong>key AI capabilities</strong> you've learned about for supply chain sustainability. 
          It simulates how artificial intelligence processes vast amounts of data to identify risks, anomalies, and opportunities for improvement 
          in supplier networks. Use this tool to see firsthand how AI transforms raw data into actionable intelligence.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-5 h-5 text-purple-600" />
              <h4 className="mt-0 mb-0 text-sm">Pattern Recognition</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Watch how AI identifies patterns and correlations across multiple data sources that humans might miss
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-pink-500">
            <div className="flex items-center gap-2 mb-2">
              <FileSearch className="w-5 h-5 text-pink-600" />
              <h4 className="mt-0 mb-0 text-sm">Automated Investigation</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              See AI conduct comprehensive due diligence checks that would take analysts days or weeks
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-indigo-600" />
              <h4 className="mt-0 mb-0 text-sm">Risk Scoring</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Observe how machine learning models calculate risk scores based on multiple weighted factors
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <h4 className="mt-0 mb-2 text-sm text-purple-900">How to Use This Tool:</h4>
          <ul className="list-disc pl-5 mb-0 text-sm text-purple-800 space-y-1">
            <li>Enter supplier information or company names to initiate an AI-powered investigation</li>
            <li>Watch as the AI tool gathers and analyzes data from multiple sources in real-time</li>
            <li>Review the AI-generated risk assessment, compliance checks, and sustainability scores</li>
            <li>Notice how the tool connects disparate data points to form comprehensive insights</li>
            <li>Pay attention to the confidence levels and explainability features that make AI trustworthy</li>
            <li>Experiment with different queries to understand the breadth of AI capabilities</li>
          </ul>
        </div>
      </div>

      {/* Key AI Concepts Section */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h3 className="mt-0 mb-0">AI Technologies Demonstrated</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <h4 className="mt-0 mb-2 text-purple-700">🤖 Natural Language Processing (NLP)</h4>
            <p className="m-0 text-gray-700 text-xs">
              Extracts meaning from unstructured text like news articles, social media, and regulatory filings to identify reputational risks
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-pink-200">
            <h4 className="mt-0 mb-2 text-pink-700">📊 Machine Learning Models</h4>
            <p className="m-0 text-gray-700 text-xs">
              Predicts supplier risk based on historical patterns, industry benchmarks, and real-time signals
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h4 className="mt-0 mb-2 text-indigo-700">🔗 Knowledge Graphs</h4>
            <p className="m-0 text-gray-700 text-xs">
              Maps complex relationships between suppliers, subsidiaries, ownership structures, and geographic locations
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <h4 className="mt-0 mb-2 text-purple-700">⚡ Anomaly Detection</h4>
            <p className="m-0 text-gray-700 text-xs">
              Flags unusual patterns in financial data, shipping routes, or compliance records that may indicate problems
            </p>
          </div>
        </div>
      </div>

      {/* Iframe Section */}
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-inner overflow-hidden" style={{ height: '700px' }}>
          <iframe
            src="https://the-detectives-desk-8a0b9660.base44.app/"
            title="AI Detective Desk - Supply Chain Investigation Tool"
            className="w-full h-full border-0"
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0 text-center">
          External AI investigation tool provided for educational demonstration purposes
        </p>
      </div>

      {/* Connection to Lesson Concepts */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-purple-50 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-purple-600" />
          <h3 className="mt-0 mb-0">Connecting AI Tools to Supply Chain Sustainability</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="mt-0 mb-2 text-purple-700">Practical Applications:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Pre-screening new suppliers before onboarding</li>
              <li>Continuous monitoring of existing supplier base</li>
              <li>Identifying hidden relationships and ownership structures</li>
              <li>Detecting early warning signs of financial distress</li>
              <li>Aggregating ESG scores from multiple rating agencies</li>
            </ul>
          </div>
          <div>
            <h4 className="mt-0 mb-2 text-pink-700">Business Benefits:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Reduces due diligence time from weeks to minutes</li>
              <li>Scales to analyze thousands of suppliers simultaneously</li>
              <li>Provides consistent, objective risk assessments</li>
              <li>Identifies risks that manual processes often miss</li>
              <li>Enables proactive rather than reactive risk management</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
          <p className="text-sm text-indigo-900 mb-2">
            <strong>💡 Key Insight:</strong> AI doesn't replace human judgment—it augments it. The tool provides data-driven insights, 
            but sustainability professionals must interpret the results within broader business context, ethical frameworks, and stakeholder expectations.
          </p>
        </div>
      </div>
    </div>
  );
}
