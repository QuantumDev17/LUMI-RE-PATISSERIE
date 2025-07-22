import Order from '../models/Order.js';

export async function createOrder(req, res) {
  try {
    const { products, totalAmount } = req.body;
    const userId = req.user.id;

    const order = new Order({ userId, products, totalAmount });
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getUserOrders(req, res) {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
