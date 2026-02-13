import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { removeItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeItem(pizzaId));
    toast.success('Item removed from cart');
  }

  return (
    <Button type="small" handleClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteItem;
