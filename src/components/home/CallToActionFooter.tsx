
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export const CallToActionFooter = () => {
  return (
    <section className="bg-[#222222] text-white">
      {/* Newsletter Section */}
      <div className="py-16 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Stay Updated with Legal Publications
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Subscribe to our newsletter for the latest releases and legal updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-black border-none"
              />
              <Button className="bg-[#F9A826] hover:bg-[#F9A826]/90 text-white px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-xl mb-4 text-[#F9A826]">
                Legal Associates
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted partner in legal publishing since 1980. Quality, accuracy, and reliability in every publication.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#F9A826]">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/books" className="block text-gray-300 hover:text-white transition-colors">
                  Our Books
                </Link>
                <Link to="/journals" className="block text-gray-300 hover:text-white transition-colors">
                  Journals
                </Link>
                <Link to="/founder" className="block text-gray-300 hover:text-white transition-colors">
                  About Founder
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#F9A826]">Categories</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Criminal Law</p>
                <p>Civil Law</p>
                <p>Bare Acts</p>
                <p>Odisha Laws</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#F9A826]">Contact</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 Cuttack, Odisha, India</p>
                <p>📞 +91 XXXXX XXXXX</p>
                <p>📧 info@legalassociates.com</p>
                <p>🕒 Mon-Sat: 10 AM - 8 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Legal Associates. All Rights Reserved.
          </p>
          <p className="text-[#F9A826] text-sm mt-1">
            Empowering Legal Minds Since Decades
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <span className="text-2xl">💬</span>
        </Button>
      </div>
    </section>
  );
};
