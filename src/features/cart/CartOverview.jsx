import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCartTotalQuantity } from './cartSlice';
import { getCartTotalPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers.js';

function CartOverview() {
  const cartQuantity = useSelector(getCartTotalQuantity);

  const totalCartPrice = useSelector(getCartTotalPrice);

  // If not items available in the cart
  if (cartQuantity === 0) return null;

  return (
    <div className="flex items-center  justify-between bg-stone-800 p-4 text-center text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-6">
        <span>{String(cartQuantity).padStart(2, '0')} items</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
