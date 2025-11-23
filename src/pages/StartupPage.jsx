import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import './PageCommon.css';

const StartupPage = () => {
  const startupApps = [
    { name: 'Steam', impact: 'High', enabled: true },
    { name: 'Discord', impact: 'Medium', enabled: true },
    { name: 'Spotify', impact: 'Medium', enabled: false },
    { name: 'OneDrive', impact: 'High', enabled: false },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><Rocket size={32} /></div>
        <div><h1>Startup Manager</h1><p>Control which apps launch at startup</p></div>
      </motion.div>
      <div className="settings-section">
        {startupApps.map((app, i) => (
          <motion.div key={app.name} className="setting-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="setting-info">
              <h3>{app.name}</h3>
              <p>Impact: {app.impact}</p>
            </div>
            <label className="toggle-switch"><input type="checkbox" defaultChecked={app.enabled} /><span className="slider"></span></label>
          </motion.div>
        ))}
      </div>
      <motion.div className="action-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <button className="btn btn-primary">Apply Changes</button>
      </motion.div>
    </div>
  );
};

export default StartupPage;
