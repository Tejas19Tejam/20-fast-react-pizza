import { Link, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getCurrentUserOrders } from '../../services/apiRestaurant';
import store from '../../store';

function MyOrders() {
  const orders = useLoaderData();

  if (!orders || orders.length === 0) {
    return (
      <div className="px-4 py-6">
        <h2 className="mb-6 text-xl font-semibold">My Orders</h2>
        <p className="text-stone-600">
          You haven't placed any orders yet. Start by browsing our{' '}
          <Link to="/menu" className="text-blue-500 hover:text-blue-600">
            menu
          </Link>
          !
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => {
          const {
            id,
            status,
            priority,
            priorityPrice,
            orderPrice,
            estimatedDelivery,
            cart,
          } = order;
          const deliveryIn = calcMinutesLeft(estimatedDelivery);

          return (
            <div
              key={id}
              className="space-y-4 rounded-lg border border-stone-200 bg-stone-50 p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  to={`/order/${id}`}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Order #{id}
                </Link>

                <div className="space-x-2">
                  {priority && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-red-50">
                      Priority
                    </span>
                  )}
                  <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-green-50">
                    {status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-stone-100 px-4 py-3">
                <p className="text-sm font-medium">
                  {deliveryIn >= 0
                    ? `Only ${deliveryIn} minutes left 😃`
                    : 'Order should have arrived'}
                </p>
                <p className="text-xs text-stone-500">
                  {formatDate(estimatedDelivery)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-stone-700">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </p>
                <ul className="space-y-1">
                  {cart.map((item) => (
                    <li
                      key={item.pizzaId}
                      className="flex justify-between text-sm text-stone-600"
                    >
                      <span>
                        {item.quantity}× {item.name}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-stone-200 pt-3">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Pizza price:</span>
                  <span>{formatCurrency(orderPrice)}</span>
                </div>
                {priority && (
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Priority price:</span>
                    <span>{formatCurrency(priorityPrice)}</span>
                  </div>
                )}
                <div className="mt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(orderPrice + priorityPrice)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Loader function to fetch current user's orders
export async function loader() {
  const state = store.getState();
  const { phone } = state.user;

  if (!phone) {
    return [];
  }

  try {
    const orders = await getCurrentUserOrders(phone);
    return orders;
  } catch (error) {
    // Return empty array if no orders found
    return [];
  }
}

export default MyOrders;
