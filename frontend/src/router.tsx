import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Layout from "./shared/components/layouts/Layout";
import AuthScreen from "./screens/AuthScreen";
import "./styles/scss/components/index.scss";

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
        path: "/auth",
        element: <AuthScreen />,
      },
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
