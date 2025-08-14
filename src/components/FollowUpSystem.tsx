import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Language } from '../App';

interface FollowUpSystemProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  en: {
    title: 'Follow-up System',
    subtitle: 'Track your health progress and recovery',
    activeFollowUps: 'Active Follow-ups',
    completedFollowUps: 'Completed Follow-ups',
    symptomStatus: 'How are your symptoms?',
    improved: 'Improved',
    same: 'Same',
    worsened: 'Worsened',
    submit: 'Submit Update',
    recommendations: 'Recommendations',
    nextCheckIn: 'Next check-in in',
    hours: 'hours',
    days: 'days'
  },
  hi: {
    title: 'फॉलो-अप सिस्टम',
    subtitle: 'अपने स्वास्थ्य की प्रगति और रिकवरी को ट्रैक करें',
    activeFollowUps: 'सक्रिय फॉलो-अप',
    completedFollowUps: 'पूर्ण फॉलो-अप',
    symptomStatus: 'आपके लक्षण कैसे हैं?',
    improved: 'बेहतर हुआ',
    same: 'वैसा ही',
    worsened: 'बदतर हुआ',
    submit: 'अपडेट सबमिट करें',
    recommendations: 'सुझाव',
    nextCheckIn: 'अगली जांच',
    hours: 'घंटे में',
    days: 'दिन में'
  },
  te: {
    title: 'ఫాలో-అప్ సిస్టమ్',
    subtitle: 'మీ ఆరోగ్య పురోగతి మరియు రికవరీని ట్రాక్ చేయండి',
    activeFollowUps: 'యాక్టివ్ ఫాలో-అప్స్',
    completedFollowUps: 'పూర్తైన ఫాలో-అప్స్',
    symptomStatus: 'మీ లక్షణాలు ఎలా ఉన్నాయి?',
    improved: 'మెరుగుపడింది',
    same: 'అలాగే ఉంది',
    worsened: 'అధ్వాన్నంగా',
    submit: 'అప్‌డేట్ సబ్మిట్ చేయండి',
    recommendations: 'సిఫారసులు',
    nextCheckIn: 'తదుపరి చెక్-ఇన్',
    hours: 'గంటల్లో',
    days: 'రోజుల్లో'
  },
  ta: {
    title: 'பின்தொடர்தல் அமைப்பு',
    subtitle: 'உங்கள் சுகாதார முன்னேற்றம் மற்றும் மீட்சியைக் கண்காணிக்கவும்',
    activeFollowUps: 'செயலில் உள்ள பின்தொடர்தல்கள்',
    completedFollowUps: 'முடிந்த பின்தொடர்தல்கள்',
    symptomStatus: 'உங்கள் அறிகுறிகள் எப்படி உள்ளன?',
    improved: 'மேம்பட்டது',
    same: 'அப்படியே',
    worsened: 'மோசமாகிவிட்டது',
    submit: 'புதுப்பிப்பைச் சமர்ப்பிக்கவும்',
    recommendations: 'பரிந்துரைகள்',
    nextCheckIn: 'அடுத்த செக்-இன்',
    hours: 'மணி நேரத்தில்',
    days: 'நாட்களில்'
  }
};

interface FollowUp {
  id: string;
  condition: string;
  startDate: string;
  lastUpdate: string;
  status: 'improved' | 'same' | 'worsened';
  nextCheckIn: string;
  isActive: boolean;
}

const FollowUpSystem: React.FC<FollowUpSystemProps> = ({ language, onBack }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const [symptomStatus, setSymptomStatus] = useState<'improved' | 'same' | 'worsened' | null>(null);

  const t = translations[language.code as keyof typeof translations] || translations.en;

  const followUps: FollowUp[] = [
    {
      id: '1',
      condition: 'Headache symptoms',
      startDate: '2025-01-15',
      lastUpdate: '2025-01-16',
      status: 'same',
      nextCheckIn: '2025-01-17',
      isActive: true
    },
    {
      id: '2',
      condition: 'Back pain recovery',
      startDate: '2025-01-10',
      lastUpdate: '2025-01-16',
      status: 'improved',
      nextCheckIn: '2025-01-18',
      isActive: true
    },
    {
      id: '3',
      condition: 'Cold symptoms',
      startDate: '2025-01-08',
      lastUpdate: '2025-01-12',
      status: 'improved',
      nextCheckIn: '',
      isActive: false
    }
  ];

  const activeFollowUps = followUps.filter(f => f.isActive);
  const completedFollowUps = followUps.filter(f => !f.isActive);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'improved':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'worsened':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improved':
        return 'bg-green-100 text-green-800';
      case 'worsened':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const calculateTimeUntilNext = (nextCheckIn: string) => {
    if (!nextCheckIn) return '';
    
    const now = new Date();
    const next = new Date(nextCheckIn);
    const diff = next.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours} ${t.hours}`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} ${t.days}`;
    }
  };

  const handleSubmitUpdate = () => {
    if (selectedFollowUp && symptomStatus) {
      // Update follow-up status
      console.log('Update submitted:', { followUpId: selectedFollowUp.id, status: symptomStatus });
      setSelectedFollowUp(null);
      setSymptomStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.subtitle}</h2>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.activeFollowUps} ({activeFollowUps.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.completedFollowUps} ({completedFollowUps.length})
            </button>
          </nav>
        </div>

        {/* Follow-up Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'active' ? activeFollowUps : completedFollowUps).map((followUp) => (
            <div
              key={followUp.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => followUp.isActive && setSelectedFollowUp(followUp)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{followUp.condition}</h3>
                {getStatusIcon(followUp.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.status)}`}>
                    {followUp.status === 'improved' ? t.improved : 
                     followUp.status === 'worsened' ? t.worsened : t.same}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Started:</span>
                  <span className="text-gray-900">{followUp.startDate}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Update:</span>
                  <span className="text-gray-900">{followUp.lastUpdate}</span>
                </div>
                
                {followUp.isActive && followUp.nextCheckIn && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t.nextCheckIn}:</span>
                    <span className="text-blue-600 font-medium">
                      {calculateTimeUntilNext(followUp.nextCheckIn)}
                    </span>
                  </div>
                )}
              </div>
              
              {!followUp.isActive && (
                <div className="mt-4 flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Update Modal */}
        {selectedFollowUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Update: {selectedFollowUp.condition}
              </h3>
              
              <p className="text-gray-600 mb-6">{t.symptomStatus}</p>
              
              <div className="space-y-3">
                {[
                  { value: 'improved' as const, label: t.improved, color: 'green' },
                  { value: 'same' as const, label: t.same, color: 'yellow' },
                  { value: 'worsened' as const, label: t.worsened, color: 'red' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                      symptomStatus === option.value
                        ? `border-${option.color}-300 bg-${option.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="symptomStatus"
                      value={option.value}
                      checked={symptomStatus === option.value}
                      onChange={(e) => setSymptomStatus(e.target.value as any)}
                      className="mr-3"
                    />
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedFollowUp(null);
                    setSymptomStatus(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitUpdate}
                  disabled={!symptomStatus}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t.submit}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {activeFollowUps.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">{t.recommendations}</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Continue monitoring your symptoms and update your progress regularly</li>
              <li>• Follow prescribed medication schedules and treatment plans</li>
              <li>• Contact your healthcare provider if symptoms worsen significantly</li>
              <li>• Maintain healthy lifestyle habits to support recovery</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default FollowUpSystem;