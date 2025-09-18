import { NavigationBar } from "../components/NavigationBar";
import trophyRewards from "../assets/trophy-star.png";
import { authUtils } from "../utils/api";
import { RewardsData } from "../constants_and_dataset/rewards_data"
import { Reward_card } from "../components/RewardCard";
import ToolReward from "../assets/tool_reward.png";
import StarReward from "../assets/star_reward.png";

export const Rewards = () => {
  const user = authUtils.getCurrentUser();
  const points = user?.points || 0;
  return (
    <>
        <div><NavigationBar /></div>
        <div className="w-full flex flex-col items-center justify-center mt-[20px]">
            <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[48px] font-bold text-shadow">Rewards</p>
            <p className="[font-family:'Istok_Web-Bold',Helvetica] text-center flex-wrap text-[32px] text-[#62606b]">Earn points and redeem amazing rewards</p>
        </div>
        <div className="w-[611px] h-[272px] bg-[#704bb4]/14 mx-auto mt-[25px] rounded-[15px] flex flex-col items-center justify-center">
            <img
                className="w-[100px] h-[100px] animate-bounce"
                src={trophyRewards}
                alt="Trophy Rewards"
            />
            <div className="flex flex-col items-center mt-[5px]">
                    <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[48px] text-[#5C32AF] leading-[68px]">
                        {points}
                    </p>
                    <p className="[font-family:'Istok_Web-Bold',Helvetica] text-[20px] text-[#62606b] leading-none">
                        your points
                    </p>
            </div>
        </div>
        <div className="flex mx-[17px] mt-[45px] flex-wrap "> 
            {RewardsData.map((reward) => (
                <Reward_card 
                    key={reward.id}
                    title={reward.title}
                    desc={reward.desc}
                    points_req={reward.points_req}
                />
            ))} 
        </div>
        <div className="flex flex-col items-center justify-center my-[60px] [font-family:'Istok_Web-Bold',Helvetica] text-back">
            <p className="text-[32px] font-semibold mb-[45px]">How to earn points</p>
            <div className="flex items-center justify-center gap-[100px]">
                <div className="flex flex-col items-center justify-center">
                    <img className="mb-[15px]"
                    src={ToolReward}
                    alt="rewards for service bookings"/>
                    <p className="text-[20px] font-semibold mb-[7px]">Complete services</p>
                    <p className="text-[#62606B] text-[20px]">Earn 50 points per service</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img className="mb-[15px]"
                    src={StarReward}
                    alt="rewards for writing reviews"/>
                    <p className="text-[20px] font-semibold mb-[7px]">Write reviews</p>
                    <p className="text-[#62606B] text-[20px]">Earn 25 points per review</p>
                </div>

            </div>

        </div>

    </>
  )
}
