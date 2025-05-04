import { Button } from "@/components/ui/button";
import React from "react";

const NewArrival = () => {
  return (
    <div className="px-6 py-10">
      <span className="text-sm text-red-500 font-medium mb-2 inline-block">
        Featured
      </span>
      <h2 className="text-3xl font-bold mb-6">New Arrival</h2>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 h-96">
        
        <div className="col-span-1 bg-black text-white rounded-xl overflow-hidden relative">
          <img
            src="/ps5.png"
            alt="PlayStation 5"
            className="w-full h-80 object-contain"
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-lg font-semibold">PlayStation 5</h3>
            <p className="text-sm text-gray-300">
              Black and White version of the PS5
              <br /> coming out on sale.
            </p>
            <button className="mt-2  text-white text-sm font-bold cursor-pointer underline ">
              Shop Now
            </button>
          </div>
        </div>

        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2 bg-black text-white rounded-xl overflow-hidden relative">
            <img
              src="/women.png"
              alt="Women's Collections"
              className="w-full h-50 object-contain opacity-60"
            />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-semibold">Women’s Collections</h3>
              <p className="text-sm text-gray-300">
                Featured woman collections that
                <br /> give you another vibe.
              </p>
              <button className="mt-2 text-white text-sm font-bold cursor-pointer  underline ">
                Shop Now
              </button>
            </div>
          </div>
          {/* Speakers */}
          <div className="bg-black text-white rounded-xl overflow-hidden relative">
            <img
              src="/speaker.png"
              alt="Speakers"
              className="w-full h-46 object-contain opacity-70"
            />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-md font-semibold">Speakers</h3>
              <p className="text-sm text-gray-300">Amazon wireless speakers</p>
              <button className="mt-2 text-white text-sm font-bold cursor-pointer underline ">
                Shop Now
              </button>
            </div>
          </div>

          {/* Perfume */}
          <div className="bg-black text-white rounded-xl overflow-hidden relative">
            <img
              src="/perfume.png"
              alt="Perfume"
              className="w-full h-46 object-contain opacity-60"
            />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-md font-semibold">Perfume</h3>
              <p className="text-sm text-gray-300">GUCCI INTENSE OUD EDP</p>
              <button className="mt-2 text-white text-sm font-bold cursor-pointer underline ">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
