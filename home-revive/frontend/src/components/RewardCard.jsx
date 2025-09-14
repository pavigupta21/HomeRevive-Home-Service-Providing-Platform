
import React from 'react'
import { NoRewardButton } from './NoRewardButton'
import { GetRewardButton } from './GetRewardButton'
import { curr_points } from '../constants_and_dataset/points'

export const Reward_card = (props) => {
  return (
    <div className="reward_card bg-[#704bb4]/14 mx-auto mt-[25px] max-w-[289px] rounded-[15px] flex flex-col items-center justify-center p-4 py-[35px]">
        <p className="[font-family:'Istok_Web-Bold',Helvetica] font-bold text-black text-[20px]">{props.title}</p>
        <p className="[font-family:'Istok_Web-Bold',Helvetica], text-[20px] text-[#62606B] text-center mt-[20px]">{props.desc}</p>
        <p className="[font-family:'Istok_Web-Bold',Helvetica], text-[24px] text-[#5C32AF] mt-[12px] mb-[10px]">{props.points_req} points</p>
         {/* Conditional button */}
        {curr_points >= props.points_req ? (
          <GetRewardButton />
        ) : (
          <NoRewardButton />
        )}
    </div>
  )
}
