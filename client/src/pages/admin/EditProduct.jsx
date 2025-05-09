import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    discountPercentage: "",
    sideImages: "",
    price: "",
    stock: "",
    brand: "",
  });
  // const [previewSideImages, setPreviewSideImages] = useState("");
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectSideImages = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const sideImagesArray = Array.from(files);
      sideImagesArray.forEach((file) => {
        setInput({ ...input, sideImages: file });
      });
    }
  };
  const editProductHandler = async () => {
    if (
      !input.title ||
      !input.description ||
      !input.price ||
      !input.stock ||
      !input.brand ||
      !input.thumbnailUrl
    ) {
      return "ALL Field are required to edit the product";
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("stock", input.stock);
      formData.append("discountPercentage", input.discountPercentage);
      formData.append("brand", input.brand);
      formData.append("sideImages", input.sideImages);
      const res = await axios.put(
        `${PRODUCT_API_END_POINT}/update/${params.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
      navigate("/admin/adminProducts");
    } catch (error) {
      console.log("Error in the creatin product handler is", error);
    } finally {
      setLoading(false);
    }
    console.log(input);
  };

  return (
    <div className="p-5">
      <div className=" flex-col space-y-6">
        <div className="flex-col space-y-3">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            onChange={changeEventHandler}
            name="title"
            value={input.title}
            placeholder="Title"
            className="mt-1 focus-visible:ring-0 bg-gray-100"
          />
        </div>
        <div className="flex-col space-y-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            onChange={changeEventHandler}
            value={input.description}
            className={"h-30 mt-1 focus-visible:ring-0 bg-gray-100"}
            id="description"
            placeholder="Enter Your Product Description where"
          />
        </div>
        <div className="flex-col space-y-3">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            onChange={changeEventHandler}
            name="price"
            value={input.price}
            placeholder="e.g:-200"
            className="mt-1 focus-visible:ring-0 bg-gray-100"
          />
        </div>

        <div className="flex-col space-y-3">
          <Label htmlFor="discountPercentage">Discounted Percentage Rate</Label>
          <Input
            id="discountPercentage"
            onChange={changeEventHandler}
            name="discountPercentage"
            value={input.discountPercentage}
            placeholder="e.g:-200"
            className="mt-1 focus-visible:ring-0 bg-gray-100"
          />
        </div>
        <div className="flex-col space-y-3">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            onChange={changeEventHandler}
            name="stock"
            value={input.stock}
            placeholder="e.g:- 200"
            className="mt-1 focus-visible:ring-0 bg-gray-100"
          />
        </div>

        <div className="flex-col space-y-3">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            onChange={changeEventHandler}
            value={input.brand}
            placeholder="Brand Name"
            className="mt-1 focus-visible:ring-0  bg-gray-100"
          />
        </div>
        <div className="flex-col space-y-3">
          <Label htmlFor="sideimages">Side Images</Label>
          <Input
            type={"file"}
            accept={"image/*"}
            onChange={selectSideImages}
            multiple
          />
        </div>
        <div className="flex gap-4">
          <Button
            className={"cursor-pointer"}
            onClick={() => navigate("/admin/adminProducts")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className={"cursor-pointer"}
            disabled={loading}
            onClick={editProductHandler}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
