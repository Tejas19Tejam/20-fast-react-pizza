import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import CreateOrder, {
  action as createNewOrder,
} from './features/order/CreateOrder/';
import MyOrders, { loader as myOrdersLoader } from './features/order/MyOrders';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import CreateOrderError from './features/order/CreateOrderError';

// Creating Routers
// New way to create an route
// from v6.4

const router = createBrowserRouter([
  {
    // Layout Route
    element: <AppLayout />,
    // Error Handling : Error that happen in children route they will bubble up to the parent route unless it's handle in route itself , Hence need to handle it here
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        // Step 2 : Providing Loader to component
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <CreateOrderError />,
        action: updateOrderAction,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createNewOrder,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
        loader: myOrdersLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
