import React, { useState, useEffect } from 'react';
import LanguageSelection from './components/LanguageSelection';
import ApiKeySetup from './components/ApiKeySetup';
import Dashboard from './components/Dashboard';
import SymptomChecker from './components/SymptomChecker';
import Chatbot from './components/Chatbot';
import DoctorPortal from './components/DoctorPortal';
import MedicalResources from './components/MedicalResources';
import FollowUpSystem from './components/FollowUpSystem';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
];

export type AppScreen = 'language' | 'apiKey' | 'dashboard' | 'symptomChecker' | 'chatbot' | 'doctorPortal' | 'resources' | 'followUp';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);

  useEffect(() => {
    // Check if language and API key are already set
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedApiKey = localStorage.getItem('apiKeyConfigured');
    
    if (savedLanguage) {
      const language = SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage);
      if (language) {
        setSelectedLanguage(language);
        if (savedApiKey) {
          setIsApiKeyValid(true);
          setCurrentScreen('dashboard');
        } else {
          setCurrentScreen('apiKey');
        }
      }
    }
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
    setCurrentScreen('apiKey');
  };

  const handleApiKeySubmit = (key: string, isValid: boolean) => {
    setApiKey(key);
    setIsApiKeyValid(isValid);
    if (isValid) {
      localStorage.setItem('apiKeyConfigured', 'true');
      setCurrentScreen('dashboard');
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'language':
        return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
      case 'apiKey':
        return <ApiKeySetup language={selectedLanguage!} onApiKeySubmit={handleApiKeySubmit} />;
      case 'dashboard':
        return <Dashboard language={selectedLanguage!} onNavigate={setCurrentScreen} />;
      case 'symptomChecker':
        return <SymptomChecker language={selectedLanguage!} onBack={() => setCurrentScreen('dashboard')} />;
      case 'chatbot':
        return <Chatbot language={selectedLanguage!} onBack={() => setCurrentScreen('dashboard')} />;
      case 'doctorPortal':
        return <DoctorPortal language={selectedLanguage!} onBack={() => setCurrentScreen('dashboard')} />;
      case 'resources':
        return <MedicalResources language={selectedLanguage!} onBack={() => setCurrentScreen('dashboard')} />;
      case 'followUp':
        return <FollowUpSystem language={selectedLanguage!} onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <Dashboard language={selectedLanguage!} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;