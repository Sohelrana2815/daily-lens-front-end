import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import AddArticles from "../Pages/AddArticles/AddArticles";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import AddPublisher from "../Pages/Dashboard/AddPublisher/AddPublisher";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "addArticles",
        element: <AddArticles />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "addPublisher",
        element: <AddPublisher />,
      },
    ],
  },
]);

export default router;
