"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Computer, ComputerIcon, Phone } from "lucide-react";
import { useState } from "react";

const Categories = () => {
  const categoryArray = [
    {
      image: "/CellPhone.png",
      name: "Phones",
    },
    {
      image: "/Computer.png",
      name: "Computers",
    },
    {
      image: "/SmartWatch.png",
      name: "SmartWatches",
    },
    {
      image: "/Gamepad.png",
      name: "Cameras",
    },
    {
      image: "/Headphone.png",
      name: "HeadPhones",
    },
    {
      image: "/Gamepad.png",
      name: "Gaming",
    },
  ];
  const [active, setActive] = useState("Phones");
  return (
    <div className="p-6 mt-8">
      {/* Header  */}
      <div className="flex items-center mb-6">
        <div>
          <div className="flex">
            <div className="w-5 h-7 bg-red-500 rounded-sm"></div>
            <h2 className="text-red-500 font-semibold pl-3">Categories</h2>
          </div>
          <h1 className="text-3xl font-bold">Browse By Category</h1>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categoryArray.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
              <div className="p-1 ">
                <Card
                  className={`flex flex-col  aspect-square items-center justify-center cursor-pointer py-20 h-20 ${
                    active === item.name ? "bg-red-400 transition-all duration-400" : ""
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  <CardContent>
                    <img className="" src={`${item.image}`} alt="" />

                    <span className="text-sm text-center">{item.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"absolute -top-14 right-14 z-10"} />
        <CarouselNext className={"absolute -top-14 right-14 z-10"} />
      </Carousel>
    </div>
  );
};

export default Categories;
