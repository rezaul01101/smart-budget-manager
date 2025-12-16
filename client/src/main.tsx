import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import App from "./App";
import Login from "./pages/auth/Login";
import Providers from "./lib/Providers";
import ProtectedLayout from "./lib/ProtectedLayout";
import Dashboard from "./pages/protected/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // Protected routes
      {
        element: <ProtectedLayout />, // ✅ All nested routes protected
        children: [
          { path: "dashboard", element: <Dashboard /> },
          // { path: "profile", element: <Profile /> },
          // { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
