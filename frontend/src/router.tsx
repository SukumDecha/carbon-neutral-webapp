import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Layout from "./shared/components/layouts/Layout";
import AuthScreen from "./screens/AuthScreen";
import AuthLayout from "./shared/components/layouts/AuthLayout";
import TrackerScreen from "./screens/TrackerScreen";
import ProductScreen from "./screens/ProductScreen";
import CampaignScreen from "./screens/CampaignScreen";
import UserProfile from "./features/user/components/UserProfile";
import AdminScreen from "./screens/admin/AdminScreen";
import ClientProviders from "./shared/components/providers/ClientProviders";
import Loading from "./shared/components/Loading";
import EmptyBox from "./shared/components/EmptyBox";
import StoreScreen from "./screens/StoreScreen";
import BlogScreen from "./screens/BlogScreen";
import BlogDetails from "./features/blog/components/BlogDetails";

import "./styles/scss/components/index.scss";
import CampaignDetails from "./features/campaign/components/CampaignDetails";
import DonateScreen from "./features/donate/components/DonateItem";
import CartScreen from "./screens/CartScreen";

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
        path: "/tracker",
        element: <TrackerScreen />,
      },
      {
        path: "/campaign",
        element: <CampaignScreen />,
      },
      {
        path: "/exchange",
        element: <StoreScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
        loader: () => fetch("http://localhost:3000/api/products"),
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
        path: "/campaigns",
        element: <CampaignScreen />,
      },
      {
        path: "/campaign/:id",
        element: <CampaignDetails />,
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
          <EmptyBox>
            <h1>This page doesn't existed</h1>
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
        <RouterProvider router={router} />
      </Suspense>
    </ClientProviders>
  </React.StrictMode>
);
