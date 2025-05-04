import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "@/redux/cartSlice";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { items, totalQuantity, totalAmount } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shipping = 0;
  const total = totalAmount + shipping;

  console.log(items, totalQuantity, totalAmount);
  // useEffect(()=>{
  // dispatch(clearCart())
  // },[])

  return (
    <div className="p-6 space-y-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="flex items-center gap-4 ">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-12 h-12 rounded"
                />
                <span>{item.name}</span>
              </TableCell>
              <TableCell>${item.price}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="bg-gray-200 cursor-pointer px-2 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: item._id,
                          price: item.price,
                          name: item.name,
                          thumbnail: item.thumbnail,
                        })
                      )
                    }
                    className="bg-gray-200 px-2 py-1 cursor-pointer rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex flex-col gap-4">
          <Button className={"cursor-pointer"} variant="outline" onClick={() => navigate("/")}>
            Return To Shop
          </Button>
          <div className="flex items-center gap-2">
            <Input placeholder="Coupon Code" className="w-48" />
            <Button className="bg-red-500 hover:bg-red-600">
              Apply Coupon
            </Button>
          </div>
        </div>

        <div className="border p-4 rounded w-full max-w-sm">
          <h2 className="text-lg font-bold mb-4">Cart Total</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${Number(total.toFixed(2))}</span>
          </div>
          <Button onClick={()=>navigate("/checkout")} className="w-full bg-red-500 cursor-pointer hover:bg-red-600">
            Process to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
