import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import signUpImg from "../../assets/Sign up/singup.png";
const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [err, setErr] = useState("");
  // auth
  const { createNewUser, updateUserProfile, signOutUser } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { name, photoURL, email, password } = data;

    // Register/Sign up

    createNewUser(email, password)
      .then(() => {
        // Now update the profile
        updateUserProfile(name, photoURL).then(() => {
          const userData = {
            email: email,
            name: name,
            photoURL: photoURL,
            subscriptionPeriod: null,
            isAdmin: null,
          };
          // Make a POST request to save the user data

          axiosPublic.post("/users", userData).then((response) => {
            console.log("User data posted successfullyL:", response.data);
            if (response.data.insertedId) {
              signOutUser();

              setTimeout(() => {
                navigate("/signIn");
              }, 500);

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign up successfully",
                text: "Please login to continue",
                timer: 6000,
              });
              // Reset the form after successful user creation
              reset();
            }
          });
        });
      })
      .catch((error) => {
        setErr("Something went wrong please try again");
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to save user data",
          showConfirmButton: true,
        });
      });
  };
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-800 dark:text-gray-500 p-4 gap-x-2 gap-y-4">
        {/* Image Section */}
        <div className="w-full lg:w-1/3  lg:h-auto flex justify-center items-center">
          <img
            src={signUpImg}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-gray-600 font-volKHob">
            Create an Account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 dark:text-gray-600"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  Name field is required
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  Email field is required
                </span>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter photo URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL && (
                <span className="text-red-500 text-sm">
                  Photo URL field is required
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must not exceed 20 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/,
                    message:
                      "Password must include an uppercase letter, a special character, and a number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Sign Up
            </button>

            {/* Social Login */}
            <SocialLogin />

            {/* Login Redirect */}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/signIn" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
