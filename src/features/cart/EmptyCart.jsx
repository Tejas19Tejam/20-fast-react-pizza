import { Link } from 'react-router-dom';
// import LinkButton from '../../ui/LinkButton';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-5">
      <div className="mb-8">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      </div>

      <p className=" mt-7 font-semibold">
        Your cart is still empty. Start adding some items :)
      </p>
    </div>
  );
}

export default EmptyCart;
