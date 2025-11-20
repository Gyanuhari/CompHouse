import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFoundPage from "../errors/NotFoundPage";
import ErrorPage from "../errors/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "/catalog",
        Component: Catalog,
      },
      {
        path: "/catalog/:id",
        Component: ProductDetails,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/error",
        Component: ErrorPage,
      },
      {
        path: "/server-error",
        Component: ServerErrorPage,
      },
      {
        path: "/not-found",
        Component: NotFoundPage,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
