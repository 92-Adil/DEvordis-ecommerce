import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { clearCart } from "@/redux/cartSlice";
import { ORDER_API_END_POINT, PURCHASE_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
const Checkout = () => {
  const { items, totalAmount } = useSelector((store) => store.cart);
  const [loading, setLoading] = useState(false);
  const dispatch =useDispatch()
  const shipping = 0;
  const total = totalAmount + shipping;
  const [input, setInput] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
    phoneNumber: "",
    email: "",
    postalCode: "",
  });
  const payload = {
    ...input,                      
    orderItems: items.map(item => ({
      product: item._id,           
      quantity: item.quantity,     
      price: item.price,           
    })),
    totalPrice: totalAmount,      
  };
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.address ||
      !input.city ||
      !input.phoneNumber ||
      !input.email
    ) {
      toast.error("All the * field are required");
      return;
    }
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(
        `${ORDER_API_END_POINT}/createOrder`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const Orderdata = res.data.order;
        const stripeUrl = await axios.post(
          `${PURCHASE_API_END_POINT}/create-checkout-session`,
          Orderdata,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        window.location.href = stripeUrl.data.url;
        dispatch(clearCart())
        
      }
    } catch (error) {
      console.log("Error in the place order handler", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Billing Details</h2>
        <div className="space-y-2">
          <Label
            htmlFor="Name"
            className="block text-sm font-medium text-gray-700"
          >
            Name*
          </Label>
          <input
            name={"name"}
            value={input.name}
            onChange={onChangeHandler}
            type="text"
            id="Name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm  bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </Label>
          <input
            name={"country"}
            value={input.country}
            onChange={onChangeHandler}
            type="text"
            id="country"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address*
          </Label>
          <input
            name={"address"}
            value={input.address}
            onChange={onChangeHandler}
            type="text"
            id="Address"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code. (optional)
          </Label>
          <input
            name={"postalCode"}
            value={input.postalCode}
            onChange={onChangeHandler}
            type="text"
            id="postalCode"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="townCity"
            className="block text-sm font-medium text-gray-700"
          >
            Town/City*
          </Label>
          <input
            name={"city"}
            value={input.city}
            onChange={onChangeHandler}
            type="text"
            id="City"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number*
          </Label>
          <input
            name={"phoneNumber"}
            value={input.phoneNumber}
            onChange={onChangeHandler}
            type="tel"
            id="phoneNumber"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address*
          </Label>
          <input
            name={"email"}
            value={input.email}
            onChange={onChangeHandler}
            type="email"
            id="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-100 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveInfo"
            className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <Label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
            Save this information for faster check-out next time
          </Label>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {items.map((item) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="ml-3 text-sm font-medium">{item.title}</span>
            </div>
            <span className="text-sm text-gray-700">
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-700 mt-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Payment Options
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="bankTransfer"
                name="paymentMethod"
                className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <label
                htmlFor="bankTransfer"
                className="ml-2 text-sm text-gray-700"
              >
                Bank Transfer
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <label
                htmlFor="cashOnDelivery"
                className="ml-2 text-sm text-gray-700"
              >
                Cash on delivery
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
          />
          <Button className="bg-red-500 cursor-pointer hover:bg-red-400">
            Apply Coupon
          </Button>
        </div>
        <Button
        disabled={loading}
          onClick={onClickHandler}
          className="bg-red-500 text-white cursor-pointer rounded-md py-3 w-full text-sm font-medium hover:bg-red-600"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
