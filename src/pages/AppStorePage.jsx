import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import './PageCommon.css';

const AppStorePage = () => {
  const apps = [
    { icon: ShoppingBag, title: '7-Zip', description: 'File archiver with high compression ratio', action: { label: 'Install', onClick: () => alert('Installing 7-Zip...') } },
    { icon: ShoppingBag, title: 'VLC Media Player', description: 'Free and open source cross-platform multimedia player', action: { label: 'Install', onClick: () => alert('Installing VLC...') } },
    { icon: ShoppingBag, title: 'Visual Studio Code', description: 'Code editor redefined and optimized for building apps', action: { label: 'Install', onClick: () => alert('Installing VS Code...') } },
  ];

  return (
    <div className="page-container">
      <motion.div className="page-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="header-icon"><ShoppingBag size={32} /></div>
        <div><h1>App Store</h1><p>Install popular applications</p></div>
      </motion.div>
      <div className="actions-grid">
        {apps.map((app, i) => (
          <motion.div key={app.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <FeatureCard {...app} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppStorePage;
