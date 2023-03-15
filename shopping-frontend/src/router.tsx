import { createBrowserRouter } from "react-router-dom";
import LiveRequestPage from "./pages/support/LiveRequests";
import ProductPage from "./pages/user/ProductList";
import Product from "./pages/user/Product";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductPage />
  },
  {
    path: '/products/:id',
    element: <Product />
  },
  {
    path: '/support/live-requests',
    element: <LiveRequestPage />
  },
])
