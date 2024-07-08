import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Layout from "./shared/components/layouts/Layout";
import AuthScreen from "./screens/AuthScreen";
import "./styles/scss/components/index.scss";
import AuthLayout from "./shared/components/layouts/AuthLayout";
import TrackerScreen from "./screens/TrackerScreen";
import ProductScreen from "./screens/ProductScreen";
import CampaignScreen from "./screens/CampaignScreen";
import UserProfile from "./features/user/components/UserProfile";
import ExchangeScreen from "./screens/ExchangeScreen";
import CreateScreen from "./screens/admin/AdminScreen";
import ClientProviders from "./shared/components/providers/ClientProviders";
import Loading from "./shared/components/Loading";
import EmptyBox from "./shared/components/EmptyBox";

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
        element: <ExchangeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
        loader: () => fetch("http://localhost:3000/api/products"),
      },
      {
        path: "/admin/create/:id",
        element: <CreateScreen />,
      },
      {
        path: "*",
        element: <EmptyBox />,
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
