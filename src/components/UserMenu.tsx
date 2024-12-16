import React, { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link here
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { SignOutPopup } from '../components/SignOutPopup'; // Importing the Popup

interface UserMenuProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isMobile = false,
  onClose = () => {},
}) => {
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignOutPopupOpen, setIsSignOutPopupOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      if (isMobile) onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Sign out failed');
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const closeDropdown = () => setIsDropdownOpen(false);

  const openSignOutPopup = () => {
    setIsSignOutPopupOpen(true);
    closeDropdown(); // Close dropdown when sign-out popup opens
  };

  const closeSignOutPopup = () => {
    setIsSignOutPopupOpen(false);
  };

  if (user) {
    return (
      <div className="relative">
        {/* User Button */}
        <button
          className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors"
          onClick={toggleDropdown} // Open/close the dropdown on click
        >
          <User className="h-6 w-6" />
          <span>{user.email}</span>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
            >
              <DropdownContent
                onSignOut={openSignOutPopup} // Open sign-out confirmation popup
                closeDropdown={closeDropdown}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sign-Out Confirmation Popup */}
        <SignOutPopup
          isOpen={isSignOutPopupOpen}
          onConfirm={handleSignOut}
          onCancel={closeSignOutPopup}
        />
      </div>
    );
  }

  return (
    <button
      className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors"
      onClick={() => {
        toast.error('Please sign in first!');
        if (isMobile) onClose();
      }}
    >
      <User className="h-6 w-6" />
      <span>Sign In</span>
    </button>
  );
};

// Dropdown Menu Component
interface DropdownContentProps {
  onSignOut: () => void;
  closeDropdown: () => void;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  onSignOut,
  closeDropdown,
}) => {
  return (
    <div className="flex flex-col">
      <Link
        to="/account"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={closeDropdown}
      >
        <Settings className="mr-2 h-4 w-4" />
        Account Settings
      </Link>
      <button
        onClick={onSignOut}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </button>
    </div>
  );
};
