import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function NotFound() {
  // This will give an access to the error message thrown by loader , action , rendering component
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
