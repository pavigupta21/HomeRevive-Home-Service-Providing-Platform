import React from 'react'
import SadReward from '../assets/sad_reward.png'
export const NoRewardButton = () => {
  return (
    <button className="flex items-center bg-[#5D35EE]/40 text-white  justify-center w-[187px] h-[56px] rounded-[20px] ">
        <img className="w-[24px] h-[24px] mr-2"
        src={SadReward} 
        alt="No Reward" />
        <span className="text-[16px] font-semibold">Need more points</span>
    </button>
  )
}
