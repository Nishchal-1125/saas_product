-- Create databases for different services
-- Note: PostgreSQL doesn't support IF NOT EXISTS for CREATE DATABASE
-- These will only run once during initialization

-- Create extensions in the main database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create roles and permissions table
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    module VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Insert default roles
INSERT INTO roles (name, description, is_system) VALUES
    ('SUPERADMIN', 'Super Administrator with all permissions', TRUE),
    ('ADMIN', 'Administrator with most permissions', TRUE),
    ('SELLER', 'Seller with product and order management permissions', TRUE),
    ('CUSTOMER', 'Customer with basic shopping permissions', TRUE)
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (name, description, module) VALUES
    -- User Management
    ('USER_CREATE', 'Create users', 'USER'),
    ('USER_READ', 'Read user information', 'USER'),
    ('USER_UPDATE', 'Update user information', 'USER'),
    ('USER_DELETE', 'Delete users', 'USER'),
    ('USER_MANAGE_ROLES', 'Assign roles to users', 'USER'),
    
    -- Product Management
    ('PRODUCT_CREATE', 'Create products', 'PRODUCT'),
    ('PRODUCT_READ', 'Read product information', 'PRODUCT'),
    ('PRODUCT_UPDATE', 'Update product information', 'PRODUCT'),
    ('PRODUCT_DELETE', 'Delete products', 'PRODUCT'),
    ('PRODUCT_MANAGE_CATEGORIES', 'Manage product categories', 'PRODUCT'),
    
    -- Order Management
    ('ORDER_CREATE', 'Create orders', 'ORDER'),
    ('ORDER_READ', 'Read order information', 'ORDER'),
    ('ORDER_UPDATE', 'Update order status', 'ORDER'),
    ('ORDER_DELETE', 'Delete orders', 'ORDER'),
    ('ORDER_PROCESS', 'Process and fulfill orders', 'ORDER'),
    
    -- Payment Management
    ('PAYMENT_CREATE', 'Process payments', 'PAYMENT'),
    ('PAYMENT_READ', 'Read payment information', 'PAYMENT'),
    ('PAYMENT_UPDATE', 'Update payment status', 'PAYMENT'),
    ('PAYMENT_REFUND', 'Process refunds', 'PAYMENT'),
    
    -- Cart Management
    ('CART_READ', 'View cart contents', 'CART'),
    ('CART_UPDATE', 'Modify cart items', 'CART'),
    ('CART_CLEAR', 'Clear cart contents', 'CART'),
    
    -- System Administration
    ('ROLE_CREATE', 'Create new roles', 'SYSTEM'),
    ('ROLE_READ', 'View roles', 'SYSTEM'),
    ('ROLE_UPDATE', 'Update roles', 'SYSTEM'),
    ('ROLE_DELETE', 'Delete roles', 'SYSTEM'),
    ('PERMISSION_CREATE', 'Create new permissions', 'SYSTEM'),
    ('PERMISSION_READ', 'View permissions', 'SYSTEM'),
    ('PERMISSION_UPDATE', 'Update permissions', 'SYSTEM'),
    ('PERMISSION_DELETE', 'Delete permissions', 'SYSTEM'),
    ('MODULE_CREATE', 'Create new modules', 'SYSTEM'),
    ('MODULE_READ', 'View modules', 'SYSTEM'),
    ('MODULE_UPDATE', 'Update modules', 'SYSTEM'),
    ('MODULE_DELETE', 'Delete modules', 'SYSTEM'),
    ('SYSTEM_CONFIG', 'Configure system settings', 'SYSTEM'),
    ('AUDIT_LOGS', 'View audit logs', 'SYSTEM'),
    
    -- Analytics and Reporting
    ('ANALYTICS_VIEW', 'View analytics dashboard', 'ANALYTICS'),
    ('REPORTS_GENERATE', 'Generate reports', 'ANALYTICS'),
    ('REPORTS_EXPORT', 'Export reports', 'ANALYTICS'),
    
    -- Notification Management
    ('NOTIFICATION_SEND', 'Send notifications', 'NOTIFICATION'),
    ('NOTIFICATION_READ', 'View notifications', 'NOTIFICATION'),
    ('NOTIFICATION_TEMPLATE_MANAGE', 'Manage notification templates', 'NOTIFICATION')
ON CONFLICT (name) DO NOTHING;

-- Create modules table for dynamic module management
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default modules
INSERT INTO modules (name, description) VALUES
    ('USER', 'User management and authentication'),
    ('PRODUCT', 'Product catalog and inventory management'),
    ('ORDER', 'Order processing and management'),
    ('PAYMENT', 'Payment processing and transactions'),
    ('CART', 'Shopping cart functionality'),
    ('SYSTEM', 'System administration and configuration'),
    ('ANALYTICS', 'Analytics and reporting'),
    ('NOTIFICATION', 'Notification and messaging system')
ON CONFLICT (name) DO NOTHING;

-- Get role IDs for permission assignment
DO $$
DECLARE
    superadmin_id UUID;
    admin_id UUID;
    seller_id UUID;
    customer_id UUID;
BEGIN
    -- Get role IDs
    SELECT id INTO superadmin_id FROM roles WHERE name = 'SUPERADMIN';
    SELECT id INTO admin_id FROM roles WHERE name = 'ADMIN';
    SELECT id INTO seller_id FROM roles WHERE name = 'SELLER';
    SELECT id INTO customer_id FROM roles WHERE name = 'CUSTOMER';
    
    -- SUPERADMIN gets ALL permissions (dynamic)
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT superadmin_id, id FROM permissions
    ON CONFLICT DO NOTHING;
    
    -- By default, only SUPERADMIN has permissions
    -- Other roles will be assigned permissions dynamically by SUPERADMIN
    
END $$;

-- Create audit logs table for tracking permission changes
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);
CREATE INDEX IF NOT EXISTS idx_permissions_module ON permissions(module);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Create users table for the initial superadmin
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_roles table for role assignment
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- Insert default superadmin user
-- Password: 'SuperAdmin123!' (hashed with bcrypt)
-- You should change this after first login
INSERT INTO users (email, password_hash, first_name, last_name, is_active, is_verified) VALUES
    ('superadmin@ecommerce.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeTI/LwCEaP3mJ1L6', 'Super', 'Admin', TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;

-- Assign superadmin role to the default user
DO $$
DECLARE
    superadmin_user_id UUID;
    superadmin_role_id UUID;
BEGIN
    SELECT id INTO superadmin_user_id FROM users WHERE email = 'superadmin@ecommerce.com';
    SELECT id INTO superadmin_role_id FROM roles WHERE name = 'SUPERADMIN';
    
    INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES
        (superadmin_user_id, superadmin_role_id, superadmin_user_id)
    ON CONFLICT DO NOTHING;
END $$;
