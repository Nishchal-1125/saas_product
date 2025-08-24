'use client';

import React, { useState, useEffect } from 'react';
import { Settings2, Eye, EyeOff, Users, Package, ShoppingBag, ShoppingCart, CreditCard, BarChart3, Shield, Bell, FileText, Calculator, Truck, MapPin, Archive, MessageSquare, Cog } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ModuleConfig {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  category: string;
  isEnabled: boolean;
  requiredRoles: string[];
  permissions: string[];
}

interface UserModuleAccess {
  userId: string;
  userEmail: string;
  userName: string;
  role: string;
  enabledModules: string[];
}

// All available modules in the system (business-agnostic)
const ALL_MODULES: ModuleConfig[] = [
  // Core Business Management
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: BarChart3,
    description: 'Main overview and analytics dashboard',
    category: 'Core',
    isEnabled: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    permissions: []
  },

  // User & Access Management
  {
    id: 'users',
    name: 'User Management',
    icon: Users,
    description: 'User accounts, profile management, and user administration',
    category: 'User Management',
    isEnabled: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['users.read', 'users.write']
  },
  {
    id: 'roles',
    name: 'Role & Permission Management',
    icon: Shield,
    description: 'Role creation, permission assignment, and access control',
    category: 'User Management',
    isEnabled: true,
    requiredRoles: ['SUPERADMIN'],
    permissions: ['roles.read', 'roles.write']
  },

  // E-commerce & Business Operations
  {
    id: 'products',
    name: 'Product Management',
    icon: Package,
    description: 'Product catalog, inventory management, and product creation',
    category: 'Business Operations',
    isEnabled: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    permissions: ['products.read', 'products.write']
  },
  {
    id: 'shop',
    name: 'Shopping Interface',
    icon: ShoppingBag,
    description: 'Customer shopping experience and product browsing',
    category: 'Business Operations',
    isEnabled: true,
    requiredRoles: ['CUSTOMER', 'SUPERADMIN', 'ADMIN'],
    permissions: ['cart.read', 'cart.write']
  },
  {
    id: 'cart',
    name: 'Shopping Cart',
    icon: ShoppingCart,
    description: 'Shopping cart management and checkout process',
    category: 'Business Operations',
    isEnabled: true,
    requiredRoles: ['CUSTOMER', 'SUPERADMIN', 'ADMIN'],
    permissions: ['cart.read', 'cart.write']
  },
  {
    id: 'orders',
    name: 'Order Management',
    icon: FileText,
    description: 'Order processing, tracking, and management',
    category: 'Business Operations',
    isEnabled: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    permissions: ['orders.read']
  },

  // Financial Management
  {
    id: 'billing',
    name: 'Billing System',
    icon: CreditCard,
    description: 'Invoice generation, billing cycles, and payment tracking',
    category: 'Finance',
    isEnabled: false, // Can be enabled per business needs
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['billing.read', 'billing.write']
  },
  {
    id: 'accounting',
    name: 'Accounting Module',
    icon: Calculator,
    description: 'Financial accounting, bookkeeping, and financial reports',
    category: 'Finance',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['accounting.read', 'accounting.write']
  },
  {
    id: 'payments',
    name: 'Payment Gateway',
    icon: CreditCard,
    description: 'Payment processing, refunds, and payment method management',
    category: 'Finance',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['payments.read', 'payments.write']
  },

  // Analytics & Reporting
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    icon: BarChart3,
    description: 'Business intelligence, custom reports, and data visualization',
    category: 'Analytics',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['analytics.read']
  },
  {
    id: 'reports',
    name: 'Report Generator',
    icon: FileText,
    description: 'Custom report generation and scheduled reporting',
    category: 'Analytics',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['reports.read', 'reports.generate']
  },

  // Operations & Logistics
  {
    id: 'inventory',
    name: 'Inventory Management',
    icon: Archive,
    description: 'Stock tracking, warehouse management, and inventory optimization',
    category: 'Operations',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    permissions: ['inventory.read', 'inventory.write']
  },
  {
    id: 'shipping',
    name: 'Shipping & Logistics',
    icon: Truck,
    description: 'Shipping provider integration, tracking, and logistics management',
    category: 'Operations',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['shipping.read', 'shipping.write']
  },
  {
    id: 'drivers',
    name: 'Driver Management',
    icon: MapPin,
    description: 'Driver onboarding, route optimization, and delivery tracking',
    category: 'Operations',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['drivers.read', 'drivers.write']
  },

  // Communication & Support
  {
    id: 'notifications',
    name: 'Notification System',
    icon: Bell,
    description: 'Email, SMS, and in-app notification management',
    category: 'Communication',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    permissions: ['notifications.read', 'notifications.send']
  },
  {
    id: 'support',
    name: 'Customer Support',
    icon: MessageSquare,
    description: 'Help desk, ticket management, and customer support tools',
    category: 'Support',
    isEnabled: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    permissions: ['support.read', 'support.write']
  },

  // System Management
  {
    id: 'settings',
    name: 'System Settings',
    icon: Cog,
    description: 'System configuration and global settings',
    category: 'System',
    isEnabled: true,
    requiredRoles: ['SUPERADMIN'],
    permissions: ['system.config']
  }
];

