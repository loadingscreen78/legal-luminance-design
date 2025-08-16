import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { User, Package, CreditCard, Settings, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { orders, loading } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    pincode: profile?.pincode || '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        pincode: profile.pincode || '',
      });
    }
  }, [profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-purple-500';
      case 'shipped': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              👤 My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || user.email}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'orders' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Package size={20} />
                      <span>My Orders</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'profile' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <LogOut size={20} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-2xl font-serif text-primary">
                        📦 My Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p>Loading orders...</p>
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="text-center py-8">
                          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">No orders yet</p>
                          <Button onClick={() => navigate('/shop')}>
                            Start Shopping
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold">Order #{order.order_number}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                                    {order.status.toUpperCase()}
                                  </Badge>
                                  <p className="text-lg font-bold text-primary mt-1">
                                    ₹{order.total_amount.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-sm text-muted-foreground">
                                <p>Payment: {order.payment_status}</p>
                                <p>Items: {(order as any).order_items?.length || 0}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'profile' && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-primary">
                      👤 Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={profileData.full_name}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              full_name: e.target.value
                            })}
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              phone: e.target.value
                            })}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            address: e.target.value
                          })}
                          placeholder="Enter your address"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={profileData.pincode}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            pincode: e.target.value
                          })}
                          placeholder="Enter your pincode"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;