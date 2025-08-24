export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER'
}

export enum Permission {
  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  PRODUCT_CREATE = 'PRODUCT_CREATE',
  PRODUCT_READ = 'PRODUCT_READ',
  PRODUCT_UPDATE = 'PRODUCT_UPDATE',
  PRODUCT_DELETE = 'PRODUCT_DELETE',
  ORDER_CREATE = 'ORDER_CREATE',
  ORDER_READ = 'ORDER_READ',
  ORDER_UPDATE = 'ORDER_UPDATE',
  ORDER_DELETE = 'ORDER_DELETE',
  PAYMENT_CREATE = 'PAYMENT_CREATE',
  PAYMENT_READ = 'PAYMENT_READ',
  PAYMENT_UPDATE = 'PAYMENT_UPDATE',
  ROLE_MANAGE = 'ROLE_MANAGE',
  PERMISSION_MANAGE = 'PERMISSION_MANAGE',
  SYSTEM_CONFIG = 'SYSTEM_CONFIG'
}

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPERADMIN]: Object.values(Permission),
  [UserRole.ADMIN]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.PRODUCT_CREATE,
    Permission.PRODUCT_READ,
    Permission.PRODUCT_UPDATE,
    Permission.PRODUCT_DELETE,
    Permission.ORDER_READ,
    Permission.ORDER_UPDATE,
    Permission.PAYMENT_READ,
  ],
  [UserRole.SELLER]: [
    Permission.PRODUCT_CREATE,
    Permission.PRODUCT_READ,
    Permission.PRODUCT_UPDATE,
    Permission.ORDER_READ,
    Permission.ORDER_UPDATE,
  ],
  [UserRole.CUSTOMER]: [
    Permission.PRODUCT_READ,
    Permission.ORDER_CREATE,
    Permission.ORDER_READ,
    Permission.PAYMENT_CREATE,
  ],
};

export class RbacUtil {
  static getRolePermissions(role: UserRole): Permission[] {
    return rolePermissions[role] || [];
  }

  static hasPermission(userRole: UserRole, permission: Permission): boolean {
    const permissions = this.getRolePermissions(userRole);
    return permissions.includes(permission);
  }

  static hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    const userPermissions = this.getRolePermissions(userRole);
    return permissions.some(permission => userPermissions.includes(permission));
  }

  static hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
    const userPermissions = this.getRolePermissions(userRole);
    return permissions.every(permission => userPermissions.includes(permission));
  }

  static canAccessResource(userRole: UserRole, requiredPermissions: Permission[]): boolean {
    return this.hasAnyPermission(userRole, requiredPermissions);
  }

  static isSuperAdmin(role: UserRole): boolean {
    return role === UserRole.SUPERADMIN;
  }

  static isAdmin(role: UserRole): boolean {
    return role === UserRole.ADMIN || role === UserRole.SUPERADMIN;
  }

  static canManageUser(actorRole: UserRole, targetRole: UserRole): boolean {
    if (actorRole === UserRole.SUPERADMIN) {
      return true;
    }
    
    if (actorRole === UserRole.ADMIN) {
      return targetRole !== UserRole.SUPERADMIN;
    }
    
    return false;
  }
}
