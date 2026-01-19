import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import AboutUs from "./Pages/AboutUs/AboutUs.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Services from "./Pages/OurServices/Services.jsx";
import Treatments from "./Pages/Treatments/Treatments.jsx";
import NewPatients from "./Pages/NewPatients/NewPatients.jsx";
import App from "./App.jsx";
import Layout from "./Layouts/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
      index:true,
        element: <App></App>,
      },

      {
        path: "/AboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/HomePage",
        element: <HomePage></HomePage>,
      },
      {
        path: "/Services",
        element: <Services></Services>,
      },
      {
        path: "/Treatments",
        element: <Treatments></Treatments>,
      },
      {
        path: "/NewPatients",
        element: <NewPatients></NewPatients>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
