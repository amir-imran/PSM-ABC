import React, { useState } from "react";
import Icon from "../../components/Icon";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../config/firebase";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const MakeAdmin = () => {
  const [adminEmail, setAdminEmail] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const router = useRouter();

  const submitHandler = async () => {
    const addAdminRole = httpsCallable(functions, "addAdminRole");
    try {
      const result = addAdminRole({ email: adminEmail });
      console.log("result", result);
      enqueueSnackbar(`${adminEmail} is now admin`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (user.admin !== true) {
    setTimeout(() => {
      router.push("/");
    }, 2500);

    return (
      <div>
        <div className=" bg-black">
          <div className="container h-screen flex justify-center items-center">
            <div className="relative text-white text-2xl font-bold">
              Only admins can access this page, Redirecting you back to home...
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className=" bg-black">
          <div className="container h-screen flex justify-center items-center">
            <div className="relative">
              <div className="absolute top-4 left-3">
                <Icon
                  name="fa-search"
                  className="fa fa-search text-gray-400 z-20 hover:text-gray-500"
                />
              </div>
              <input
                type="email"
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                }}
                className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Make admin..."
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={submitHandler}
                  className="h-10 w-20 text-white rounded-lg bg-secondary hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MakeAdmin;
