import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Package, Shield } from 'lucide-react';
import './PageCommon.css';

const DebloatPage = () => {
  const bloatware = [
    { name: 'OneDrive', category: 'Cloud Storage', recommended: false },
    { name: 'Cortana', category: 'Virtual Assistant', recommended: true },
    { name: 'Xbox Services', category: 'Gaming', recommended: false },
    { name: 'Microsoft Edge', category: 'Browser', recommended: false },
    { name: 'Windows Media Player', category: 'Media', recommended: true },
  ];

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <Package size={32} />
        </div>
        <div>
          <h1>Debloat Windows</h1>
          <p>Remove unnecessary pre-installed applications</p>
        </div>
      </motion.div>

      <div className="categories-list">
        {bloatware.map((app, index) => (
          <motion.div
            key={app.name}
            className="category-card glass"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="category-icon">
              <Package size={24} />
            </div>
            <div className="category-info">
              <h3>{app.name}</h3>
              <p className="category-size">{app.category}</p>
              {app.recommended && (
                <span style={{ fontSize: '12px', color: 'var(--accent-red)' }}>
                  ⚠️ Safe to remove
                </span>
              )}
            </div>
            <input type="checkbox" defaultChecked={app.recommended} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="action-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="btn btn-primary">Remove Selected</button>
        <button className="btn btn-secondary">Restore</button>
      </motion.div>
    </div>
  );
};

export default DebloatPage;
