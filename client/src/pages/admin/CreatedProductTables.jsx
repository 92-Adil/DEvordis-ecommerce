import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductById, fetchAllProducts } from "@/redux/productSlice";
// import { PRODUCT_API_END_POINT } from "@/utils/constant.js";
// import axios from "axios";
import {
  BracketsIcon,
  Delete,
  DeleteIcon,
  Edit2Icon,
  Loader2,
  ShoppingBasketIcon,
  Trash2,
} from "lucide-react";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { toast } from "sonner";

const CreatedProductTables = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  let { products } = useSelector((store) => store.product);
  let { isLoading: loading } = useSelector((store) => store.product);
  // const [reload, setReload] = useState(false);
  // const [loading, setLoading] = useState(false);
  //   const navigate=useNavigate()
  // useEffect(() => {
  //   setLoading(true)
  //   axios
  //     .get(`${PRODUCT_API_END_POINT}/getProducts`)
  //     .then((res) => setProducts(res.data.products))
  //     .catch((err) => console.log("Error in the fecting all products is", err))
  //     .finally(()=>setLoading(false));
  // }, [reload]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  // const deleteProductHandler = async (productId) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.delete(
  //       `${PRODUCT_API_END_POINT}/deleteProductById/${productId}`
  //     );
  //     if (res.data.success) {
  //       setReload((prev) => !prev);
  //       toast.success(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error in the deleting the product is", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteProductHandler = (productId) => {
    dispatch(deleteProductById(productId));
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
            products.map((product) => (
              <TableRow key={product._id}>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreatedProductTables;
