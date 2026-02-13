import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const navigate = useNavigate();
  // This will give an access to the error message thrown by loader, action, rendering component
  const error = useRouteError();

  // Handle different error types
  const getErrorMessage = () => {
    if (error?.status === 404) {
      return "We couldn't find the page you're looking for.";
    }
    if (error?.status === 500) {
      return 'Server error. Please try again later.';
    }
    return error?.data || error?.message || 'Something went wrong!';
  };

  const getErrorTitle = () => {
    if (error?.status === 404) {
      return '404 - Page Not Found';
    }
    if (error?.status === 500) {
      return '500 - Server Error';
    }
    return 'Oops! Something went wrong 😢';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <h1 className="mb-4 text-4xl font-bold text-stone-800">
            {getErrorTitle()}
          </h1>
          <p className="text-lg text-stone-600">{getErrorMessage()}</p>
        </div>

        {process.env.NODE_ENV === 'development' && error?.stack && (
          <details className="mb-6 text-left">
            <summary className="mb-2 cursor-pointer text-sm font-semibold text-stone-700">
              Error Details (Dev Only)
            </summary>
            <pre className="overflow-auto rounded-lg bg-red-50 p-4 text-xs text-red-800">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex justify-center gap-4">
          <LinkButton to="-1">&larr; Go back</LinkButton>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
