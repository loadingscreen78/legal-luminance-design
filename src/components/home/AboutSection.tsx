
export const AboutSection = () => {
  return (
    <section className="py-20 bg-[#F5F5F9]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop"
              alt="Legal Associates Store"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#3454D1] rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              ⚖️
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-[#222222] leading-tight">
              About Legal Associates
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Established in <span className="font-semibold text-[#3454D1]">Cuttack, Odisha</span>, 
                Legal Associates has been a cornerstone of legal education and professional development 
                since <span className="font-semibold">1980</span>.
              </p>
              
              <p>
                We are a leading law book publisher delivering quality content and building trust 
                among legal professionals, students, and scholars across India. Our commitment to 
                excellence has made us the preferred choice for legal literature.
              </p>
              
              <p>
                From comprehensive legal digests to essential bare acts, we provide the tools 
                that legal minds need to excel in their practice and studies.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="font-semibold text-[#3454D1]">40+ Years</h4>
                <p className="text-sm text-gray-600">of Excellence</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="font-semibold text-[#3454D1]">500+</h4>
                <p className="text-sm text-gray-600">Publications</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="font-semibold text-[#3454D1]">10,000+</h4>
                <p className="text-sm text-gray-600">Satisfied Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
