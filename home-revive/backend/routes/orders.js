const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new service booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { serviceName, bookingDate, price, location, serviceType } = req.body;

    const order = new Order({
      userId: req.user._id,
      serviceName,
      bookingDate: new Date(bookingDate),
      price,
      location,
      serviceType,
      status: 'scheduled'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Service booking created successfully',
      data: {
        order: {
          id: order._id,
          serviceName: order.serviceName,
          bookingDate: order.bookingDate,
          price: order.price,
          location: order.location,
          serviceType: order.serviceType,
          status: order.status,
          createdAt: order.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
});

// @route   GET /api/orders/:userId
// @desc    Get all bookings for a user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user is accessing their own orders
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: orders.length,
      data: {
        orders: orders.map(order => ({
          id: order._id,
          serviceName: order.serviceName,
          bookingDate: order.bookingDate,
          price: order.price,
          location: order.location,
          serviceType: order.serviceType,
          status: order.status,
          createdAt: order.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
});

// @route   PUT /api/orders/:orderId
// @desc    Update order status
// @access  Private
router.put('/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ 
      _id: orderId, 
      userId: req.user._id 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        order: {
          id: order._id,
          serviceName: order.serviceName,
          bookingDate: order.bookingDate,
          price: order.price,
          location: order.location,
          serviceType: order.serviceType,
          status: order.status,
          createdAt: order.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order'
    });
  }
});

module.exports = router;
