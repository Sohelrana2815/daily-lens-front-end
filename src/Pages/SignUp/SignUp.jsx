import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
const SignUp = () => {
  // auth
  const { createNewUser, updateUserProfile } = useAuth();

  const { handleSubmit, register, reset } = useForm();
  const onSubmit = (data) => {
    const { name, photoURL, email, password } = data;

    // Register/Sign up

    createNewUser(email, password).then((result) => {
      console.log(result.user);

      // Now update the profile
      updateUserProfile(name, photoURL).then((nameANDPhoto) => {
        console.log("user profile updated successfully!", nameANDPhoto);

        if ((name, photoURL)) {
          alert("Successfully updated the user profile");
          reset();
        }
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
                  {...register("photoURL", { required: true })}
                />
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
                  {...register("password", { required: true })}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
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
