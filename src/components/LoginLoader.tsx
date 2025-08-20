import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LoginLoaderProps {
  stage: 'authenticating' | 'success' | 'redirecting';
  userType?: 'user' | 'admin';
  userName?: string;
}

export const LoginLoader = ({ stage, userType, userName }: LoginLoaderProps) => {
  const [text, setText] = useState('');
  const { theme } = useTheme();
  
  const getStageText = () => {
    switch (stage) {
      case 'authenticating':
        return userType === 'admin' ? 'Authenticating Admin Access...' : 'Signing you in...';
      case 'success':
        return `Welcome back${userName ? `, ${userName}` : ''}!`;
      case 'redirecting':
        return userType === 'admin' ? 'Accessing Admin Dashboard...' : 'Taking you to your dashboard...';
      default:
        return 'Processing...';
    }
  };

  const getSubtitle = () => {
    switch (stage) {
      case 'authenticating':
        return 'Verifying your credentials';
      case 'success':
        return 'Authentication successful';
      case 'redirecting':
        return 'Preparing your workspace';
      default:
        return 'Please wait';
    }
  };

  useEffect(() => {
    const fullText = getStageText();
    let index = 0;
    setText('');
    
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        setText(fullText);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [stage, userType, userName]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-background via-[#0F1419] to-background' 
        : 'bg-gradient-to-br from-secondary via-background to-muted'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 animate-float ${
          theme === 'dark' ? 'bg-accent' : 'bg-primary'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 animate-float ${
          theme === 'dark' ? 'bg-primary' : 'bg-accent'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center relative z-10">
        {/* Enhanced Gavel Animation Container */}
        <div className="relative mb-16">
          {/* Podium/Base with Glow Effect */}
          <div className={`w-40 h-8 mx-auto rounded-lg shadow-2xl relative ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300'
          }`}>
            {stage === 'success' && (
              <div className="absolute inset-0 rounded-lg bg-accent/20 animate-pulse"></div>
            )}
          </div>
          
          {/* Legal Book with Enhanced Effects */}
          <div className="relative -mt-3 mx-auto w-32 h-20 bg-gradient-to-br from-[#2D3E50] to-[#34495E] rounded-lg shadow-2xl transform perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-transparent rounded-lg"></div>
            <div className="absolute top-3 left-3 right-3 text-center">
              <div className="text-[#D4AF37] text-sm font-serif font-bold">LEGAL</div>
              <div className="text-[#D4AF37] text-xs font-serif font-bold">ASSOCIATES</div>
            </div>
            
            {/* Success Pulse Effect */}
            {stage === 'success' && (
              <div className="absolute -inset-6 rounded-lg border-2 border-accent animate-[ping_1s_ease-out_3]"></div>
            )}
            
            {/* Authentication Ripple */}
            {stage === 'authenticating' && (
              <div className="absolute -inset-8 rounded-lg border-2 border-primary/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            )}
          </div>

          {/* Enhanced Gavel with Stage-based Animation */}
          <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 ${
            stage === 'authenticating' ? 'animate-[bounce_1s_infinite]' :
            stage === 'success' ? 'animate-[pulse_0.5s_ease-in-out_3]' :
            'animate-float'
          }`}>
            <div className="relative">
              {/* Gavel Handle */}
              <div className="w-2 h-16 bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-full mx-auto shadow-xl"></div>
              
              {/* Gavel Head */}
              <div className="relative -mt-2">
                <div className="w-10 h-5 bg-gradient-to-r from-[#8B4513] to-[#654321] rounded-lg shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/40 to-transparent rounded-lg"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D4AF37] transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Impact Glow */}
          <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${
            stage === 'authenticating' ? 'bg-primary/30 animate-[ping_1.5s_infinite]' :
            stage === 'success' ? 'bg-accent/50 animate-[pulse_0.5s_ease-in-out_3]' :
            'bg-muted/20 animate-pulse'
          }`}></div>
        </div>

        {/* Stage-based Content */}
        <div className="space-y-4">
          {/* Main Text */}
          <div className={`text-2xl font-serif transition-all duration-500 ${
            theme === 'dark' ? 'text-foreground' : 'text-foreground'
          } ${stage === 'success' ? 'text-accent font-bold scale-110' : ''}`}>
            {text}
            {stage === 'authenticating' && <span className="animate-pulse">|</span>}
          </div>

          {/* Subtitle */}
          <div className={`text-base font-sans opacity-70 transition-all duration-500 ${
            theme === 'dark' ? 'text-muted-foreground' : 'text-muted-foreground'
          }`}>
            {getSubtitle()}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              stage === 'authenticating' ? 'bg-primary animate-bounce' : 'bg-muted'
            }`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              stage === 'success' ? 'bg-accent animate-bounce' : 'bg-muted'
            }`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              stage === 'redirecting' ? 'bg-primary animate-bounce' : 'bg-muted'
            }`} style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* Success Checkmark */}
          {stage === 'success' && (
            <div className="mt-6 animate-scale-in">
              <div className="w-16 h-16 mx-auto bg-accent rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};