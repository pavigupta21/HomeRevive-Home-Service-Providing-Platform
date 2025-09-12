import React from 'react'

export const ServiceCard = (props) => {
  return (
    <div style={{ border: "#D5C8C8 solid" ,boxShadow: "0px 4px 7px rgba(0,0,0,0.2)" }} className="flex flex-col  p-0  w-[512px] h-[343px]  rounded-[61px] overflow-hidden">
        <div className="h-44 w-[512px]">
        <img
        src={props.image}
        alt={props.title}
        className=" w-[520px] h-[184px] object-cover top-0 left-0"
      />
        </div>
        
      <div className="flex justify-start items-center gap-[200px] ml-[30px]">
        <p className="text-[20px] [font-family:'Inter'] mt-[10px] ">{props.title}</p>
        
        
      </div>
      <p className="text-[15px] text-[#878484] max-w-[484px] mr-[30px] ml-[30px] leading-tight mt-[7px]">{props.desc}</p>
      <div className="flex justify-center items-center gap-[160px] mt-auto mb-[20px]">
        <div className="flex justify-center items-center w-auto px-[10px] h-[27px] bg-[#C5B9EF] rounded-[10px]">
            <span className="text-[14px] [font-family:'Inter'] ">{props.no_of_services} services</span>
        </div>
        <button 
        onClick={props.onExploreServices}
        className="bg-[#5D35EE] text-white px-[15px] py-[5px] rounded-[10px] ml-[10px] hover:bg-[#4e27a3]">
            <span className="text-[20px] font-bold [font-family:'Inter']">Explore Services</span>
        </button>
      </div>
    </div>
  )
}
