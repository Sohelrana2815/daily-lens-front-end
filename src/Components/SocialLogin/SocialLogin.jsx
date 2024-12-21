import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn, gitHubLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGitHubLogin = () => {
    gitHubLogin()
      .then((result) => {
        console.log(result.user);
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
