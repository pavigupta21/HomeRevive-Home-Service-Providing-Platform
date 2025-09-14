import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const SubServiceCard = ({ service,category, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after mount
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // wait for animation before unmount
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-end z-50">
      <div
        className={`bg-white w-[595px] rounded-t-3xl p-6 h-[80vh] flex flex-col shadow-lg transform transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-bold">{service.title}</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X size={22} />
             
          </button>
        </div>

        {/* Subservice tiles */}
        <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">
          {service.sub_services.map((sub, index) => (
            <Link
              key={index}
              to={`/services/${sub.name}`}
              state={{ sub,category }}
              className="flex flex-col items-center justify-center gap-2 px-4 py-8 border border-black rounded-[30px] shadow-sm transition-transform duration-200 ease-in-out hover:scale-95 hover:shadow-lg"
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-[18px] font-medium text-balck text-center ">
                {sub.name}
              </span>
            </Link>
            
          ))}
        </div>
      </div>
    </div>
  );
};
