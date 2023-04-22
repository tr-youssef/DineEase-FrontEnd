import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Manager from "./pages/manager/Manager.jsx";
import Menu from "./pages/manager/menu/Menu.jsx";
import Tables from "./pages/manager/tables/Tables.jsx";
import Users from "./pages/manager/users/Users.jsx";
import Category from "./pages/manager/menu/category/Category.jsx";
import Items from "./pages/manager/menu/items/Items.jsx";
import TakeOrder from "./pages/server/TakeOrder/TakeOrder.jsx";
import SignIn from "./pages/login/SignIn.jsx";
import Server from "./pages/server/Server.jsx";
import RequireAuth from "./utils/RequireAuth.jsx";
import AddForm from "./pages/manager/users/AddForm/AddForm.jsx"
import EditForm from "./pages/manager/users/EditForm/EditForm.jsx"


const router = createBrowserRouter([
  { path: "/signin", element: <SignIn /> },
  {
    path: "/",
    element: <RequireAuth children={<App />} isAllowed={"all"} />,
    children: [
      {
        path: "manager",
        element: <RequireAuth children={<Manager />} isAllowed={"manager"} />,
        children: [
          {
            path: "/manager/menu",
            element: <RequireAuth children={<Menu />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/menu/addcategory",
            element: <RequireAuth children={<Category />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/menu/editcategory/:id",
            element: <RequireAuth children={<Category />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/menu/additem/:id",
            element: <RequireAuth children={<Items />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/menu/edititem/:id",
            element: <RequireAuth children={<Items />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/tables",
            element: <RequireAuth children={<Tables />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/users",
            element: <RequireAuth children={<Users />} isAllowed={"manager"} />,
          },
          {
            path: "/manager/users/addEmployee",
            element: (
              <RequireAuth isAllowed={"manager"}>
                <AddForm />
              </RequireAuth>
            ),
          },
          {
            path: "/manager/users/editEmployee/:id",
            element: (
              <RequireAuth isAllowed={"manager"}>
                <EditForm />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: "server",
        element: <RequireAuth children={<Server />} isAllowed={"server"} />,
      },
      {
        path: "server/takeorder/:id",
        element: <RequireAuth children={<TakeOrder />} isAllowed={"server"} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
