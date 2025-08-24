const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3002;
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// In-memory database for development
const users = [
  {
    id: '1',
    email: 'superadmin@demo.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPERADMIN',
    permissions: ['*'],
    isActive: true,
    avatar: null
  },
  {
    id: '2',
    email: 'admin@demo.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    permissions: ['users.read', 'users.write', 'products.read', 'products.write', 'orders.read'],
    isActive: true,
    avatar: null
  },
  {
    id: '3',
    email: 'seller@demo.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    firstName: 'Seller',
    lastName: 'User',
    role: 'SELLER',
    permissions: ['products.read', 'products.write', 'orders.read'],
    isActive: true,
    businessName: 'Demo Store'
  },
  {
    id: '4',
    email: 'customer@demo.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    firstName: 'Customer',
    lastName: 'User',
    role: 'CUSTOMER',
    permissions: ['cart.read', 'cart.write', 'orders.read'],
    isActive: true,
    avatar: null
  }
];

// Mock products data
const products = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    category: 'Electronics',
    stock: 50,
    images: ['/api/placeholder/300/300'],
    sellerId: '3',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RTX graphics',
    price: 1299.99,
    category: 'Electronics',
    stock: 15,
    images: ['/api/placeholder/300/300'],
    sellerId: '3',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 199.99,
    category: 'Electronics',
    stock: 100,
    images: ['/api/placeholder/300/300'],
    sellerId: '3',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Wireless Speaker',
    description: 'Portable Bluetooth speaker with premium sound',
    price: 79.99,
    category: 'Electronics',
    stock: 75,
    images: ['/api/placeholder/300/300'],
    sellerId: '3',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Mock cart data (in-memory)
const carts = {};

// Mock orders data
const orders = [];

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      permissions: user.permissions 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// API Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Auth service is running' });
});

// Authentication endpoints
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const accessToken = generateToken(user);
    const refreshToken = generateToken(user); // In production, use different logic

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 86400 // 24 hours in seconds
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'CUSTOMER', businessName } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: String(users.length + 1),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      permissions: role === 'SELLER' ? ['products.read', 'products.write', 'orders.read'] : ['cart.read', 'cart.write', 'orders.read'],
      isActive: true,
      businessName: role === 'SELLER' ? businessName : undefined
    };

    users.push(newUser);

    res.json({
      success: true,
      message: 'Registration successful',
      data: { userId: newUser.id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// User management endpoints
app.get('/users', verifyToken, (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({
    success: true,
    data: usersWithoutPasswords
  });
});

app.get('/users/me', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.sub);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json({
    success: true,
    data: userWithoutPassword
  });
});

// Product management endpoints
app.get('/products', (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query;
  let filteredProducts = products.filter(p => p.isActive);

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: {
      products: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(filteredProducts.length / limit)
      }
    }
  });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id && p.isActive);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({
    success: true,
    data: product
  });
});

app.post('/products', verifyToken, (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  const newProduct = {
    id: String(products.length + 1),
    name,
    description,
    price: parseFloat(price),
    category,
    stock: parseInt(stock),
    images: images || ['/api/placeholder/300/300'],
    sellerId: req.user.sub,
    isActive: true,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);

  res.json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});

app.put('/products/:id', verifyToken, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const product = products[productIndex];
  if (product.sellerId !== req.user.sub && req.user.role !== 'ADMIN' && req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  const updatedProduct = { ...product, ...req.body, id: product.id, sellerId: product.sellerId };
  products[productIndex] = updatedProduct;

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct
  });
});

// Cart management endpoints
app.get('/cart', verifyToken, (req, res) => {
  const userCart = carts[req.user.sub] || { items: [], total: 0 };
  
  // Calculate total and add product details
  const cartWithDetails = {
    ...userCart,
    items: userCart.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product: product ? {
          name: product.name,
          price: product.price,
          images: product.images,
          stock: product.stock
        } : null
      };
    }),
    total: userCart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0)
  };

  res.json({
    success: true,
    data: cartWithDetails
  });
});

app.post('/cart/add', verifyToken, (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = products.find(p => p.id === productId && p.isActive);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  if (quantity > product.stock) {
    return res.status(400).json({ success: false, message: 'Insufficient stock' });
  }

  if (!carts[req.user.sub]) {
    carts[req.user.sub] = { items: [], total: 0 };
  }

  const cart = carts[req.user.sub];
  const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

  if (existingItemIndex >= 0) {
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;
    if (newQuantity > product.stock) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }
    cart.items[existingItemIndex].quantity = newQuantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      addedAt: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    message: 'Product added to cart',
    data: cart
  });
});

