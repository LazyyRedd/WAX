import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CleanerPage from './pages/CleanerPage';
import DebloatPage from './pages/DebloatPage';
import PerformancePage from './pages/PerformancePage';
import GPUTweaksPage from './pages/GPUTweaksPage';
import GeneralTweaksPage from './pages/GeneralTweaksPage';
import PrivacyPage from './pages/PrivacyPage';
import NetworkPage from './pages/NetworkPage';
import QualityOfLifePage from './pages/QualityOfLifePage';
import PowerPage from './pages/PowerPage';
import ServicesPage from './pages/ServicesPage';
import DevicesPage from './pages/DevicesPage';
import StartupPage from './pages/StartupPage';
import AppStorePage from './pages/AppStorePage';
import SystemRestorePage from './pages/SystemRestorePage';
import SettingsPage from './pages/SettingsPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'cleaner':
        return <CleanerPage />;
      case 'debloat':
        return <DebloatPage />;
      case 'performance':
        return <PerformancePage />;
      case 'gpu-tweaks':
        return <GPUTweaksPage />;
      case 'general':
        return <GeneralTweaksPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'network':
        return <NetworkPage />;
      case 'quality-of-life':
        return <QualityOfLifePage />;
      case 'power':
        return <PowerPage />;
      case 'services':
        return <ServicesPage />;
      case 'devices':
        return <DevicesPage />;
      case 'startup':
        return <StartupPage />;
      case 'app-store':
        return <AppStorePage />;
      case 'system-restore':
        return <SystemRestorePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <Header currentPage={currentPage} />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
