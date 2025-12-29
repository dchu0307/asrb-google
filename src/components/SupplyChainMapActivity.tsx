import { Activity, TrendingUp, MapPin, Zap } from 'lucide-react';

export function SupplyChainMapActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Interactive Supply Chain Mapping</h2>
        </div>
        <p className="m-0 text-emerald-100">
          Explore real-time supply chain visualization and optimization
        </p>
      </div>

      {/* Information Section */}
      <div className="p-6 bg-blue-50 border-b border-blue-200">
        <h3 className="mt-0 mb-3 text-blue-900">About This Interactive Tool</h3>
        <p className="mb-4 text-sm text-gray-700">
          This external application demonstrates the key concepts you've learned about <strong>optimization, predictive analytics, and live monitoring</strong>. 
          It provides a visual representation of how modern supply chain systems track shipments, predict delays, and optimize routes in real-time.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h4 className="mt-0 mb-0 text-sm">Live Tracking</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Observe real-time location data and shipment status updates across the supply chain network
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h4 className="mt-0 mb-0 text-sm">Predictive Analytics</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              See how algorithms predict potential disruptions and suggest proactive interventions
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="mt-0 mb-0 text-sm">Route Optimization</h4>
            </div>
            <p className="m-0 text-xs text-gray-600">
              Explore how AI optimizes delivery routes based on traffic, weather, and sustainability goals
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
          <h4 className="mt-0 mb-2 text-sm text-amber-900">How to Use This Tool:</h4>
          <ul className="list-disc pl-5 mb-0 text-sm text-amber-800 space-y-1">
            <li>Interact with the map to explore different supply chain nodes and routes</li>
            <li>Click on shipments to view real-time tracking data and predictive insights</li>
            <li>Observe how the system responds to simulated disruptions (weather, delays, etc.)</li>
            <li>Notice how optimization algorithms reroute shipments to minimize impact</li>
            <li>Pay attention to how IoT sensors provide live monitoring data from various points</li>
          </ul>
        </div>
      </div>

      {/* Iframe Section */}
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-inner overflow-hidden" style={{ height: '700px' }}>
          <iframe
            src="https://quest-map-99f5f228.base44.app/"
            title="Supply Chain Interactive Map"
            className="w-full h-full border-0"
            allow="geolocation"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0 text-center">
          External tool provided for educational demonstration purposes
        </p>
      </div>

      {/* Key Concepts Reminder */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
        <h3 className="mt-0 mb-3">Connect to Lesson Concepts</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="mt-0 mb-2 text-emerald-700">Optimization Techniques:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>Dynamic route planning based on real-time conditions</li>
              <li>Multi-objective optimization (cost, speed, sustainability)</li>
              <li>Resource allocation across distribution networks</li>
            </ul>
          </div>
          <div>
            <h4 className="mt-0 mb-2 text-teal-700">Predictive & Live Monitoring:</h4>
            <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
              <li>IoT sensors providing continuous data streams</li>
              <li>Machine learning models forecasting delays</li>
              <li>Real-time dashboards for decision support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
