import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Star } from "lucide-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { addWishlistItem } from "@/redux/wishlist";
import { PRODUCT_API_END_POINT } from "@/utils/constant.js";
import { fetchAllProducts } from "@/redux/productSlice";
import LoadingSpinner from "@/components/LoadingSpinner";

const Products = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("https://dummyjson.com/products")
  //     .then((res) => setProducts(res.data.products))
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${PRODUCT_API_END_POINT}/getProducts`)
  //     .then((res) => setProducts(res.data.products))
  //     .catch((err) => console.log("Error in the fecting all products is", err));
  // }, []);
  const { products, isLoading, isError } = useSelector(
    (store) => store.product
  );
  // console.log("products from store", products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div className="p-6 mt-8">
      {/* Header and Timer */}
      <div className="flex items-center mb-6">
        <div>
          <div className="flex">
            <div className="w-5 h-7 bg-red-500 rounded-sm"></div>
            <h2 className="text-red-500 font-semibold pl-3">Our Products</h2>
          </div>
          <h1 className="text-3xl font-bold">Explore Our Products</h1>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={"relative"}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products &&
              products.map((product) => (
                <div key={product._id} className="">
                  <div className="relative bg-white p-4 rounded shadow hover:shadow-md transition group">
                    {/* Icons */}
                    <div className="bg-[#f5f5f5]">
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <button
                          onClick={() => {
                            dispatch(addWishlistItem(product));
                            navigate("/wishlist");
                          }}
                          className="bg-white  p-2 rounded-full shadow "
                        >
                          <Heart className="h-4 w-4 hover:w-6 hover:h-6 transition text-gray-600 z-20 cursor-pointer " />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      <Link to={`productdetail/${product._id}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-50 object-contain bg-[#f5f5f5] mx-auto mb-4"
                        />
                      </Link>
                    </div>

                    <Link to={`productdetail/${product._id}`}>
                      <h3 className="text-sm font-medium mb-1">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-red-500 font-semibold">
                        ${product.price}
                      </span>
                    </div>

                    <div className="text-yellow-500 flex items-center  text-sm mb-3">
                      {/* {'⭐'.repeat(Math.floor(product.rating) || 5)}{" "} */}
                      {[...Array(5)].map((_, index) => {
                        const currentRate = index + 1;
                        return (
                          <>
                            <Star
                              size={20}
                              fill={
                                currentRate <= Math.floor(product.rating)
                                  ? "yellow"
                                  : "gray"
                              }
                              color={
                                currentRate <= Math.floor(product.rating)
                                  ? "yellow"
                                  : "gray"
                              }
                            />
                          </>
                        );
                      })}
                      <span className="text-gray-500 pl-4 text-xs">
                        ({product.noOfReviews || 0})
                      </span>
                    </div>

                    <Button
                      onClick={() => {
                        dispatch(addToCart(product));
                        navigate(`/cart`);
                      }}
                      className="w-full absolute top-45 z-50 left-0 cursor-pointer right-0 opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center pt-5">
        <Button
          className={
            "bg-red-500 cursor-pointer text-white px-10 py-7 text-center hover:bg-red-700"
          }
        >
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default Products;
