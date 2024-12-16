import React from 'react';
import { motion } from 'framer-motion';

interface SignOutPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SignOutPopup: React.FC<SignOutPopupProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Are you sure you want to sign out?</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
};
