import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import './PageCommon.css';

const GeneralTweaksPage = () => {
  const tweaks = [
    { name: 'Show File Extensions', enabled: true },
    { name: 'Show Hidden Files', enabled: false },
    { name: 'Disable Animations', enabled: false },
    { name: 'Enable Dark Mode', enabled: true },
    { name: 'Disable Transparency Effects', enabled: false },
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <Settings size={32} />
        </div>
        <div>
          <h1>General Tweaks</h1>
          <p>Customize Windows system settings</p>
        </div>
      </motion.div>

      <div className="settings-section">
        {tweaks.map((tweak, index) => (
          <motion.div
            key={tweak.name}
            className="setting-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="setting-info">
              <h3>{tweak.name}</h3>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={tweak.enabled} />
              <span className="slider"></span>
            </label>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="action-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="btn btn-primary">Apply Tweaks</button>
      </motion.div>
    </div>
  );
};

export default GeneralTweaksPage;
