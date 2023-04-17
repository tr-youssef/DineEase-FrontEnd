import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Manager from "./pages/manager/Manager.jsx";
import Menu from "./pages/manager/menu/Menu.jsx";
import Tables from "./pages/manager/tables/Tables.jsx";
import Users from "./pages/manager/users/Users.jsx";
import Category from "./pages/manager/menu/category/Category.jsx";
import "./index.css";
import Login from "./login.jsx";

const router = createBrowserRouter([
  {  path: "/login",
    element: <Login />},
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "manager",
        element: <Manager />,
        children: [
          {
            path: "/manager/menu",
            element: <Menu />,
          },
          {
            path: "/manager/menu/addcategory",
            element: <Category />,
          },
          {
            path: "/manager/menu/editcategory/:id",
            element: <Category />,
          },
          {
            path: "/manager/tables",
            element: <Tables />,
          },
          {
            path: "/manager/users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
