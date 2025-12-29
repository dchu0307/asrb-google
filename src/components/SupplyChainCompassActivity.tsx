import { Compass, Eye, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';

export function SupplyChainCompassActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Supply Chain Control Tower Dashboard</h2>
        </div>
        <p className="m-0 text-blue-100">
          Experience centralized visibility and real-time decision-making across your supply chain
        </p>
      </div>

      {/* Information Section */}
      <div className="p-6 bg-indigo-50 border-b border-indigo-200">
        <h3 className="mt-0 mb-3 text-indigo-900">About This Control Tower Demonstration</h3>
        <p className="mb-4 text-sm text-gray-700">
          This interactive control tower demonstrates the <strong>centralized visibility and decision-making capabilities</strong> you've learned about. 
          It provides a real-time view of supply chain operations, integrating data from multiple sources to enable proactive management, 
          rapid issue identification, and coordinated response across the entire network.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h4 className="mt-0 mb-0 text-sm">End-to-End Visibility</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Observe how a control tower aggregates data from multiple systems to create a single source of truth across all supply chain tiers
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h4 className="mt-0 mb-0 text-sm">Real-Time Monitoring</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              See how live data streams enable continuous monitoring of shipments, inventory, and performance metrics across the network
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <h4 className="mt-0 mb-0 text-sm">Proactive Decision-Making</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Experience how control towers enable rapid response to disruptions and optimization opportunities before they impact operations
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h4 className="mt-0 mb-2 text-sm text-blue-900">How to Use This Tool:</h4>
          <ul className="list-disc pl-5 mb-0 text-sm text-blue-800 space-y-1">
            <li>Explore the dashboard to see integrated data from multiple supply chain systems</li>
            <li>Monitor real-time metrics including shipments, inventory levels, and performance indicators</li>
            <li>Identify potential disruptions or bottlenecks through visual alerts and trend analysis</li>
            <li>Observe how data from different sources (ERP, TMS, WMS, supplier portals) is unified</li>
            <li>Notice how the control tower enables quick decision-making with comprehensive context</li>
            <li>Explore how sustainability metrics are tracked alongside operational performance</li>
          </ul>
        </div>
      </div>

      {/* Control Tower Concepts Section */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="mt-0 mb-0">Control Tower Core Capabilities</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <h4 className="mt-0 mb-2 text-blue-700">🔗 Data Integration</h4>
            <p className="m-0 text-gray-700 text-xs">
              Connects disparate systems (ERP, TMS, WMS, supplier portals) to create a unified view of supply chain operations
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h4 className="mt-0 mb-2 text-indigo-700">📊 Analytics Engine</h4>
            <p className="m-0 text-gray-700 text-xs">
              Processes and analyzes integrated data to identify patterns, predict issues, and recommend optimal actions
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <h4 className="mt-0 mb-2 text-purple-700">⚡ Real-Time Alerts</h4>
            <p className="m-0 text-gray-700 text-xs">
              Automatically notifies stakeholders when thresholds are exceeded or anomalies are detected, enabling rapid response
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <h4 className="mt-0 mb-2 text-blue-700">🤝 Collaboration Platform</h4>
            <p className="m-0 text-gray-700 text-xs">
              Enables communication and coordination across teams, suppliers, and partners to resolve issues efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Iframe Section */}
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-inner overflow-hidden" style={{ height: '700px' }}>
          <iframe
            src="https://supply-chain-compass-6645d821.base44.app/"
            title="Supply Chain Control Tower Dashboard - Real-Time Visibility Platform"
            className="w-full h-full border-0"
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0 text-center">
          External control tower dashboard provided for educational demonstration purposes
        </p>
      </div>

      {/* Connection to Lesson Concepts */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-blue-600" />
          <h3 className="mt-0 mb-0">Connecting Control Towers to Supply Chain Management</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="mt-0 mb-2 text-blue-700">Key Benefits:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Single source of truth eliminates data silos and conflicting information</li>
              <li>End-to-end visibility from raw materials to final delivery</li>
              <li>Rapid issue identification enables proactive rather than reactive management</li>
              <li>Coordinated response across multiple stakeholders and geographies</li>
              <li>Data-driven decision-making with comprehensive context</li>
              <li>Integration with digital twins for scenario planning and simulation</li>
            </ul>
          </div>
          <div>
            <h4 className="mt-0 mb-2 text-indigo-700">Sustainability Applications:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Track carbon emissions across all supply chain tiers in real-time</li>
              <li>Monitor social compliance metrics and labor standards</li>
              <li>Measure circular economy indicators and waste reduction</li>
              <li>Identify sustainability risks before they become compliance issues</li>
              <li>Optimize transportation routes for emissions reduction</li>
              <li>Enable transparent reporting to stakeholders and regulators</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
          <p className="text-sm text-indigo-900 mb-2">
            <strong>💡 Key Insight:</strong> Control towers transform supply chain management from reactive firefighting to proactive orchestration. 
            By providing centralized visibility and real-time insights, they enable organizations to anticipate disruptions, optimize performance, 
            and coordinate responses across complex, multi-tier supply networks. When integrated with digital twins, control towers become even 
            more powerful—providing both real-time monitoring and the ability to simulate response options before taking action in the physical world.
          </p>
        </div>
      </div>
    </div>
  );
}

