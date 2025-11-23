import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import './PageCommon.css';

const PerformancePage = () => {
  const optimizations = [
    { name: 'Disable Visual Effects', impact: 'High', enabled: false },
    { name: 'Optimize Startup Programs', impact: 'High', enabled: false },
    { name: 'Clear System Cache', impact: 'Medium', enabled: false },
    { name: 'Disable Background Apps', impact: 'Medium', enabled: false },
    { name: 'Optimize Paging File', impact: 'Low', enabled: false },
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <TrendingUp size={32} />
        </div>
        <div>
          <h1>Performance Optimization</h1>
          <p>Boost your system's speed and responsiveness</p>
        </div>
      </motion.div>

      <div className="settings-section">
        {optimizations.map((opt, index) => (
          <motion.div
            key={opt.name}
            className="setting-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="setting-info">
              <h3>{opt.name}</h3>
              <p>Impact: {opt.impact}</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked={opt.enabled} />
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
        <button className="btn btn-primary">Apply Changes</button>
      </motion.div>
    </div>
  );
};

export default PerformancePage;
