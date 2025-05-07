import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
// import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {  updateUserProfile } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{loading,user}=useSelector(store=>store.auth)
  // const [loading, settLoading] = useState();
  const [input, setInput] = useState({
    name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
  });
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const onClickHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    // try {
    //   settLoading(true);
    //   const updatedUser = await axios.put(
    //     `${USER_API_END_POINT}/profile/update`,
    //     input,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   if (updatedUser.data.success) {
    //     dispatch(loginSuccess(updatedUser.data.user));
    //     toast.success(updatedUser.data.message);
    //     setInput({ name: "", email: "", phoneNumber: "", address: "" });
    //   }
    // } catch (error) {
    //   console.log("Error in edit profile handler", error);
    // } finally {
    //   settLoading(false);
    // }

    dispatch(updateUserProfile(input))
  };
  return (
    <div className="flex  p-6 bg-gray-50">
      <div className="w-64 space-y-6 pt-20 pr-10">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Manage My Account
          </h3>
          <ul className="space-y-1 text-sm">
            <li className="text-red-500 font-medium">My Profile</li>
            <li className="text-gray-600 hover:text-red-500 cursor-pointer">
              Address Book
            </li>
            <li className="text-gray-600 hover:text-red-500 cursor-pointer">
              My Payment Options
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            My Orders
          </h3>
          <ul className="space-y-1 text-sm">
            <li className="text-gray-600 hover:text-red-500 cursor-pointer">
              My Returns
            </li>
            <li className="text-gray-600 hover:text-red-500 cursor-pointer">
              My Cancellations
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            My Wishlist
          </h3>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl p-8 shadow">
        <h2 className="text-xl font-semibold text-red-500 mb-6">
          Edit Your Profile
        </h2>

        {/* Grid Layout for Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              onChange={onChangeHandler}
              value={input.name}
              name={"name"}
              id="name"
              placeholder="Adil"
              className="mt-1 bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              onChange={onChangeHandler}
              value={input.phoneNumber}
              name={"phoneNumber"}
              id="phoneNumber"
              placeholder="03095063244"
              className="mt-1  bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={onChangeHandler}
              value={input.email}
              name={"email"}
              id="email"
              placeholder="adil@gmail.com"
              className="mt-1 bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              onChange={onChangeHandler}
              value={input.address}
              name={"address"}
              id="address"
              placeholder="China Schem,Lahore"
              className="mt-1 bg-gray-100"
            />
          </div>
        </div>

        {/* <div className="my-8">
          <h3 className="text-base font-medium mb-4">Password Changes</h3>
          <div className="space-y-4">
            <Input placeholder="Current Password" type="password"  className={"bg-gray-100"}/>
            <Input placeholder="New Password" type="password" className={"bg-gray-100"}/>
            <Input placeholder="Confirm New Password" type="password" className={"bg-gray-100"}/>
          </div>
        </div> */}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={() => navigate("/")} variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={onClickHandler}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
