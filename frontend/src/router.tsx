import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Layout from "./shared/components/layouts/Layout";
import AuthScreen from "./screens/AuthScreen";
import "./styles/scss/components/index.scss";
import AuthLayout from "./shared/components/layouts/AuthLayout";
import TrackerScreen from "./screens/TrackerScreen";
import TreeScreen from "./screens/TreeScreen";
import SeaSrceen from "./screens/SeaSrceen";
import FoodSrceen from "./screens/FoodSrceen";

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
        path: "/tracker",
        element:<TrackerScreen />
      },
      {
        path: "/tree",
        element:<TreeScreen/>
      },
      {
        path:"/sea",
        element:<SeaSrceen/>
      },
      {
        path:"/food",
        element:<FoodSrceen/>
      }
      // {
      //   path: "/applied",
      //   element: <AppliedJobs />,
      //   loader: () => fetch("../public/jobs.json"),
      // },
      // {
      //   path: "/blog",
      //   element: <Blog />,
      // },
      // {
      //   path: "job/:id",
      //   element: <JobDetails></JobDetails>,
      //   loader: () => fetch("../public/jobs.json"),
      // },
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
