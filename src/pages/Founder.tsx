
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const milestones = [
  {
    year: "1985",
    title: "The Beginning",
    description: "Started with a small bookstore in Cuttack with just 50 law books",
    icon: "🏪"
  },
  {
    year: "1992",
    title: "First Publication",
    description: "Published our first legal commentary on Odisha Land Laws",
    icon: "📘"
  },
  {
    year: "2000",
    title: "Expansion",
    description: "Expanded to cover all major areas of Indian law with 500+ titles",
    icon: "📈"
  },
  {
    year: "2010",
    title: "Recognition",
    description: "Received state recognition for contribution to legal education",
    icon: "🏆"
  },
  {
    year: "2020",
    title: "Digital Era",
    description: "Launched online platform to serve legal professionals nationwide",
    icon: "💻"
  },
  {
    year: "2024",
    title: "Legacy Continues",
    description: "Serving 10,000+ legal professionals across India",
    icon: "🌟"
  }
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    alt: "Early bookstore",
    caption: "Our humble beginning in 1985"
  },
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    alt: "First publications",
    caption: "First law books published in the 1990s"
  },
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
    alt: "Modern store",
    caption: "Our expanded store today"
  },
  {
    src: "https://images.unsplash.com/photo-1589829545856-d10d85525114?w=600&h=400&fit=crop",
    alt: "Awards ceremony",
    caption: "Recognition for legal education contribution"
  }
];

const Founder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0616] to-[#1a0a2e]">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-serif font-bold text-[#D4AF37] mb-8">
              🧑‍⚖️ Founder's Message
            </h1>
          </div>

          {/* Founder Image and Quote */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-[#1a0a2e] rounded-2xl p-8 border border-[#D4AF37]/20 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img
                    src="/lovable-uploads/22fb7bfd-70bd-48be-8584-6455e596dd93.png"
                    alt="Founder of Legal Associates"
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0616]/40 to-transparent rounded-xl"></div>
                </div>
                
                <div className="space-y-6">
                  <div className="text-6xl text-[#D4AF37] mb-4">"</div>
                  <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed animate-fade-in" style={{animationDelay: '0.5s'}}>
                    My mission was never to sell books—it was to shape the legal future of Odisha and empower every legal mind with knowledge.
                  </blockquote>
                  <div className="pt-4 border-t border-[#D4AF37]/20">
                    <p className="text-[#D4AF37] font-semibold text-lg">Founder & Chairman</p>
                    <p className="text-gray-300">Legal Associates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#D4AF37] text-center mb-12 animate-fade-in">
              Our Journey Through Time
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center animate-fade-in ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-sm font-bold text-[#0F0616] z-10">
                      {milestone.icon}
                    </div>
                    
                    {/* Content */}
                    <div className={`bg-[#1a0a2e] rounded-xl p-6 border border-[#D4AF37]/20 ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl text-[#D4AF37] font-bold">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#D4AF37] text-center mb-12 animate-fade-in">
              Through the Years
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl animate-fade-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0616]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Statement */}
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#f4d03f]/10 rounded-2xl p-8 border border-[#D4AF37]/20">
              <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-6">
                Our Vision for the Future
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                To continue being the cornerstone of legal education in Odisha and beyond, 
                providing accessible, comprehensive, and up-to-date legal resources that 
                empower the next generation of legal professionals to build a just society.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Founder;
