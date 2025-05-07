import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Package, XCircle, Star, LogOut, Inbox, Truck } from "lucide-react";
import { Globe, Heart, ShoppingCart, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "./firebase";
// import { toast } from "sonner";
// import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {  logoutUser } from "@/redux/authSlice";
import { clearCart } from "@/redux/cartSlice";
import { Badge } from "./ui/badge";
import { clearWishlist } from "@/redux/wishlist";
import { setSearchQuery } from "@/redux/searchSlice";
export default function NavBar() {
  // const user=true
  const links = [
    { name: "Home", href: "#" },
    { name: "Contact", href: "#" },
    { name: "About", href: "#" },
    { name: "Sign Up", href: "#" },
  ];
  const [active, setActive] = useState("Home");
  const [query,setQuery]=useState("")
  // const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { items } = useSelector((store) => store.cart);

  //ye firebase se use fetch kiya tha
  // const fetchUserData = async () => {
  //   auth.onAuthStateChanged(async (usr) => {
  //     console.log(usr);
  //     const docRef = doc(db, "Users", usr.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setUser(docSnap.data());
  //       console.log(docSnap.data());
  //     } else {
  //       console.log("user is not loggin");
  //     }
  //   });
  // };
  //ye firbase se user logut kiya tha
  // const handleLogout = async () => {
  //   try {
  //     await auth.signOut();
  //     navigate("/login");
  //     console.log("Logout successfully");
  //     toast.success("Logout successFully");
  //     setUser(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const handleLogout = async () => {
    // const res = await axios.get(`${USER_API_END_POINT}/logout`);
    // navigate("/login");
    // // dispatch(setUser(null))
    // dispatch(logout());
    // dispatch(clearCart());
    // dispatch(clearWishlist());
    // toast.success(res.data.message);
    
    dispatch(logoutUser(navigate));
  };
  
  const searchHandler= async(e)=>{
    e.preventDefault();
    try {
      // console.log("Search query:", query);
      dispatch(setSearchQuery(query))
      navigate("/#Products")
      
    } catch (error) {
      console.log("Error in the searchHandler is this",error);
      
    }
  }
 
 

  return (
    <>
      <div className="bg-black text-white text-sm py-1 px-4 flex justify-between items-center">
        <p className="text-center w-3/4 lg:w-full  text-gray-200">
          Summer Sale For All Swim Suits And Free Express Delivery -{" "}
          <span className="font-bold text-purple-400">OFF 50%!</span>{" "}
          <span className="underline cursor-pointer">ShopNow</span>
        </p>
        <div className="absolute right-4 flex items-center ">
          <Select>
            <SelectTrigger className="w-[95px] border-none outline-none focus-visible:ring-0 ">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Urdu">Urdu</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex items-center justify-between py-4 px-6 shadow">
        <Link to={"/"}>
          <div className="text-xl font-bold">Exclusive</div>
        </Link>

        <div className="hidden md:flex gap-6 font-medium text-gray-700">
          {user?.role!=="admin"&&links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`${
                active === link.name
                  ? "border-b-2 border-black"
                  : "border-b-2 border-transparent"
              } hover:border-black transition-all`}
              onClick={() => {
                setActive(link.name);
                link.name === "Home"
                  ? navigate("/")
                  : navigate(`${link.name.split(" ").join("").toLowerCase()}`);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user?.role === "admin" ? (
            ""
          ) : (
            <>
              <div className="relative">
                <Input
                  placeholder="What are you looking for?"
                  name="search"
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 w-64 rounded-md border"
                />
                <Search onClick={searchHandler} className=" cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
              <Heart
                onClick={() => navigate("/wishlist")}
                className="cursor-pointer w-5 h-5"
              />
              <div onClick={() => navigate("/cart")} className="relative">
                <ShoppingCart className="cursor-pointer w-5 h-5 relative" />
                <div className="absolute -top-2 -right-2 w-3 h-3 font-extralight text-sm flex items-center justify-center bg-red-400 text-white rounded-full">
                  {items?.length}
                </div>
              </div>
            </>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-primary">
                  <AvatarImage src="/avatar.jpg" alt="User" />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white w-56 p-2 rounded-lg shadow-lg space-y-1"
              >
                {user.role === "admin" ? (
                  <DropdownMenuItem
                    onClick={() => navigate("/admin")}
                    className="gap-2 hover:bg-gray-700 rounded-md"
                  >
                    <User size={18} /> Dashboard
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/editprofile")}
                      className="gap-2 hover:bg-gray-700 rounded-md"
                    >
                      <User size={18} /> Manage My Account
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/cart")}
                      className="gap-2 hover:bg-gray-700 rounded-md"
                    >
                      <Inbox size={18} /> My Cart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>navigate('/deliverOrder')} className="gap-2 hover:bg-gray-700 cursor-pointer rounded-md">
                      <Truck size={18} /> My Deliver orders
                    </DropdownMenuItem>
                   
                  </>
                )}

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="gap-2 hover:bg-gray-700 rounded-md text-red-400"
                >
                  <LogOut size={18} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
}
