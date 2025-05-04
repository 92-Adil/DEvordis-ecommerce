import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Facebook, FacebookIcon, Instagram, Linkedin, LinkedinIcon, Twitter } from "lucide-react";
const Foot = () => {
  return (
    <div className="bg-black  text-white px-6 md:px-12 lg:px-24 py-10">
      <div className="grid  grid-cols-2 lg:grid-cols-5 gap-8">
       
        <div>
          <h2 className="text-xl font-bold mb-2">Exclusive</h2>
          <p className="mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="flex border border-white rounded-md overflow-hidden">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm px-2 py-2  border-none outline-none focus-visible:ring-0"
            />
            <Button className="bg-transparent text-white w-10 h-10 px-4">&gt;</Button>
          </div>
        </div>

        <div>
          <h2 className="text-md font-semibold mb-2">Support</h2>
          <p className="text-sm mb-2">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm mb-2">DH 1515, Bangladesh.</p>
          <p className="text-sm mb-2">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        <div>
          <h2 className="text-md font-semibold mb-2">Account</h2>
          <ul className="text-sm space-y-2">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h2 className="text-md font-semibold mb-2">Quick Link</h2>
          <ul className="text-sm space-y-2">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h2 className="text-md font-semibold mb-2">Download App</h2>
          <p className="text-xs mb-2">Save $3 with App New User Only</p>
          <div className="flex gap-2 mb-4">
            <img src="/GooglePlay (1).png"className="w-24" />
            <img src="/AppStore.png" alt="App Store" className="w-24" />
          </div>
          <div className="flex gap-4 text-xl">
          <i className=""><Facebook/></i>
            <i className=""><Instagram/></i>
            <i className=""><Linkedin/></i>
            <i className=""><Twitter/></i>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </div>
  );
};

export default Foot;


