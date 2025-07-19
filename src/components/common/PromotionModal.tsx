import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import type { PromotionPopup } from '../../types/promotion';

interface PromotionModalProps {
  popup: PromotionPopup;
  isVisible: boolean;
  onClose: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ popup, isVisible, onClose }) => {
  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Placeholder with Close Button */}
          <div className="relative">
            <div className="w-full h-[150px] md:h-[200px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image Placeholder</span>
            </div>

            {/* Close Button (absolute to image wrapper) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              {popup.title}
            </h2>

            <p className="text-center text-gray-600 text-base leading-relaxed mb-6">
              {popup.description}
            </p>

            <div className="flex justify-center">
              <Link to={popup.ctaLink}>
                <Button variant="primary" className="w-full md:w-52">
                  {popup.ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromotionModal; 