import React, { useState } from 'react';
import { ArrowLeft, Search, BookOpen, Video, FileText, Heart } from 'lucide-react';
import { Language } from '../App';

interface MedicalResourcesProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  en: {
    title: 'Medical Resources',
    subtitle: 'Health articles, videos, and preventive care tips',
    searchPlaceholder: 'Search health topics...',
    articles: 'Health Articles',
    videos: 'Educational Videos',
    preventiveCare: 'Preventive Care',
    faqs: 'Frequently Asked Questions',
    readMore: 'Read More',
    watchVideo: 'Watch Video',
    categories: 'Categories'
  },
  hi: {
    title: 'चिकित्सा संसाधन',
    subtitle: 'स्वास्थ्य लेख, वीडियो और निवारक देखभाल के सुझाव',
    searchPlaceholder: 'स्वास्थ्य विषयों की खोज करें...',
    articles: 'स्वास्थ्य लेख',
    videos: 'शैक्षणिक वीडियो',
    preventiveCare: 'निवारक देखभाल',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    readMore: 'और पढ़ें',
    watchVideo: 'वीडियो देखें',
    categories: 'श्रेणियां'
  },
  te: {
    title: 'వైద్య వనరులు',
    subtitle: 'ఆరోగ్య వ్యాసాలు, వీడియోలు మరియు నివారణ సంరక్షణ చిట్కలు',
    searchPlaceholder: 'ఆరోగ్య అంశాలను వెతకండి...',
    articles: 'ఆరోగ్య వ్యాసాలు',
    videos: 'విద్యా వీడియోలు',
    preventiveCare: 'నివారణ సంరక్షణ',
    faqs: 'తరచుగా అడిగే ప్రశ్నలు',
    readMore: 'మరింత చదవండి',
    watchVideo: 'వీడియో చూడండి',
    categories: 'వర్గాలు'
  },
  ta: {
    title: 'மருத்துவ ஆதாரங்கள்',
    subtitle: 'சுகாதார கட்டுரைகள், வீடியோக்கள் மற்றும் தடுப்பு பராமரிப்பு குறிப்புகள்',
    searchPlaceholder: 'சுகாதார தலைப்புகளைத் தேடுங்கள்...',
    articles: 'சுகாதார கட்டுரைகள்',
    videos: 'கல்வி வீடியோக்கள்',
    preventiveCare: 'தடுப்பு பராமரிப்பு',
    faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    readMore: 'மேலும் படிக்கவும்',
    watchVideo: 'வீடியோவைப் பாருங்கள்',
    categories: 'வகைகள்'
  }
};

const MedicalResources: React.FC<MedicalResourcesProps> = ({ language, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<'articles' | 'videos' | 'preventive' | 'faqs'>('articles');
  const [searchTerm, setSearchTerm] = useState('');

  const t = translations[language.code as keyof typeof translations] || translations.en;

  const categories = [
    { id: 'articles' as const, label: t.articles, icon: BookOpen, color: 'text-blue-600' },
    { id: 'videos' as const, label: t.videos, icon: Video, color: 'text-red-600' },
    { id: 'preventive' as const, label: t.preventiveCare, icon: Heart, color: 'text-green-600' },
    { id: 'faqs' as const, label: t.faqs, icon: FileText, color: 'text-purple-600' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Heart Disease: Prevention and Treatment',
      summary: 'Comprehensive guide to cardiovascular health, risk factors, and preventive measures.',
      category: 'Cardiology',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'Diabetes Management: Diet and Lifestyle Tips',
      summary: 'Essential information about managing diabetes through proper nutrition and exercise.',
      category: 'Endocrinology',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/6823565/pexels-photo-6823565.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'Mental Health: Recognizing Signs of Depression',
      summary: 'Learn to identify early warning signs and seek appropriate help for mental health.',
      category: 'Psychology',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Proper Hand Washing Technique',
      duration: '3:24',
      category: 'Hygiene',
      thumbnail: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'Basic First Aid for Cuts and Wounds',
      duration: '5:17',
      category: 'First Aid',
      thumbnail: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'Breathing Exercises for Stress Relief',
      duration: '8:45',
      category: 'Wellness',
      thumbnail: 'https://images.pexels.com/photos/3820360/pexels-photo-3820360.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const preventiveTips = [
    {
      id: 1,
      title: 'Annual Health Checkup Checklist',
      description: 'Essential screenings and tests to schedule each year for optimal health.',
      category: 'General Health'
    },
    {
      id: 2,
      title: 'Vaccination Schedule for Adults',
      description: 'Stay up-to-date with recommended vaccines for disease prevention.',
      category: 'Immunization'
    },
    {
      id: 3,
      title: 'Cancer Screening Guidelines',
      description: 'Age-appropriate screening recommendations for early cancer detection.',
      category: 'Oncology'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'When should I see a doctor for a fever?',
      answer: 'Seek medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms like difficulty breathing, chest pain, or confusion.'
    },
    {
      id: 2,
      question: 'How often should I exercise for optimal health?',
      answer: 'The WHO recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities twice a week.'
    },
    {
      id: 3,
      question: 'What are the signs of a heart attack?',
      answer: 'Common signs include chest pain or discomfort, shortness of breath, nausea, lightheadedness, and pain in arms, back, neck, jaw, or stomach. Call emergency services immediately if you suspect a heart attack.'
    }
  ];

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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-white shadow-lg text-blue-600 border border-blue-100'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md'
              }`}
            >
              <category.icon className={`w-5 h-5 mr-2 ${category.color}`} />
              {category.label}
            </button>
          ))}
        </div>

        {/* Content based on active category */}
        {activeCategory === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors">
                    {t.readMore}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Video className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {video.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{video.title}</h3>
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center">
                    <Video className="w-4 h-4 mr-2" />
                    {t.watchVideo}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'preventive' && (
          <div className="space-y-6">
            {preventiveTips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'faqs' && (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MedicalResources;