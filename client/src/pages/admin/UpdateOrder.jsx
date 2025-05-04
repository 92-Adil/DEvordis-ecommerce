import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ORDER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Edit2Icon, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateOrder = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [deliver, setDeliver] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateHandler = async () => {
    try {
      setLoading(true);
      if (order.isPaid) {
        const res = await axios.post(
          `${ORDER_API_END_POINT}/updateOrderStatus/${order._id}`,
          { isDelivered: deliver },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setReload((prev) => !prev);
        }
      }else{
        toast.error("Paid is not complete")
      }
    } catch (error) {
      console.log("Error in the update handler is ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${ORDER_API_END_POINT}/getOrderById/${params.orderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOrder(res.data.order), setDeliver(res.data.order.isDelivered);
      })
      .catch((error) => console.log(error));
  }, [reload]);

  return (
    <div className="p-5">
      <div className="">
        <h1 className="font-extrabold text-2xl text-center">
          Shipping Address Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-6">
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Name:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.name}
            </h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Email:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.email}
            </h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Address:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.address}
            </h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">City:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.city}
            </h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Postal Code:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.postalCode}
            </h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Country:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.country}
            </h2>
          </div>
          <div className="flex items-center col-span-2 ">
            <h1 className="font-bold text-xl pr-3 ">Phone Number:</h1>
            <h2 className="font-medium text-lg">
              {order?.shippingAddress?.phoneNumber}
            </h2>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="font-extrabold text-2xl text-center">
          Customer/User Info Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-6">
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Name:</h1>
            <h2 className="font-medium text-lg">{order?.userId?.name}</h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Email:</h1>
            <h2 className="font-medium text-lg">{order?.userId?.email}</h2>
          </div>
          <div className="flex items-center ">
            <h1 className="font-bold text-xl pr-3 ">Address:</h1>
            <h2 className="font-medium text-lg">{order?.userId?.address}</h2>
          </div>

          <div className="flex items-center col-span-2 ">
            <h1 className="font-bold text-xl pr-3 ">Phone Number:</h1>
            <h2 className="font-medium text-lg">
              {order?.userId?.phoneNumber}
            </h2>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="font-extrabold text-2xl text-center">
          Order Items Info Details
        </h1>

        <Table>
          <TableCaption>A list of your Order Items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Thumbnail</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead>Items Quantity</TableHead>
              <TableHead> Price</TableHead>
              {/* <TableHead className="">Payment Status</TableHead>
                <TableHead className="">Update Status</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody className={"mt-10"}>
            {order?.orderItems?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <img
                    className="w-8 h-8 object-cover"
                    src={`${item?.product?.thumbnail}`}
                    alt=""
                  />
                </TableCell>
                <TableCell className="">{item?.product?.title}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>{item?.price}</TableCell>
                {/* <TableCell>{item.isPaid}</TableCell>
                  <TableCell className="cursor-pointer">
                    Edit
                    <Edit2Icon
                  
                    />
                  </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" flex-col space-y-6">
        <h1 className="font-extrabold text-2xl text-center">
          Update the Deliver Status
        </h1>
        <div className="flex items-center ">
          <h1 className="font-bold text-xl pr-3 ">Is Items Paid Status?:</h1>
          <h1 className="font-medium text-lg">{order?.paymentStatus}</h1>
        </div>
        <div className="flex items-center ">
          <h1 className="font-bold text-xl pr-3 ">Is Items Deliverd?:</h1>
          <h1 className="font-medium text-lg">{`${order?.isDelivered}`}</h1>
        </div>
        <div className="flex items-center ">
          <h1 className="font-bold text-xl pr-3 ">
            Update the Delivered Status:
          </h1>
          <h1 className="font-medium text-lg flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit2Icon size={"20"} /> Update
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Status</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deliver" className="text-right">
                      Deliver Status
                    </Label>
                    <Input
                      id="deliver"
                      value={deliver}
                      onChange={(e) => setDeliver(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={loading}
                    onClick={updateHandler}
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-4" />
                        Please Wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
