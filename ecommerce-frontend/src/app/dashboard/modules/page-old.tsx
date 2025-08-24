'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import {
  Database,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Bell,
  Shield,
  FileText,
  MessageSquare,
  Truck,
  Globe,
  Heart,
  Award,
  Zap
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'Core' | 'Commerce' | 'Finance' | 'Analytics' | 'Communication' | 'Custom';
  isEnabled: boolean;
  isCore: boolean;
  requiredRoles: string[];
  requiredPermissions: string[];
  version: string;
  lastUpdated: Date;
}

const availableModules: Module[] = [
  {
    id: 'user_management',
    name: 'User Management',
    description: 'Manage users, roles, and permissions',
    icon: Users,
    category: 'Core',
    isEnabled: true,
    isCore: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    requiredPermissions: ['USER_READ'],
    version: '1.0.0',
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: 'product_catalog',
    name: 'Product Catalog',
    description: 'Manage products, categories, and inventory',
    icon: Package,
    category: 'Commerce',
    isEnabled: true,
    isCore: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    requiredPermissions: ['PRODUCT_READ'],
    version: '1.2.0',
    lastUpdated: new Date('2024-01-20')
  },
  {
    id: 'order_management',
    name: 'Order Management',
    description: 'Process and track customer orders',
    icon: ShoppingCart,
    category: 'Commerce',
    isEnabled: true,
    isCore: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    requiredPermissions: ['ORDER_READ'],
    version: '1.1.0',
    lastUpdated: new Date('2024-01-18')
  },
  {
    id: 'payment_processing',
    name: 'Payment Processing',
    description: 'Handle payments and financial transactions',
    icon: CreditCard,
    category: 'Finance',
    isEnabled: true,
    isCore: true,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    requiredPermissions: ['PAYMENT_READ'],
    version: '1.0.5',
    lastUpdated: new Date('2024-01-22')
  },
  {
    id: 'analytics_dashboard',
    name: 'Analytics Dashboard',
    description: 'Business intelligence and reporting',
    icon: BarChart3,
    category: 'Analytics',
    isEnabled: true,
    isCore: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    requiredPermissions: ['SYSTEM_CONFIG'],
    version: '2.0.0',
    lastUpdated: new Date('2024-01-25')
  },
  {
    id: 'notification_center',
    name: 'Notification Center',
    description: 'Email, SMS, and push notifications',
    icon: Bell,
    category: 'Communication',
    isEnabled: true,
    isCore: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    requiredPermissions: [],
    version: '1.3.0',
    lastUpdated: new Date('2024-01-19')
  },
  {
    id: 'role_management',
    name: 'Role Management',
    description: 'Advanced role and permission management',
    icon: Shield,
    category: 'Core',
    isEnabled: true,
    isCore: false,
    requiredRoles: ['SUPERADMIN'],
    requiredPermissions: ['ROLE_MANAGE'],
    version: '1.0.0',
    lastUpdated: new Date('2024-01-16')
  },
  {
    id: 'finance_module',
    name: 'Finance Module',
    description: 'Advanced financial management and reporting',
    icon: FileText,
    category: 'Finance',
    isEnabled: false,
    isCore: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    requiredPermissions: ['PAYMENT_READ'],
    version: '1.0.0-beta',
    lastUpdated: new Date('2024-01-10')
  },
  {
    id: 'customer_support',
    name: 'Customer Support',
    description: 'Help desk and support ticket management',
    icon: MessageSquare,
    category: 'Communication',
    isEnabled: false,
    isCore: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    requiredPermissions: [],
    version: '0.9.0',
    lastUpdated: new Date('2024-01-12')
  },
  {
    id: 'logistics_management',
    name: 'Logistics Management',
    description: 'Shipping, tracking, and delivery management',
    icon: Truck,
    category: 'Commerce',
    isEnabled: false,
    isCore: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    requiredPermissions: ['ORDER_UPDATE'],
    version: '0.8.0',
    lastUpdated: new Date('2024-01-08')
  },
  {
    id: 'multi_tenant',
    name: 'Multi-Tenant Management',
    description: 'Manage multiple tenants and organizations',
    icon: Globe,
    category: 'Core',
    isEnabled: false,
    isCore: false,
    requiredRoles: ['SUPERADMIN'],
    requiredPermissions: ['SYSTEM_CONFIG'],
    version: '1.0.0-alpha',
    lastUpdated: new Date('2024-01-05')
  },
  {
    id: 'loyalty_program',
    name: 'Loyalty Program',
    description: 'Customer loyalty and rewards management',
    icon: Award,
    category: 'Commerce',
    isEnabled: false,
    isCore: false,
    requiredRoles: ['SUPERADMIN', 'ADMIN'],
    requiredPermissions: ['USER_UPDATE'],
    version: '0.7.0',
    lastUpdated: new Date('2024-01-03')
  }
];

export default function ModulesPage() {
  const { user, hasRole, hasPermission } = useAuth();
  const [modules, setModules] = useState<Module[]>(availableModules);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Core', 'Commerce', 'Finance', 'Analytics', 'Communication', 'Custom'];

  const filteredModules = modules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, isEnabled: !module.isEnabled }
        : module
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Core': 'bg-blue-100 text-blue-800',
      'Commerce': 'bg-green-100 text-green-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Analytics': 'bg-purple-100 text-purple-800',
      'Communication': 'bg-pink-100 text-pink-800',
      'Custom': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.Custom;
  };

  const getStatusColor = (isEnabled: boolean, isCore: boolean) => {
    if (isCore) return 'bg-blue-100 text-blue-800';
    return isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (isEnabled: boolean, isCore: boolean) => {
    if (isCore) return 'Core Module';
    return isEnabled ? 'Enabled' : 'Disabled';
  };

  return (
    <ProtectedRoute roles={['SUPERADMIN']}>
      <div className="p-6 bg-gray-50 min-h-screen lg:ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Database className="w-8 h-8 mr-3" />
                Module Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and configure application modules for your SaaS platform
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Module
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Modules</p>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enabled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.filter(m => m.isEnabled).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Core Modules</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.filter(m => m.isCore).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.filter(m => !m.isEnabled).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${
                      module.isEnabled ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        module.isEnabled ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                      <p className="text-sm text-gray-500">v{module.version}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(module.category)}`}>
                      {module.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.isEnabled, module.isCore)}`}>
                      {getStatusText(module.isEnabled, module.isCore)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Required Roles:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.requiredRoles.map(role => (
                      <span key={role} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    {!module.isCore && (
                      <button className="p-2 text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {!module.isCore && (
                    <button
                      onClick={() => handleToggleModule(module.id)}
                      className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        module.isEnabled
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {module.isEnabled ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Disable
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Enable
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Module Deployment Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Module Deployment</h3>
          <p className="text-blue-700 mb-4">
            Modules can be dynamically enabled/disabled per tenant. Core modules are always enabled and cannot be disabled.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Secure Module Loading</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Role-based access control</li>
                <li>• Permission validation</li>
                <li>• Runtime module verification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Best Practices</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Enable only required modules</li>
                <li>• Regular security audits</li>
                <li>• Module dependency management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
