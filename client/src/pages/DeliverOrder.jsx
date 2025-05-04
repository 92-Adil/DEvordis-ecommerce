import api from "@/api/axios";
import LoadingSpinner from "@/components/LoadingSpinner";
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
import { Textarea } from "@/components/ui/textarea";
import { getOrderOfUser } from "@/redux/orderSlice";
import { Edit2Icon, Loader2, Star, StarIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const DeliverOrder = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [rate, setRate] = useState(null);

  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);

  const { order, isLoading, isError } = useSelector((store) => store.order);

  const postReviewHandler = async (productId) => {
    try {
      setLoading(true);
      const res = await api.post(`review/${productId}`, {
        rating: rate,
        comment,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in the post review handler is ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getOrderOfUser());
  }, []);
  return (
    <div className="min-h-60">
      <Table>
        <TableCaption>
          A list of your Purchase and Deliver Successfully orders.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="">Deliver Status</TableHead>
            <TableHead className="">Give Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="flex w-screen gap-5 h-60 overflow-hidden text-red-400 font-bold justify-center items-center text-center ">
              <Loader2 className="h-15 w-15 animate-spin text-red-400" />
              Please Wait
            </div>
          ) : (
            order
              .filter((o) => o.isDelivered)
              .map((deliveredOrder) =>
                deliveredOrder.orderItems.map((item) => {
                  const product = item.product;
                  return (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          className={"w-20 h-20 object-cover"}
                          src={`${product.thumbnail}`}
                          alt=""
                        />
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>Order Deliver Successfully</TableCell>
                      <TableCell className="cursor-pointer">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setRate(0), setComment(null);
                              }}
                              className={"cursor-pointer"}
                            >
                              Give Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Give the Review of the Product
                              </DialogTitle>
                              <DialogDescription>
                                Make Sure give geniue Review about the product
                                Recommended give review after 1 week use minimum
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex  gap-5">
                                <Label
                                  htmlFor="rating"
                                  className="text-right pr-10"
                                >
                                  Rating
                                </Label>

                                {[...Array(5)].map((_, index) => {
                                  const currentRate = index + 1;
                                  return (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => setRate(currentRate)}
                                      >
                                        <Star
                                          size={20}
                                          fill={
                                            currentRate <= rate
                                              ? "yellow"
                                              : "gray"
                                          }
                                          color={
                                            currentRate <= rate
                                              ? "yellow"
                                              : "gray"
                                          }
                                        />
                                      </button>
                                    </>
                                  );
                                })}
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="comment" className="text-right">
                                  Comment
                                </Label>
                                <Textarea
                                  id="comment"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                dispatch={loading}
                                className={"cursor-pointer"}
                                onClick={() => postReviewHandler(product._id)}
                                type="submit"
                              >
                                {loading ? (
                                  <>
                                    <Loader2 className="mr-4 w-4 h-4 animate-spin" />
                                    Please Wait
                                  </>
                                ) : (
                                  "Post Review"
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeliverOrder;
