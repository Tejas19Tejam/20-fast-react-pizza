import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const username = useSelector((store) => store.user.username);

  const [query, setQuery] = useState('');
  // Navigate to another route
  const navigate = useNavigate();

  // Submit order ID
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    // Navigate to '/order/54553' route
    navigate(`/order/${query}`);
    setQuery('');
  }

  if (!username) return null;

  return (
    <form onSubmit={handleSubmit}>
      {/* To search Order ID  */}
      <input
        placeholder="Search order ID "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
