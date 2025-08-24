'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  BarChart3,
  Shield,
  Menu,
  X,
  ChevronRight,
  Plus,
  Database,
  FileText,
  MessageSquare,
  ShoppingBag,
  DollarSign,
  Calculator,
  Truck,
  MapPin,
  Archive,
  Settings2,
  Cog,
  FileBarChart
} from 'lucide-react';

interface ModuleItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  permissions: string[];
  roles: string[];
  isEnabled: boolean;
  category: string;
  description: string;
}

const moduleItems: ModuleItem[] = [
  // Core Business Management
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    permissions: [],
    roles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    isEnabled: true,
    category: 'Core',
    description: 'Main overview and analytics'
  },

  // User & Access Management
  {
    id: 'users',
    name: 'User Management',
    icon: Users,
    href: '/dashboard/users',
    permissions: ['USER_READ'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: true,
    category: 'User Management',
    description: 'Manage users and accounts'
  },
  {
    id: 'roles',
    name: 'Roles & Permissions',
    icon: Shield,
    href: '/dashboard/roles',
    permissions: ['ROLE_MANAGE'],
    roles: ['SUPERADMIN'],
    isEnabled: true,
    category: 'User Management',
    description: 'Configure roles and permissions'
  },

  // E-commerce & Business Operations
  {
    id: 'products',
    name: 'Products',
    icon: Package,
    href: '/dashboard/products',
    permissions: ['PRODUCT_READ'],
    roles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    isEnabled: true,
    category: 'Business Operations',
    description: 'Product catalog and inventory'
  },
  {
    id: 'shop',
    name: 'Shop',
    icon: ShoppingBag,
    href: '/dashboard/shop',
    permissions: [],
    roles: ['CUSTOMER', 'SUPERADMIN', 'ADMIN'],
    isEnabled: true,
    category: 'Business Operations',
    description: 'Browse and purchase products'
  },
  {
    id: 'cart',
    name: 'Shopping Cart',
    icon: ShoppingCart,
    href: '/dashboard/cart',
    permissions: [],
    roles: ['CUSTOMER', 'SUPERADMIN', 'ADMIN'],
    isEnabled: true,
    category: 'Business Operations',
    description: 'Your shopping cart'
  },
  {
    id: 'orders',
    name: 'Orders',
    icon: FileText,
    href: '/dashboard/orders',
    permissions: ['ORDER_READ'],
    roles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    isEnabled: true,
    category: 'Business Operations',
    description: 'Order management and tracking'
  },

  // Financial Management
  {
    id: 'billing',
    name: 'Billing',
    icon: CreditCard,
    href: '/dashboard/billing',
    permissions: ['PAYMENT_READ'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false, // Can be enabled per business needs
    category: 'Finance',
    description: 'Billing and invoicing system'
  },
  {
    id: 'accounting',
    name: 'Accounting',
    icon: Calculator,
    href: '/dashboard/accounting',
    permissions: ['PAYMENT_READ'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false,
    category: 'Finance',
    description: 'Financial accounting and bookkeeping'
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: DollarSign,
    href: '/dashboard/payments',
    permissions: ['PAYMENT_READ'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false,
    category: 'Finance',
    description: 'Payment processing and gateway'
  },

  // Analytics & Reporting
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    permissions: ['SYSTEM_CONFIG'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false,
    category: 'Analytics',
    description: 'Business analytics and reports'
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: FileBarChart,
    href: '/dashboard/reports',
    permissions: ['SYSTEM_CONFIG'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false,
    category: 'Analytics',
    description: 'Generate business reports'
  },

  // Logistics & Operations
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Archive,
    href: '/dashboard/inventory',
    permissions: ['PRODUCT_READ'],
    roles: ['SUPERADMIN', 'ADMIN', 'SELLER'],
    isEnabled: false,
    category: 'Operations',
    description: 'Inventory management and tracking'
  },
  {
    id: 'shipping',
    name: 'Shipping',
    icon: Truck,
    href: '/dashboard/shipping',
    permissions: ['ORDER_READ'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false,
    category: 'Operations',
    description: 'Shipping and delivery management'
  },
  {
    id: 'drivers',
    name: 'Drivers',
    icon: MapPin,
    href: '/dashboard/drivers',
    permissions: ['ORDER_READ'],
    roles: ['SUPERADMIN', 'ADMIN'],
    isEnabled: false,
    category: 'Operations',
    description: 'Driver management and tracking'
  },

  // Customer Service & Communication
  {
    id: 'support',
    name: 'Support',
    icon: MessageSquare,
    href: '/dashboard/support',
    permissions: [],
    roles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    isEnabled: false,
    category: 'Support',
    description: 'Customer support and tickets'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    href: '/dashboard/notifications',
    permissions: [],
    roles: ['SUPERADMIN', 'ADMIN', 'SELLER', 'CUSTOMER'],
    isEnabled: false,
    category: 'Communication',
    description: 'Notification management'
  },

  // System Management (Only for SUPERADMIN)
  {
    id: 'modules',
    name: 'Module Management',
    icon: Settings2,
    href: '/dashboard/modules',
    permissions: ['SYSTEM_CONFIG'],
    roles: ['SUPERADMIN'],
    isEnabled: true,
    category: 'System',
    description: 'Enable/disable business modules'
  },
  {
    id: 'settings',
    name: 'System Settings',
    icon: Cog,
    href: '/dashboard/settings',
    permissions: ['SYSTEM_CONFIG'],
    roles: ['SUPERADMIN'],
    isEnabled: true,
    category: 'System',
    description: 'System configuration and settings'
  }
];

export default function DashboardSidebar() {
  const { user, logout, hasRole, hasPermission } = useAuth();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getAvailableModules = (): ModuleItem[] => {
    if (!user) return [];
    
    return moduleItems.filter(module => {
      // Check if module is enabled
      if (!module.isEnabled) return false;
      
      // Check role access
      const hasRoleAccess = module.roles.length === 0 || hasRole(module.roles);
      
      // Check permission access (if permissions are specified)
      const hasPermissionAccess = module.permissions.length === 0 || 
        module.permissions.some(permission => hasPermission(permission));
      
      return hasRoleAccess && hasPermissionAccess;
    });
  };

  const availableModules = getAvailableModules();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="font-semibold text-gray-900">ShopMart</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {availableModules.map((module) => {
          const Icon = module.icon;
          const isActive = pathname === module.href || pathname.startsWith(module.href + '/');
          
          return (
            <Link
              key={module.id}
              href={module.href}
              className={`
                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="ml-3">{module.name}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && user && hasRole(['SUPERADMIN', 'ADMIN']) && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Plus size={16} />
              <span className="ml-2">Add Product</span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Users size={16} />
              <span className="ml-2">Add User</span>
            </button>
          </div>
        </div>
      )}

      {/* Settings & Logout */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/dashboard/settings"
          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Settings size={20} />
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className={`
        hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:bg-white lg:shadow-lg lg:transition-all lg:duration-300
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
      `}>
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 bg-white shadow-lg rounded-lg lg:hidden"
      >
        <Menu size={24} />
      </button>
    </>
  );
}
