import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { addItem, getQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity.jsx';

function MenuItem({ pizza }) {
  // Destructuring object
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Using hooks
  const dispatch = useDispatch();
  const quantity = useSelector(getQuantityById(id));
  const isInCart = quantity > 0;

  // Handler functions
  function handleAddCart() {
    const item = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(item));
    toast.success(`${name} added to cart!`);
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={` h-24  ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-small capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-row items-center justify-between">
          {!soldOut ? (
            <p className=" text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className=" text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-2 md:gap-3 ">
              <UpdateItemQuantity currentQuantity={quantity} pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" handleClick={handleAddCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
