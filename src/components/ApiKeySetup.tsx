import React, { useState } from 'react';
import { Shield, Eye, EyeOff, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { Language } from '../App';

interface ApiKeySetupProps {
  language: Language;
  onApiKeySubmit: (apiKey: string, isValid: boolean) => void;
}

const translations = {
  en: {
    title: 'API Key Setup',
    subtitle: 'Enter your AI API key to enable smart features',
    placeholder: 'Enter your API key...',
    submit: 'Verify & Continue',
    security: 'Your API key is encrypted and stored securely',
    validating: 'Validating...',
    valid: 'API key is valid!',
    invalid: 'Invalid API key. Please try again.',
    required: 'API key is required to continue'
  },
  hi: {
    title: 'API की सेटअप',
    subtitle: 'स्मार्ट सुविधाओं को सक्षम करने के लिए अपनी AI API की दर्ज करें',
    placeholder: 'अपनी API की दर्ज करें...',
    submit: 'सत्यापित करें और जारी रखें',
    security: 'आपकी API की एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है',
    validating: 'सत्यापन जारी...',
    valid: 'API की वैध है!',
    invalid: 'अमान्य API की। कृपया पुनः प्रयास करें।',
    required: 'जारी रखने के लिए API की आवश्यक है'
  },
  te: {
    title: 'API కీ సెటప్',
    subtitle: 'స్మార్ట్ ఫీచర్లను ఎనేబుల్ చేయడానికి మీ AI API కీని ఎంటర్ చేయండి',
    placeholder: 'మీ API కీని ఎంటర్ చేయండి...',
    submit: 'వెరిఫై & కంటిన్యూ',
    security: 'మీ API కీ ఎన్క్రిప్టెడ్ మరియు సురక్షితంగా స్టోర్ చేయబడింది',
    validating: 'వెరిఫై చేస్తున్నాం...',
    valid: 'API కీ వాలిడ్!',
    invalid: 'ఇన్వాలిడ్ API కీ. దయచేసి మళ్లీ ప్రయత్నించండి.',
    required: 'కంటిన్యూ చేయడానికి API కీ అవసరం'
  },
  ta: {
    title: 'API கீ செட்அப்',
    subtitle: 'ஸ்மார்ட் அம்சங்களை இயக்க உங்கள் AI API கீயை உள்ளிடவும்',
    placeholder: 'உங்கள் API கீயை உள்ளிடவும்...',
    submit: 'சரிபார் & தொடர்',
    security: 'உங்கள் API கீ என்க்ரிப்டட் மற்றும் பாதுகாப்பாக சேமிக்கப்பட்டுள்ளது',
    validating: 'சரிபார்க்கிறோம்...',
    valid: 'API கீ செல்லுபடியாகும்!',
    invalid: 'தவறான API கீ. மீண்டும் முயற்சிக்கவும்.',
    required: 'தொடர API கீ தேவை'
  }
};

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ language, onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  
  const t = translations[language.code as keyof typeof translations] || translations.en;

  const validateApiKey = async (key: string): Promise<boolean> => {
    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 2000));
    return key.length > 10 && key.startsWith('gsk_');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setValidationStatus('idle');

    try {
      const isValid = await validateApiKey(apiKey);
      setValidationStatus(isValid ? 'valid' : 'invalid');
      
      if (isValid) {
        setTimeout(() => {
          onApiKeySubmit(apiKey, true);
        }, 1000);
      }
    } catch (error) {
      setValidationStatus('invalid');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                  disabled={isValidating}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {validationStatus === 'valid' && (
                <div className="flex items-center mt-2 text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{t.valid}</span>
                </div>
              )}

              {validationStatus === 'invalid' && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{t.invalid}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!apiKey.trim() || isValidating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isValidating ? t.validating : t.submit}
            </button>
          </form>

          <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
            <Lock className="w-4 h-4 mr-2" />
            {t.security}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;