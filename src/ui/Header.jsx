import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import { useSelector } from 'react-redux';

function Header() {
  const username = useSelector((store) => store.user.username);
  return (
    <header className=" flex items-center   justify-between  border-b border-stone-600 bg-amber-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="font-semibold tracking-widest ">
        Fast React Pizza Co.
      </Link>

      {username && (
        <div className="flex items-center gap-8 ">
          <SearchOrder />
          <Link
            to="/my-orders"
            className="text-sm font-medium  capitalize text-stone-800 transition-colors hover:text-stone-700"
            title="My Orders"
          >
            My Orders
          </Link>
          <Username />
        </div>
      )}
    </header>
  );
}

export default Header;
