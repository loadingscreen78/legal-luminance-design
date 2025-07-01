
import { useState } from 'react';

const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/d90dde4b-fcdf-452e-9612-348fa7878292.png",
    alt: "Legal Associates Store Front",
    title: "Our Main Store in Cuttack"
  },
  {
    id: 2,
    src: "/lovable-uploads/ea49d3b2-43d9-4804-a469-5140b187a2cd.png",
    alt: "Book Collection Shelves",
    title: "Extensive Legal Collection"
  },
  {
    id: 3,
    src: "/lovable-uploads/05aad5e3-2ff1-4e0e-b661-9e54d1abc8f8.png",
    alt: "Book Storage Area",
    title: "Organized Book Storage"
  },
  {
    id: 4,
    src: "/lovable-uploads/3aae5ba8-c193-41c2-9091-ae565a588bd4.png",
    alt: "Book Aisle",
    title: "Browse Our Collection"
  },
  {
    id: 5,
    src: "/lovable-uploads/bd9562f0-5286-4441-82a0-f16eac646a5f.png",
    alt: "Legal Books Stack",
    title: "Premium Legal Literature"
  },
  {
    id: 6,
    src: "/lovable-uploads/cef2bd9f-6509-4ace-be37-df626c82073e.png",
    alt: "Archive Collection",
    title: "Historical Legal Archives"
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
