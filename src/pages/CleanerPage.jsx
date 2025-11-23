import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, FileText, Image, Video, Music, Download } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import './PageCommon.css';

const CleanerPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const cleanupCategories = [
    { id: 'temp', name: 'Temporary Files', icon: FileText, size: '2.4 GB', selected: true },
    { id: 'cache', name: 'System Cache', icon: Download, size: '1.8 GB', selected: true },
    { id: 'logs', name: 'Log Files', icon: FileText, size: '456 MB', selected: true },
    { id: 'thumbnails', name: 'Thumbnails', icon: Image, size: '892 MB', selected: false },
    { id: 'recycle', name: 'Recycle Bin', icon: Trash2, size: '3.2 GB', selected: true },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResults({ total: '8.7 GB', items: 1247 });
    }, 3000);
  };

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon">
          <Trash2 size={32} />
        </div>
        <div>
          <h1>System Cleaner</h1>
          <p>Free up disk space by removing unnecessary files</p>
        </div>
      </motion.div>

      {isScanning ? (
        <LoadingSpinner message="Scanning your system for unnecessary files..." />
      ) : (
        <>
          <div className="categories-list">
            {cleanupCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="category-card glass"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="category-icon">
                  <category.icon size={24} />
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p className="category-size">{category.size}</p>
                </div>
                <input type="checkbox" defaultChecked={category.selected} />
              </motion.div>
            ))}
          </div>

          {scanResults && (
            <motion.div
              className="scan-results glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Scan Results</h3>
              <p>Found {scanResults.items} items totaling {scanResults.total}</p>
            </motion.div>
          )}

          <motion.div
            className="action-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="btn btn-primary" onClick={handleScan}>
              Scan Now
            </button>
            <button className="btn btn-secondary" disabled={!scanResults}>
              Clean Up
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CleanerPage;
