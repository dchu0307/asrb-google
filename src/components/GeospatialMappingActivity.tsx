import { useState } from 'react';
import { MapPin, Globe, AlertTriangle, CheckCircle2, Target, Layers, Search } from 'lucide-react';

interface Site {
  id: number;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  inspectionPriority: 'low' | 'medium' | 'high';
  notes: string;
}

export function GeospatialMappingActivity() {
  const [selectedSites, setSelectedSites] = useState<Site[]>([]);
  const [currentView, setCurrentView] = useState<'map' | 'scorecard'>('map');

  // Sample sites for demonstration
  const availableSites: Site[] = [
    {
      id: 1,
      name: "Textile Manufacturing Facility",
      location: "Dhaka, Bangladesh",
      coordinates: { lat: 23.8103, lng: 90.4125 },
      riskLevel: 'high',
      riskFactors: [
        "Located in high-risk region for labor violations",
        "Recent adverse media reports",
        "No recent third-party audit"
      ],
      inspectionPriority: 'high',
      notes: "Requires immediate on-site inspection based on geospatial risk analysis"
    },
    {
      id: 2,
      name: "Electronics Assembly Plant",
      location: "Penang, Malaysia",
      coordinates: { lat: 5.4164, lng: 100.3327 },
      riskLevel: 'medium',
      riskFactors: [
        "Moderate risk region",
        "Has RBA certification",
        "Some worker concerns reported"
      ],
      inspectionPriority: 'medium',
      notes: "Schedule audit within next quarter"
    },
    {
      id: 3,
      name: "Agricultural Processing Facility",
      location: "Abidjan, Côte d'Ivoire",
      coordinates: { lat: 5.3600, lng: -4.0083 },
      riskLevel: 'high',
      riskFactors: [
        "High-risk commodity (cocoa)",
        "Region with documented child labor issues",
        "Limited traceability documentation"
      ],
      inspectionPriority: 'high',
      notes: "Critical: Verify farm-level traceability and labor practices"
    },
    {
      id: 4,
      name: "Mining Operation",
      location: "Kolwezi, DRC",
      coordinates: { lat: -10.7167, lng: 25.4667 },
      riskLevel: 'high',
      riskFactors: [
        "Conflict-affected region",
        "High-risk commodity (cobalt)",
        "No RMI certification"
      ],
      inspectionPriority: 'high',
      notes: "Requires conflict minerals due diligence and certification"
    },
    {
      id: 5,
      name: "Garment Factory",
      location: "Phnom Penh, Cambodia",
      coordinates: { lat: 11.5564, lng: 104.9282 },
      riskLevel: 'medium',
      riskFactors: [
        "Moderate risk region",
        "Accord certified",
        "Minor compliance issues reported"
      ],
      inspectionPriority: 'medium',
      notes: "Monitor for improvement, schedule follow-up audit"
    }
  ];

  const toggleSiteSelection = (site: Site) => {
    if (selectedSites.find(s => s.id === site.id)) {
      setSelectedSites(selectedSites.filter(s => s.id !== site.id));
    } else {
      setSelectedSites([...selectedSites, site]);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800 border-red-500';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      case 'low': return 'bg-green-100 text-green-800 border-green-500';
      default: return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-8 h-8" />
          <h2 className="text-white mt-0 mb-0">Interactive Geospatial Mapping Activity</h2>
        </div>
        <p className="m-0 text-emerald-100">
          Explore a 3D globe to visualize geospatial mapping functions and create a scorecard of sites needing inspection
        </p>
      </div>

      {/* View Toggle */}
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-['Outfit'] ${
              currentView === 'map'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            Map View
          </button>
          <button
            onClick={() => setCurrentView('scorecard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-['Outfit'] ${
              currentView === 'scorecard'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Scorecard ({selectedSites.length})
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {currentView === 'map' ? (
          <>
            {/* Instructions */}
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="mt-0 mb-2 text-blue-900">How to Use This Activity:</h4>
              <ul className="list-disc pl-5 space-y-1 mb-0 text-sm text-blue-800">
                <li>Scroll through the 3D globe below to visualize geospatial mapping functions</li>
                <li>Select areas, regions, or sites you want to simulate</li>
                <li>Click on sites to add them to your inspection scorecard</li>
                <li>Switch to Scorecard view to review selected sites and prioritize inspections</li>
                <li>Use geospatial data to identify high-risk regions and facilities</li>
              </ul>
            </div>

            {/* Map Container */}
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <div className="bg-white rounded-lg shadow-inner overflow-hidden" style={{ height: '600px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132038576!2d-73.98811768459398!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  title="Interactive Geospatial Mapping - 3D Globe"
                  className="w-full h-full border-0"
                  allow="geolocation"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3 mb-0 text-center">
                Interactive Google Maps/Google Earth interface for geospatial exploration
              </p>
            </div>

            {/* Available Sites List */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="mt-0 mb-4 text-indigo-900">Select Sites for Inspection Scorecard</h3>
              <div className="space-y-3">
                {availableSites.map((site) => {
                  const isSelected = selectedSites.find(s => s.id === site.id);
                  return (
                    <button
                      key={site.id}
                      onClick={() => toggleSiteSelection(site)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-300 bg-white hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <h4 className="mt-0 mb-0 text-sm font-semibold">{site.name}</h4>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{site.location}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRiskColor(site.riskLevel)}`}>
                              {site.riskLevel.toUpperCase()} RISK
                            </span>
                            <span className={`text-xs font-semibold ${getPriorityColor(site.inspectionPriority)}`}>
                              Priority: {site.inspectionPriority.toUpperCase()}
                            </span>
                          </div>
                          <ul className="list-disc pl-5 space-y-1 mb-0">
                            {site.riskFactors.map((factor, idx) => (
                              <li key={idx} className="text-xs text-gray-700">{factor}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Scorecard View */
          <div>
            <div className="mb-6 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
              <h3 className="mt-0 mb-2 text-emerald-900">Inspection Scorecard</h3>
              <p className="text-sm text-emerald-800 m-0">
                Review selected sites and prioritize inspections based on geospatial risk analysis. High-priority sites require immediate attention.
              </p>
            </div>

            {selectedSites.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-0">No sites selected yet. Go to Map View to select sites for inspection.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Sort by priority */}
                {[...selectedSites].sort((a, b) => {
                  const priorityOrder = { high: 3, medium: 2, low: 1 };
                  return priorityOrder[b.inspectionPriority] - priorityOrder[a.inspectionPriority];
                }).map((site) => (
                  <div key={site.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                          <h4 className="mt-0 mb-0">{site.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{site.location}</p>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded text-sm font-semibold border ${getRiskColor(site.riskLevel)}`}>
                            {site.riskLevel.toUpperCase()} RISK
                          </span>
                          <span className={`text-sm font-semibold ${getPriorityColor(site.inspectionPriority)}`}>
                            Inspection Priority: {site.inspectionPriority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSiteSelection(site)}
                        className="text-red-600 hover:text-red-700 p-2"
                        title="Remove from scorecard"
                      >
                        <AlertTriangle className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Risk Factors:</h5>
                      <ul className="list-disc pl-5 space-y-1 mb-0">
                        {site.riskFactors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-gray-700">{factor}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
                      <h5 className="text-sm font-semibold text-blue-900 mb-1">Inspection Notes:</h5>
                      <p className="text-sm text-blue-800 m-0">{site.notes}</p>
                    </div>
                  </div>
                ))}

                {/* Summary Stats */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
                  <h4 className="mt-0 mb-4 text-emerald-900">Scorecard Summary</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-700">{selectedSites.length}</div>
                      <div className="text-xs text-gray-600">Total Sites</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-700">
                        {selectedSites.filter(s => s.inspectionPriority === 'high').length}
                      </div>
                      <div className="text-xs text-gray-600">High Priority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-700">
                        {selectedSites.filter(s => s.riskLevel === 'high').length}
                      </div>
                      <div className="text-xs text-gray-600">High Risk</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Key Learning Points */}
        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
            <h3 className="mt-0 mb-0 text-indigo-900">Geospatial Mapping Applications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mt-0 mb-2 text-indigo-700">Key Benefits:</h4>
              <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
                <li>Visualize supply chain geography and identify high-risk regions</li>
                <li>Prioritize inspections based on geospatial risk analysis</li>
                <li>Track supplier locations and monitor regional risks</li>
                <li>Identify clusters of facilities requiring attention</li>
                <li>Plan efficient audit routes and inspection schedules</li>
              </ul>
            </div>
            <div>
              <h4 className="mt-0 mb-2 text-indigo-700">Use Cases:</h4>
              <ul className="list-disc pl-5 mb-0 text-gray-700 space-y-1">
                <li>Mapping supplier facilities across global supply chains</li>
                <li>Identifying high-risk regions for targeted monitoring</li>
                <li>Creating inspection scorecards based on location and risk</li>
                <li>Visualizing deforestation or environmental impacts</li>
                <li>Planning sustainable sourcing strategies by geography</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

