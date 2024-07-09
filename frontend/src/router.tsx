import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Layout from "./shared/components/layouts/Layout";
import AuthScreen from "./screens/AuthScreen";
import AuthLayout from "./shared/components/layouts/AuthLayout";
import TrackerScreen from "./screens/TrackerScreen";
import CampaignScreen from "./screens/CampaignScreen";

import AdminScreen from "./screens/admin/AdminScreen";
import ClientProviders from "./shared/components/providers/ClientProviders";
import Loading from "./shared/components/Loading";
import EmptyBox from "./shared/components/EmptyBox";
import StoreScreen from "./screens/StoreScreen";
import BlogScreen from "./screens/BlogScreen";
import BlogDetails from "./features/blog/components/BlogDetails";

import "./styles/scss/components/index.scss";
import CampaignDetails from "./features/campaign/components/CampaignDetails";
import CartScreen from "./screens/CartScreen";
import { Toaster } from "react-hot-toast";
import DonateScreen from "./screens/DonateScreen";
import EditCampaignForm from "./features/campaign/components/admin/EditCampaignForm";
import EditBlogForm from "./features/blog/components/admin/EditBlogForm";
import EditProductForm from "./features/product/components/admin/EditProductForm";
import ProductDetails from "./features/product/components/ProductDetails";
import { HistoryScreen } from "./screens/HistoryScreen";
import { StatisticScreen } from "./screens/StatisticScreen";
import { EditProfile } from "./features/user/components/EditProfile";
import { UserProfile } from "./features/user/components/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/profile/edit",
        element: <EditProfile />,
      },
      {
        path: "/profile/history",
        element: <HistoryScreen />,
      },
      {
        path: "/profile/statistic",
        element: <StatisticScreen />,
      },
      {
        path: "/carts",
        element: <CartScreen />,
      },
      {
        path: "/tracker",
        element: <TrackerScreen />,
      },
      {
        path: "/campaign",
        element: <CampaignScreen />,
      },
      {
        path: "/campaign/:name",
        element: <CampaignDetails />,
      },
      {
        path: "/campaign/edit/:name",
        element: <EditCampaignForm />,
      },
      {
        path: "/exchange",
        element: <StoreScreen />,
      },
      {
        path: "/product/edit/:id",
        element: <EditProductForm />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/blogs",
        element: <BlogScreen />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/blogs/edit/:id",
        element: <EditBlogForm />,
      },
      {
        path: "/donate",
        element: <DonateScreen />,
      },
      {
        path: "/admin",
        element: <AdminScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "*",
        element: (
          <EmptyBox redirectBtn>
            <h1>This page doesn't exist</h1>
          </EmptyBox>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <AuthScreen state="login" />,
      },
      {
        path: "register",
        element: <AuthScreen state="register" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientProviders>
      <Suspense fallback={<Loading />}>
        <Toaster />
        <RouterProvider router={router} />
      </Suspense>
    </ClientProviders>
  </React.StrictMode>
);
