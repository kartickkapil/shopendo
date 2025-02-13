import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import PageContainer from "./features/layout/page-container";
import Products from "./pages/products";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    errorElement: (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-base font-medium">Oops! Page not found</h2>
        <Link to="/" className="mt-2 text-sm font-medium text-green-500 hover:text-green-500">
          Back to shopping
        </Link>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "products/:productId/:productName",
        element: <div>Products detail</div>,
      },
      {
        path: "checkout",
        element: <div>Checkout</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
