
export const Footer = () => {
  return (
    <footer className="bg-[#0F0616] border-t border-[#D4AF37]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>📍 Cuttack, Odisha, India</p>
              <p>📞 +91 XXXXX XXXXX</p>
              <p>📧 info@legalassociates.com</p>
              <p>🕒 Mon-Sat: 10:00 AM - 8:00 PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Quick Links</h3>
            <div className="space-y-2 text-gray-300">
              <p>📘 Law Journals</p>
              <p>📚 Legal Books</p>
              <p>🏛️ Court Publications</p>
              <p>📜 Bare Acts</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">📩 Stay updated with new legal releases</p>
            <div className="flex space-x-4 text-2xl">
              <span>⚖️</span>
              <span>📘</span>
              <span>📜</span>
              <span>🧑‍⚖️</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Legal Associates. All Rights Reserved.</p>
          <p className="mt-2 text-[#D4AF37]">Empowering Legal Minds Since Decades</p>
        </div>
      </div>
    </footer>
  );
};
