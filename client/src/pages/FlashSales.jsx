import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";



const FlashSales = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [salesProducts, setSalesProducts] = useState([]);
  const deadlineTime = "May 29 2025";
  const getTime = () => {
    const time = Date.parse(deadlineTime) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(Math.floor(time / 1000) % 60);
    
  };
  
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setSalesProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-14 p-5 mt-8">
      {/* Header and Timer */}
      <div className="flex items-center mb-6  ">
        <div>
          <div className="flex">
            <div className="w-5 h-7 bg-red-500 rounded-sm"></div>
            <h2 className="text-red-500 font-semibold pl-3">Today's</h2>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">Flash Sales</h1>
        </div>
        <div className="flex items-center gap-4 text-center pl-4 lg:pl-15">
          <div>
            <span className="text-sm font-mono">Days</span>
            <span className="block text-4xl font-sans font-extrabold">
              {days < 10 ? "0" + days : days}
            </span>
          </div>
          <span className="text-4xl font-sans font-extrabold text-red-500">
            :
          </span>
          <div>
            <span className="text-sm font-mono">Hours</span>
            <span className="block text-4xl font-sans font-extrabold">
              {hours < 10 ? "0" + hours : hours}
            </span>
          </div>
          <span className="text-4xl font-sans font-extrabold text-red-500">
            :
          </span>
          <div>
            <span className="text-sm font-mono">Minutes</span>
            <span className="block text-4xl font-sans font-extrabold">
              {minutes < 10 ? "0" + minutes : minutes}
            </span>
          </div>
          <span className="text-4xl font-sans font-extrabold text-red-500">
            :
          </span>
          <div>
            <span className="text-sm font-mono">Seconds</span>
            <span className="block text-4xl font-sans font-extrabold">
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel className={"relative"}>
        <CarouselContent>
          {salesProducts.map((product) => {
            const price = Number(product.price) || 0;
            const discount = Number(product.discountPercentage) || 0;
            const salePrice = price - (discount / 100) * price;
            return (
              <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/4">
                <div className="relative bg-white p-4 rounded shadow hover:shadow-md transition">
                  {/* Discount Badge */}
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{product.discountPercentage}%
                  </span>

                  {/* Icons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <button className="bg-white p-2 rounded-full shadow">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-50 object-contain bg-[#f5f5f5] mx-auto mb-4"
                  />
                  <h3 className="text-sm font-medium mb-1">{product.title}</h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="text-red-500 font-semibold">
                      ${salePrice.toFixed(2)}
                    </span>
                    <span className="line-through text-gray-400">
                      ${product.price}
                    </span>
                  </div>

                  <div className="text-yellow-500 text-sm mb-3">
                    {"⭐".repeat(Math.floor(product.rating))}{" "}
                    <span className="text-gray-500 text-xs">
                      ({product.reviews.length})
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      navigate("/cart");
                      dispatch((addToCart({...product,price:salePrice})))
                    }}
                    className="w-full"
                  >
                    Add To Cart
                  </Button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* <CarouselPrevious className={"absolute -top-14 right-14 z-10"} /> */}
        <CarouselNext className="absolute -top-4 right-0  lg:-top-14 lg:right-2 cursor-pointer z-10" />
      </Carousel>
      <div className="flex items-center justify-center pt-5">
        <Button
          className={
            "bg-red-500 text-white px-10 py-5 text-center hover:bg-red-700"
          }
        >
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default FlashSales;
