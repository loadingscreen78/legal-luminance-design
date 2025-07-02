
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft } from 'lucide-react';

const Payment = () => {
  const { getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: '📱',
      description: 'Pay using Google Pay, PhonePe, Paytm'
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: '💳',
      description: 'Visa, Mastercard, Rupay accepted'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: '🏦',
      description: 'All major banks supported'
    }
  ];

  const handlePayNow = async () => {
    if (!selectedPayment) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        orderId: `LA${Date.now()}`,
        amount: getTotalPrice(),
        paymentMethod: selectedPayment,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('orderData', JSON.stringify(orderData));
      clearCart();
      navigate('/order-success');
    }, 3000);
  };

  useEffect(() => {
    const checkoutData = localStorage.getItem('checkoutData');
    if (!checkoutData) {
      navigate('/checkout');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center mb-8 animate-fade-in">
            <Link to="/checkout" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-4xl font-serif font-bold text-primary">
              💳 Payment
            </h1>
          </div>

          {/* Animated Legal Icons */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-6xl animate-float">⚖️</div>
              <div className="text-6xl animate-float" style={{ animationDelay: '1s' }}>📚</div>
              <div className="text-6xl animate-float" style={{ animationDelay: '2s' }}>🏛️</div>
            </div>
            <p className="text-lg text-muted-foreground">Secure payment for your legal publications</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Amount */}
            <Card className="animate-fade-in border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary text-center">
                  💰 Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">
                    ₹{getTotalPrice().toFixed(2)}
                  </div>
                  <p className="text-muted-foreground">
                    Total amount to be paid
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      🔒 Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="animate-fade-in border-primary/20" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary">
                  💳 Choose Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={method.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in ${
                        selectedPayment === method.id
                          ? 'border-primary bg-primary/10 shadow-lg'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{method.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{method.name}</h3>
                          <p className="text-muted-foreground text-sm">{method.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === method.id
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handlePayNow}
                  disabled={!selectedPayment || isProcessing}
                  className="w-full h-14 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    '🚀 Pay Now'
                  )}
                </Button>

                {selectedPayment && !isProcessing && (
                  <p className="text-center text-sm text-muted-foreground mt-4 animate-fade-in">
                    You will be redirected to {paymentMethods.find(m => m.id === selectedPayment)?.name} gateway
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
