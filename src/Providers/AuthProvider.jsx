import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  // Google login

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // GitHub login

  const gitHubLogin = () => {
    setLoading(true);

    return signInWithPopup(auth, gitHubProvider);
  };

  // create a new user

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in user

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out user

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update user profile

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);

      if (currentUser) {
        // get token and set it in local storage.

        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((response) => {
          if (response.data.token) {
            localStorage.setItem("access-token", response.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  // auth related information for difference auth operations

  const authInfo = {
    user,
    loading,
    createNewUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    googleSignIn,
    gitHubLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