export default function ModuleManagementPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState<ModuleConfig[]>(ALL_MODULES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [users, setUsers] = useState<UserModuleAccess[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [showUserAccess, setShowUserAccess] = useState(false);

  // Only SUPERADMIN can access this page
  if (user?.role !== 'SUPERADMIN') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Access Restricted</h3>
          <p className="text-gray-600">Only SUPERADMIN can manage system modules.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authTokens');
      if (!token) return;

      const { accessToken } = JSON.parse(token);
      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE}/users`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      if (data.success) {
        const usersData = data.data.map((user: any) => ({
          userId: user.id,
          userEmail: user.email,
          userName: `${user.firstName} ${user.lastName}`,
          role: user.role,
          enabledModules: getDefaultModulesForRole(user.role)
        }));
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getDefaultModulesForRole = (role: string): string[] => {
    const roleModules: { [key: string]: string[] } = {
      'SUPERADMIN': modules.filter(m => m.isEnabled).map(m => m.id),
      'ADMIN': ['dashboard', 'users', 'products', 'orders'],
      'SELLER': ['dashboard', 'products', 'orders'],
      'CUSTOMER': ['dashboard', 'shop', 'cart', 'orders']
    };
    return roleModules[role] || ['dashboard'];
  };

  const toggleModuleGlobally = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, isEnabled: !module.isEnabled }
        : module
    ));

    // Show success message
    const module = modules.find(m => m.id === moduleId);
    const action = module?.isEnabled ? 'disabled' : 'enabled';
    alert(`Module "${module?.name}" has been ${action} globally.`);
  };

  const toggleModuleForUser = (userId: string, moduleId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.userId === userId) {
        const enabledModules = user.enabledModules.includes(moduleId)
          ? user.enabledModules.filter(id => id !== moduleId)
          : [...user.enabledModules, moduleId];
        return { ...user, enabledModules };
      }
      return user;
    }));

    const module = modules.find(m => m.id === moduleId);
    const user = users.find(u => u.userId === userId);
    const action = user?.enabledModules.includes(moduleId) ? 'removed from' : 'assigned to';
    alert(`Module "${module?.name}" has been ${action} ${user?.userName}.`);
  };

  const categories = ['All', ...Array.from(new Set(modules.map(m => m.category)))];
  const filteredModules = selectedCategory === 'All' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  const selectedUserData = users.find(u => u.userId === selectedUser);
  const enabledCount = modules.filter(m => m.isEnabled).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dynamic Module Management</h1>
        <p className="mt-2 text-gray-600">
          Configure which business modules are available globally and assign them to specific users.
          This system is business-agnostic and can handle any type of modules.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Settings2 className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Modules</p>
              <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Enabled</p>
              <p className="text-2xl font-bold text-gray-900">{enabledCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <EyeOff className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Disabled</p>
              <p className="text-2xl font-bold text-gray-900">{modules.length - enabledCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setShowUserAccess(false)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                !showUserAccess
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Global Module Settings
            </button>
            <button
              onClick={() => setShowUserAccess(true)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                showUserAccess
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User-Specific Access
            </button>
          </nav>
        </div>
      </div>

      {!showUserAccess ? (
        <>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Global Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                className={`bg-white rounded-lg border-2 p-6 transition-all ${
                  module.isEnabled
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <module.icon className={`w-8 h-8 mr-3 ${
                      module.isEnabled ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {module.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleModuleGlobally(module.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      module.isEnabled
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                    }`}
                  >
                    {module.isEnabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Required Roles:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {module.requiredRoles.map((role) => (
                        <span key={role} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {module.permissions.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-gray-500">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {module.permissions.map((permission) => (
                          <span key={permission} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className={`text-sm font-medium ${
                    module.isEnabled ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {module.isEnabled ? 'Globally Enabled' : 'Globally Disabled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* User Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select User to Manage Module Access
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a user...</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.userName} ({user.userEmail}) - {user.role}
                </option>
              ))}
            </select>
          </div>

          {/* User-Specific Module Access */}
          {selectedUserData && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Module Access for {selectedUserData.userName}
                </h3>
                <p className="text-gray-600">
                  Role: {selectedUserData.role} | Email: {selectedUserData.userEmail}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.filter(m => m.isEnabled).map((module) => {
                  const hasAccess = selectedUserData.enabledModules.includes(module.id);
                  const canAssign = module.requiredRoles.includes(selectedUserData.role);

                  return (
                    <div
                      key={module.id}
                      className={`border rounded-lg p-4 ${
                        hasAccess ? 'border-green-300 bg-green-50' : 'border-gray-200'
                      } ${!canAssign ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <module.icon className={`w-6 h-6 mr-2 ${
                            hasAccess ? 'text-green-600' : 'text-gray-400'
                          }`} />
                          <div>
                            <h4 className="font-medium text-gray-900">{module.name}</h4>
                            <p className="text-xs text-gray-500">{module.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleModuleForUser(selectedUserData.userId, module.id)}
                          disabled={!canAssign}
                          className={`p-1 rounded transition-colors ${
                            hasAccess
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                          } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          {hasAccess ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>

                      {!canAssign && (
                        <p className="text-xs text-red-600 mt-2">
                          Role {selectedUserData.role} cannot access this module
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Business-Agnostic Info Box */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">🚀 Dynamic Business Module System</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-semibold mb-2">✅ How It Works:</h5>
            <ul className="space-y-1">
              <li>• <strong>Global Control:</strong> Enable/disable modules system-wide</li>
              <li>• <strong>User-Specific:</strong> Assign specific modules to individual users</li>
              <li>• <strong>Role-Based:</strong> Users can only access modules allowed for their role</li>
              <li>• <strong>Real-Time:</strong> Changes take effect immediately</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">🎯 Business Agnostic:</h5>
            <ul className="space-y-1">
              <li>• <strong>E-commerce:</strong> Products, Orders, Cart, Shop</li>
              <li>• <strong>Finance:</strong> Billing, Accounting, Payments</li>
              <li>• <strong>Operations:</strong> Inventory, Shipping, Drivers</li>
              <li>• <strong>Analytics:</strong> Reports, Business Intelligence</li>
              <li>• <strong>Future-Ready:</strong> Easy to add any business module</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white rounded border border-blue-100">
          <p className="text-sm text-blue-700">
            <strong>Perfect for SaaS:</strong> This system allows you to add any type of business module - 
            whether it's for e-commerce, accounting, project management, CRM, or any other business vertical. 
            SUPERADMIN has full control over what modules each user can access.
          </p>
        </div>
      </div>
    </div>
  );
}
