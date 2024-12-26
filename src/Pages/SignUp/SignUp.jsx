import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
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
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>Name field is required</span>}
              </div>
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>Email field is required</span>}
              </div>
              {/* photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter photo URL"
                  className="input input-bordered"
                  {...register("photoURL", {
                    required: true,
                  })}
                />
                {errors.name && <span>Photo URL field is required</span>}
              </div>
              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered"
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
                  <p className="text-error">{errors.password.message}</p>
                )}
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
                {err && <p className="text-red-500">{err}</p>}
              </div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
