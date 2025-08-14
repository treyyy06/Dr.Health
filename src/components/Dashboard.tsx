import React from 'react';
import { 
  Activity, 
  MessageCircle, 
  UserCheck, 
  BookOpen, 
  Clock, 
  Settings,
  Menu,
  Bell
} from 'lucide-react';
import { Language, AppScreen } from '../App';

interface DashboardProps {
  language: Language;
  onNavigate: (screen: AppScreen) => void;
}

const translations = {
  en: {
    title: 'Health Dashboard',
    subtitle: 'Your personal health companion',
    symptomChecker: 'Symptom Checker',
    chatbot: 'AI Assistant',
    doctorPortal: 'Doctor Portal',
    resources: 'Health Resources',
    followUp: 'Follow-up System',
    settings: 'Settings',
    greeting: 'Good morning! How are you feeling today?',
    quickActions: 'Quick Actions'
  },
  hi: {
    title: 'स्वास्थ्य डैशबोर्ड',
    subtitle: 'आपका व्यक्तिगत स्वास्थ्य साथी',
    symptomChecker: 'लक्षण जांचकर्ता',
    chatbot: 'AI सहायक',
    doctorPortal: 'डॉक्टर पोर्टल',
    resources: 'स्वास्थ्य संसाधन',
    followUp: 'फॉलो-अप सिस्टम',
    settings: 'सेटिंग्स',
    greeting: 'शुभ प्रभात! आज आप कैसा महसूस कर रहे हैं?',
    quickActions: 'त्वरित क्रियाएं'
  },
  te: {
    title: 'హెల్త్ డ్యాష్‌బోర్డ్',
    subtitle: 'మీ వ్యక్తిగత ఆరోగ్య సహాయకుడు',
    symptomChecker: 'లక్షణ తనిఖీ',
    chatbot: 'AI అసిస్టెంట్',
    doctorPortal: 'డాక్టర్ పోర్టల్',
    resources: 'ఆరోగ్య వనరులు',
    followUp: 'ఫాలో-అప్ సిస్టమ్',
    settings: 'సెట్టింగులు',
    greeting: 'శుభోదయం! ఈరోజు మీరు ఎలా ఉన్నారు?',
    quickActions: 'త్వరిత చర్యలు'
  },
  ta: {
    title: 'ஆரோக்கிய டாஷ்போர்டு',
    subtitle: 'உங்கள் தனிப்பட்ட ஆரோக்கிய துணை',
    symptomChecker: 'அறிகுறி சரிபார்ப்பு',
    chatbot: 'AI உதவியாளர்',
    doctorPortal: 'மருத்துவர் போர்ட்டல்',
    resources: 'ஆரோக்கிய ஆதாரங்கள்',
    followUp: 'பின்தொடர்தல் அமைப்பு',
    settings: 'அமைப்புகள்',
    greeting: 'காலை வணக்கம்! இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?',
    quickActions: 'விரைவு நடவடிக்கைகள்'
  }
};

const Dashboard: React.FC<DashboardProps> = ({ language, onNavigate }) => {
  const t = translations[language.code as keyof typeof translations] || translations.en;

  const features = [
    {
      id: 'symptomChecker' as AppScreen,
      title: t.symptomChecker,
      description: 'Interactive body diagram',
      icon: Activity,
      gradient: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      id: 'chatbot' as AppScreen,
      title: t.chatbot,
      description: 'Get instant health advice',
      icon: MessageCircle,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      id: 'doctorPortal' as AppScreen,
      title: t.doctorPortal,
      description: 'Connect with doctors',
      icon: UserCheck,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      id: 'resources' as AppScreen,
      title: t.resources,
      description: 'Articles & health tips',
      icon: BookOpen,
      gradient: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      id: 'followUp' as AppScreen,
      title: t.followUp,
      description: 'Track your recovery',
      icon: Clock,
      gradient: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600" />
              <Settings 
                className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" 
                onClick={() => onNavigate('language')}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.greeting}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Check-ins</h3>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <p className="text-sm text-gray-600">+2 from yesterday</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Follow-ups</h3>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">1</div>
            <p className="text-sm text-gray-600">Due in 2 hours</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <p className="text-sm text-gray-600">Good health status</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;