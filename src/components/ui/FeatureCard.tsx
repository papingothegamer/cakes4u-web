import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 p-6">
      {/* Background Animation with Pink Shades */}
      <div className="absolute inset-0 bg-pink-600 rounded-full -bottom-12 left-full h-[7em] w-[20em] group-hover:scale-[550%] transition-transform duration-700 ease-in-out z-0"></div>
      <div className="absolute inset-0 bg-pink-500 rounded-full -bottom-12 left-full h-[6em] w-[14em] group-hover:scale-[400%] transition-transform duration-700 ease-in-out z-0"></div>
      <div className="absolute inset-0 bg-pink-400 rounded-full -bottom-12 left-full h-[4.9em] w-[10.2em] group-hover:scale-[300%] transition-transform duration-700 ease-in-out z-0"></div>
      <div className="absolute inset-0 bg-pink-300 rounded-full -bottom-12 left-full h-[4.6em] w-[10em] group-hover:scale-[200%] transition-transform duration-700 ease-in-out z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <Icon className="w-16 h-16 text-pink-600 group-hover:text-white transition duration-300" />
          <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-white transition duration-300 font-syne">{title}</h3>
        </div>
        <p className="text-gray-600 text-center group-hover:text-white transition duration-300 font-inter">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

