import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { Language, SUPPORTED_LANGUAGES } from '../App';

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-6">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthCare Assistant</h1>
          <p className="text-gray-600">Choose your preferred language</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-3">
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                  {language.nativeName}
                </div>
                <div className="text-sm text-gray-500">
                  {language.name}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Your health companion in your language
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;