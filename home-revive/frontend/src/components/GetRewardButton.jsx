import React from 'react'
import GiftReward from '../assets/gift_reward.png'
export const GetRewardButton = () => {
  return (
    <button className="flex items-center justify-center bg-[#5D35EE]/75 w-[171px] h-[56px] text-white px-4 py-2 rounded-[20px] hover:bg-[#4e27a3] animate-pulse">
        <img className="w-[24px] h-[24px] mx-2"
        src={GiftReward} 
        alt="Get Reward" />
        <span className="text-[16px] font-semibold">Redeem</span>
    </button>
  )
}
