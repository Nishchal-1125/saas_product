'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  activeUsers: number;
  lowStockProducts: number;
  monthlyGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'order' | 'user' | 'product' | 'payment';
  message: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
}

export default function DashboardPage() {
  const { user, hasRole, hasPermission } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1248,
    totalProducts: 892,
    totalOrders: 3456,
    totalRevenue: 125000,
    pendingOrders: 23,
    activeUsers: 156,
    lowStockProducts: 12,
    monthlyGrowth: 12.5
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'order',
      message: 'New order #ORD-2024-001 received',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'success'
    },
    {
      id: '2',
      type: 'user',
      message: 'New seller account registered',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'info'
    },
    {
      id: '3',
      type: 'product',
      message: 'Product "iPhone 15" is low in stock',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'warning'
    },
    {
      id: '4',
      type: 'payment',
      message: 'Payment failed for order #ORD-2024-002',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'error'
    }
  ]);

  const getStatsForRole = () => {
    if (!user) return [];

    const baseStats = [
      {
        title: 'Total Orders',
        value: stats.totalOrders.toLocaleString(),
        icon: ShoppingCart,
        color: 'bg-blue-500',
        change: '+12.5%',
        changeType: 'positive' as const,
        permission: 'ORDER_READ'
      },
      {
        title: 'Revenue',
        value: `$${stats.totalRevenue.toLocaleString()}`,
        icon: DollarSign,
        color: 'bg-green-500',
        change: '+8.2%',
        changeType: 'positive' as const,
        permission: 'PAYMENT_READ'
      }
    ];

    if (hasRole(['SUPERADMIN', 'ADMIN'])) {
      baseStats.unshift(
        {
          title: 'Total Users',
          value: stats.totalUsers.toLocaleString(),
          icon: Users,
          color: 'bg-purple-500',
          change: '+5.4%',
          changeType: 'positive' as const,
          permission: 'USER_READ'
        },
        {
          title: 'Total Products',
          value: stats.totalProducts.toLocaleString(),
          icon: Package,
          color: 'bg-orange-500',
          change: '+3.1%',
          changeType: 'positive' as const,
          permission: 'PRODUCT_READ'
        }
      );
    }

    if (hasRole(['SELLER'])) {
      baseStats.push({
        title: 'My Products',
        value: '145',
        icon: Package,
        color: 'bg-orange-500',
        change: '+2.1%',
        changeType: 'positive' as const,
        permission: 'PRODUCT_READ'
      });
    }

    return baseStats.filter(stat => 
      !stat.permission || hasPermission(stat.permission)
    );
  };

  const getQuickActions = () => {
    const actions = [];

    if (hasRole(['SUPERADMIN', 'ADMIN'])) {
      actions.push(
        { label: 'Add User', href: '/dashboard/users/new', icon: Users },
        { label: 'Manage Roles', href: '/dashboard/roles', icon: Users }
      );
    }

    if (hasRole(['SUPERADMIN', 'ADMIN', 'SELLER'])) {
      actions.push(
        { label: 'Add Product', href: '/dashboard/products/new', icon: Package },
        { label: 'View Orders', href: '/dashboard/orders', icon: ShoppingCart }
      );
    }

    if (hasRole(['CUSTOMER'])) {
      actions.push(
        { label: 'View Orders', href: '/dashboard/orders', icon: ShoppingCart },
        { label: 'Track Shipments', href: '/dashboard/shipments', icon: Activity }
      );
    }

    return actions;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getActivityIcon = (type: string, status: string) => {
    const iconClass = "w-4 h-4";
    
    switch (status) {
      case 'success': return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'warning': return <AlertCircle className={`${iconClass} text-yellow-500`} />;
      case 'error': return <AlertCircle className={`${iconClass} text-red-500`} />;
      default: return <Clock className={`${iconClass} text-blue-500`} />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen lg:ml-64">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your {user?.role.toLowerCase()} dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {getStatsForRole().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all activities →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {getQuickActions().map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-blue-700">
                      {action.label}
                    </span>
                  </a>
                );
              })}
            </div>
            
            {hasRole(['SUPERADMIN']) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Admin Tools</h3>
                <div className="space-y-2">
                  <a
                    href="/dashboard/modules"
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Module Management
                  </a>
                  <a
                    href="/dashboard/system"
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    System Monitor
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role-specific sections */}
      {hasRole(['CUSTOMER']) && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Recent Orders</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">You have 3 active orders and 1 pending delivery.</p>
            <div className="mt-4">
              <a
                href="/dashboard/orders"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Orders
              </a>
            </div>
          </div>
        </div>
      )}

      {hasRole(['SELLER']) && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Seller Analytics</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">145</p>
                <p className="text-sm text-gray-600">Active Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">234</p>
                <p className="text-sm text-gray-600">Orders This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
