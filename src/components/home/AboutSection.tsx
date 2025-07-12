
import { Phone, Mail, MapPin } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="/lovable-uploads/20716325-0e93-4a46-bfec-60bd22b17411.png"
              alt="Legal Associates Store - Founder with Books"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-2xl shadow-lg">
              ⚖️
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary leading-tight">
              About Legal Associates
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Established in <span className="font-semibold text-accent">Cuttack, Odisha</span>, 
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
              <div className="bg-background rounded-lg p-4 shadow-md border border-border">
                <h4 className="font-semibold text-accent">40+ Years</h4>
                <p className="text-sm text-muted-foreground">of Excellence</p>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-md border border-border">
                <h4 className="font-semibold text-accent">500+</h4>
                <p className="text-sm text-muted-foreground">Publications</p>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-md border border-border">
                <h4 className="font-semibold text-accent">10,000+</h4>
                <p className="text-sm text-muted-foreground">Satisfied Customers</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/20">
              <h3 className="text-2xl font-serif font-bold text-accent mb-4">Reach Out</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-accent mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-foreground">LEGAL ASSOCIATES</p>
                    <p className="text-sm text-muted-foreground">(Law Book Sellers, Publishers & Suppliers)</p>
                    <p className="text-foreground">High Court Road, Cuttack - 753002 (Odisha)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-accent flex-shrink-0" size={18} />
                  <div>
                    <p className="text-foreground">0671-2910130 (Office) | 94370-19131 (Mobile)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="text-accent flex-shrink-0" size={18} />
                  <div>
                    <p className="text-foreground">akshaya.ocr@gmail.com | legalassociates.ocr@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
