
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HeroSection } from '@/components/home/HeroSection';
import { TopJournalsCarousel } from '@/components/home/TopJournalsCarousel';
import { AboutSection } from '@/components/home/AboutSection';
import { FounderQuote } from '@/components/home/FounderQuote';
import { BookCategoriesGrid } from '@/components/home/BookCategoriesGrid';
import { SearchFilterSection } from '@/components/home/SearchFilterSection';
import { StoreGallery } from '@/components/home/StoreGallery';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CallToActionFooter } from '@/components/home/CallToActionFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F9] text-[#222222]">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Top Journals Carousel */}
      <TopJournalsCarousel />
      
      {/* About Us */}
      <AboutSection />
      
      {/* Founder's Quote */}
      <FounderQuote />
      
      {/* Book Categories Grid */}
      <BookCategoriesGrid />
      
      {/* Search & Filter Section */}
      <SearchFilterSection />
      
      {/* Store Gallery */}
      <StoreGallery />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Call to Action + Footer */}
      <CallToActionFooter />
    </div>
  );
};

export default Index;
