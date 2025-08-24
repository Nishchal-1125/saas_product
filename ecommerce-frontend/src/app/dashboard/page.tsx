'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Settings,
  Crown,
  UserCheck,
  Store,
  Bell
} from 'lucide-react';

// Dashboard Components
const SuperAdminDashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
      <div className="flex items-center">
        <Crown className="h-8 w-8 mr-3" />
        <div>
          <h2 className="text-2xl font-bold">Super Administrator Dashboard</h2>
          <p className="text-purple-100">Complete system control and management</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
          <Users className="h-8 w-8 text-purple-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">$45,678</p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Sellers</p>
            <p className="text-2xl font-bold text-gray-900">89</p>
          </div>
          <Store className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">System Health</p>
            <p className="text-2xl font-bold text-green-600">100%</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Management</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-600 mr-3" />
              <span>User Management</span>
            </div>
          </button>
          <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-gray-600 mr-3" />
              <span>System Configuration</span>
            </div>
          </button>
          <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-gray-600 mr-3" />
              <span>Analytics & Reports</span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <UserCheck className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">New seller registered</p>
              <p className="text-xs text-gray-600">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Payment processed</p>
              <p className="text-xs text-gray-600">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <Package className="h-5 w-5 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">New product added</p>
              <p className="text-xs text-gray-600">10 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl">
      <div className="flex items-center">
        <UserCheck className="h-8 w-8 mr-3" />
        <div>
          <h2 className="text-2xl font-bold">Administrator Dashboard</h2>
          <p className="text-blue-100">Manage users, products, and orders</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">1,045</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">456</p>
          </div>
          <Package className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900">23</p>
          </div>
          <ShoppingCart className="h-8 w-8 text-orange-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900">$12,345</p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </button>
          <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Package className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Products</span>
          </button>
          <button className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <ShoppingCart className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Process Orders</span>
          </button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <BarChart3 className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">#12345</p>
              <p className="text-xs text-gray-600">John Doe - $89.99</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">#12344</p>
              <p className="text-xs text-gray-600">Jane Smith - $156.50</p>
            </div>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Pending</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">#12343</p>
              <p className="text-xs text-gray-600">Bob Johnson - $45.75</p>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Processing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SellerDashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl">
      <div className="flex items-center">
        <Store className="h-8 w-8 mr-3" />
        <div>
          <h2 className="text-2xl font-bold">Seller Dashboard</h2>
          <p className="text-green-100">Manage your products and sales</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">My Products</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <Package className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">$3,456</p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Orders to Ship</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
          <ShoppingCart className="h-8 w-8 text-orange-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Store Rating</p>
            <p className="text-2xl font-bold text-gray-900">4.8⭐</p>
          </div>
          <TrendingUp className="h-8 w-8 text-yellow-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-3" />
              <span>Add New Product</span>
            </div>
          </button>
          <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-3" />
              <span>Manage Orders</span>
            </div>
          </button>
          <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-3" />
              <span>View Analytics</span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Wireless Headphones</p>
              <p className="text-xs text-gray-600">Order #12345 - $299.99</p>
            </div>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">To Ship</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Cotton T-Shirt</p>
              <p className="text-xs text-gray-600">Order #12344 - $39.99</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Shipped</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CustomerDashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
      <div className="flex items-center">
        <Users className="h-8 w-8 mr-3" />
        <div>
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-indigo-100">Your personal shopping dashboard</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <ShoppingCart className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">$1,234</p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Cart Items</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
          <Package className="h-8 w-8 text-orange-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Wishlist</p>
            <p className="text-2xl font-bold text-gray-900">7</p>
          </div>
          <Bell className="h-8 w-8 text-purple-600" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Package className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Browse Products</span>
          </button>
          <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <ShoppingCart className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Cart</span>
          </button>
          <button className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <TrendingUp className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Order History</span>
          </button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <Settings className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Account Settings</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Wireless Headphones</p>
              <p className="text-xs text-gray-600">Order #12345 - $299.99</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Delivered</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Cotton T-Shirt</p>
              <p className="text-xs text-gray-600">Order #12344 - $39.99</p>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Shipped</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Smart Watch</p>
              <p className="text-xs text-gray-600">Order #12343 - $199.99</p>
            </div>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Processing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return null;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'SUPERADMIN':
        return <SuperAdminDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      case 'SELLER':
        return <SellerDashboard />;
      case 'CUSTOMER':
        return <CustomerDashboard />;
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </div>
    </MainLayout>
  );
}
