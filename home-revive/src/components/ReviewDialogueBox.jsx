import React from "react";


const ReviewDialogueBox = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 ">
      <div className="bg-white rounded-2xl shadow-lg w-[705px] h-[429px] p-6">
        <h2 className="text-xl [font-family:'Istok-Web','Helvetica'] mb-4 text-[24px]">Write your Review</h2>

        {/* Service Dropdown */}
        <div className="mb-4">
          <label className="block  ">Service</label>
          <select className="w-full mt-1 border rounded-md p-2">
            <option>Select your service</option>
            <option>AC Repair & Service</option>
            <option>Plumbing</option>
            <option>Cleaning</option>
          </select>
        </div>

        {/* Rating Dropdown */}
        <div className="mb-4">
          <label className="block ">Rating</label>
          <select className="w-full mt-1 border rounded-md p-2">
            <option>Select stars</option>
            <option>1 star</option>
            <option>2 stars</option>
            <option>3 stars</option>
            <option>4 stars</option>
            <option>5 stars</option>
          </select>
        </div>

        {/* Review Input */}
        <div className="mb-3">
          <label className="block">Review</label>
          <input
            type="text"
            placeholder="Tell us about your experience..."
            className="w-full mt-1 border rounded-md p-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex  space-x-3 mt-8">
          <button className="px-4 py-2 bg-[#EADDFF]  w-[125px] h-[40px] rounded-[100px] hover:bg-purple-300">
            <span className="text-[#4F378A] text-[14px] font-semibold">submit review</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#514E52]/15 text-[#4F378A] w-[125px] h-[40px] font-sembold rounded-[100px] hover:bg-gray-300"
          >
            <span className="text-[#4F378A] font-semibold text-[14px]">cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDialogueBox;
