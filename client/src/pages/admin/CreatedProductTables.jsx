import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRODUCT_API_END_POINT } from "@/utils/constant.js";
import axios from "axios";
import {
  BracketsIcon,
  Delete,
  DeleteIcon,
  Edit2Icon,
  Loader2,
  ShoppingBasketIcon,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CreatedProductTables = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const navigate=useNavigate()
  useEffect(() => {
    axios
      .get(`${PRODUCT_API_END_POINT}/getProducts`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log("Error in the fecting all products is", err));
  }, [reload]);
  const deleteProductHandler = async (productId) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${PRODUCT_API_END_POINT}/deleteProductById/${productId}`
      );
      if (res.data.success) {
        setReload((prev) => !prev);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in the deleting the product is", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Table>
        <TableCaption>A list of your recent Created Products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="">Edit</TableHead>
            <TableHead className="">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow>
              <TableCell className="">
                <img
                  className="w-8 h-8 object-contain"
                  src={product.thumbnail}
                  alt=""
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell className="">
                <Link to={`/admin/editProduct/${product._id}`}>
                  <Edit2Icon />
                </Link>
              </TableCell>
              <TableCell className="cursor-pointer">
                
                  <Trash2 onClick={() => deleteProductHandler(product._id)} />
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreatedProductTables;
