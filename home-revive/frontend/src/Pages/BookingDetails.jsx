import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavigationBar } from '../components/NavigationBar'


export const BookingDetails = () => {
  const location = useLocation();
  const sub = location.state?.sub;
  const category = location.state?.category;
  if (!sub) {
    return (
      <>
        <NavigationBar />
        <div className="flex flex-col items-center mt-20">
          <p className="text-xl text-red-500">⚠️ Service details not found.</p>
          <Link 
            to="/services" 
            state={{ category }}
            className="mt-4 text-blue-600 underline"
          >
            ← Go Back
          </Link>
        </div>
      </>
    );
  }


  return (
    <>
    <div><NavigationBar /></div>
    <div className="flex justify-start ml-[65px] mt-[30px]">
      <Link className="hover:underline text-[24px] [font-family:'Inter']" 
        to="/services"
         state={{ category: location.state?.category }}>
        ← Go Back</Link>
    </div>
    <div className="flex justify-center mt-[50px]">
    <div className="flex flex-col justify-center mt-0">
      {/* image */}
      <div
        style={{ border: "#D5C8C8 2px solid" ,boxShadow: "0px 3px 4px rgba(0,0,0,0.2)" }}
          className="w-[991px] h-[231px] rounded-[75px] overflow-hidden "
        >
          <img
            src={sub.booking_image}
            alt={sub.name}
            className="w-full h-full object-cover transform scale-102"
          />
        </div>
      {/* booking details */}
      <div 
       style={{ border: "#D5C8C8 2px solid" ,boxShadow: "0px 3px 4px rgba(0,0,0,0.2)" }}
      className="flex flex-col justify-start mt-[30px] w-[1008px] h-auto rounded-[50px]">
        {/* title */}
        <p className="text-[32px] [font-family:'Inter','Regular'] ml-[40px] mt-[10px]">{sub.name}</p>
        {/* rating and availability */}
        <div className="flex justify-start gap-12 mt-[8px] ml-[40px]">
          {/* rating */}
          <div className="flex justify-center items-center w-[67px] h-[27px] bg-[#7CD49D]/20">
            <span className="text-[14px] [font-family:'Inter'] text-[#7CD49D]">⭐ {sub.rating}</span>
          </div>
          {/* availability */}
          <div className="flex justify-center items-center w-[120px] h-[16px] bg-[#D9D9D9] rounded-[10px] mt-[5px]">
            <span className="text-[14px] [font-family:'Inter'] text-[#4F4F4F]">Available today</span>
          </div>
        </div>
        {/* description */}
        <p className="text-[20px] text-[#747373] [font-family:'Inter'] ml-[40px] mt-[10px]">{sub.booking_desc}</p>
        {/* subtitle & benefits*/}
        <div className="flex-col justify-start ml-[40px] mt-[10px] ">
          {/* subtitle */}
          <p className="mb-[15px] [font-family:'Inter'] text-[20px] font-bold">Why choose this service?</p>
          {/* benefits */}
          <div className="flex justify-start grid grid-cols-2 gap-x-20 ">
            {/*column 1 */}
            <div className="flex flex-col justify-start gap-[10px]">
                {sub.benefits.slice(0, 3).map((benefit, index) => (
                <p key={index}>✅ {benefit}</p>
              ))}
            </div>
            {/*column 2 */}
            <div className="flex flex-col justify-start gap-[10px]">
                {sub.benefits.slice(3, 7).map((benefit, index) => (
                <p key={index}>✅ {benefit}</p>
              ))}
            </div>
          </div>
        </div>
        {/*subtitle & included*/}
        <div className="flex-col justify-start ml-[40px] mt-[10px] mb-[20px]">
          {/* subtitle */}
          <p className="mb-[15px] [font-family:'Inter'] text-[20px] font-bold">What's included</p>
          {/* included */}
          <div className="flex justify-start grid grid-cols-2 gap-x-20">
            {/*column 1 */}
            <div className="flex flex-col justify-start gap-[10px]">
                {sub.included.slice(0, 3).map((include, index) => (
                <p key={index}>• {include}</p>
              ))}
            </div>
            {/*column 2 */}
            <div className="flex flex-col justify-start gap-[10px]">
                {sub.included.slice(3, 7).map((include, index) => (
                <p key={index}>•  {include}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* price , book now button and book now details */}
      <div className="flex flex-col mt-[20px] w-[1008px] h-auto mb-[50px]">
        {/*price and book now button */}
        <div className="flex flex-col justify-center items-center w-full h-auto leading-tight">
              <span className="text-[36px] [font-family: 'Inter'] ">{sub.starting_price}</span>
              <span className="text-[20px] [font-family: 'Inter'] text-[#B3AAAA] ">Starting price</span>
              <Link  state={{ sub, category: location.state?.category }} to={`/services/${sub.name}/book/${sub.name}/slot`} className="bg-[#5D35EE] hover:bg-[#4e27a3] text-white w-full h-[44px] font-bold text-[20px] [font-family:'Inter'] rounded-[10px] mt-[20px] flex justify-center items-center">
                Book A Slot
              </Link>
        </div>
        {/* book now details */}
        <div className="flex flex-col justify-start w-full h-auto gap-[10px] mt-[10px]">
              {sub.bookNowPoints.map((point,index)=>(
                <p key={index} className="text-[16px] [font-family:'Inter'] ">
                  {point}</p>
              ))}
        </div>
              
      </div>
    </div>
    </div>
    </>
  );
};
