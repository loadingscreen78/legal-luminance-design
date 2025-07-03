
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const CheckoutInfo = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store checkout info and navigate to payment
    console.log('Checkout info:', { fullName, email, phone });
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Enter Your Details to Proceed
              </h1>
              <p className="text-muted-foreground text-lg">
                We need a few details to complete your order securely
              </p>
            </div>

            {/* Secure Badge */}
            <div className="flex justify-center mb-8 animate-scale-in">
              <div className="flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Secure Checkout</span>
                <Lock className="h-4 w-4" />
              </div>
            </div>

            {/* Checkout Form */}
            <Card className="shadow-xl border-border/50 animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-serif text-foreground">
                  Your Information
                </CardTitle>
                <CardDescription>
                  All information is encrypted and secure
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10 h-12 bg-background border-border focus:border-accent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="pl-10 h-12 bg-background border-border focus:border-accent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10 h-12 bg-background border-border focus:border-accent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-accent flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Your information is secure</p>
                      <p>We use industry-standard encryption to protect your personal data.</p>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]"
                  >
                    Continue to Payment
                  </Button>
                </form>

                {/* Additional Security Info */}
                <div className="mt-6 text-center text-xs text-muted-foreground">
                  <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-8 flex justify-center items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span className="text-sm">256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutInfo;
