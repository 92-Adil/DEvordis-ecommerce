import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, DeleteIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "@/redux/wishlist";
import { addToCart } from "@/redux/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((store) => store.wishlist);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between px-5">
        <h1 className="text-2xl font-bold p-5">
          Wishlist({wishlistItems.length})
        </h1>
        <Button
          className={
            "px-5 cursor-pointer text-black border-black border-4 py-5 rounded-none bg-transparent hover:bg-amber-50"
          }
          onClick={() => {
            wishlistItems.forEach((item) => {
              dispatch(addToCart(item));
            });
            navigate("/cart");
          }}
        >
          Move All To Bag
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 bg-gray-100 hover:shadow-2xl p-10">
        {wishlistItems.map((item) => (
          <div className="relative bg-white p-4 rounded shadow hover:shadow-md transition group">
            <div className="bg-[#f5f5f5]">
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <button
                  onClick={() => dispatch(removeWishlistItem(item))}
                  className="bg-white  p-2 rounded-full shadow "
                >
                  <Trash2Icon className="h-4 w-4 hover:w-6 hover:h-6 transition  text-gray-600 z-20 cursor-pointer " />
                </button>
                <button className="bg-white p-2 rounded-full shadow">
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-50 object-contain bg-[#f5f5f5] mx-auto mb-4"
              />
            </div>

            <Link>
              <h3 className="text-sm font-medium mb-1">{item.title}</h3>
            </Link>

            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-red-500 font-semibold">${item.price}</span>
            </div>

            <Button
              onClick={() => {
                dispatch(addToCart(item));
                navigate("/cart");
              }}
              className={"w-full"}
            >
              Add To Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
