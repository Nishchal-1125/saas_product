'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import {
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Check,
  AlertTriangle,
  Crown,
  UserCheck,
  Store,
  User
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'User' | 'Product' | 'Order' | 'Payment' | 'System';
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<any>;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  canBeDeleted: boolean;
}

const allPermissions: Permission[] = [
  // User Management
  { id: 'USER_CREATE', name: 'Create Users', description: 'Create new user accounts', category: 'User' },
  { id: 'USER_READ', name: 'View Users', description: 'View user profiles and data', category: 'User' },
  { id: 'USER_UPDATE', name: 'Update Users', description: 'Modify user information', category: 'User' },
  { id: 'USER_DELETE', name: 'Delete Users', description: 'Remove user accounts', category: 'User' },
  
  // Product Management
  { id: 'PRODUCT_CREATE', name: 'Create Products', description: 'Add new products to catalog', category: 'Product' },
  { id: 'PRODUCT_READ', name: 'View Products', description: 'Browse product catalog', category: 'Product' },
  { id: 'PRODUCT_UPDATE', name: 'Update Products', description: 'Modify product information', category: 'Product' },
  { id: 'PRODUCT_DELETE', name: 'Delete Products', description: 'Remove products from catalog', category: 'Product' },
  
  // Order Management
  { id: 'ORDER_CREATE', name: 'Create Orders', description: 'Place new orders', category: 'Order' },
  { id: 'ORDER_READ', name: 'View Orders', description: 'Access order information', category: 'Order' },
  { id: 'ORDER_UPDATE', name: 'Update Orders', description: 'Modify order status and details', category: 'Order' },
  { id: 'ORDER_DELETE', name: 'Cancel Orders', description: 'Cancel or delete orders', category: 'Order' },
  
  // Payment Management
  { id: 'PAYMENT_CREATE', name: 'Process Payments', description: 'Create payment transactions', category: 'Payment' },
  { id: 'PAYMENT_READ', name: 'View Payments', description: 'Access payment information', category: 'Payment' },
  { id: 'PAYMENT_UPDATE', name: 'Update Payments', description: 'Modify payment details', category: 'Payment' },
  
  // System Management
  { id: 'ROLE_MANAGE', name: 'Manage Roles', description: 'Create and modify user roles', category: 'System' },
  { id: 'PERMISSION_MANAGE', name: 'Manage Permissions', description: 'Assign permissions to roles', category: 'System' },
  { id: 'SYSTEM_CONFIG', name: 'System Configuration', description: 'Access system settings', category: 'System' }
];

const defaultRoles: Role[] = [
  {
    id: 'SUPERADMIN',
    name: 'Super Administrator',
    description: 'Complete system access with all permissions',
    color: 'from-purple-500 to-pink-500',
    icon: Crown,
    permissions: allPermissions.map(p => p.id),
    userCount: 1,
    isSystem: true,
    canBeDeleted: false
  },
  {
    id: 'ADMIN',
    name: 'Administrator',
    description: 'Administrative access with most permissions',
    color: 'from-blue-500 to-indigo-500',
    icon: UserCheck,
    permissions: [
      'USER_READ', 'USER_UPDATE',
      'PRODUCT_CREATE', 'PRODUCT_READ', 'PRODUCT_UPDATE', 'PRODUCT_DELETE',
      'ORDER_READ', 'ORDER_UPDATE',
      'PAYMENT_READ'
    ],
    userCount: 3,
    isSystem: true,
    canBeDeleted: false
  },
  {
    id: 'SELLER',
    name: 'Seller',
    description: 'Manage products and view orders',
    color: 'from-green-500 to-emerald-500',
    icon: Store,
    permissions: [
      'PRODUCT_CREATE', 'PRODUCT_READ', 'PRODUCT_UPDATE',
      'ORDER_READ', 'ORDER_UPDATE'
    ],
    userCount: 12,
    isSystem: true,
    canBeDeleted: false
  },
  {
    id: 'CUSTOMER',
    name: 'Customer',
    description: 'Basic customer access for shopping',
    color: 'from-gray-500 to-gray-600',
    icon: User,
    permissions: [
      'PRODUCT_READ',
      'ORDER_CREATE', 'ORDER_READ',
      'PAYMENT_CREATE'
    ],
    userCount: 1234,
    isSystem: true,
    canBeDeleted: false
  }
];

