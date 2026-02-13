import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { useFetcher } from 'react-router-dom';
import toast from 'react-hot-toast';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  // Show toast notification based on fetcher state
  if (fetcher.data && fetcher.state === 'idle') {
    toast.success('Order updated to priority!');
  }

  if (order.status === 'DELIVERED') {
    return null;
  }

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  try {
    const { orderId } = params;
    const updateObj = { priority: true };
    await updateOrder(orderId, updateObj);
    return { success: true };
  } catch (error) {
    // Re-throw to be caught by error boundary
    throw error;
  }
}
