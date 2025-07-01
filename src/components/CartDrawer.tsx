
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0616]">
          🛒 Cart
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0F0616] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#0F0616] border-[#D4AF37]/20 text-white w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-[#D4AF37] text-xl font-serif">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-[#1a0a2e] rounded-lg p-4 border border-[#D4AF37]/10">
                  <div className="flex items-start space-x-3">
                    <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-[#D4AF37] font-bold">₹{item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 border-[#D4AF37]/30"
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 border-[#D4AF37]/30"
                        >
                          <Plus size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#D4AF37]/20 pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-[#D4AF37]">₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <Button className="w-full bg-[#D4AF37] text-[#0F0616] hover:bg-[#f4d03f] font-semibold">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
