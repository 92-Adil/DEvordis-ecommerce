import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Star } from "lucide-react";
import { useSelector } from "react-redux";

// const products = [
//   {
//     id: Math.random() * 10,
//     name: "Keyboard",
//     price: 120,
//     originalPrice: 160,
//     discount: 40,
//     image: "/coat.png",
//     rating: 4.5,
//     reviews: 88,
//   },
//   {
//     id: Math.random() * 10,
//     name: "Keyboard",
//     price: 120,
//     originalPrice: 160,
//     discount: 40,
//     image: "/coat.png",
//     rating: 4.5,
//     reviews: 88,
//   },
//   {
//     id: Math.random() * 10,
//     name: "Keyboard",
//     price: 120,
//     originalPrice: 160,
//     discount: 40,
//     image: "/iphone.png",
//     rating: 4.5,
//     reviews: 88,
//   },
//   {
//     id: Math.random() * 10,
//     name: "Keyboard",
//     price: 120,
//     originalPrice: 160,
//     discount: 40,
//     image: "/keyboard.png",
//     rating: 4.5,
//     reviews: 88,
//   },
//   {
//     id: Math.random() * 10,
//     name: "Keyboard",
//     price: 120,
//     originalPrice: 160,
//     discount: 40,
//     image: "/keyboard.png",
//     rating: 4.5,
//     reviews: 88,
//   },
//   {
//     id: Math.random() * 10,
//     name: "Keyboard",
//     price: 120,
//     originalPrice: 160,
//     discount: 40,
//     image: "/coat.png",
//     rating: 4.5,
//     reviews: 88,
//   },
// ];

const BestSellingSection = () => {
  let { products } = useSelector((store) => store.product);
  products = products.filter((pro) => pro?.rating >= 4);
  console.log(products);

  return (
    <div className="p-6 mt-8">
      {/* Header*/}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex">
            <div className="w-5 h-7 bg-red-500 rounded-sm"></div>
            <h2 className="text-red-500 font-semibold pl-3">This Month</h2>
          </div>
          <h1 className="text-3xl font-bold">Best Selling Products</h1>
        </div>
        <div>
          <Button
            className={
              "bg-red-500 text-white cursor-pointer px-5 py-2 lg:px-10 lg:py-5 text-center hover:bg-red-700"
            }
          >
            View All
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel className={"relative"}>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product._id} className="basis-1/2 lg:basis-1/4">
              <div className="relative bg-white p-4 rounded shadow hover:shadow-md transition group">
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
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-center text-yellow-500 text-sm mb-3">
                  {/* {"⭐".repeat(Math.floor(product.rating))}{" "} */}
                  {[...Array(5)].map((_, index) => {
                    const currentRate = index + 1;
                    return (
                      <div className="flex   " key={index}>
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
                      </div>
                    );
                  })}
                  <span className="   text-gray-500 text-xs">
                  ({product.noOfReviews || 0})
                  </span>
                </div>

                {/* Add to Cart Button - hidden by default, visible on hover */}
                <Button className="w-full opacity-0 group-hover:opacity-100 transition duration-300">
                  Add To Cart
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BestSellingSection;
