import { Outlet, useNavigation, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  // Create loading indicator for entire application
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const location = useLocation();

  // Get username and phone from Redux store
  const { username, phone } = useSelector((store) => store.user);

  // Redirect to home if username or phone not found and user is trying to create an order
  if ((!username || !phone) && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }
  return (
    <div className=" grid h-screen  grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}

      <Header />
      <div className="overflow-scroll">
        <main className="">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
