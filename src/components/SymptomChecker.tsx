import React, { useState } from 'react';
import { ArrowLeft, MapPin, Search, AlertTriangle } from 'lucide-react';
import { Language } from '../App';

interface SymptomCheckerProps {
  language: Language;
  onBack: () => void;
}

interface BodyPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  symptoms: string[];
}

const translations = {
  en: {
    title: 'Symptom Checker',
    subtitle: 'Click on a body part to check symptoms',
    searchPlaceholder: 'Search symptoms...',
    selectBodyPart: 'Select a body part from the diagram',
    commonSymptoms: 'Common symptoms for',
    possibleConditions: 'Possible conditions',
    disclaimer: 'This is for informational purposes only. Consult a healthcare professional for diagnosis.',
    selectSymptom: 'Select your symptoms:'
  },
  hi: {
    title: 'लक्षण जांचकर्ता',
    subtitle: 'लक्षणों की जांच के लिए शरीर के हिस्से पर क्लिक करें',
    searchPlaceholder: 'लक्षण खोजें...',
    selectBodyPart: 'आरेख से शरीर का भाग चुनें',
    commonSymptoms: 'के लिए सामान्य लक्षण',
    possibleConditions: 'संभावित स्थितियां',
    disclaimer: 'यह केवल सूचनात्मक उद्देश्यों के लिए है। निदान के लिए स्वास्थ्य पेशेवर से सलाह लें।',
    selectSymptom: 'अपने लक्षण चुनें:'
  },
  te: {
    title: 'లక్షణ తనిఖీ',
    subtitle: 'లక్షణాలను తనిఖీ చేయడానికి శరీర భాగంపై క్లిక్ చేయండి',
    searchPlaceholder: 'లక్షణాలను వెతకండి...',
    selectBodyPart: 'రేఖాచిత్రం నుండి శరీర భాగాన్ని ఎంచుకోండి',
    commonSymptoms: 'కోసం సాధారణ లక్షణాలు',
    possibleConditions: 'సాధ్యమైన పరిస్థితులు',
    disclaimer: 'ఇది కేవలం సమాచార ప్రయోజనాల కోసం మాత్రమే. రోగ నిర్ధారణ కోసం వైద్య నిపుణుడిని సంప్రదించండి.',
    selectSymptom: 'మీ లక్షణాలను ఎంచుకోండి:'
  },
  ta: {
    title: 'அறிகுறி சரிபார்ப்பு',
    subtitle: 'அறிகுறிகளைச் சரிபார்க்க உடல் பகுதியில் கிளிக் செய்யவும்',
    searchPlaceholder: 'அறிகுறிகளைத் தேடவும்...',
    selectBodyPart: 'வரைபடத்திலிருந்து உடல் பகுதியைத் தேர்ந்தெடுக்கவும்',
    commonSymptoms: 'க்கான பொதுவான அறிகுறிகள்',
    possibleConditions: 'சாத்தியமான நிலைகள்',
    disclaimer: 'இது தகவல் நோக்கங்களுக்காக மட்டுமே. நோயறிதலுக்கு சுகாதார நிபுணரை அணுகவும்.',
    selectSymptom: 'உங்கள் அறிகுறிகளைத் தேர்ந்தெடுக்கவும்:'
  }
};

const bodyParts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    position: { x: 50, y: 15 },
    symptoms: ['Headache', 'Dizziness', 'Fever', 'Nausea', 'Vision problems']
  },
  {
    id: 'chest',
    name: 'Chest',
    position: { x: 50, y: 35 },
    symptoms: ['Chest pain', 'Shortness of breath', 'Cough', 'Heart palpitations']
  },
  {
    id: 'abdomen',
    name: 'Abdomen',
    position: { x: 50, y: 55 },
    symptoms: ['Stomach pain', 'Nausea', 'Vomiting', 'Bloating', 'Loss of appetite']
  },
  {
    id: 'leftArm',
    name: 'Left Arm',
    position: { x: 25, y: 40 },
    symptoms: ['Arm pain', 'Numbness', 'Swelling', 'Weakness']
  },
  {
    id: 'rightArm',
    name: 'Right Arm',
    position: { x: 75, y: 40 },
    symptoms: ['Arm pain', 'Numbness', 'Swelling', 'Weakness']
  },
  {
    id: 'leftLeg',
    name: 'Left Leg',
    position: { x: 40, y: 80 },
    symptoms: ['Leg pain', 'Swelling', 'Numbness', 'Cramps']
  },
  {
    id: 'rightLeg',
    name: 'Right Leg',
    position: { x: 60, y: 80 },
    symptoms: ['Leg pain', 'Swelling', 'Numbness', 'Cramps']
  }
];

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ language, onBack }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const t = translations[language.code as keyof typeof translations] || translations.en;

  const handleBodyPartClick = (bodyPart: BodyPart) => {
    setSelectedBodyPart(bodyPart);
    setSelectedSymptoms([]);
  };

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
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
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Human Body Diagram */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Body Diagram</h3>
            <div className="relative bg-gray-50 rounded-xl p-8 min-h-96">
              <svg viewBox="0 0 100 100" className="w-full h-96">
                {/* Simple human body outline */}
                <ellipse cx="50" cy="12" rx="8" ry="10" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <rect x="45" y="22" width="10" height="25" rx="5" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <rect x="40" y="47" width="20" height="20" rx="3" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <rect x="20" y="25" width="8" height="20" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <rect x="72" y="25" width="8" height="20" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <rect x="45" y="67" width="4" height="25" rx="2" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                <rect x="55" y="67" width="4" height="25" rx="2" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />

                {/* Clickable body parts */}
                {bodyParts.map((part) => (
                  <circle
                    key={part.id}
                    cx={part.position.x}
                    cy={part.position.y}
                    r="6"
                    fill={selectedBodyPart?.id === part.id ? "#3b82f6" : "#ef4444"}
                    className="cursor-pointer hover:fill-blue-600 transition-colors"
                    onClick={() => handleBodyPartClick(part)}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Symptoms Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {selectedBodyPart ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.commonSymptoms} {selectedBodyPart.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{t.selectSymptom}</p>
                
                <div className="space-y-3">
                  {selectedBodyPart.symptoms.map((symptom) => (
                    <label
                      key={symptom}
                      className="flex items-center p-3 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom)}
                        onChange={() => handleSymptomToggle(symptom)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">{symptom}</span>
                    </label>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-yellow-800">{t.possibleConditions}</h4>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Common condition based on selected symptoms</li>
                      <li>• Another possible condition</li>
                      <li>• Consider consulting a healthcare provider</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{t.selectBodyPart}</h3>
                <p className="text-gray-500">Click on any red dot on the body diagram to start</p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-700">{t.disclaimer}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SymptomChecker;