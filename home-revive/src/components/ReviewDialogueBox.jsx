import React, { useState } from "react";
import { Combobox } from "@headlessui/react";

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

const ReviewDialogueBox = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState("");
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredServices =
    query === ""
      ? services
      : services.filter((service) =>
          service.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 ">
      <div className="bg-white rounded-2xl shadow-lg w-[705px] h-[429px] p-6">
        <h2 className="text-xl [font-family:'Istok-Web','Helvetica'] mb-4 text-[24px]">
          Write your Review
        </h2>

        {/* Service Dropdown (Searchable) */}
        <div className="mb-4">
          <label className="block">Service</label>
          <Combobox value={selectedService} onChange={setSelectedService}>
            <Combobox.Input
              className="w-full mt-1 border rounded-md p-2"
              placeholder="Select or type your service"
              displayValue={(service) => service}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Options className="mt-1 border rounded-md bg-white shadow-lg max-h-40 overflow-y-auto">
              {filteredServices.map((service) => (
                <Combobox.Option
                  key={service}
                  value={service}
                  className={({ active }) =>
                    `cursor-pointer px-2 py-1 ${
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

        {/* Rating Dropdown (unchanged) */}
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
            <span className="text-[#4F378A] text-[14px] font-semibold">
              submit review
            </span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#514E52]/15 text-[#4F378A] w-[125px] h-[40px] font-sembold rounded-[100px] hover:bg-gray-300"
          >
            <span className="text-[#4F378A] font-semibold text-[14px]">
              cancel
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDialogueBox;
