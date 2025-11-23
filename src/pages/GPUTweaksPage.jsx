import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import './PageCommon.css';

const GPUTweaksPage = () => {
  const gpuSettings = [
    { name: 'Hardware Accelerated GPU Scheduling', enabled: true },
    { name: 'Optimize for Performance', enabled: false },
    { name: 'Disable VSync', enabled: false },
    { name: 'Maximum Pre-rendered Frames', enabled: false },
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <Cpu size={32} />
        </div>
        <div>
          <h1>GPU Tweaks</h1>
          <p>Optimize graphics settings for better gaming performance</p>
        </div>
      </motion.div>

      <div className="settings-section">
        {gpuSettings.map((setting, index) => (
          <motion.div
            key={setting.name}
            className="setting-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="setting-info">
              <h3>{setting.name}</h3>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={setting.enabled} />
              <span className="slider"></span>
            </label>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="action-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="btn btn-primary">Apply Settings</button>
      </motion.div>
    </div>
  );
};

export default GPUTweaksPage;
