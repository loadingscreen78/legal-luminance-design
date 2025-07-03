
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const AnimatedLoader = () => {
  const [text, setText] = useState('');
  const { theme } = useTheme();
  const fullText = 'Loading Legal Associates...';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0F0F0F]' : 'bg-[#F8F9FA]'
    }`}>
      <div className="text-center">
        {/* Gavel Animation Container */}
        <div className="relative mb-12">
          {/* Podium/Base */}
          <div className={`w-32 h-6 mx-auto rounded-lg shadow-lg ${
            theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-200 to-gray-300'
          }`}></div>
          
          {/* Legal Book */}
          <div className="relative -mt-2 mx-auto w-24 h-16 bg-gradient-to-br from-[#2D3E50] to-[#34495E] rounded-md shadow-2xl transform perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-md"></div>
            <div className="absolute top-2 left-2 right-2 text-center">
              <div className="text-[#D4AF37] text-xs font-serif font-bold">LEGAL</div>
              <div className="text-[#D4AF37] text-xs font-serif font-bold">CODE</div>
            </div>
            
            {/* Ripple Effect */}
            <div className="absolute -inset-4 rounded-full border-2 border-[#D4AF37] opacity-0 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          </div>

          {/* Gavel */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-[gavel-strike_2s_ease-in-out_infinite]">
            <div className="relative">
              {/* Gavel Handle */}
              <div className="w-1 h-12 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-full mx-auto shadow-lg"></div>
              
              {/* Gavel Head */}
              <div className="relative -mt-1">
                <div className="w-8 h-4 bg-gradient-to-r from-[#8B4513] to-[#654321] rounded-lg shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 to-transparent rounded-lg"></div>
                  {/* Gold Band */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D4AF37] transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Glow */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#D4AF37] rounded-full opacity-0 animate-[impact-glow_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Loading Text */}
        <div className={`text-xl font-serif mb-4 transition-colors duration-300 ${
          theme === 'dark' ? 'text-[#F0F0F0]' : 'text-[#2D3E50]'
        }`}>
          {text}
          <span className="animate-pulse">|</span>
        </div>

        {/* Subtitle */}
        <div className={`text-sm font-sans opacity-70 transition-colors duration-300 ${
          theme === 'dark' ? 'text-[#F0F0F0]' : 'text-[#333333]'
        }`}>
          Preparing your legal resources
        </div>
      </div>

      {/* Custom Keyframes in Style Tag */}
      <style jsx>{`
        @keyframes gavel-strike {
          0%, 20% {
            transform: translateX(-50%) translateY(-20px) rotate(-15deg);
          }
          40% {
            transform: translateX(-50%) translateY(0px) rotate(0deg);
          }
          45% {
            transform: translateX(-50%) translateY(2px) rotate(2deg);
          }
          50%, 100% {
            transform: translateX(-50%) translateY(-20px) rotate(-15deg);
          }
        }

        @keyframes impact-glow {
          0%, 35% {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
          40% {
            opacity: 0.8;
            transform: translateX(-50%) scale(1);
          }
          55% {
            opacity: 0;
            transform: translateX(-50%) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};
