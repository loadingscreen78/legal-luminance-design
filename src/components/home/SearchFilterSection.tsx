
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const filterChips = [
  { label: "2024", active: false },
  { label: "Criminal Law", active: true },
  { label: "Civil Law", active: false },
  { label: "Bare Acts", active: false },
  { label: "Digests", active: false }
];

const suggestions = [
  "Indian Penal Code",
  "Criminal Procedure Code", 
  "Evidence Act",
  "Contract Act",
  "Orissa High Court"
];

export const SearchFilterSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-[#F5F5F9] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#222222] mb-4">
            Find Your Legal Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through our extensive collection of legal books, journals, and publications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text"
                placeholder="Search titles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-[#3454D1] rounded-xl shadow-lg"
              />
            </div>
            
            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 z-10 animate-fade-in">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filterChips.map((chip, index) => (
              <Button
                key={index}
                variant={chip.active ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  chip.active 
                    ? 'bg-[#3454D1] hover:bg-[#3454D1]/90 text-white' 
                    : 'border-2 border-gray-200 hover:border-[#3454D1] hover:text-[#3454D1]'
                }`}
              >
                {chip.label}
              </Button>
            ))}
          </div>

          {/* Search Button */}
          <div className="text-center">
            <Button className="bg-[#F9A826] hover:bg-[#F9A826]/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Search Publications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
