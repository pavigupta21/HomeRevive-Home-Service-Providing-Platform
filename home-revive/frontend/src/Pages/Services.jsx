import { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { ServiceCard } from "../components/ServiceCard";
import { ServicesData } from "../constants_and_dataset/services_data";
import { SubServiceCard } from "../components/SubServiceCard";
import { useLocation } from "react-router-dom";

export const Services = () => {
  const location = useLocation();
  // Track which category index is selected
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "Repair"  );
  const [selectedService, setSelectedService] = useState(null);

  // Map categories to slices of ServicesData
  const categorySlices = {
    Repair: ServicesData.slice(0, 3),
    Cleaning: ServicesData.slice(3, 6),
    Painting: ServicesData.slice(6, 10),
  };

  const handleExploreServices=(service)=>{
    setSelectedService(service);
  }

  return (
    <>
      <div>
        <NavigationBar />
      </div>
      <div className="flex flex-row justify-center mt-[70px] ml-[30px] mb-[80px]">
        {/* Categories */}
        <div
          style={{ border: "#D5C8C8 solid", boxShadow: "0px 4px 7px rgba(0,0,0,0.2)" }}
          className="flex flex-col justify-center items-center w-[282px] h-[374px] rounded-[61px] mr-[30px] px-[10px]"
        >
          <p className="text-[24px] [font-family:'Inter'] mb-[30px]">Categories</p>

          {["Repair", "Cleaning", "Painting"].map((cat) => (
            <button
              key={cat}
             onClick={() => {
              setSelectedCategory(cat);
              setSelectedService(null); // reset booking details view
            }}
              className={`
                bg-[#EBF3F4] w-[230px] py-[5px] rounded-[10px] mb-[30px] flex justify-center border
                ${selectedCategory === cat ? "border-2 border-[#5D35EE]" : "border border-[#86D7E0]"}
                hover:border-2 hover:border-[#5D35EE] 
              `}
            >
              <span className="text-[#000000]/62 [font-family:'Inter'] text-[24px]">
                {cat}
              </span>
            </button>
          ))}
        </div>

        {/* Services OR Booking Details */}
        <div className="flex flex-wrap justify-start items-center gap-[35px]">
          {categorySlices[selectedCategory].map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.title}
              desc={service.desc}
              no_of_services={service.no_of_services}
              onExploreServices={() => handleExploreServices(service)}
            />
          ))}
        </div>
      
    </div>
    {/* 🔹 Show SubServiceCard overlay if service selected */}
      {selectedService && (
        <SubServiceCard
          service={selectedService}
           category={selectedCategory}
          onClose={() => setSelectedService(null)}
        />
      )}

     
    </>
  );
};
