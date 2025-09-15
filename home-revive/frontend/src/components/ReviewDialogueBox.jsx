import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { reviewsAPI, authUtils } from '../utils/api';

const services = [
  "AC Repair",
  "Refrigerator Repair",
  "Oven Repair",
  "Washing Machine Repair",
  "Tube Light and Bulb Repair",
  "Electric Geyser Repair",
  "Fan Repair",
  "TV Repair",
  "Cooler Repair",
  "Exhaust Fan Repair",
  "Kitchen Chimney Repair",
  "Leak Repair",
  "Pipe Installation",
  "Drainage Repair",
  "Flush Repair",
  "Water Purifier Repair",
  "Cupboard and Cabinet Repair",
  "Sofa and Couch Repair",
  "Chair Repair",
  "Table and Stool Repair",
  "Furniture Polishing and Refinishing",
  "Deep Cleaning of Entire House",
  "Floor and Surface Cleaning",
  "Furniture and Upholstery Cleaning",
  "Sanitization and Disinfection",
  "Room Cleaning and Makeover",
  "Deep Cleaning of Entire Kitchen",
  "Kitchen Appliance Cleaning",
  "Kitchen Cabinet and Storage Cleaning",
  "Deep Cleaning of Entire Bathroom",
  "Toilet and Sanitary Cleaning",
  "Deep Cleaning of Floors and Walls",
  "Fittings and Fixtures Cleaning",
  "Full Room Painting",
  "Ceiling Painting",
  "Wall Painting",
  "Touch-Up or Repainting",
  "Full Interior House Painting",
  "Doors, Windows, and Grills Painting",
  "Waterproofing and Primer Work",
  "Exterior Wall Painting",
  "Exterior Doors and Windows Painting",
  "Waterproof and Weatherproof Coating",
];

const ReviewDialogueBox = ({ isOpen, onClose, onReviewAdded }) => {
  const [selectedService, setSelectedService] = useState("");
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const filteredServices =
    query === ""
      ? services
      : services.filter((service) =>
          service.toLowerCase().includes(query.toLowerCase())
        );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedService || !rating || !comment.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!authUtils.isAuthenticated()) {
      setError("Please login to write a review");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const reviewData = {
        serviceId: selectedService.toLowerCase().replace(/\s+/g, '-'),
        serviceName: selectedService,
        rating: parseInt(rating),
        comment: comment.trim()
      };

      await reviewsAPI.createReview(reviewData);
      
      // Reset form
      setSelectedService("");
      setQuery("");
      setRating("");
      setComment("");
      
      // Close modal and refresh reviews
      onClose();
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[705px] h-[500px] p-6 overflow-y-auto">
        <h2 className="text-xl [font-family:'Istok-Web','Helvetica'] mb-4 text-[24px]">
          Write your Review
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Service Dropdown (Searchable) */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Service</label>
            <Combobox value={selectedService} onChange={setSelectedService}>
              <Combobox.Input
                className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Select or type your service"
                displayValue={(service) => service}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <Combobox.Options className="mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto">
                {filteredServices.map((service) => (
                  <Combobox.Option
                    key={service}
                    value={service}
                    className={({ active }) =>
                      `cursor-pointer px-3 py-2 ${
                        active ? "bg-purple-100" : ""
                      }`
                    }
                  >
                    {service}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>

          {/* Rating Dropdown */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Rating</label>
            <select 
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select stars</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>

          {/* Review Input */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Review</label>
            <textarea
              placeholder="Tell us about your experience..."
              className="w-full mt-1 border border-gray-300 rounded-md p-2 h-20 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center items-center bg-[#EADDFF] min-w-[125px] px-4 h-[40px] rounded-[100px] hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              <span className="text-[#4F378A] text-[14px] font-semibold leading-none">
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#514E52]/15 text-[#4F378A] min-w-[125px] h-[40px] font-semibold rounded-[100px] hover:bg-gray-300 transition-colors"
            >
              <span className="text-[#4F378A] font-semibold text-[14px]">
                Cancel
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewDialogueBox;