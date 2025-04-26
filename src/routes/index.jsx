import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Subsciber";
import Admin from "../Pages/Dashboard/Admin";
import Category from "../Pages/Dashboard/PushNotification";
import Events from "../Pages/Dashboard/UpdatePassword";
import Banner from "../Pages/Dashboard/Banner";
import AboutUs from "../Pages/Dashboard/AboutUs";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import TermsAndConditions from "../Pages/Dashboard/TermsAndCondition";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import SubCategory from "../Pages/Dashboard/SubCategory";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import RetailerTable from "../Pages/Dashboard/Retailer";
import WholesealerTable from "../Pages/Dashboard/Wholesealer";
import SalesManagement from "../Pages/Dashboard/SalesManagement";
import Retailer from "../Pages/Dashboard/Retailer";
import SaleRepsManagement from "../Pages/Dashboard/SaleRepsManagement";
import ViewSalesReps from "../components/SalesRepsManagement/detailsSalesReps/ViewSalesReps";
import LoyaltyProgram from "../Pages/Dashboard/LoyaltyProgram";
import SubscriptionTable from "../components/subscriber/SubscriberTable";
import OrderManagementContainer from "../components/orderMangement/OrderManagementContainer";
import CategoryManagement from "../components/category/CategoryManagement";
import UserManagement from "../components/userMangement/UserManagement";
import ProductManagement from "../components/productManagement/ProductsManagement";
import FAQSection from "../components/faq/Faq";
import SubscriptionPackagePage from "../Pages/Dashboard/Subscription";
import PackagesPlans from "../Pages/Dashboard/Subscription";
import SubCategoryManagement from "../Pages/Dashboard/SubCategory";
import Contact from "../Pages/Dashboard/Contact";
import ColorManagement from "../components/colorManage/ColorManagement";
import SizeManagement from "../components/sizeManagement/SizeManagement";
// import SalesRepsManagementTable from "../components/SalesRepsManagement/SalesRepsManagement";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orderManagement",
        element: <OrderManagementContainer />,
      },
      {
        path: "/salesManagement",
        element: <SalesManagement />,
      },
      {
        path: "/retailer",
        element: <Retailer />,
      },
      {
        path: "/salesRepsManage",
        element: <SaleRepsManagement />,
      },
      {
        path: "/salesRepsManage/:id",
        element: <ViewSalesReps />,
      },
      {
        path: "/loyaltyProgram",
        element: <LoyaltyProgram />,
      },
      {
        path: "/subsciption",
        element: <SubscriptionTable />,
      },
      {
        path: "/category",
        element: <CategoryManagement />,
      },
      {
        path: "/color",
        element: <ColorManagement />,
      },
      {
        path: "/size",
        element: <SizeManagement />,
      },
      {
        path: "/products",
        element: <ProductManagement />,
      },
      {
        path: "/user",
        element: <UserManagement />,
      },
      {
        path: "/subscription",
        element: <PackagesPlans />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/faq",
        element: <FAQSection />,
      },
      // {
      //   path: "/sub-category",
      //   element: <SubCategoryManagement />,
      // },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
