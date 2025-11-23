import React from 'react';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import './PageCommon.css';

const DevicesPage = () => {
  const devices = [
    { name: 'NVIDIA GeForce RTX 3080', status: 'Working', type: 'Display Adapter' },
    { name: 'Intel Core i7-10700K', status: 'Working', type: 'Processor' },
    { name: 'Realtek Audio', status: 'Working', type: 'Audio Device' },
    { name: 'USB 3.0 Controller', status: 'Working', type: 'USB Controller' },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><Monitor size={32} /></div>
        <div><h1>Device Manager</h1><p>View and manage hardware devices</p></div>
      </motion.div>
      <div className="categories-list">
        {devices.map((device, i) => (
          <motion.div key={device.name} className="category-card glass" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="category-icon"><Monitor size={24} /></div>
            <div className="category-info">
              <h3>{device.name}</h3>
              <p className="category-size">{device.type} • {device.status}</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Details</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;
