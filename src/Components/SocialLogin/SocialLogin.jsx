import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { googleSignIn, gitHubLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          subscriptionPeriod: null,
        };

        // Make a POST request to save the user data

        axiosPublic.post("/users", userData).then((response) => {
          console.log("User data posted successfully:", response.data);
          if (response.data.insertedId) {
            setTimeout(() => {
              navigate("/");
            }, 500);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sign up successfully",
              timer: 6000,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGitHubLogin = () => {
    gitHubLogin()
      .then((result) => {
        console.log(result.user);
        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          subscriptionPeriod: null,
        };

        // Make a POST request to save the user data

        axiosPublic.post("/users", userData).then((response) => {
          console.log("User data posted successfully:", response.data);
          if (response.data.insertedId) {
            setTimeout(() => {
              navigate("/");
            }, 500);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sign up successfully",
              timer: 6000,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <button
          className="btn btn-outline rounded-md"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-lg" />
          Continue With Google
        </button>
        <button
          className="btn btn-outline rounded-md"
          onClick={handleGitHubLogin}
        >
          <FaGithub className="text-lg" />
          Continue With GitHub
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
