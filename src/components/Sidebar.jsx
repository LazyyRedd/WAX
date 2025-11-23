import React, { useState } from 'react';
import { 
  Home, Sparkles, Trash2, TrendingUp, Cpu, Settings, 
  Shield, Wifi, Star, Battery, Wrench, Monitor, 
  Rocket, ShoppingBag, RotateCcw, ChevronDown, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [expandedSections, setExpandedSections] = useState({
    systemOptimization: true,
    windowsTweaks: true,
    systemManagement: true,
    appsAndTools: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, type: 'single' },
    {
      id: 'systemOptimization',
      label: 'System Optimization',
      type: 'section',
      items: [
        { id: 'cleaner', label: 'Cleaner', icon: Sparkles },
        { id: 'debloat', label: 'Debloat', icon: Trash2 },
        { id: 'performance', label: 'Performance', icon: TrendingUp },
        { id: 'gpu-tweaks', label: 'GPU Tweaks', icon: Cpu },
      ]
    },
    {
      id: 'windowsTweaks',
      label: 'Windows Tweaks',
      type: 'section',
      items: [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'network', label: 'Network', icon: Wifi },
        { id: 'quality-of-life', label: 'Quality of Life', icon: Star },
        { id: 'power', label: 'Power', icon: Battery },
      ]
    },
    {
      id: 'systemManagement',
      label: 'System Management',
      type: 'section',
      items: [
        { id: 'services', label: 'Services', icon: Wrench },
        { id: 'devices', label: 'Devices', icon: Monitor },
        { id: 'startup', label: 'Startup', icon: Rocket },
      ]
    },
    {
      id: 'appsAndTools',
      label: 'Apps and Tools',
      type: 'section',
      items: [
        { id: 'app-store', label: 'App Store', icon: ShoppingBag },
        { id: 'system-restore', label: 'System Restore', icon: RotateCcw },
      ]
    },
    { id: 'settings', label: 'Settings', icon: Settings, type: 'single' },
  ];

  const renderMenuItem = (item) => {
    if (item.type === 'single') {
      const Icon = item.icon;
      return (
        <motion.div
          key={item.id}
          className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => setCurrentPage(item.id)}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon size={18} />
          <span>{item.label}</span>
        </motion.div>
      );
    }

    if (item.type === 'section') {
      const isExpanded = expandedSections[item.id];
      return (
        <div key={item.id} className="menu-section">
          <motion.div
            className="section-header"
            onClick={() => toggleSection(item.id)}
            whileHover={{ x: 5 }}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>{item.label}</span>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="section-items"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.items.map(subItem => {
                  const SubIcon = subItem.icon;
                  return (
                    <motion.div
                      key={subItem.id}
                      className={`menu-item sub-item ${currentPage === subItem.id ? 'active' : ''}`}
                      onClick={() => setCurrentPage(subItem.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SubIcon size={16} />
                      <span>{subItem.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
  };

  return (
    <div className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">
            <div className="logo-title">WAX</div>
            <div className="logo-subtitle">System Optimizer</div>
          </div>
        </div>
      </div>
      <div className="sidebar-menu">
        {menuItems.map(item => renderMenuItem(item))}
      </div>
      <div className="sidebar-footer">
        <span className="version">v1.0.0</span>
      </div>
    </div>
  );
};

export default Sidebar;
