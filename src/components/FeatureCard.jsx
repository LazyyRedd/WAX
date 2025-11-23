import React from 'react';
import { motion } from 'framer-motion';
import './FeatureCard.css';

const FeatureCard = ({ icon: Icon, title, description, action, status }) => {
  return (
    <motion.div
      className="feature-card glass"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-icon">
        <Icon size={32} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {status && (
          <div className={`card-status status-${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
      {action && (
        <motion.button
          className="card-action"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
};

export default FeatureCard;
