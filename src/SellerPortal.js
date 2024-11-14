import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const brandsData = [
  { 
    id: 1, 
    name: 'Avon', 
    image: './images/brands/avon.jpg',
    bannerImage: './images/bannerImage/avonV1.svg'
  },
  { 
    id: 2, 
    name: 'Compliment', 
    image: './images/brands/complement.jpg',
    bannerImage: './images/bannerImage/complimentV1.svg'
  },
  { 
    id: 3, 
    name: 'Ehrmann', 
    image: './images/brands/nejniy.jpg',
    bannerImage: './images/bannerImage/ehrmannV1.svg'
  },
];

const teamData = [
  { id: 1, name: 'Садыков Дамир', position: 'CEO', image: './images/avon.jpg' },
  { id: 2, name: 'Садыков Дамир', position: 'Sales Director', image: '/api/placeholder/150/150' },
];

const warehousesData = [
  { id: 1, name: 'Центральный склад', address: 'ул. Примерная, 1', image: '/api/placeholder/300/200' },
  { id: 2, name: 'Северный склад', address: 'ул. Складская, 5', image: '/api/placeholder/300/200' },
];

const deliveryData = {
  title: 'Наша доставка',
  description: 'Мы осуществляем доставку по всей Хорезмской области',
  methods: ['Курьерская доставка', 'Почта BTS', 'Пункты выдачи']
};

const BackgroundDecorator = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-slate-200/40 to-slate-300/40 rounded-full blur-3xl" />
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-slate-100/30 to-slate-200/30 rounded-full blur-3xl" />
    <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/40 to-slate-300/40 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-slate-100/20 to-slate-200/20 rounded-full blur-3xl" />
  </div>
);

const DynamicPatternOverlay = () => (
  <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
    <div className="absolute inset-0" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }} />
  </div>
);

const SellerWebsite = () => {
  const [activeTab, setActiveTab] = useState('Бренды');
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex((prev) => (prev + 1) % brandsData.length);
    }, 3000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Бренды':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Наши Бренды
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Мы представляем только качественную продукцию от ведущих производителей
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandsData.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="h-[200px] flex items-center justify-center mb-6 bg-white rounded-lg p-4">
                        <img 
                          src={brand.image} 
                          alt={brand.name} 
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">{brand.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'Команда':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Наша Команда
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Профессионалы, которые делают наш бизнес успешным
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {teamData.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-md">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                      <p className="mt-2 text-slate-600">{member.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'Склад':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Наши Склады
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Современные складские помещения для хранения продукции
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {warehousesData.map((warehouse, index) => (
                <motion.div
                  key={warehouse.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="h-[300px] overflow-hidden">
                        <img 
                          src={warehouse.image} 
                          alt={warehouse.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-800">{warehouse.name}</h3>
                        <div className="mt-2 flex items-center text-slate-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{warehouse.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'Доставка':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                {deliveryData.title}
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                {deliveryData.description}
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 shadow-lg">
                <div className="grid gap-6">
                  {deliveryData.methods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <span className="text-lg font-semibold text-slate-800">{method}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
      <BackgroundDecorator />
      <DynamicPatternOverlay />

      {/* Header */}
      <header 
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-md' 
          : 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200'
      }`}
    >
      <div className="w-full px-4 py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="flex items-center justify-start">
              <AnimatedLogo />
            </div>
            
            <button
              className="md:hidden p-2 rounded-lg bg-slate-300 hover:bg-slate-400 transition-colors absolute right-4 top-1/2 -translate-y-1/2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} className="text-slate-700"/> : <Menu size={24} className="text-slate-700" />}
            </button>

            <nav className="hidden md:flex space-x-6 ml-8">
              {['Бренды', 'Команда', 'Склад', 'Доставка'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300
                    ${activeTab === tab 
                      ? 'style-active-tab transform hover:scale-105' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-400/20'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Navigation */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.nav
          className="md:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-50 border-b border-slate-200 shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-all duration-300"
              aria-label="Close menu"
            >
              <X size={24} className="text-slate-700" />
            </button>

            <div className="flex flex-col space-y-2 mt-8">
              {['Бренды', 'Команда', 'Склад', 'Доставка'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 text-left
                    ${activeTab === tab 
                      ? 'style-active-tab' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>

    {/* Brand Animation Banner */}
    <div className="w-full banner-height bg-white/80 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 via-transparent to-slate-100/50 pointer-events-none" />
      <div className="w-full h-full max-w-[2000px] mx-auto px-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBrandIndex}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-full h-full flex items-center justify-center relative"
              style={{ maxWidth: '2880px', margin: '0 auto' }}
            >
              <motion.img
                src={brandsData[currentBrandIndex].bannerImage}
                alt={brandsData[currentBrandIndex].name}
                className="w-auto h-full object-cover"
                style={{
                  objectFit: 'contain',
                  minHeight: '100%',
                  width: '100%',
                  margin: '0 auto'
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    {/* Main Content */}
    <main className="relative w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl" />
          <div className="relative z-10 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="relative w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white mt-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="backdrop-blur-sm bg-gray-800/20 rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4">Контакты</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <p className="text-sm md:text-base">info@example.com</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <p className="text-sm md:text-base">+998 (91) 995-95-55</p>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-gray-800/20 rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4">Адрес</h3>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <p className="text-sm md:text-base">г. Ургенч, ул. Хонка, д. 93</p>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-gray-800/20 rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4">Социальные сети</h3>
            <div className="flex flex-wrap gap-4">
              {['Facebook', 'Instagram', 'Телеграм'].map((social) => (
                <button
                  key={social}
                  onClick={() => {}} // Add your social media handler here
                  className="flex items-center px-4 py-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>

    {/* Styles */}
    <style jsx global>{`
      .style-active-tab {
        background: linear-gradient(135deg, #475569 0%, #64748b 100%);
        color: white;
        filter: drop-shadow(0 0 8px rgba(71, 85, 105, 0.3));
        transform: translateY(-1px);
      }
      
      .banner-height {
        height: 88px;
      }
      
      @media (min-width: 768px) {
        .banner-height {
          height: 332px;
        }
      }
      
      @media (min-width: 1080px) {
        .banner-height {
          height: 365px;
        }
      }
      
      @media (min-width: 1800px) {
        .banner-height {
          height: 485px;
        }
      }

      html {
        scroll-behavior: smooth;
      }

      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }

      ::-webkit-scrollbar-thumb {
        background: #94a3b8;
        border-radius: 6px;
        border: 3px solid #f1f5f9;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #64748b;
      }
    `}</style>
  </div>
);
};

export default SellerWebsite;