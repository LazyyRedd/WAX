import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import './Header.css';

const Header = ({ currentPage }) => {
  const getPageTitle = () => {
    const titles = {
      home: 'Home',
      cleaner: 'System Cleaner',
      debloat: 'Debloat Windows',
      performance: 'Performance Optimization',
      'gpu-tweaks': 'GPU Tweaks',
      general: 'General Tweaks',
      privacy: 'Privacy Settings',
      network: 'Network Optimization',
      'quality-of-life': 'Quality of Life',
      power: 'Power Management',
      services: 'Services Manager',
      devices: 'Device Manager',
      startup: 'Startup Manager',
      'app-store': 'App Store',
      'system-restore': 'System Restore',
      settings: 'Settings',
    };
    return titles[currentPage] || 'WAX';
  };

  return (
    <header className="header glass">
      <div className="header-left">
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="icon-button">
          <Bell size={20} />
        </button>
        <button className="icon-button">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
