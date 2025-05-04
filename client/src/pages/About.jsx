import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Features from "./Features";
import { useState } from "react";

const About = () => {
  const [active, setActive] = useState("seller-active");
  return (
    <div className="container mx-auto py-12 space-y-16">
     
      <div className="grid md:grid-cols-2 gap-10 items-center p-5">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Established in 2019, Exclusive is a Saudi Arabia premier online
            shopping destination for a wide selection of products. We strive to
            provide an exceptional shopping experience with fast delivery,
            secure payments, and excellent customer support.
          </p>
          <p className="text-muted-foreground">
            Exclusive has more than 1.5 million products on-site, growing at a
            very fast rate. We believe in offering a diverse assortment to cater
            to everything from basic essentials to exclusive luxury.
          </p>
        </div>
        <div>
          <img
            src="/story.png"
            alt="Shoppers"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
        {[
          {
            value: "10.5k",
            icon: "/Headphone.png",
            label: "Sellers active on our site",
            name: "seller-active",
          },
          {
            value: "33k",
            label: "Monthly Product Sales",
            name: "monthly-sales",
            icon: "/Headphone.png",
          },
          {
            value: "45.5k",
            label: "Customer active on site",
            icon: "/Headphone.png",
            name: "customer-active",
          },
          {
            value: "25k",
            label: "Annual gross sale on site",
            icon: "/Headphone.png",
            name: "annual-gross",
          },
        ].map((stat, idx) => (
          <Card
            onClick={() => {
              setActive(stat.name);
            }}
            key={idx}
            className={`text-center ${
              active === stat.name
                ? "border-red-500 bg-red-500 "
                : "hover:shadow-md"
            }`}
          >
            <CardContent className="py-6 space-y-2">
              <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gray-300">
                <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
                  <img
                    src="track.png"
                    alt="Delivery"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 p-5">
        {[
          {
            name: "Tom Cruise",
            role: "Founder & Chairman",
            image: "/team1.png",
          },
          {
            name: "Emma Watson",
            role: "Managing Director",
            image: "/team2.png",
          },
          {
            name: "Will Smith",
            role: "Product Designer",
            image: "/team3.png",
          },
        ].map((member, idx) => (
          <div
            key={idx}
            className="text-center rounded-xl p-3 hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center  space-y-4">
              <img
                src={member.image}
                alt={member.name}
                className="  rounded object-contain bg-gray-200"
              />
              <div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex gap-3 text-muted-foreground">
                <FacebookIcon className="cursor-pointer " />
                <TwitterIcon className="cursor-pointer " />
                <LinkedinIcon className="cursor-pointer " />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Features />
    </div>
  );
};

export default About;
