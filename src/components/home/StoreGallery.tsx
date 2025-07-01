
import { useState } from 'react';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    alt: "Book Collection",
    title: "Extensive Legal Collection"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    alt: "Reading Area",
    title: "Comfortable Reading Space"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
    alt: "Legal Books",
    title: "Premium Legal Literature"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop",
    alt: "Store Interior",
    title: "Modern Store Layout"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=350&fit=crop",
    alt: "Book Stacks",
    title: "Organized Book Sections"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=450&fit=crop",
    alt: "Study Corner",
    title: "Quiet Study Areas"
  }
];

export const StoreGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#222222] mb-4">
            Visit Our Store
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Step inside our modern legal bookstore in the heart of Cuttack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image.id)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 ? 'h-96 md:h-full' : 'h-64'
                }`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-serif font-bold text-lg mb-2">{image.title}</h3>
                  <p className="text-sm opacity-90">Click to view</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={galleryImages.find(img => img.id === selectedImage)?.src}
                alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                className="w-full h-auto max-h-screen object-contain rounded-lg"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
