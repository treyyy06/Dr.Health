import React, { useState } from 'react';
import { ArrowLeft, Video, Calendar, Upload, Download, User, Clock } from 'lucide-react';
import { Language } from '../App';

interface DoctorPortalProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  en: {
    title: 'Doctor Portal',
    subtitle: 'Connect with healthcare professionals',
    videoConsultation: 'Video Consultation',
    bookAppointment: 'Book Appointment',
    viewPrescriptions: 'View Prescriptions',
    uploadReports: 'Upload Reports',
    availableDoctors: 'Available Doctors',
    upcomingAppointments: 'Upcoming Appointments',
    recentPrescriptions: 'Recent Prescriptions',
    startCall: 'Start Video Call',
    reschedule: 'Reschedule',
    download: 'Download',
    online: 'Online',
    busy: 'Busy'
  },
  hi: {
    title: 'डॉक्टर पोर्टल',
    subtitle: 'स्वास्थ्य पेशेवरों से जुड़ें',
    videoConsultation: 'वीडियो परामर्श',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    viewPrescriptions: 'पर्चे देखें',
    uploadReports: 'रिपोर्ट अपलोड करें',
    availableDoctors: 'उपलब्ध डॉक्टर',
    upcomingAppointments: 'आगामी नियुक्तियां',
    recentPrescriptions: 'हाल ही के पर्चे',
    startCall: 'वीडियो कॉल शुरू करें',
    reschedule: 'पुनर्निर्धारण',
    download: 'डाउनलोड',
    online: 'ऑनलाइन',
    busy: 'व्यस्त'
  },
  te: {
    title: 'డాక్టర్ పోర్టల్',
    subtitle: 'హెల్త్‌కేర్ ప్రొఫెషనల్స్‌తో కనెక్ట్ అవ్వండి',
    videoConsultation: 'వీడియో కన్సల్టేషన్',
    bookAppointment: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    viewPrescriptions: 'ప్రిస్క్రిప్షన్లు చూడండి',
    uploadReports: 'రిపోర్ట్లు అప్‌లోడ్ చేయండి',
    availableDoctors: 'అందుబాటులో ఉన్న వైద్యులు',
    upcomingAppointments: 'రాబోయే అపాయింట్‌మెంట్‌లు',
    recentPrescriptions: 'ఇటీవలి ప్రిస్క్రిప్షన్‌లు',
    startCall: 'వీడియో కాల్ ప్రారంభించండి',
    reschedule: 'రీషెడ్యూల్',
    download: 'డౌన్‌లోడ్',
    online: 'ఆన్‌లైన్',
    busy: 'బిజీ'
  },
  ta: {
    title: 'மருத்துவர் போர்ட்டல்',
    subtitle: 'சுகாதார வல்லுநர்களுடன் இணைக்கவும்',
    videoConsultation: 'வீடியோ ஆலோசனை',
    bookAppointment: 'சந்திப்பு பதிவு செய்யுங்கள்',
    viewPrescriptions: 'மருந்துச் சீட்டுகளைப் பாருங்கள்',
    uploadReports: 'அறிக்கைகளை பதிவேற்றவும்',
    availableDoctors: 'கிடைக்கும் மருத்துவர்கள்',
    upcomingAppointments: 'வரும் சந்திப்புகள்',
    recentPrescriptions: 'சமீபத்திய மருந்துச் சீட்டுகள்',
    startCall: 'வீடியோ அழைப்பைத் தொடங்கவும்',
    reschedule: 'மறு அமைக்கவும்',
    download: 'பதிவிறக்கம்',
    online: 'ஆன்லைன்',
    busy: 'பிஸி'
  }
};

const DoctorPortal: React.FC<DoctorPortalProps> = ({ language, onBack }) => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'appointments' | 'prescriptions'>('doctors');

  const t = translations[language.code as keyof typeof translations] || translations.en;

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      status: 'online',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Physician',
      status: 'online',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      status: 'busy',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-18',
      time: '10:00 AM',
      type: 'Video Consultation'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: '2025-01-20',
      time: '2:30 PM',
      type: 'Follow-up'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-15',
      medicines: ['Aspirin 75mg', 'Lisinopril 10mg'],
      type: 'Digital Prescription'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: '2025-01-10',
      medicines: ['Amoxicillin 500mg', 'Paracetamol 650mg'],
      type: 'Lab Reports'
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow text-center">
            <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="font-semibold text-gray-900">{t.videoConsultation}</span>
          </button>
          <button className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="font-semibold text-gray-900">{t.bookAppointment}</span>
          </button>
          <button className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow text-center">
            <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="font-semibold text-gray-900">{t.viewPrescriptions}</span>
          </button>
          <button className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow text-center">
            <Upload className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <span className="font-semibold text-gray-900">{t.uploadReports}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'doctors' as const, label: t.availableDoctors },
              { id: 'appointments' as const, label: t.upcomingAppointments },
              { id: 'prescriptions' as const, label: t.recentPrescriptions }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'online' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${
                          doctor.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></span>
                        {doctor.status === 'online' ? t.online : t.busy}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">★ {doctor.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Video className="w-4 h-4 mr-2" />
                  {t.startCall}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                      <p className="text-gray-600 text-sm">{appointment.type}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {appointment.date}
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Join
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                      {t.reschedule}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{prescription.doctor}</h3>
                    <p className="text-gray-600 text-sm">{prescription.type}</p>
                    <p className="text-gray-500 text-sm mt-1">{prescription.date}</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Medicines:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {prescription.medicines.map((medicine, index) => (
                          <li key={index}>{medicine}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    {t.download}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorPortal;