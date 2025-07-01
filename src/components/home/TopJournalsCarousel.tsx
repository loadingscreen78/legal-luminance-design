
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const journals = [
  {
    id: 1,
    title: "Orissa High Court Digest",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=400&fit=crop",
    description: "Comprehensive digest of Orissa High Court judgments",
    year: "2024"
  },
  {
    id: 2,
    title: "Criminal Major Acts",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    description: "Complete compilation of criminal law statutes",
    year: "2024"
  },
  {
    id: 3,
    title: "Civil Procedure Code Commentary",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "In-depth analysis of Civil Procedure Code",
    year: "2023"
  },
  {
    id: 4,
    title: "Bare Acts Collection",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    description: "Essential legal acts and amendments",
    year: "2024"
  }
];

export const TopJournalsCarousel = () => {
  const [hoveredJournal, setHoveredJournal] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#222222] mb-4">
            Top Legal Journals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our bestselling legal journals trusted by professionals nationwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journals.map((journal) => (
            <Card 
              key={journal.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-none shadow-lg"
              onMouseEnter={() => setHoveredJournal(journal.id)}
              onMouseLeave={() => setHoveredJournal(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={journal.image} 
                    alt={journal.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {hoveredJournal === journal.id && (
                    <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                      <Button className="bg-[#3454D1] hover:bg-[#3454D1]/90 text-white">
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-[#222222] mb-2">
                    {journal.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {journal.description}
                  </p>
                  <p className="text-xs text-[#3454D1] font-semibold">
                    Edition {journal.year}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
