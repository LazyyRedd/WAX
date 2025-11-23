import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import './PageCommon.css';

const SettingsPage = () => {
  const appSettings = [
    { name: 'Dark Mode', enabled: true },
    { name: 'Auto-Update', enabled: true },
    { name: 'Notifications', enabled: true },
    { name: 'Start with Windows', enabled: false },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><Settings size={32} /></div>
        <div><h1>Settings</h1><p>Configure WAX application settings</p></div>
      </motion.div>
      <div className="settings-section">
        <h2>Application Settings</h2>
        {appSettings.map((setting, i) => (
          <motion.div key={setting.name} className="setting-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="setting-info"><h3>{setting.name}</h3></div>
            <label className="toggle-switch"><input type="checkbox" defaultChecked={setting.enabled} /><span className="slider"></span></label>
          </motion.div>
        ))}
      </div>
      <motion.div className="info-section glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3>About WAX</h3>
        <p>Version: 1.0.0</p>
        <p>© 2024 WAX System Optimizer. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
