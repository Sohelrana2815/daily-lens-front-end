import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signinImg from "../../assets/Sign up/login.svg";
const SignIn = () => {
  const [err, setErr] = useState("");
  const { signInUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("location in the login page", location);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
    const { email, password } = data;

    // Register/Sign up

    signInUser(email, password)
      .then(async (result) => {
        console.log(result.user);

        // Now update the profile
        updateUserProfile();

        // Navigate after login
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        setErr("Email or Password invalid, please try again");
        console.log(error);
      });
  };
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-800 dark:text-gray-500 p-4 gap-x-2 gap-y-4">
        {/* Image Section */}
        <div className="w-full lg:w-1/3  lg:h-auto flex justify-center items-center">
          <img
            src={signinImg}
            alt="Sign In"
            className="w-full h-full object-cover  lg:max-h-full rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg lg:ml-8">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Login
              </button>
            </div>

            {/* Error Message */}
            {err && <p className="text-red-500 text-sm mt-2">{err}</p>}

            {/* Sign Up Redirect */}
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link to="/signUp" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
