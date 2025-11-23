import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import './PageCommon.css';

const SystemRestorePage = () => {
  const restorePoints = [
    { name: 'WAX Optimization - 2024-01-15', date: '15 Jan 2024', type: 'Manual' },
    { name: 'Windows Update - 2024-01-10', date: '10 Jan 2024', type: 'Automatic' },
    { name: 'Before GPU Tweaks - 2024-01-05', date: '05 Jan 2024', type: 'Manual' },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><RotateCcw size={32} /></div>
        <div><h1>System Restore</h1><p>Restore your system to a previous state</p></div>
      </motion.div>
      <div className="categories-list">
        {restorePoints.map((point, i) => (
          <motion.div key={point.name} className="category-card glass" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="category-icon"><RotateCcw size={24} /></div>
            <div className="category-info">
              <h3>{point.name}</h3>
              <p className="category-size">{point.date} • {point.type}</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Restore</button>
          </motion.div>
        ))}
      </div>
      <motion.div className="action-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <button className="btn btn-primary">Create Restore Point</button>
      </motion.div>
    </div>
  );
};

export default SystemRestorePage;
