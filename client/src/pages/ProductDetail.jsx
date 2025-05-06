import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addToCart } from "@/redux/cartSlice";
import { fectchProductById } from "@/redux/productSlice";
import { PRODUCT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  // const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const sizes = ["XS", "S", "M", "L"];
  const colors = ["bg-black", "bg-red-500"];
  const [finalPrice, setFinalPrice] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((store) => store.product);

  // useEffect(() => {
  //   axios
  //     .get(`https://dummyjson.com/products/${productId}`)
  //     .then((res) => {
  //       setProduct(res.data);
  //       setFinalPrice(res.data.price);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    // axios
    //   .get(`${PRODUCT_API_END_POINT}/getProductById/${productId}`)
    //   .then((res) => {
    //     setProduct(res.data.product);
    //     setFinalPrice(res.data.product.price);
    //   });
    dispatch(fectchProductById(productId));
    setFinalPrice(product?.price);
  }, [productId]);

  useEffect(() => {
    setFinalPrice(product?.price * quantity);
  }, [quantity, product]);
  // const rate = Array.from({ length: Math.floor(product?.rating || 0) });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {isLoading ? (
        <div className="w-screen flex flex-col gap-3 text-red-500  items-center justify-center">
          <Loader2 className="animate-spin w-50 h50 " />
          Please Wait
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {product?.images.length > 0 &&
                product?.images.map((item, index) => (
                  <img
                    key={index}
                    src={item.secure_url}
                    alt="Thumbnail"
                    className="w-16 h-16 object-contain border rounded-md cursor-pointer"
                  />
                ))}
            </div>
            <div className="flex-1">
              <img
                src={product?.thumbnail}
                alt="Main Product"
                className="w-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{product?.title}</h2>
              <div className="flex items-center gap-1 text-yellow-500">
                {/* {rate?.map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500" />
            ))} */}
                {[...Array(5)].map((_, index) => {
                  const currentRate = index + 1;
                  return (
                    <div key={index}>
                      <Star
                        size={20}
                        fill={
                          currentRate <= Math.floor(product?.rating)
                            ? "yellow"
                            : "gray"
                        }
                        color={
                          currentRate <= Math.floor(product?.rating)
                            ? "yellow"
                            : "gray"
                        }
                      />
                    </div>
                  );
                })}
                <span className="text-sm text-gray-500">
                  ({product?.reviews?.length} Reviews)
                </span>
                <span className="text-green-600 ml-2 font-medium">{`${
                  product?.stock > 0 ? "In Stock" : "Out of Stock"
                } `}</span>
              </div>
            </div>

            <div className="text-xl font-bold flex items-center gap-2">
              {" "}
              ${" "}
              {finalPrice ? (
                finalPrice.toFixed(2)
              ) : (
                <Loader className="w-4 h-4 animate-spin " />
              )}
            </div>
            <p className="text-gray-700 text-sm">{product?.description}</p>
            {product?.category[0] === "fruits" ? (
              " "
            ) : (
              <div>
                <div className="space-y-2">
                  <Label>Colours:</Label>
                  <div className="flex gap-2">
                    {colors.map((color, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border ${color} cursor-pointer`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Size:</Label>
                  <div className="flex gap-2">
                    {sizes.map((size, i) => (
                      <Button key={i} variant="outline" size="sm">
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className={
                    "bg-amber-100 text-black font-extrabold text-3xl pb-1 hover:bg-amber-200"
                  }
                >
                  -
                </Button>
                <Input
                  type="number"
                  className="w-14 text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <Button
                  size="sm"
                  onClick={() => setQuantity((q) => q + 1)}
                  className={
                    "bg-red-500 text-black font-extrabold text-2xl pb-1 hover:bg-red-600"
                  }
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => {
                  dispatch(addToCart(product));
                  navigate("/cart");
                }}
                className="px-6 cursor-pointer bg-red-500"
              >
                Buy Now
              </Button>
            </div>

            <Card>
              <CardContent className=" space-y-2 text-sm">
                <div className="border p-5">
                  <div className="flex items-center gap-3">
                    <img src="/Vector.png" alt="" />
                    <p className="font-medium">Free Delivery</p>
                  </div>
                  <input
                    className="pl-11 font-bold mt-4 py-3 w-full"
                    placeholder="Enter your postal code for delivery availability"
                  />
                </div>
                <div className="border p-5">
                  <div className=" flex items-center gap-3">
                    <img src="/Icon-return.png" alt="" />
                    <p className="font-medium">Return Delivery</p>
                  </div>
                  <p className="pl-11 font-bold">{product?.returnPolicy}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductDetail;
