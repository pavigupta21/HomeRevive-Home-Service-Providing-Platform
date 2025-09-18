const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/reviews
// @desc    Add a review for a service
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { serviceId, serviceName, rating, comment } = req.body;

    // Check if user has already reviewed this service
    const existingReview = await Review.findOne({ 
      userId: req.user._id, 
      serviceId 
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this service'
      });
    }

    const review = new Review({
      userId: req.user._id,
      serviceId,
      serviceName,
      rating,
      comment,
      userName: req.user.name
    });

    await review.save();

    // Award points for creating a review (25 points)
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 25 } });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: {
        review: {
          id: review._id,
          serviceId: review.serviceId,
          serviceName: review.serviceName,
          rating: review.rating,
          comment: review.comment,
          userName: review.userName,
          createdAt: review.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
});

// @route   GET /api/reviews/:serviceId
// @desc    Fetch all reviews for a service
// @access  Public
router.get('/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.find({ serviceId })
      .sort({ createdAt: -1 })
      .select('-__v');

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    res.json({
      success: true,
      count: reviews.length,
      data: {
        serviceId,
        averageRating: parseFloat(averageRating),
        reviews: reviews.map(review => ({
          id: review._id,
          serviceId: review.serviceId,
          serviceName: review.serviceName,
          rating: review.rating,
          comment: review.comment,
          userName: review.userName,
          createdAt: review.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews'
    });
  }
});

// @route   GET /api/reviews
// @desc    Get all reviews (for admin or general listing)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .limit(50); // Limit to recent 50 reviews

    res.json({
      success: true,
      count: reviews.length,
      data: {
        reviews: reviews.map(review => ({
          id: review._id,
          serviceId: review.serviceId,
          serviceName: review.serviceName,
          rating: review.rating,
          comment: review.comment,
          userName: review.userName,
          createdAt: review.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews'
    });
  }
});

// @route   DELETE /api/reviews/:reviewId
// @desc    Delete a review
// @access  Private
router.delete('/:reviewId', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findOne({ 
      _id: reviewId, 
      userId: req.user._id 
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review'
    });
  }
});

module.exports = router;
