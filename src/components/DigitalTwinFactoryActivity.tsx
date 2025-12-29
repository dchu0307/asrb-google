import { Boxes, Play, BarChart3, Settings, TrendingUp, Zap } from 'lucide-react';

export function DigitalTwinFactoryActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Boxes className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Interactive Digital Twin Simulation</h2>
        </div>
        <p className="m-0 text-cyan-100">
          Experience a virtual factory replica that responds to your decisions in real-time
        </p>
      </div>

      {/* Information Section */}
      <div className="p-6 bg-cyan-50 border-b border-cyan-200">
        <h3 className="mt-0 mb-3 text-cyan-900">About This Digital Twin Demonstration</h3>
        <p className="mb-4 text-sm text-gray-700">
          This interactive tool demonstrates the core concepts of <strong>digital twin technology</strong> that you've just learned about. 
          You'll manage a virtual factory where you can make operational decisions, simulate different scenarios, and observe the impact 
          on sustainability metrics—all without disrupting real-world operations. This is the power of digital twins: testing before implementing.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5 text-cyan-600" />
              <h4 className="mt-0 mb-0 text-sm">Real-Time Simulation</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Watch how the digital twin mirrors physical operations with live data feeds and dynamic updates
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h4 className="mt-0 mb-0 text-sm">Scenario Testing</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Experiment with different production strategies and see predicted outcomes before committing resources
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h4 className="mt-0 mb-0 text-sm">Performance Optimization</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Identify bottlenecks and optimization opportunities through data-driven insights from the twin
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h4 className="mt-0 mb-2 text-sm text-blue-900">How to Use This Tool:</h4>
          <ul className="list-disc pl-5 mb-0 text-sm text-blue-800 space-y-1">
            <li>Adjust production settings and operational parameters in the virtual factory</li>
            <li>Monitor sustainability metrics like energy consumption, waste generation, and emissions</li>
            <li>Run "what-if" scenarios to compare different operational strategies</li>
            <li>Observe how changes propagate through the system in real-time</li>
            <li>Pay attention to trade-offs between efficiency, cost, and sustainability</li>
            <li>Notice how the twin provides predictive insights about future performance</li>
          </ul>
        </div>
      </div>

      {/* Digital Twin Concepts Section */}
      <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-6 h-6 text-cyan-600" />
          <h3 className="mt-0 mb-0">Digital Twin Core Capabilities</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-cyan-200">
            <h4 className="mt-0 mb-2 text-cyan-700">🔄 Bi-Directional Data Flow</h4>
            <p className="m-0 text-gray-700 text-xs">
              The digital twin receives real-time data from physical sensors and can send optimized instructions back to control systems
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <h4 className="mt-0 mb-2 text-blue-700">🎯 Predictive Modeling</h4>
            <p className="m-0 text-gray-700 text-xs">
              Uses historical data and machine learning to forecast future states, potential failures, and maintenance needs
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-teal-200">
            <h4 className="mt-0 mb-2 text-teal-700">⚡ Scenario Simulation</h4>
            <p className="m-0 text-gray-700 text-xs">
              Test multiple operational scenarios virtually to identify optimal strategies without real-world risk or cost
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-cyan-200">
            <h4 className="mt-0 mb-2 text-cyan-700">📊 Continuous Optimization</h4>
            <p className="m-0 text-gray-700 text-xs">
              Constantly analyzes performance data to recommend improvements and automatically adjust operations
            </p>
          </div>
        </div>
      </div>

      {/* Iframe Section */}
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-inner overflow-hidden" style={{ height: '700px' }}>
          <iframe
            src="https://ethical-factory-manager-7f31ed86.base44.app/"
            title="Digital Twin Factory Manager - Ethical Supply Chain Simulation"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0 text-center">
          External digital twin simulation provided for educational demonstration purposes
        </p>
      </div>

      {/* Connection to Lesson Concepts */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-cyan-50 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-cyan-600" />
          <h3 className="mt-0 mb-0">Connecting Digital Twins to Supply Chain Sustainability</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="mt-0 mb-2 text-cyan-700">Sustainability Applications:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Simulate carbon impact before changing sourcing strategies</li>
              <li>Model circular economy material flows to minimize waste</li>
              <li>Test resilience of supply networks to climate disruptions</li>
              <li>Optimize transportation routes for emissions reduction</li>
              <li>Predict environmental impact of production changes</li>
              <li>Identify opportunities for energy efficiency improvements</li>
            </ul>
          </div>
          <div>
            <h4 className="mt-0 mb-2 text-blue-700">Business Value:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Reduce risk by testing decisions in virtual environment first</li>
              <li>Accelerate innovation without disrupting operations</li>
              <li>Improve decision-making with data-driven insights</li>
              <li>Reduce costs by identifying inefficiencies early</li>
              <li>Enable proactive maintenance and issue prevention</li>
              <li>Support compliance by modeling regulatory scenarios</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-4 rounded">
          <p className="text-sm text-cyan-900 mb-2">
            <strong>💡 Key Insight:</strong> Digital twins represent a paradigm shift from reactive to proactive supply chain management. 
            By creating virtual replicas that continuously learn and adapt, organizations can optimize for sustainability alongside traditional 
            business objectives like cost, speed, and quality. The virtual environment becomes a "safe sandbox" for testing bold sustainability 
            initiatives before investing resources in physical implementation.
          </p>
        </div>
      </div>
    </div>
  );
}
