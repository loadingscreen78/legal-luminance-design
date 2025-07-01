
import { useEffect, useState } from 'react';

export const AnimatedLoader = () => {
  const [text, setText] = useState('');
  const fullText = 'Loading Legal Intelligence...';

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
    <div className="fixed inset-0 bg-gradient-to-br from-[#F5F5F9] to-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Book */}
        <div className="relative mb-8">
          <div className="w-32 h-24 mx-auto animate-pulse">
            <div className="book-container relative">
              <div className="book animate-[scale-in_2s_ease-in-out_infinite] bg-gradient-to-r from-[#3454D1] to-[#F9A826] rounded-lg shadow-2xl transform-gpu">
                <div className="book-cover w-32 h-24 rounded-lg border-4 border-[#3454D1] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3454D1]/20 to-transparent"></div>
                  <div className="absolute top-2 left-2 text-white font-bold text-xs">LEGAL</div>
                  <div className="absolute bottom-2 left-2 text-white font-bold text-xs">ASSOCIATES</div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 text-white">⚖️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rotating pages effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-28 h-20 bg-white/30 rounded animate-[fade-in_1s_ease-in-out_infinite] shadow-lg"></div>
          </div>
        </div>

        {/* Typewriter text */}
        <div className="text-[#3454D1] text-xl font-serif mb-4">
          {text}
          <span className="animate-pulse">|</span>
        </div>

        {/* Background legal icons */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute top-20 left-20 text-6xl animate-float text-[#3454D1]">📚</div>
          <div className="absolute top-40 right-20 text-6xl animate-float text-[#F9A826]" style={{animationDelay: '1s'}}>⚖️</div>
          <div className="absolute bottom-40 left-40 text-6xl animate-float text-[#3454D1]" style={{animationDelay: '2s'}}>🏛️</div>
          <div className="absolute bottom-20 right-40 text-6xl animate-float text-[#F9A826]" style={{animationDelay: '3s'}}>📜</div>
        </div>
      </div>
    </div>
  );
};
