import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; //
import { Menu, X } from 'lucide-react'; // Иконки для мобильного меню

const brandsData = [
  { id: 1, name: 'Avon', image: '/api/placeholder/200/100' },
  { id: 2, name: 'Complement', image: '/api/placeholder/200/100' },
  { id: 3, name: 'Нежный', image: '/api/placeholder/200/100' },
];

const teamData = [
  { id: 1, name: 'Садиков Дамир', position: 'CEO', image: '/api/placeholder/150/150' },
  { id: 2, name: 'Садыков Дамир', position: 'Sales Director', image: '/api/placeholder/150/150' },
];

const warehousesData = [
  { id: 1, name: 'Центральный склад', address: 'ул. Примерная, 1', image: '/api/placeholder/300/200' },
  { id: 2, name: 'Северный склад', address: 'ул. Складская, 5', image: '/api/placeholder/300/200' },
];

const deliveryData = {
  title: 'Наша доставка',
  description: 'Мы осуществляем доставку по всей России',
  methods: ['Курьерская доставка', 'Почта России', 'Пункты выдачи']
};

const SellerWebsite = () => {
  const [activeTab, setActiveTab] = useState('brands');
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
                <img src={brand.image} alt={brand.name} className="w-full h-32 md:h-40 object-cover rounded-lg" />
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
                <img src={member.image} alt={member.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto" />
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
                <img src={warehouse.image} alt={warehouse.name} className="w-full h-40 md:h-48 object-cover rounded-lg" />
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <img src="/api/placeholder/150/50" alt="Logo" className="h-8 md:h-12" />
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {['Бренды', 'Команда', 'Склад', 'Доставка'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <motion.nav
            className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2 pt-4">
              {['Бренды', 'Команда', 'Склад', 'Доставка'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Brand Animation Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {brandsData[currentBrandIndex].name}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
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
                <a href="#" className="text-sm md:text-base hover:text-blue-400">Facebook</a>
                <a href="#" className="text-sm md:text-base hover:text-blue-400">Instagram</a>
                <a href="#" className="text-sm md:text-base hover:text-blue-400">Телеграм</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SellerWebsite;