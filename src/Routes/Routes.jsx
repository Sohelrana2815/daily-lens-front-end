import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import AddArticles from "../Pages/AddArticles/AddArticles";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import AddPublisher from "../Pages/Dashboard/AddPublisher/AddPublisher";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import AllArticlesAdmin from "../Pages/Dashboard/AllArticlesAdmin/AllArticlesAdmin";
import AllArticlesPublic from "../Pages/AllArticlesPublic/AllArticlesPublic";
import ArticlesDetails from "../Pages/ArticlesDetails/ArticlesDetails";
import Subscriptions from "../Pages/Subscriptions/Subscriptions";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Payment from "../Components/CheckoutForm/Payment";

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
        element: (
          <PrivateRoute>
            <AddArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "allArticles",
        element: <AllArticlesPublic />,
      },
      {
        path: "articlesDetails/:id",
        element: (
          <PrivateRoute>
            <ArticlesDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/approvedArticles/${params.id}`),
      },
      {
        path: "subscriptions",
        element: (
          <PrivateRoute>
            <Subscriptions />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment />,
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
      {
        path: "allArticles",
        element: <AllArticlesAdmin />,
      },
    ],
  },
]);

export default router;
