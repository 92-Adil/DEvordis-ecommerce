import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./layout/MainLayout";
import HeroSection from "./pages/HeroSection";
import FlashSales from "./pages/FlashSales";
import Categories from "./pages/Categories";
import BestSellingSection from "./pages/BestSellingSection";
import Music from "./pages/Music";
import Products from "./pages/Products";
import NewArrival from "./pages/NewArrival";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EditProfile from "./pages/EditProfile";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import ContactRestApi from "./pages/ContactRestApi";
import SideBar from "./pages/admin/SideBar";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/UpdateOrder";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/editProduct";
import OrderList from "./pages/admin/OrderList";
import UpdateOrder from "./pages/admin/UpdateOrder";
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoutes";
import DeliverOrder from "./pages/DeliverOrder";
import PaymentSuccess from "./pages/PaymentSuccess";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <FlashSales />
            <Categories />
            <BestSellingSection />
            <Music />
            <Products />
            <NewArrival />
            <Features />
          </>
        ),
      },
      {
        path: "/login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/productdetail/:productId",
        element: <ProtectedRoute><ProductDetails /></ProtectedRoute>,
      },
      {
        path: "/cart",
        element: <ProtectedRoute><Cart /></ProtectedRoute>,
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute><Contact /></ProtectedRoute>
          
          // <ContactRestApi/>
        ),
      },
      {
        path: "/about",
        element: <ProtectedRoute><About /></ProtectedRoute>,
      },
      {
        path:"/payment-success",
        element:<ProtectedRoute><PaymentSuccess/></ProtectedRoute>
      },

      {
        path:"/deliverOrder",
        element:<ProtectedRoute><DeliverOrder/></ProtectedRoute>
      },
      {
        path: "/editprofile",
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
      },
      {
        path: "/checkout",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>,
      },
      {
        path: "/wishlist",
        element: <ProtectedRoute><Wishlist /></ProtectedRoute>,
      },
      {
        path: "*",
        element: <NotFound />,
      },

      //admin route start from where
      {
        path: "admin",
        element: <AdminRoute><SideBar /></AdminRoute>,
        children: [
          {
            path: "adminProducts",
            element: <AdminProducts />,
          },
          {
            path: "editProduct/:productId",
            element: <EditProduct />,
          },
          {
            path: "updateOrder/:orderId",
            element: <UpdateOrder />,
          },
          {
            path: "create",
            element: <CreateProduct />,
          },
          {
            path:"orderList",
            element:<OrderList/>
          }
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