app.put('/cart/update/:productId', verifyToken, (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!carts[req.user.sub]) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  const cart = carts[req.user.sub];
  const itemIndex = cart.items.findIndex(item => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not found in cart' });
  }

  const product = products.find(p => p.id === productId);
  if (quantity > product.stock) {
    return res.status(400).json({ success: false, message: 'Insufficient stock' });
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  res.json({
    success: true,
    message: 'Cart updated successfully',
    data: cart
  });
});

app.delete('/cart/remove/:productId', verifyToken, (req, res) => {
  const { productId } = req.params;

  if (!carts[req.user.sub]) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  const cart = carts[req.user.sub];
  const itemIndex = cart.items.findIndex(item => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not found in cart' });
  }

  cart.items.splice(itemIndex, 1);

  res.json({
    success: true,
    message: 'Item removed from cart'
  });
});

// Order management endpoints
app.post('/orders', verifyToken, (req, res) => {
  const userCart = carts[req.user.sub];
  if (!userCart || userCart.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  // Check stock and calculate total
  let total = 0;
  const orderItems = [];

  for (const item of userCart.items) {
    const product = products.find(p => p.id === item.productId);
    if (!product || item.quantity > product.stock) {
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient stock for ${product?.name || 'product'}` 
      });
    }
    
    // Update product stock
    product.stock -= item.quantity;
    
    orderItems.push({
      productId: item.productId,
      productName: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: product.price * item.quantity
    });
    
    total += product.price * item.quantity;
  }

  const newOrder = {
    id: String(orders.length + 1),
    userId: req.user.sub,
    items: orderItems,
    total,
    status: 'PENDING',
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod || 'COD',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);

  // Clear cart
  carts[req.user.sub] = { items: [], total: 0 };

  res.json({
    success: true,
    message: 'Order placed successfully',
    data: newOrder
  });
});

app.get('/orders', verifyToken, (req, res) => {
  let userOrders = orders.filter(order => order.userId === req.user.sub);
  
  // If admin or superadmin, show all orders
  if (req.user.role === 'ADMIN' || req.user.role === 'SUPERADMIN') {
    userOrders = orders;
  }

  res.json({
    success: true,
    data: userOrders
  });
});

app.get('/orders/:id', verifyToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Check if user owns the order or is admin/superadmin
  if (order.userId !== req.user.sub && req.user.role !== 'ADMIN' && req.user.role !== 'SUPERADMIN') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  res.json({
    success: true,
    data: order
  });
});

// Categories endpoint
app.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json({
    success: true,
    data: categories
  });
});

// Dashboard stats endpoints
app.get('/dashboard/stats', verifyToken, (req, res) => {
  const userRole = req.user.role;
  let stats = {};

  if (userRole === 'SUPERADMIN' || userRole === 'ADMIN') {
    stats = {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      activeUsers: users.filter(u => u.isActive).length,
      pendingOrders: orders.filter(o => o.status === 'PENDING').length
    };
  } else if (userRole === 'SELLER') {
    const sellerProducts = products.filter(p => p.sellerId === req.user.sub);
    const sellerOrders = orders.filter(o => 
      o.items.some(item => 
        sellerProducts.some(sp => sp.id === item.productId)
      )
    );
    
    stats = {
      totalProducts: sellerProducts.length,
      totalOrders: sellerOrders.length,
      totalRevenue: sellerOrders.reduce((sum, order) => sum + order.total, 0),
      lowStockProducts: sellerProducts.filter(p => p.stock < 10).length
    };
  } else {
    const userOrders = orders.filter(o => o.userId === req.user.sub);
    stats = {
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce((sum, order) => sum + order.total, 0),
      cartItems: carts[req.user.sub]?.items.length || 0
    };
  }

  res.json({
    success: true,
    data: stats
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- POST /auth/login');
  console.log('- POST /auth/register');
  console.log('- GET /products');
  console.log('- GET /cart');
  console.log('- POST /cart/add');
  console.log('- POST /orders');
  console.log('- GET /dashboard/stats');
});
