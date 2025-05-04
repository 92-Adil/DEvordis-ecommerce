import React from "react";

const Features = () => {
  return (
    <div className="py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gray-300">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
              <img
                src="track.png"
                alt="Delivery"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>
          <h3 className="font-bold text-sm uppercase">
            Free and Fast Delivery
          </h3>
          <p className="text-gray-600 text-sm">
            Free delivery for all orders over $140
          </p>
        </div>

        <div>
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gray-300">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
              <img src="/head.png" alt="Customer Service" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-bold text-sm uppercase">24/7 Customer Service</h3>
          <p className="text-gray-600 text-sm">
            Friendly 24/7 customer support
          </p>
        </div>

        <div>
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gray-300">
            <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
              <img src="safe.png" alt="Money Back" className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-bold text-sm uppercase">Money Back Guarantee</h3>
          <p className="text-gray-600 text-sm">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
