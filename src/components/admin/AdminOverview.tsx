import React from 'react';
import { Package, ShoppingCart, CreditCard, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';
import { useTransactions } from '@/hooks/useTransactions';

export const AdminOverview = () => {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { transactions, getRevenueStats } = useTransactions();

  const revenueStats = getRevenueStats();
  
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const lowStockProducts = products.filter(product => product.stock < 10).length;
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      description: `${lowStockProducts} low stock`,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      description: `${pendingOrders} pending`,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Total Revenue',
      value: `₹${revenueStats.total.toLocaleString()}`,
      icon: CreditCard,
      description: `₹${revenueStats.thisMonth.toLocaleString()} this month`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950',
    },
    {
      title: 'This Week Revenue',
      value: `₹${revenueStats.thisWeek.toLocaleString()}`,
      icon: TrendingUp,
      description: 'Last 7 days',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your legal publications business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium text-sm">#{order.order_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">₹{order.total_amount}</p>
                    <Badge variant={
                      order.status === 'pending' ? 'secondary' :
                      order.status === 'confirmed' ? 'default' :
                      order.status === 'delivered' ? 'default' :
                      'destructive'
                    } className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent orders</p>
            )}
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts > 0 && (
              <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Low Stock Alert
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    {lowStockProducts} products have low stock (below 10 units)
                  </p>
                </div>
              </div>
            )}

            {pendingOrders > 0 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-800">
                <ShoppingCart className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Pending Orders
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {pendingOrders} orders are waiting for confirmation
                  </p>
                </div>
              </div>
            )}

            {lowStockProducts === 0 && pendingOrders === 0 && (
              <p className="text-muted-foreground text-sm">No active alerts</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};