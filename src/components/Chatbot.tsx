import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../App';

interface ChatbotProps {
  language: Language;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const translations = {
  en: {
    title: 'AI Health Assistant',
    subtitle: 'Ask me anything about your health',
    placeholder: 'Type your health question...',
    listening: 'Listening...',
    speaking: 'Speaking...',
    offline: 'Offline Mode',
    online: 'Online Mode'
  },
  hi: {
    title: 'AI स्वास्थ्य सहायक',
    subtitle: 'अपने स्वास्थ्य के बारे में कुछ भी पूछें',
    placeholder: 'अपना स्वास्थ्य प्रश्न टाइप करें...',
    listening: 'सुन रहा है...',
    speaking: 'बोल रहा है...',
    offline: 'ऑफलाइन मोड',
    online: 'ऑनलाइन मोड'
  },
  te: {
    title: 'AI ఆరోగ్య సహాయకుడు',
    subtitle: 'మీ ఆరోగ్యం గురించి ఏదైనా అడగండి',
    placeholder: 'మీ ఆరోగ్య ప్రశ్నను టైప్ చేయండి...',
    listening: 'వింటున్నాను...',
    speaking: 'మాట్లాడుతున్నాను...',
    offline: 'ఆఫ్‌లైన్ మోడ్',
    online: 'ఆన్‌లైన్ మోడ్'
  },
  ta: {
    title: 'AI ஆரோக்கிய உதவியாளர்',
    subtitle: 'உங்கள் ஆரோக்கியத்தைப் பற்றி எதையும் கேளுங்கள்',
    placeholder: 'உங்கள் ஆரோக்கிய கேள்வியை டைப் செய்யுங்கள்...',
    listening: 'கேட்கிறேன்...',
    speaking: 'பேசுகிறேன்...',
    offline: 'ஆஃப்லைன் பயன்முறை',
    online: 'ஆன்லைன் பயன்முறை'
  }
};

const Chatbot: React.FC<ChatbotProps> = ({ language, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[language.code as keyof typeof translations] || translations.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: t.subtitle,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your question about "${inputText}". Based on your symptoms, I recommend consulting with a healthcare professional for proper diagnosis. In the meantime, ensure you stay hydrated and get adequate rest.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Implement speech-to-text functionality
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // Implement text-to-speech functionality
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOnlineMode(!isOnlineMode)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isOnlineMode 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {isOnlineMode ? t.online : t.offline}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white shadow-md border border-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.placeholder}
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-full transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={toggleSpeaking}
                  className={`p-3 rounded-full transition-colors ${
                    isSpeaking 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {isListening && (
              <div className="mt-2 text-center">
                <span className="text-sm text-red-600 animate-pulse">{t.listening}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;