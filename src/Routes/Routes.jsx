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
import Payment from "../Components/CheckoutForm/Payment";
import ExpiredSubscription from "../Pages/ExpiredSubscription/ExpiredSubscription";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyArticles from "../Pages/MyArticles/MyArticles";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PremiumRoute from "./PremiumRoute/PremiumRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "myArticles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "articlesDetails/:id",
        element: <ArticlesDetails />,
        loader: ({ params }) =>
          fetch(
            `https://daily-lens-backend.vercel.app/approvedArticles/${params.id}`
          ),
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
        path: "profilePage",
        element: <ProfilePage />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "expiredSubscription",
        element: <ExpiredSubscription />,
      },
      {
        path: "premiumArticles",
        element: (
          <PremiumRoute>
            <PremiumArticles />
          </PremiumRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "addPublisher",
        element: (
          <AdminRoute>
            <AddPublisher />
          </AdminRoute>
        ),
      },
      {
        path: "allArticles",
        element: (
          <AdminRoute>
            <AllArticlesAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
