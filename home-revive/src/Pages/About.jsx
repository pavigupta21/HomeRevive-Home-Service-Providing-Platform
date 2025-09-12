import React from 'react'
import { NavigationBar } from "../components/NavigationBar";
import repairAbout from "../assets/aintenance.mp4";
import cleaningAbout from "../assets/Cleaning.mp4";
import paintingAbout from "../assets/Painting.mp4";
import smileAbout from "../assets/smile_about.png";
import professionalAbout from "../assets/professional_about.png";
import cityAbout from "../assets/city_about.png";
import starAbout from "../assets/star_about.png";
import ourStoryAbout from "../assets/ourStory_about.jpg";
import phoneAbout from "../assets/phone_about.png";
import messageAbout from "../assets/message_about.png";
import bagAbout from "../assets/bag_about.png";
import {Link} from 'react-router-dom';

export const About = () => {
  return (
    <>
        <div>
            <NavigationBar />
        </div>
        <div className="w-full text-center mt-[50px]">
            <div className="flex flex-wrap gap-5 justify-center  [text-shadow:0px_4px_4px_#00000040] [font-family:'Istok_Web-Bold',Helvetica] font-bold text-black text-[64px] tracking-[0] leading-7">
                <span>About</span>
                <span>HomeRevive</span>
            </div>
            <div className="w-full flex justify-center text-center mt-4  left-1/2 right-1/2 mt-[40px]">
                <p className="max-w-[1060px] text-[32px]  [font-family:'Istok_Web-Bold',Helvetica] text-[#62606B] tracking-[0] leading-10">
                We're on a mission to make home services simple, reliable, and
                accessible for everyone. From professional repairs to deep cleaning,
                painting, and waterproofing — we've got your home covered.
            </p>
            </div>
        </div>
         <div className="w-full text-center mt-[50px]">
                <l className=" text-[32px]  [font-family:'Istok_Web-Bold',Helvetica] text-black tracking-[0] leading-10 mt-[80px] font-bold">
                Explore Our Services
                </l>
        </div>
    <div className="flex flex-wrap md:flex-row justify-center items-center gap-1 mt-10 ">
  {/* Service 1 */}
  <div className="flex flex-col items-center">
    <div className="h-[230px] w-auto flex items-center">
      <video
        src={repairAbout}
        alt="Repair Service"
        autoPlay
        muted
        loop
        className=" h-[230px] w-auto object-contain"
      />
    </div>
    <Link to="/services" state={{category:"Repair"}} className="mt-4 w-[170px] text-center py-[20px] bg-[#300dad] text-white text-[18px] font-bold rounded-lg shadow hover:bg-[#603ce1]">
      Repair
    </Link>
  </div>

  {/* Service 2 */}
  <div className="flex flex-col items-center">
    <div className="h-[230px] flex items-center">
      <video
        src={cleaningAbout}
        alt="Cleaning Service"
        className="h-[200px] w-auto object-contain"
        autoPlay
        muted
        loop
      />
    </div>
    <Link to="/services" state={{category:"Cleaning"}} className="mt-4 text-center w-[170px]  py-[20px] bg-[#300dad] text-white text-[18px] font-bold rounded-lg shadow hover:bg-[#603ce1]">
      Cleaning
    </Link>
  </div>

  {/* Service 3 */}
  <div className="flex flex-col items-center">
    <div className="h-[230px] flex items-center">
      <video
        src={paintingAbout}
        alt="Painting Service"
        className="h-[250px] w-auto object-contain"
        autoPlay
        muted
        loop
      />
    </div>
    <Link to="/services" state={{category:"Painting"}} className="text-center mt-4 w-[170px]  py-[20px] bg-[#300dad] text-white text-[18px] font-bold rounded-lg shadow hover:bg-[#603ce1]">
      Painting
    </Link>
  </div>
</div>

{/* Advertisement Records */}
<div className="w-full flex  flex-wrap gap-20 justify-center [font-family:'Inter','sans-serif'] items-center mt-[90px] bg-[#D9D9D9]  py-[50px]">
  {/* Happy Customers */}
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <img
          src={smileAbout}
          alt="Smile emoji"
          className="min-h-[150px] w-auto object-contain"
        />
      </div>
      <p className="text-[40px]  font-bold text-black mt-4 text-[#5d3fee]">
        50,000+</p>
        <p className="text-[24px] text-[#62606B] mt-1">
        Happy Customers</p>
    </div>
{/* Professional Service */}
  <div className="flex flex-col items-center">
        <div className=" flex items-center">
          <img
            src={professionalAbout}
            alt="worker emoji"
            className="min-h-[160px] w-auto object-contain"
          />
        </div>
        <p className="text-[40px] font-bold text-black mt-4 text-[#5d3fee]">
        1,000+</p>
        <p className="text-[24px]  text-[#62606B] mt-1">
        Verified Professionals</p>
  </div >
  {/* City Service */}
  <div className="flex flex-col items-center">
      <div className=" flex items-center">
        <img
          src={cityAbout}
          alt="city emoji"
          className="min-h-[150px] w-auto object-contain"
        />
      </div>
      <p className="text-[40px]  font-bold text-black mt-4 text-[#5d3fee]">
        15+</p>
        <p className="text-[24px]  text-[#62606B] mt-1">
       Cities Served</p>
    </div>
  {/* Star Rating */}
  <div className="flex flex-col items-center">
      <div className=" flex items-center">
        <img
          src={starAbout}
          alt="Smile emoji"
          className="min-h-[150px] w-auto object-contain"
        />
      </div>
      <p className="text-[40px]  font-bold text-black mt-4 text-[#5d3fee]">
        4.8/5</p>
        <p className="text-[24px]  text-[#62606B] mt-1">
        Average Rating</p>
    </div>
</div>
<div className="flex flex-wrap items-center justify-center mt-16">
  <div className="flex-1 min-w-[700px] max-w-[80px] text-[#62606B] leading-[1.2] ml-10">
    <p className="text-[48px]">Our Story</p>
    <p className="text-[32px] mt-[30px] ">HomeRevive was born out of a simple frustration - finding reliable home service 
      professionals shouldn't be this hard.
      Our founders experienced firsthand the challenges of dealing with 
      unreliable technicians, unclear pricing, and poor service quality.</p>
      <p className="text-[32px] mt-[30px] ">Founded in 2020, we started with a vision to revolutionize the 
        home services industry by bringing transparency, reliability, 
        and quality to every service interaction.
         What began as a small team in Pune has now grown 
         to serve over 15 cities across India.</p>
         <p className="text-[32px] mt-[30px] ">Today, we're proud to have built a platform that connects homeowners with verified, 
          skilled professionals while ensuring transparent 
          pricing and quality assurance. Our technology-driven approach has helped 
          over 50,000 customers solve their home service needs.</p>
  </div>
  
    <div className="flex justify-center flex-1 min-w-[300px] max-w-[700px] mr-10">
        <img
          src={ourStoryAbout}
          alt="Our Story"
          className=" w-[536px]  object-contain h-[805px] shrink-0 rounded-[30px]"
        />
    </div>
</div> 
<div className='w-full flex-col  justify-center items-center mt-[100px]  bg-[#D9D9D9] py-[50px]'>
  <div className="text-center">
    <p className="text-[48px] text-[#62606b] [font-family:'Istok_Web-Bold',Helvetica] ">Get In Touch</p>
  </div>
    {/* Contact Section */}
    <div className="flex flex-wrap gap-[120px] justify-center items-center mb-[30px]">
      {/*Customer Support*/}
      <div className="flex-col justify-center items-center mt-[50px]">
        <div className="flex justify-center items-center">
          <img
            src={phoneAbout}
            alt="Phone Icon"
            className="w-[140px] h-auto object-contain"
          />  
        </div>
        <div className="flex flex-col justify-center text-center items-center mt-4 max-w-[400px]">
          <p className="text-[32px] [font-family:'Istok_Web','Helvetica'] text-[#62606b]">Customer Support</p>
          <p className="text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b]">Get help with bookings or service issues</p>
        </div>
        {/*Contact Number*/}
        <div className="flex justify-center items-center mt-4">
          <div className="flex justify-center items-center">
          <img
            src={phoneAbout}
            alt="Phone Icon"
            className="w-[70px] h-auto object-contain"
          />  
        </div>
          <p className="text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b] mt-1">+91 99999 88888</p>
        </div>
        {/*Email*/}
        <div className="flex justify-center items-center ">
          <div className="flex justify-center items-center">
          <img
            src={messageAbout}
            alt="Email Icon"
            className="w-[70px] h-auto object-contain"
          />  
        </div>
          <p className="text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b] ">support@homerevive.com</p>
      </div>
        <p className="flex justify-center items-center text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b] mt-1">24/7 Available</p>
      </div>
      {/*Business Inquiries*/}
      <div className="flex-col justify-center items-center mt-[50px]">
        <div className="flex justify-center items-center">
          <img
            src={bagAbout}
            alt="Bag Icon"
            className="w-[150px] h-auto object-contain"
          />  
        </div>
        <div className="flex flex-col justify-center text-center items-center mt-4 max-w-[400px]">
          <p className="text-[32px] [font-family:'Istok_Web','Helvetica'] text-[#62606b]">Business Inquiries</p>
          <p className="text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b]">Partner with us or explore business opportunites</p>
        </div>
        {/*Contact Number*/}
        <div className="flex justify-center items-center mt-4">
          <div className="flex justify-center items-center">
          <img
            src={phoneAbout}
            alt="Phone Icon"
            className="w-[70px] h-auto object-contain"
          />  
        </div>
          <p className="text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b] mt-1">+91 99777 66555</p>
        </div>
        {/*Email*/}
        <div className="flex justify-center items-center ">
          <div className="flex justify-center items-center">
          <img
            src={messageAbout}
            alt="Email Icon"
            className="w-[70px] h-auto object-contain"
          />  
        </div>
          <p className="text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b] ">business@homerevive.com</p>
      </div>
        <p className="flex justify-center items-center text-[24px] [font-family:'Istok_Web','Helvetica'] text-[#62606b] mt-1">Mon-Fri, 9 AM - 6 PM</p>
      </div>
    </div>
</div>     
    </>
  )
}
