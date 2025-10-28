import React, { useState } from 'react';
import { Search, Download, Info, AlertCircle, CheckCircle, TrendingUp, Brain } from 'lucide-react';

const NIBSEvidenceTool = () => {
  const [selectedDisorder, setSelectedDisorder] = useState('');
  const [selectedModality, setSelectedModality] = useState('all');
  const [showReport, setShowReport] = useState(false);

  // Evidence database based on recent meta-analyses and RCTs
  const evidenceDatabase = {
    depression: {
      name: "Major Depressive Disorder",
      modalities: {
        rtms: {
          name: "rTMS (Repetitive Transcranial Magnetic Stimulation)",
          efficacy: "High",
          effectSize: "0.50-0.70",
          fdaApproved: true,
          evidenceLevel: "Level 1A",
          responseRate: "50-60%",
          remissionRate: "30-40%",
          sessions: "20-36 sessions",
          protocol: "10 Hz left DLPFC or 1 Hz right DLPFC",
          frequency: "Daily sessions, 5 days/week",
          references: "Brunoni et al., 2017; Mutz et al., 2019",
          contraindications: ["Metallic implants in head", "History of seizures", "Cochlear implants"],
          notes: "FDA cleared for treatment-resistant depression since 2008. Strong evidence base with multiple RCTs."
        },
        tbs: {
          name: "Theta Burst Stimulation",
          efficacy: "High",
          effectSize: "0.45-0.65",
          fdaApproved: true,
          evidenceLevel: "Level 1A",
          responseRate: "45-55%",
          remissionRate: "28-35%",
          sessions: "20-30 sessions",
          protocol: "iTBS left DLPFC (600 pulses, 3 min)",
          frequency: "Daily, 5 days/week",
          references: "Blumberger et al., 2018; Li et al., 2014",
          contraindications: ["Same as rTMS"],
          notes: "Shorter treatment duration (3 min vs 37 min). Non-inferior to standard rTMS."
        },
        tdcs: {
          name: "tDCS (Transcranial Direct Current Stimulation)",
          efficacy: "Moderate",
          effectSize: "0.35-0.45",
          fdaApproved: false,
          evidenceLevel: "Level 1B",
          responseRate: "35-45%",
          remissionRate: "20-30%",
          sessions: "10-20 sessions",
          protocol: "Anode left DLPFC, Cathode right supraorbital (2 mA, 20-30 min)",
          frequency: "Daily or every other day",
          references: "Brunoni et al., 2016; Moffa et al., 2020",
          contraindications: ["Skin lesions at electrode sites", "Metallic cranial implants"],
          notes: "More accessible and portable. Lower cost. Evidence mixed but promising for augmentation."
        }
      }
    },
    ocd: {
      name: "Obsessive-Compulsive Disorder",
      modalities: {
        rtms: {
          name: "rTMS (Repetitive Transcranial Magnetic Stimulation)",
          efficacy: "Moderate-High",
          effectSize: "0.50-0.65",
          fdaApproved: true,
          evidenceLevel: "Level 1A",
          responseRate: "40-50%",
          remissionRate: "25-35%",
          sessions: "20-30 sessions",
          protocol: "Low frequency (1 Hz) to supplementary motor area (SMA) or high frequency (10 Hz) to DLPFC",
          frequency: "Daily, 5 days/week",
          references: "Carmi et al., 2019; Berlim et al., 2013",
          contraindications: ["Standard TMS contraindications"],
          notes: "FDA cleared for OCD in 2018. Deep TMS shows stronger effects than standard figure-8 coil."
        },
        tdcs: {
          name: "tDCS (Transcranial Direct Current Stimulation)",
          efficacy: "Low-Moderate",
          effectSize: "0.25-0.40",
          fdaApproved: false,
          evidenceLevel: "Level 2",
          responseRate: "30-40%",
          remissionRate: "15-25%",
          sessions: "10-20 sessions",
          protocol: "Cathode over pre-SMA or orbitofrontal cortex (2 mA, 20 min)",
          frequency: "Daily or alternate days",
          references: "Bation et al., 2019; Najafi et al., 2020",
          contraindications: ["Standard tDCS contraindications"],
          notes: "Emerging evidence. May work better as augmentation to CBT/ERP therapy."
        }
      }
    },
    stroke: {
      name: "Stroke Rehabilitation (Motor Recovery)",
      modalities: {
        rtms: {
          name: "rTMS (Repetitive Transcranial Magnetic Stimulation)",
          efficacy: "Moderate",
          effectSize: "0.35-0.55",
          fdaApproved: false,
          evidenceLevel: "Level 1B",
          responseRate: "Variable (40-60% show improvement)",
          remissionRate: "N/A",
          sessions: "10-20 sessions",
          protocol: "Low frequency (1 Hz) to contralesional M1 or high frequency (10 Hz) to ipsilesional M1",
          frequency: "Daily combined with physical therapy",
          references: "Zhang et al., 2017; Lefaucheur et al., 2020",
          contraindications: ["Recent hemorrhagic stroke", "Uncontrolled seizures"],
          notes: "Best results when combined with motor training. More effective in subacute phase (<6 months post-stroke)."
        },
        tdcs: {
          name: "tDCS (Transcranial Direct Current Stimulation)",
          efficacy: "Moderate",
          effectSize: "0.30-0.50",
          fdaApproved: false,
          evidenceLevel: "Level 1B",
          responseRate: "45-55% show improvement",
          remissionRate: "N/A",
          sessions: "10-20 sessions",
          protocol: "Anode over ipsilesional M1 (2 mA, 20 min) during motor practice",
          frequency: "Daily with concurrent motor training",
          references: "Elsner et al., 2016; Bornheim et al., 2020",
          contraindications: ["Scalp lesions", "Metal in skull"],
          notes: "Cost-effective option. Best results when paired with task-specific training. Home-based protocols being developed."
        }
      }
    },
    chronicPain: {
      name: "Chronic Pain (Neuropathic/Fibromyalgia)",
      modalities: {
        rtms: {
          name: "rTMS (Repetitive Transcranial Magnetic Stimulation)",
          efficacy: "Moderate",
          effectSize: "0.40-0.55",
          fdaApproved: false,
          evidenceLevel: "Level 1B",
          responseRate: "40-50%",
          remissionRate: "20-30%",
          sessions: "10-20 sessions, maintenance may be needed",
          protocol: "High frequency (10 Hz) to M1 contralateral to pain or DLPFC",
          frequency: "Daily for 2-4 weeks, then maintenance",
          references: "O'Connell et al., 2018; Leung et al., 2020",
          contraindications: ["Standard TMS contraindications"],
          notes: "M1 stimulation shows best results for neuropathic pain. Effects may require maintenance sessions."
        },
        tdcs: {
          name: "tDCS (Transcranial Direct Current Stimulation)",
          efficacy: "Low-Moderate",
          effectSize: "0.25-0.40",
          fdaApproved: false,
          evidenceLevel: "Level 2",
          responseRate: "35-45%",
          remissionRate: "15-25%",
          sessions: "10-20 sessions",
          protocol: "Anode over M1 contralateral to pain (2 mA, 20 min)",
          frequency: "Daily or alternate days",
          references: "Vaseghi et al., 2014; O'Connell et al., 2018",
          contraindications: ["Skin conditions", "Metal implants"],
          notes: "Home-based protocols being investigated. May provide short-term relief requiring repeated courses."
        }
      }
    },
    ptsd: {
      name: "Post-Traumatic Stress Disorder",
      modalities: {
        rtms: {
          name: "rTMS (Repetitive Transcranial Magnetic Stimulation)",
          efficacy: "Moderate",
          effectSize: "0.40-0.60",
          fdaApproved: false,
          evidenceLevel: "Level 2",
          responseRate: "40-55%",
          remissionRate: "25-35%",
          sessions: "20-30 sessions",
          protocol: "High frequency (10-20 Hz) to right DLPFC or low frequency (1 Hz) to right DLPFC",
          frequency: "Daily, 5 days/week",
          references: "Kan et al., 2020; Petrosino et al., 2021",
          contraindications: ["Standard TMS contraindications"],
          notes: "Emerging evidence. Right DLPFC targeting shows promise. May reduce hyperarousal symptoms."
        },
        tdcs: {
          name: "tDCS (Transcranial Direct Current Stimulation)",
          efficacy: "Low-Moderate",
          effectSize: "0.30-0.45",
          fdaApproved: false,
          evidenceLevel: "Level 3",
          responseRate: "35-45%",
          remissionRate: "20-30%",
          sessions: "10-20 sessions",
          protocol: "Anode left DLPFC, cathode right DLPFC (2 mA, 20 min)",
          frequency: "Daily or alternate days",
          references: "Saunders et al., 2020; van't Wout-Frank et al., 2021",
          contraindications: ["Standard tDCS contraindications"],
          notes: "Preliminary evidence. Often studied in combination with trauma-focused therapy."
        }
      }
    },
    schizophrenia: {
      name: "Schizophrenia (Auditory Hallucinations)",
      modalities: {
        rtms: {
          name: "rTMS (Repetitive Transcranial Magnetic Stimulation)",
          efficacy: "Moderate",
          effectSize: "0.35-0.50",
          fdaApproved: false,
          evidenceLevel: "Level 1B",
          responseRate: "35-50%",
          remissionRate: "20-30%",
          sessions: "10-20 sessions",
          protocol: "Low frequency (1 Hz) to left temporoparietal cortex (T3-P3)",
          frequency: "Daily, 5 days/week",
          references: "Slotema et al., 2012; Kennedy et al., 2018",
          contraindications: ["Catatonia", "unstabilized medication"],
          notes: "Best for medication-resistant auditory hallucinations. Requires stable antipsychotic regimen."
        },
        tdcs: {
          name: "tDCS (Transcranial Direct Current Stimulation)",
          efficacy: "Low-Moderate",
          effectSize: "0.25-0.40",
          fdaApproved: false,
          evidenceLevel: "Level 2",
          responseRate: "30-40%",
          remissionRate: "15-25%",
          sessions: "10-20 sessions",
          protocol: "Anode left DLPFC, cathode left temporoparietal (2 mA, 20 min)",
          frequency: "Daily or alternate days",
          references: "Mondino et al., 2016; Koops et al., 2018",
          contraindications: ["Acute psychotic episode"],
          notes: "May help with negative symptoms and cognitive deficits. Research ongoing."
        }
      }
    }
  };

  const disorders = [
    { id: 'depression', name: 'Major Depressive Disorder' },
    { id: 'ocd', name: 'Obsessive-Compulsive Disorder' },
    { id: 'stroke', name: 'Stroke Rehabilitation (Motor)' },
    { id: 'chronicPain', name: 'Chronic Pain (Neuropathic/Fibromyalgia)' },
    { id: 'ptsd', name: 'Post-Traumatic Stress Disorder' },
    { id: 'schizophrenia', name: 'Schizophrenia (Auditory Hallucinations)' }
  ];

  const getEfficacyColor = (efficacy) => {
    if (efficacy.includes('High')) return 'text-green-600 bg-green-50';
    if (efficacy.includes('Moderate')) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getEvidenceColor = (level) => {
    if (level === 'Level 1A') return 'bg-green-100 text-green-800';
    if (level === 'Level 1B') return 'bg-blue-100 text-blue-800';
    if (level === 'Level 2') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const generateReport = () => {
    if (!selectedDisorder) return;

    const disorder = evidenceDatabase[selectedDisorder];
    const modalities = Object.entries(disorder.modalities);
    const filteredModalities = selectedModality === 'all' 
      ? modalities 
      : modalities.filter(([key]) => key === selectedModality);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Evidence Report: {disorder.name}</h2>
          <p className="text-blue-100">Non-Invasive Brain Stimulation Treatment Options</p>
          <p className="text-sm text-blue-200 mt-2">Generated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Clinical Note:</p>
              <p>This report summarizes current evidence for NIBS modalities. Treatment selection should consider individual patient factors, contraindications, availability, and cost. Always verify latest clinical guidelines and regulatory status.</p>
            </div>
          </div>
        </div>

        {filteredModalities.map(([key, modality]) => (
          <div key={key} className="bg-white border-2 border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{modality.name}</h3>
                {modality.fdaApproved && (
                  <span className="flex items-center text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    FDA Cleared
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Efficacy</div>
                  <div className={`inline-block px-3 py-1 rounded-full font-semibold ${getEfficacyColor(modality.efficacy)}`}>
                    {modality.efficacy}
                  </div>
                  <div className="text-sm text-gray-700 mt-2">Effect Size: {modality.effectSize}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Evidence Level</div>
                  <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getEvidenceColor(modality.evidenceLevel)}`}>
                    {modality.evidenceLevel}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Response Rate</div>
                  <div className="text-2xl font-bold text-gray-900">{modality.responseRate}</div>
                  {modality.remissionRate !== 'N/A' && (
                    <div className="text-sm text-gray-600 mt-1">Remission: {modality.remissionRate}</div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div>
                  <span className="font-semibold text-gray-900">Treatment Protocol:</span>
                  <p className="text-gray-700 mt-1">{modality.protocol}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Treatment Duration:</span>
                  <p className="text-gray-700 mt-1">{modality.sessions} ({modality.frequency})</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Key References:</span>
                  <p className="text-gray-600 text-sm mt-1 italic">{modality.references}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Clinical Notes:</span>
                  <p className="text-gray-700 mt-1">{modality.notes}</p>
                </div>

                {modality.contraindications.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-red-900">Contraindications:</span>
                        <ul className="list-disc list-inside text-red-800 text-sm mt-1">
                          {modality.contraindications.map((ci, idx) => (
                            <li key={idx}>{ci}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Evidence Level Guide:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-3">Level 1A</span>
              <span className="text-gray-700">Multiple high-quality RCTs and meta-analyses, strong consensus</span>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mr-3">Level 1B</span>
              <span className="text-gray-700">Multiple RCTs with some heterogeneity, good evidence</span>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold mr-3">Level 2</span>
              <span className="text-gray-700">Limited RCTs, emerging evidence, requires more research</span>
            </div>
            <div className="flex items-center">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold mr-3">Level 3</span>
              <span className="text-gray-700">Case series, preliminary studies, insufficient evidence</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Download className="w-5 h-5" />
            Download/Print Report
          </button>
          <button 
            onClick={() => setShowReport(false)}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Back to Selection
          </button>
        </div>

        <div className="text-xs text-gray-500 border-t pt-4">
          <p className="mb-2"><strong>Disclaimer:</strong> This tool provides evidence-based information for educational and clinical reference purposes. It does not constitute medical advice. Treatment decisions should be made by qualified healthcare professionals considering individual patient circumstances, latest research, regulatory approvals, and clinical guidelines.</p>
          <p><strong>Data Sources:</strong> Evidence compiled from peer-reviewed meta-analyses, systematic reviews, and randomized controlled trials published through 2024. Effect sizes represent Cohen's d from meta-analytic estimates. FDA approval status accurate as of 2024.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {!showReport ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-16 h-16 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                NIBS Evidence-Based Treatment Selector
              </h1>
              <p className="text-xl text-gray-600">
                Non-Invasive Brain Stimulation for Neuropsychiatric Disorders
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Evidence-based decision support tool for clinicians
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    1. Select Disorder/Condition
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {disorders.map((disorder) => (
                      <button
                        key={disorder.id}
                        onClick={() => setSelectedDisorder(disorder.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedDisorder === disorder.id
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{disorder.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {evidenceDatabase[disorder.id] && 
                            `${Object.keys(evidenceDatabase[disorder.id].modalities).length} modalities available`
                          }
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDisorder && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      2. Filter by Stimulation Modality (Optional)
                    </label>
                    <select
                      value={selectedModality}
                      onChange={(e) => setSelectedModality(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Modalities</option>
                      <option value="rtms">rTMS only</option>
                      <option value="tbs">Theta Burst Stimulation only</option>
                      <option value="tdcs">tDCS only</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={() => setShowReport(true)}
                  disabled={!selectedDisorder}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    selectedDisorder
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <TrendingUp className="w-6 h-6" />
                  Generate Evidence Report
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                About This Tool
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>This evidence-based tool compiles data from recent meta-analyses, systematic reviews, and randomized controlled trials to help clinicians understand the efficacy of various non-invasive brain stimulation modalities.</p>
                <p><strong>Data includes:</strong> Effect sizes, response rates, FDA approval status, treatment protocols, evidence levels, and key clinical considerations.</p>
                <p><strong>Modalities covered:</strong> rTMS (Repetitive Transcranial Magnetic Stimulation), TBS (Theta Burst Stimulation), and tDCS (Transcranial Direct Current Stimulation).</p>
              </div>
            </div>
          </div>
        ) : (
          generateReport()
        )}
      </div>
    </div>
  );
};

export default NIBSEvidenceTool;