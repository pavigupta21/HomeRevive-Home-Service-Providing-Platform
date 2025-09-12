
import { NavigationBar } from '../components/NavigationBar'
import  { useState } from "react";
import ReviewDialogueBox from "../components/ReviewDialogueBox";
export const Reviews = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
        <div><NavigationBar /></div>
        <div className="w-full flex flex-col items-center justify-center mt-[20px]">
            <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[64px] font-bold text-shadow">Customer Reviews</p>
            <p className="[font-family:'Istok_Web-Bold',Helvetica] text-center flex-wrap text-[32px] text-[#62606b] mt-[10px]">See what our customers are saying about our services</p>
        </div>
        <div className="flex w-full items-center justify-center mt-[30px]">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-[#5D35EE] text-white  justify-center w-[286px] h-[75px] rounded-[20px] hover:bg-[#4e27a3]">
                <span className="text-[32px] ">Write a Review</span>
            </button>
        </div>
        <div className="w-full flex-col ml-[200px] mt-[70px] [font-family:'Istok_Web-Bold',Helvetica] text-[32px]">
          <p>All Reviews</p>
        </div>
        <ReviewDialogueBox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
    
  )
}