export default function RolesPage() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: [],
    color: 'from-gray-500 to-gray-600'
  });

  const categories = ['All', 'User', 'Product', 'Order', 'Payment', 'System'];
  const colorOptions = [
    'from-blue-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-purple-500 to-violet-500',
    'from-gray-500 to-gray-600'
  ];

  const filteredPermissions = selectedCategory === 'All' 
    ? allPermissions 
    : allPermissions.filter(p => p.category === selectedCategory);

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) return;

    const role: Role = {
      id: newRole.name.toUpperCase().replace(/\s+/g, '_'),
      name: newRole.name,
      description: newRole.description,
      color: newRole.color || colorOptions[0],
      icon: User,
      permissions: newRole.permissions || [],
      userCount: 0,
      isSystem: false,
      canBeDeleted: true
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [], color: colorOptions[0] });
    setIsCreating(false);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(prev => prev.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const handlePermissionToggle = (permissionId: string, targetRole?: Role) => {
    if (targetRole) {
      // Editing existing role
      const updatedPermissions = targetRole.permissions.includes(permissionId)
        ? targetRole.permissions.filter(p => p !== permissionId)
        : [...targetRole.permissions, permissionId];
      
      setEditingRole({ ...targetRole, permissions: updatedPermissions });
    } else {
      // Creating new role
      const updatedPermissions = newRole.permissions?.includes(permissionId)
        ? newRole.permissions.filter(p => p !== permissionId)
        : [...(newRole.permissions || []), permissionId];
      
      setNewRole({ ...newRole, permissions: updatedPermissions });
    }
  };

  const getPermissionsByCategory = (permissions: string[]) => {
    const grouped: Record<string, Permission[]> = {};
    categories.forEach(cat => {
      if (cat !== 'All') {
        grouped[cat] = allPermissions
          .filter(p => p.category === cat && permissions.includes(p.id));
      }
    });
    return grouped;
  };

  return (
    <ProtectedRoute roles={['SUPERADMIN']}>
      <div className="p-6 bg-gray-50 min-h-screen lg:ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                Role Management
              </h1>
              <p className="text-gray-600 mt-1">
                Define roles and manage permissions for your SaaS platform
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">System Roles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roles.filter(r => r.isSystem).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Permissions</p>
                <p className="text-2xl font-bold text-gray-900">{allPermissions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create/Edit Role Modal */}
        {(isCreating || editingRole) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isCreating ? 'Create New Role' : 'Edit Role'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingRole(null);
                      setNewRole({ name: '', description: '', permissions: [] });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Role Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Role Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role Name
                        </label>
                        <input
                          type="text"
                          value={editingRole ? editingRole.name : newRole.name}
                          onChange={(e) => {
                            if (editingRole) {
                              setEditingRole({ ...editingRole, name: e.target.value });
                            } else {
                              setNewRole({ ...newRole, name: e.target.value });
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter role name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={editingRole ? editingRole.description : newRole.description}
                          onChange={(e) => {
                            if (editingRole) {
                              setEditingRole({ ...editingRole, description: e.target.value });
                            } else {
                              setNewRole({ ...newRole, description: e.target.value });
                            }
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe the role"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color Theme
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                if (editingRole) {
                                  setEditingRole({ ...editingRole, color });
                                } else {
                                  setNewRole({ ...newRole, color });
                                }
                              }}
                              className={`h-12 rounded-lg bg-gradient-to-r ${color} border-2 ${
                                (editingRole?.color || newRole.color) === color
                                  ? 'border-gray-900'
                                  : 'border-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
                      <div className="flex space-x-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-2 py-1 text-xs rounded ${
                              selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {filteredPermissions.map((permission) => {
                        const currentPermissions = editingRole ? editingRole.permissions : newRole.permissions || [];
                        const isChecked = currentPermissions.includes(permission.id);
                        
                        return (
                          <label
                            key={permission.id}
                            className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handlePermissionToggle(permission.id, editingRole || undefined)}
                              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {permission.category}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingRole(null);
                      setNewRole({ name: '', description: '', permissions: [] });
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (editingRole) {
                        handleUpdateRole(editingRole);
                      } else {
                        handleCreateRole();
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? 'Create Role' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const permissionGroups = getPermissionsByCategory(role.permissions);
            
            return (
              <div
                key={role.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Role Header */}
                <div className={`bg-gradient-to-r ${role.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className="w-8 h-8 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold">{role.name}</h3>
                        <p className="text-white/80 text-sm">{role.userCount} users</p>
                      </div>
                    </div>
                    {role.isSystem && (
                      <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full">
                        <Crown className="w-4 h-4" />
                        <span className="text-xs">System</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                  
                  <div className="space-y-3">
                    {Object.entries(permissionGroups).map(([category, permissions]) => (
                      permissions.length > 0 && (
                        <div key={category}>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {permissions.slice(0, 3).map((permission) => (
                              <span
                                key={permission.id}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {permission.name}
                              </span>
                            ))}
                            {permissions.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                                +{permissions.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Role Actions */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {role.permissions.length} permissions
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingRole(role)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {role.canBeDeleted && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Info */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Security Best Practices</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Follow the principle of least privilege when assigning permissions</li>
                <li>• Regularly audit role permissions and user assignments</li>
                <li>• System roles (SUPERADMIN, ADMIN, SELLER, CUSTOMER) cannot be deleted</li>
                <li>• Module permissions are automatically enforced at the API level</li>
                <li>• Changes to roles take effect immediately for all users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
