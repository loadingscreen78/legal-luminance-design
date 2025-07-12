
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-accent font-serif text-xl mb-6">Contact Us</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="text-accent mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-foreground">LEGAL ASSOCIATES</p>
                  <p className="text-sm text-muted-foreground">(Law Book Sellers, Publishers & Suppliers)</p>
                  <p>High Court Road, Cuttack - 753002 (Odisha)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-accent flex-shrink-0" size={18} />
                <div>
                  <p>0671-2910130 (Office)</p>
                  <p>94370-19131 (Mobile)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="text-accent flex-shrink-0" size={18} />
                <div>
                  <p>akshaya.ocr@gmail.com</p>
                  <p>legalassociates.ocr@gmail.com</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4 mt-6">
                <p className="text-sm">🕒 Mon-Sat: 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-accent font-serif text-xl mb-6">Quick Links</h3>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
                <span>📘</span><span>Law Journals</span>
              </p>
              <p className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
                <span>📚</span><span>Legal Books</span>
              </p>
              <p className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
                <span>🏛️</span><span>Court Publications</span>
              </p>
              <p className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
                <span>📜</span><span>Bare Acts</span>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-accent font-serif text-xl mb-6">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">📩 Stay updated with new legal releases and publications</p>
            <div className="flex space-x-4 text-2xl">
              <span className="hover:scale-110 transition-transform cursor-pointer">⚖️</span>
              <span className="hover:scale-110 transition-transform cursor-pointer">📘</span>
              <span className="hover:scale-110 transition-transform cursor-pointer">📜</span>
              <span className="hover:scale-110 transition-transform cursor-pointer">🧑‍⚖️</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Legal Associates. All Rights Reserved.</p>
          <p className="mt-2 text-accent font-serif">Empowering Legal Minds Since Decades</p>
        </div>
      </div>
    </footer>
  );
};
