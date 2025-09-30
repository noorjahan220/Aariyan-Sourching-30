"use client";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

import { FaSpinner } from "react-icons/fa"; 

const SocialLogIn = () => {
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {

    try {
      setLoading(true);

      const result = await googleSignIn();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        role: "user",
        registrationTime: new Date().toLocaleString(),
      };

      const res = await axiosSecure.post("/api/post-users", userInfo);

      if (res.data.insertedId) {
        toast.success("Account created successfully!");
        router.push("/myaccount");
      } else if (
        res.data.message === "You are already registered. Please log in."
      ) {
        const { data: existingUser } = await axiosSecure.get(
          `/api/user/${user.email}`
        );
        toast.success("Logged in successfully!");
        if (existingUser?.role === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/myaccount");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-center">

 

        <button
          onClick={handleGoogleSignIn}
          disabled={loading} 
          className="flex-1 py-3 px-4 border rounded-md bg-[#4285F4] text-white hover:bg-[#3574d6] transition-colors flex justify-center items-center disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? (

            <>
              <FaSpinner className="animate-spin mr-2" />
              Signing in...
            </>
          ) : (

            "Google"
          )}
        </button>

    </div>
  );
};

export default SocialLogIn;