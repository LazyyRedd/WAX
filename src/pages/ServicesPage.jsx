import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import './PageCommon.css';

const ServicesPage = () => {
  const services = [
    { name: 'Windows Update', status: 'Running', startup: 'Automatic' },
    { name: 'Windows Defender', status: 'Running', startup: 'Automatic' },
    { name: 'Print Spooler', status: 'Stopped', startup: 'Manual' },
    { name: 'Superfetch', status: 'Running', startup: 'Automatic' },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><Wrench size={32} /></div>
        <div><h1>Services Manager</h1><p>Manage Windows services and background processes</p></div>
      </motion.div>
      <div className="categories-list">
        {services.map((service, i) => (
          <motion.div key={service.name} className="category-card glass" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="category-icon"><Wrench size={24} /></div>
            <div className="category-info">
              <h3>{service.name}</h3>
              <p className="category-size">{service.status} • {service.startup}</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Manage</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
