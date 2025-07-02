
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { items, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinueToPayment = () => {
    // Store form data for payment page
    localStorage.setItem('checkoutData', JSON.stringify(formData));
    navigate('/payment');
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Navigation />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some books to proceed with checkout</p>
            <Link to="/shop">
              <Button className="bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center mb-8 animate-fade-in">
            <Link to="/shop" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-4xl font-serif font-bold text-primary">
              📝 Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="animate-fade-in border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary flex items-center">
                  📚 Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        <p className="text-primary font-bold">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-primary">₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information Form */}
            <Card className="animate-fade-in border-primary/20" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary flex items-center">
                  👤 Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter your pincode"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>

                  <Button
                    onClick={handleContinueToPayment}
                    disabled={!isFormValid}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    💳 Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
