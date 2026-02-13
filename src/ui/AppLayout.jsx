import { Outlet, useNavigation, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
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

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#374151',
          },
        }}
      />

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
