
import React, { useState } from 'react';
import { NavigationBar } from "../components/NavigationBar";
import {useParams, Link, useLocation} from 'react-router-dom';



export const BookSlot=()=>{
  const { subName } = useParams();
   const location = useLocation();
    const sub = location.state?.sub;
  const category = location.state?.category;
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

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
                <div className="flex flex-col justify-start bg-white h-auto py-1 rounded-[20px] border border-[#D5D5D5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] mt-[5px]">
                  <span className="text-black text-[22px] [font-family:'Inter'] font-semibold ml-[20px] mt-[3px] mb-[10px]">Customer Details</span>
                  <div className="grid grid-cols-2 gap-[15px] ml-[20px] mb-[40px]">
                        <div className="flex flex-col">
                          <label className="mb-[3px]">Full Name</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            className=" border border-[#808080] rounded-[10px] p-2 w-[285px]"
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-[3px]">Phone Number</label>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            className=" border border-[#808080] rounded-[10px] p-2 w-[285px]"
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-[3px]">Email Id</label>
                          <input
                            type="text"
                            placeholder="Enter your email id"
                            className=" border border-[#808080] rounded-[10px] p-2 w-[285px]"
                          />
                      </div>
                      <div className="flex flex-col">
                          <label className="mb-[3px]">Address</label>
                          <input
                            type="text"
                            placeholder="Enter your service address"
                            className=" border border-[#808080] rounded-[10px] p-2 w-[360px]"
                          />
                      </div>
                  </div>
                  <div className="ml-[20px] mb-[20px]">
                    <button className="flex justify-center rounded-[8px] bg-[#5D35EE] px-10 py-3.5 hover:bg-[#4e27a3]">
                        <span className="text-white text-[14px] font-semibold [font-family:'Inter'] ">Book Service</span>
                  </button>
                  </div>
                  
                </div>
          </div>
      </div>
  </div>
    </>
  )
}