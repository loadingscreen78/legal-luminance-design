
export const FounderQuote = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#3454D1]/5 to-[#F9A826]/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-[#222222] mb-8">
                Founder's Vision
              </h2>
              
              <blockquote className="text-2xl md:text-3xl font-serif text-[#3454D1] leading-relaxed mb-8 relative">
                <span className="text-6xl text-[#F9A826] opacity-30 absolute -top-4 -left-2">"</span>
                Books are not just printed pages — they are your courtroom weapons.
                <span className="text-6xl text-[#F9A826] opacity-30 absolute -bottom-8 right-0">"</span>
              </blockquote>
              
              <div className="text-center lg:text-left">
                <p className="text-lg font-semibold text-[#222222]">
                  Founder & Managing Director
                </p>
                <p className="text-gray-600">
                  Legal Associates
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/20716325-0e93-4a46-bfec-60bd22b17411.png"
                alt="Founder of Legal Associates"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#F9A826] rounded-full flex items-center justify-center text-white text-xl shadow-lg">
              📚
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
