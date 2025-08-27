import { NavigationBar } from "../components/NavigationBar";
import React from 'react'
import trophyRewards from "../assets/trophy_rewards.png";

export const Rewards = () => {
  return (
    <>
        <div><NavigationBar /></div>
        <div className="w-full flex flex-col items-center justify-center mt-[20px]">
            <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[48px] font-bold text-shadow">Rewards</p>
            <p className="[font-family:'Istok_Web-Bold',Helvetica] text-center flex-wrap text-[32px] text-[#62606b]">Earn points and redeem amazing rewards</p>
        </div>
        <div className="w-[611px] h-[272px] bg-[#704bb4]/14 mx-auto mt-[25px] rounded-[15px] flex flex-col items-center justify-center">
            <img
                className="w-[100px] h-[100px]"
                src={trophyRewards}
                alt="Trophy Rewards"
            />
            <div className="flex flex-col items-center mt-[5px]">
                    <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[48px] text-[#5C32AF] leading-[68px]">
                        850
                    </p>
                    <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[20px] text-[#62606b] leading-none">
                        your points
                    </p>
            </div>
        </div>

    </>
  )
}
