import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // Step 3 : Providing data received from API to the page .
  // Returns the loader data for the nearest ancestor Route loader
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Step 1 : Creating Loader
// Render as you fetch
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
