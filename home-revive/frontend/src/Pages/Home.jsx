import React from "react";
import { NavigationBar } from "../components/NavigationBar";
import servicesImage from "../assets/servicesImage.png";
import repairHome from "../assets/repairHome.mp4";
import cleaningHome from "../assets/home_clean.mp4";
import paintingHome from "../assets/Paint.mp4";
import servicesVideo from "../assets/services_video.mp4";
import { Link } from "react-router-dom";

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
    <video
      className="w-auto h-[139px] object-cover mt-[10px]"
      src={repairHome}
      alt="Repair"
      autoPlay
      loop
    />
    <Link
    to="/services"
     state={{category:"Repair"}}
     className="mt-[0px] w-[127px] text-center py-2 bg-[#300dad] text-white text-[18px] font-bold rounded shadow hover:bg-[#603ce1]">
      Repair
    </Link>
  </div>

  {/* Cleaning */}
  <div className="flex flex-col items-center absolute left-[160px] top-[260px]">
    <video
      className="w-[247px] h-[139px] object-cover mt-[10px]"
      src={cleaningHome}
      alt="Cleaning"
      autoPlay
      loop
    />
    <Link 
      to ="/services"
      state={{category:"Cleaning"}}
    className="mt-[0px] w-[128px] text-center py-2 bg-[#300dad] text-white text-[18px] font-bold rounded shadow hover:bg-[#603ce1]">
      Cleaning
    </Link>
  </div>

  {/* Painting */}
  <div className="flex flex-col items-center absolute left-[325px] top-[275px]">
    <video
      className="w-[100px] h-[100px] object-cover mt-[10px]"
      src={paintingHome}
      alt="Painting"
      autoPlay
      loop
    />
    <Link 
    to="/services"
     state={{category:"Painting"}}
    className="mt-[25px] w-[126px] text-center py-2 bg-[#300dad] text-white text-[18px] font-bold rounded shadow hover:bg-[#603ce1]">
      Painting
    </Link>
  </div>
  </div>
</div>
        
        {/* Right Section: Mobile Image with Video */}
<div className="relative w-[680px] h-[548px] flex-shrink-0">
  {/* Phone Image */}
  <img
    className="w-full h-full object-cover rounded-[34px] shadow-lg"
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
