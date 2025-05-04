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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: [],
    brand: "",
    thumbnailUrl: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, thumbnailUrl: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const createProductHandler = async () => {
    if (
      !input.title ||
      !input.description ||
      !input.price ||
      !input.stock ||
      !input.category ||
      !input.brand ||
      !input.thumbnailUrl
    ) {
      return "ALL Field are required to craete the product";
    }
    try {
        setLoading(true)
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("stock", input.stock);
      formData.append("category", input.category);
      formData.append("brand", input.brand);
      formData.append("thumbnailUrl", input.thumbnailUrl);
      const res = await axios.post(
        `${PRODUCT_API_END_POINT}/create`,
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
        <div className="flex-col  space-y-3">
          <Label>Category</Label>
          <Select
            className={""}
            // defaultValue={input.category}
            onValueChange={selectCategory}
          >
            <SelectTrigger className="w-[180px] bg-gray-100">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className={"bg-gray-100"}>
              <SelectItem value="Woman's Fashion">Woman's Fashion</SelectItem>
              <SelectItem value="Men's Fashion">Men's Fashion</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Home & Lifestyle">Home & Lifestyle</SelectItem>
              <SelectItem value="Medicine">Medicine</SelectItem>
              <SelectItem value="Sports & Outdoor">Sports & Outdoor</SelectItem>
              <SelectItem value="Baby's & Toys">Baby's & Toys</SelectItem>
              <SelectItem value="Groceries & Pets">Groceries & Pets</SelectItem>
              <SelectItem value="Health & Beauty">Health & Beauty</SelectItem>
            </SelectContent>
          </Select>
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
          <Label htmlFor="thumnbnail">Upload Thumbnail</Label>
          <Input type={"file"} accept={"image/*"} onChange={selectThumbnail} />
          {previewThumbnail && (
            <img src={previewThumbnail} className="w-50 my-2" alt="Thumbnail" />
          )}
        </div>
        <div className="flex gap-4">
          <Button className={"cursor-pointer"}
            onClick={() => navigate("/admin/adminProducts")}
            variant="outline"
          >
            Cancel
          </Button>
          <Button className={"cursor-pointer"} disabled={loading} onClick={createProductHandler}>
            {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
