
import React, { useState } from 'react';
import { NavigationBar } from "../components/NavigationBar";
import {useParams, Link, useLocation, useNavigate} from 'react-router-dom';
import { ordersAPI, authUtils } from '../utils/api';



export const BookSlot=()=>{
  const { subName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const sub = location.state?.sub;
  const category = location.state?.category;
  
  // Form state
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [issue, setIssue] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: ''
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    '9:00 AM',
    '11:00 AM', 
    '3:00 PM',
    '5:00 PM'
  ];

   const generateDates = () => {
    const today = new Date();
    const dates = [];
    const intervals = [0, 1, 3, 5]; // today, +1 day, +3 days, +5 days

    intervals.forEach((gap) => {
      const d = new Date(today);
      d.setDate(today.getDate() + gap);
      dates.push(d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }));
    });

    return dates;
  };

  const availableDates = generateDates();

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedTime || !selectedDate) {
      setError('Please select both date and time');
      return;
    }
    
    if (!issue.trim()) {
      setError('Please describe your issue');
      return;
    }
    
    if (!customerDetails.fullName || !customerDetails.phoneNumber || !customerDetails.email || !customerDetails.address) {
      setError('Please fill in all customer details');
      return;
    }

    // Check if user is authenticated
    if (!authUtils.isAuthenticated()) {
      setError('Please login to book a service');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      // Convert date to proper format
      const today = new Date();
      const intervals = [0, 1, 3, 5];
      const selectedDateIndex = availableDates.indexOf(selectedDate);
      const bookingDate = new Date(today);
      bookingDate.setDate(today.getDate() + intervals[selectedDateIndex]);
      
      // Combine date and time
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':');
      let hour24 = parseInt(hours);
      if (period === 'PM' && hour24 !== 12) hour24 += 12;
      if (period === 'AM' && hour24 === 12) hour24 = 0;
      
      bookingDate.setHours(hour24, parseInt(minutes), 0, 0);

      // Prepare order data
      const orderData = {
        serviceName: sub.name,
        bookingDate: bookingDate.toISOString(),
        price: parseInt(sub.starting_price.replace('₹', '').replace(',', '')),
        location: customerDetails.address,
        serviceType: category.toLowerCase()
      };

      // Create order
      const response = await ordersAPI.createOrder(orderData);
      
      setSuccess(true);
      
      // Redirect to service history after 2 seconds
      setTimeout(() => {
        navigate('/servicehistory');
      }, 2000);

    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to book service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
    <>
    <div className="bg-[#F8F8F8] w-full min-h-screen">
      <NavigationBar/>
      <div className="flex justify-start ml-[65px] mt-[30px]">
          <Link className="hover:underline text-[24px] [font-family:'Inter']" 
            to={`/services/${subName}`}
            state={{ sub, category }} 
            >
            ← Go Back</Link>
      </div>
      <div className="w-full flex justify-center">
        {/* Book Slot */}
          <div className="w-[792px] h-full flex flex-col justify-start">
                {/* Topic and description */}
                <div className="flex flex-col justify-start">
                  <span className="text-[40px] [font-family:'Inter'] font-bold text-[#300DAD] leading-tight">Book Your Service</span>
                  <span className="text-[22px] [font-family:'Inter'] font-thin text-[#000000]/62 tracking-wide">Choose your preferred date, time and address</span>
                </div>
                {/* Service Details */}
                <div className="flex flex-col justify-start bg-white h-auto py-1 rounded-[20px] border border-[#D5D5D5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] mt-[20px] ">
                  <span className="text-black text-[22px] [font-family:'Inter'] font-semibold ml-[20px] mt-[3px]">Service Details</span>
                    {/* Service Image and Description */}
                    <div className="flex justify-start ml-[20px] mb-[10px]">
                        {/* image */}
                        <div className="flex justify-center bg-[#B3AAAA]/16 w-min-[69px] h-[63px] p-2 rounded-[10px] mt-[5px]">
                            <img 
                            src={sub.image}
                          />
                        </div>
                        {/* name and price*/}
                        <div className="flex flex-col justify-start ml-[20px] mt-[10px]">
                            <span className="text-[16px] font-semibold [font-family:'Inter']">{sub.name}</span>
                            <span className="text-[16px] font-medium [font-family:'Inter'] text-[#808080] leading-tight">Starting from {sub.starting_price}</span>
                        </div>
                    </div>
                </div>
                {/* Specify Issue */}
                <div className="flex flex-col justify-start bg-white h-auto py-1 rounded-[20px] border border-[#D5D5D5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] mt-[5px]">
                    <span className="text-black text-[22px] [font-family:'Inter'] font-semibold ml-[20px] mt-[3px]">Specify Your Issue</span>
                    <input
                      type="text"
                      placeholder="Eg: My AC is not cooling properly."
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="ml-[20px] border border-[#808080] rounded-[10px] p-2 mr-[20px] mt-[5px] mb-[10px]"
                    />
                </div>
                {/*Date and time slots*/}
                <div className="flex justify-center mt-[5px] gap-[3px]">
                    {/* time slot*/}
                    <div className="flex flex-col justify-start bg-white h-auto py-1 rounded-[20px] border border-[#D5D5D5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)]">
                        <span className="text-black text-[22px] [font-family:'Inter'] font-semibold ml-[20px] mt-[3px] mb-[10px]">Select Time</span>
                        <div className="grid grid-cols-2 gap-[5px] px-[20px] mb-[10px]">
                              {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`rounded-lg border-[1px] border-[#808080] whitespace-nowrap h-[32px] flex justify-center px-[70px] py-[5px] font-semibold text-[15px] [font-family:'Inter'] text-[#808080] transition-colors ${
                                  selectedTime === time
                                    ? 'border-[#5d3fee] bg-[#5d3fee] text-[#ffffff]'
                                    : 'border-gray-300 hover:hover:bg-gray-100'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                        </div>
                    </div>
                    {/* date slot*/}
                    <div className="flex flex-col justify-start bg-white h-auto py-1 min-w-[374px] rounded-[20px] border border-[#D5D5D5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)]">
                        <span className="text-black text-[22px] [font-family:'Inter'] font-semibold ml-[20px] mt-[3px] mb-[10px]">Select Date</span>
                        <div className="grid grid-cols-4 gap-[25px] px-[20px] mb-[10px] mt-[10px]">
                          {availableDates.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`rounded-lg border-[1px] flex  justify-center w-[61px]  p-[5px] font-semibold text-[15px] [font-family:'Inter'] transition-colors ${
                              selectedDate === date
                                ? 'border-[#5d3fee] bg-[#5d3fee] text-[#ffffff]'
                                : 'border-[#808080] text-[#808080] hover:bg-gray-100'
                            }`}
                          >
                            {date}
                          </button>
                        ))}
                        </div>
                    </div>
                </div>
                {/* Customer Details */}
                <div className="flex flex-col justify-start bg-white h-auto py-1 rounded-[20px] border border-[#D5D5D5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] mt-[5px] mb-[10px]">
                  <span className="text-black text-[22px] [font-family:'Inter'] font-semibold ml-[20px] mt-[3px] mb-[10px]">Customer Details</span>
                  <div className="grid grid-cols-2 gap-[15px] ml-[20px] mb-[40px]">
                        <div className="flex flex-col">
                          <label className="mb-[3px]">Full Name</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            value={customerDetails.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className=" border border-[#808080] rounded-[10px] p-2 w-[285px]"
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-[3px]">Phone Number</label>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={customerDetails.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className=" border border-[#808080] rounded-[10px] p-2 w-[285px]"
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-[3px]">Email Id</label>
                          <input
                            type="email"
                            placeholder="Enter your email id"
                            value={customerDetails.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className=" border border-[#808080] rounded-[10px] p-2 w-[285px]"
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-[3px]">Address</label>
                          <input
                            type="text"
                            placeholder="Enter your service address"
                            value={customerDetails.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className=" border border-[#808080] rounded-[10px] p-2 w-[360px]"
                          />
                      </div>
                  </div>
                  {/* Error/Success Messages */}
                  {error && (
                    <div className="ml-[20px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className="ml-[20px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      ✅ Service booked successfully! Redirecting to service history...
                    </div>
                  )}

                  <div className="ml-[20px] mb-[20px]">
                    <button 
                      onClick={handleBooking}
                      disabled={isSubmitting}
                      className={`flex justify-center rounded-[8px] px-10 py-3.5 transition-colors ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-[#5D35EE] hover:bg-[#4e27a3]'
                      }`}
                    >
                        <span className="text-white text-[14px] font-semibold [font-family:'Inter']">
                          {isSubmitting ? 'Booking...' : 'Book Service'}
                        </span>
                  </button>
                  </div>
                  
                </div>
          </div>
      </div>
  </div>
    </>
  )
}