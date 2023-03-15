import { createBrowserRouter } from "react-router-dom";
import UserLiveMeeting from "./pages/user/LiveMeeting";
import LiveRequestPage from "./pages/support/LiveRequests";
import ProductPage from "./pages/user/ProductList";
import SupportLiveMeeting from "./pages/support/LiveMeeting";
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
  {
    path: '/support/live-meeting/:meeting_id',
    element: <SupportLiveMeeting />
  },
  {
    path: '/live-meeting/:meeting_id',
    element: <UserLiveMeeting />
  },
])
