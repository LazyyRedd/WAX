import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './PageCommon.css';

const QualityOfLifePage = () => {
  const qolSettings = [
    { name: 'Disable Update Restarts', enabled: true },
    { name: 'Remove Ads from Start Menu', enabled: true },
    { name: 'Disable Cortana', enabled: false },
    { name: 'Classic Right-Click Menu', enabled: false },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><Star size={32} /></div>
        <div><h1>Quality of Life</h1><p>Enhance your Windows experience</p></div>
      </motion.div>
      <div className="settings-section">
        {qolSettings.map((setting, i) => (
          <motion.div key={setting.name} className="setting-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="setting-info"><h3>{setting.name}</h3></div>
            <label className="toggle-switch"><input type="checkbox" defaultChecked={setting.enabled} /><span className="slider"></span></label>
          </motion.div>
        ))}
      </div>
      <motion.div className="action-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <button className="btn btn-primary">Apply Settings</button>
      </motion.div>
    </div>
  );
};

export default QualityOfLifePage;
