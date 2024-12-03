import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  onNext,
  onPrev,
  currentIndex,
  totalImages,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>
          <button
            onClick={onPrev}
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:text-pink-300 transition-colors ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous image"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={onNext}
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-pink-300 transition-colors ${
              currentIndex === totalImages - 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            aria-label="Next image"
            disabled={currentIndex === totalImages - 1}
          >
            <ChevronRight size={32} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;

