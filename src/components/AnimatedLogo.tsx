
export const AnimatedLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative group">
        {/* 3D Book Animation */}
        <div className="book-3d transform-gpu transition-all duration-500 hover:scale-110">
          <div className="w-10 h-8 bg-gradient-to-r from-[#3454D1] to-[#F9A826] rounded-sm shadow-lg relative transform perspective-1000 hover:rotate-y-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3454D1]/80 to-transparent rounded-sm"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
              ⚖️
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Text */}
      <div className="logo-text">
        <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#3454D1] to-[#F9A826] bg-clip-text text-transparent animate-fade-in">
          Legal Associates
        </h1>
        <div className="h-0.5 bg-gradient-to-r from-[#3454D1] to-transparent animate-[slide-in-right_1s_ease-out]"></div>
      </div>
    </div>
  );
};
