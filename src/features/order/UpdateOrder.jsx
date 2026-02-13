import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { useFetcher } from 'react-router-dom';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const { orderId } = params;
  const updateObj = { priority: true };
  await updateOrder(orderId, updateObj);
  return null;
}
