import React from "react";
import { NavigationBar } from "../components/NavigationBar";
import servicesImage from "../assets/servicesImage.png";
import repairHome from "../assets/repair_home.png";
import cleaningHome from "../assets/cleaning_home.png";
import paintingHome from "../assets/painting_home.png";
import servicesVideo from "../assets/services_video.mp4";

export const Home = () => {
  return (
    <>
      <div>
        <NavigationBar />
      </div>

      {/* Main Section: Heading + Paragraph + Image */}
      <div className="flex flex-row items-start px-16 pt-20 space-x-12">
        {/* Left Section: Main Heading + Subheading */}
<div className="relative w-[700px]">
  <p className="[text-shadow:0px_4px_4px_#00000040] [-webkit-text-stroke:1px_#300dad] font-bold text-[#300dad] text-[53px] tracking-[5.3px] leading-tight font-['Inter-Bold','Helvetica']">
    Professional&nbsp;&nbsp;Home <br />
    Services at Your <br />
    Doorstep
  </p>

  <p className="mt-6 font-bold text-[#300dad] text-[22px] w-[600px] leading-snug font-['Inter-Bold','Helvetica']">
    From AC repair to house cleaning to painting – get all your home
    service needs fulfilled by verified professionals with transparent
    pricing.
  </p>
    <div className="left-[0px] top-[40px] absolute">
  {/* Repair */}
  <div className="flex flex-col items-center absolute left-0 top-[260px]">
    <img
      className="w-[247px] h-[139px] object-cover"
      src={repairHome}
      alt="Repair"
    />
    <button className="mt-[0px] w-[127px] py-2 bg-[#300dad] text-white text-[18px] font-bold rounded shadow hover:bg-[#603ce1]">
      Repair
    </button>
  </div>

  {/* Cleaning */}
  <div className="flex flex-col items-center absolute left-[160px] top-[260px]">
    <img
      className="w-[247px] h-[139px] object-cover"
      src={cleaningHome}
      alt="Cleaning"
    />
    <button className="mt-[0px] w-[128px] py-2 bg-[#300dad] text-white text-[18px] font-bold rounded shadow hover:bg-[#603ce1]">
      Cleaning
    </button>
  </div>

  {/* Painting */}
  <div className="flex flex-col items-center absolute left-[325px] top-[275px]">
    <img
      className="w-[160px] h-[100px] object-cover"
      src={paintingHome}
      alt="Painting"
    />
    <button className="mt-[25px] w-[126px] py-2 bg-[#300dad] text-white text-[18px] font-bold rounded shadow hover:bg-[#603ce1]">
      Painting
    </button>
  </div>
  </div>
</div>
        
        {/* Right Section: Mobile Image with Video */}
<div className="relative w-[680px] h-[548px] flex-shrink-0">
  {/* Phone Image */}
  <img
    className="w-full h-full object-cover rounded-lg shadow-lg"
    src={servicesImage}
    alt="Services"
  />

  {/* Video inside the mobile screen */}
  <video
    className="absolute top-[110px] left-[160px] w-[200px] h-[230px] rounded-[20px] object-cover"
    src={servicesVideo}
    autoPlay
    muted
    loop
    playsInline
  />
</div>
</div>
    </>
  );
};
