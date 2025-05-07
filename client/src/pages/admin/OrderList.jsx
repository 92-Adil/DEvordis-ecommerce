import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ORDER_API_END_POINT } from "@/utils/constant.js";
import axios from "axios";
import { Edit2Icon, Loader2, Trash2 } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ORDER_API_END_POINT}/getAllOrders`, { withCredentials: true })
      .then((res) => setOrders(res.data.orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Order Places.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Email</TableHead>
            <TableHead>Order Items</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="">Payment Status</TableHead>
            <TableHead className="">Deliver Status</TableHead>
            <TableHead className="">Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={"mt-10"}>
          {loading ? (
            <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex flex-col justify-center items-center text-red-500 text-2xl">
                <Loader2 className="animate-spin w-20 h-20 text-red-400" />
                Please wait
              </div>
            </TableCell>
          </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="">{order.userId.email}</TableCell>
                <TableCell>{order.orderItems.length}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{`${order.paymentStatus}`}</TableCell>
                <TableCell>{`${order.isDelivered}`}</TableCell>
                <TableCell className="cursor-pointer">
                  <Edit2Icon
                    onClick={() => navigate(`/admin/updateOrder/${order._id}`)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
