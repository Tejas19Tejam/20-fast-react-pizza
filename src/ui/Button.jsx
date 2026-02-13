import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, handleClick }) {
  const base =
    ' text-sm inline-block disabled:cursor-not-allowed; rounded-full bg-yellow-500  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    rounded: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      'inline-block text-sm disabled:cursor-not-allowed; rounded-full border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:text-stone-800 focus:ring-stone-300 focus:ring-offset-2 px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (handleClick)
    return (
      <button
        disabled={disabled}
        className={styles[type]}
        onClick={handleClick}
      >
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
