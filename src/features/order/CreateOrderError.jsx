import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function CreateOrderError() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Check if this is a "delivered order" error
  const isDeliveredError =
    error?.message?.includes('delivered') ||
    error?.message?.includes('completed');

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>

      <div className="max-w-2xl">
        {isDeliveredError ? (
          <>
            <h1 className="mb-4 text-2xl font-semibold">
              Order Already Delivered! ✅
            </h1>
            <p className="mb-6 text-stone-700">
              {error?.message ||
                'This order has already been completed and cannot be modified.'}
            </p>
            <p className="mb-8 text-sm text-stone-600">
              Your order has been successfully delivered. No further changes can
              be made.
            </p>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-2xl font-semibold text-red-700">
              Unable to Update Order
            </h1>
            <p className="mb-6 text-stone-700">
              {error?.message || 'Unable to update your order at this time.'}
            </p>
            <p className="mb-8 text-sm text-stone-600">
              Please try again or contact support if the problem persists.
            </p>
          </>
        )}

        <div className="space-x-4">
          <button
            onClick={() => navigate('/my-orders')}
            className="font-semibold uppercase tracking-wide text-amber-500 transition-colors hover:text-amber-600"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="font-semibold uppercase tracking-wide text-stone-600 transition-colors hover:text-stone-800"
          >
            Continue Shopping
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error?.stack && (
          <details className="mt-8">
            <summary className="cursor-pointer text-sm font-semibold text-stone-600">
              Developer Info
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-stone-100 p-4 text-xs text-stone-700">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default CreateOrderError;
