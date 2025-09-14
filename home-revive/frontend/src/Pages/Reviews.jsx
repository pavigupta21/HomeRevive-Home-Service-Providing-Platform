import { NavigationBar } from '../components/NavigationBar'
import { useState, useEffect } from "react";
import ReviewDialogueBox from "../components/ReviewDialogueBox";
import { reviewsAPI, authUtils } from '../utils/api';

export const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getAllReviews();
      setReviews(response.data.reviews);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = () => {
    // Refresh reviews after a new one is added
    fetchAllReviews();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div><NavigationBar /></div>
      <div className="w-full flex flex-col items-center justify-center mt-[20px]">
        <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[64px] font-bold text-shadow">Customer Reviews</p>
        <p className="[font-family:'Istok_Web-Bold',Helvetica] text-center flex-wrap text-[32px] text-[#62606b] mt-[10px]">See what our customers are saying about our services</p>
      </div>
      
      <div className="flex w-full items-center justify-center mt-[30px]">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center bg-[#5D35EE] text-white justify-center w-[286px] h-[75px] rounded-[20px] hover:bg-[#4e27a3] transition-colors"
        >
          <span className="text-[32px]">Write a Review</span>
        </button>
      </div>

      <div className="w-full px-6 py-8">
        <div className="w-full flex-col ml-[200px] mt-[70px] [font-family:'Istok_Web-Bold',Helvetica] text-[32px]">
          <p>All Reviews</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 mx-auto max-w-4xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-xl">Loading reviews...</div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl text-gray-600 mb-2">No reviews yet</h3>
            <p className="text-gray-500">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="max-w-4xl ml-[200px] space-y-6 mt-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#704bb4]/12 rounded-lg  border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#c1b2e8] rounded-full flex items-center justify-center">
                      <span className="text-[#4f378a] font-semibold text-lg">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <p className="text-sm text-gray-600">{review.serviceName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-[#000000]/58 [font-family:'Istok Web']">{formatDate(review.createdAt)}</span>
                  </div>
                </div>
                
                <p className="text-black mb-4 leading-relaxed">
                  {review.comment}
                </p>
                
                
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewDialogueBox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </>
  );
};