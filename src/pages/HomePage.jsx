import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Cpu, HardDrive, Zap, Shield, 
  TrendingUp, Users, Clock 
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import './HomePage.css';

const HomePage = () => {
  const systemStats = [
    { label: 'CPU Usage', value: '45%', icon: Cpu, color: '#e63946' },
    { label: 'Memory', value: '8.2 GB', icon: Activity, color: '#f39c12' },
    { label: 'Disk Usage', value: '256 GB', icon: HardDrive, color: '#3498db' },
    { label: 'Uptime', value: '5h 32m', icon: Clock, color: '#2ecc71' },
  ];

  const quickActions = [
    {
      icon: Zap,
      title: 'Quick Optimize',
      description: 'Run a quick system optimization to boost performance',
      action: {
        label: 'Optimize Now',
        onClick: () => alert('Starting quick optimization...'),
      },
    },
    {
      icon: Shield,
      title: 'Security Scan',
      description: 'Scan your system for privacy and security issues',
      action: {
        label: 'Scan Now',
        onClick: () => alert('Starting security scan...'),
      },
    },
    {
      icon: TrendingUp,
      title: 'Performance Monitor',
      description: 'View detailed performance metrics and optimization tips',
      action: {
        label: 'View Details',
        onClick: () => alert('Opening performance monitor...'),
      },
    },
  ];

  return (
    <div className="home-page">
      <motion.div
        className="welcome-banner glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="banner-content">
          <h1 className="banner-title">Welcome to WAX</h1>
          <p className="banner-subtitle">
            Your intelligent Windows control hub for system optimization
          </p>
        </div>
      </motion.div>

      <div className="stats-grid">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              <stat.icon size={28} />
            </div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="section-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2>Quick Actions</h2>
        <p>Get started with these common tasks</p>
      </motion.div>

      <div className="actions-grid">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <FeatureCard {...action} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="info-section glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3>About WAX</h3>
        <p>
          WAX is an intelligent Windows control hub that blends safe, reversible 
          optimizations with real-time insights and personalized tuning. No more 
          one-click mystery tweaks or manual registry hacking—WAX gives you power 
          with clarity.
        </p>
        <div className="features-list">
          <div className="feature-item">
            <Users className="feature-icon" size={20} />
            <span>For Gamers, Creators, and Advanced Users</span>
          </div>
          <div className="feature-item">
            <Shield className="feature-icon" size={20} />
            <span>Safe and Reversible Optimizations</span>
          </div>
          <div className="feature-item">
            <TrendingUp className="feature-icon" size={20} />
            <span>Real-time Performance Monitoring</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
