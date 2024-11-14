import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

const SellerWebsite = () => {
  const [activeTab, setActiveTab] = useState('Бренды');
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex((prev) => (prev + 1) % brandsData.length);
    }, 3000);
    return () => clearInterval(interval);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {brandsData.map((brand) => (
              <motion.div
                key={brand.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-[200px] flex items-center justify-center">
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold mt-4">{brand.name}</h3>
              </motion.div>
            ))}
          </div>
        );

      case 'Команда':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {teamData.map((member) => (
              <motion.div
                key={member.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[200px] h-[200px] mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold mt-4">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        );

      case 'Склад':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {warehousesData.map((warehouse) => (
              <motion.div
                key={warehouse.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-[300px]">
                  <img 
                    src={warehouse.image} 
                    alt={warehouse.name} 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold mt-4">{warehouse.name}</h3>
                <p className="text-gray-600">{warehouse.address}</p>
              </motion.div>
            ))}
          </div>
        );

      case 'Доставка':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 md:p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4">{deliveryData.title}</h2>
            <p className="text-gray-600 mb-6">{deliveryData.description}</p>
            <ul className="space-y-4">
              {deliveryData.methods.map((method, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>{method}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <header 
      className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200">
      {/* Decorative overlay */}
      <div className="w-full px-4 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
  </div>
  <div className="flex items-center justify-start">
            {/* Logo */}
            <div className="flex items-center justify-start">
              <AnimatedLogo />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-slate-300 hover:bg-slate-400 transition-colors absolute right-4 top-1/2 -translate-y-1/2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} className="text-slate-700"/> : <Menu size={24} className="text-slate-700" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
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

          {/* Mobile Navigation */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.nav
      className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-b from-slate-200 to-slate-300 z-50 border-b border-slate-300 shadow-lg backdrop-blur-sm"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Close button */}
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-400/20 transition-all duration-300"
          aria-label="Close menu"
        >
          <X size={24} className="text-gray-700" />
        </button>

        <div className="flex flex-col space-y-2 mt-8">
          {['Бренды', 'Команда', 'Склад', 'Доставка'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-3 rounded-lg transition-all duration-300 text-left
                ${activeTab === tab 
                  ? 'style-active-tab' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-400/20'
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

        {/* Обновленный стиль для активной вкладки */}
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
`}</style>
        </div>
      </header>

      {/* Brand Animation Banner */}
      
      
      <div className="w-full banner-height bg-white">
  <div className="w-full h-full max-w-[2000px] mx-auto px-0">
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
      <main className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Контакты</h3>
              <p className="text-sm md:text-base">Email: info@example.com</p>
              <p className="text-sm md:text-base">Телефон: +998 (91) 995-95-55</p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Адрес</h3>
              <p className="text-sm md:text-base">г. Ургенч, ул. Хонка, д. 93</p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Социальные сети</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="text-sm md:text-base hover:text-blue-400 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-sm md:text-base hover:text-blue-400 transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-sm md:text-base hover:text-blue-400 transition-colors">
                  Телеграм
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SellerWebsite;