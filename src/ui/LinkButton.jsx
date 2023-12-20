import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const styleClass = 'text-sm text-blue-500 hover:text-blue-600 ';

  if (to === '-1')
    return (
      <button className={styleClass} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={styleClass}>
      {children}
    </Link>
  );
}

export default LinkButton;
