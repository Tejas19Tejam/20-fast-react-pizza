const API_URL = import.meta.env.VITE_API_URL;

export async function getMenu() {
  const res = await fetch(`${API_URL}/menus`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/orders/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function getCurrentUserOrders(phone, username) {
  const res = await fetch(`${API_URL}/orders/customer/${username}/${phone}`);
  if (!res.ok)
    throw Error(
      `Couldn't find order with phone ${phone} and username ${username}`,
    );

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // Try to parse error response from backend
      const errorData = await res.json();
      const error = new Error(
        errorData.message || 'Failed updating your order',
      );
      error.status = res.status;
      error.data = errorData;
      throw error;
    }
    // We don't need the data, so we don't return anything
  } catch (err) {
    // Re-throw if it's already our formatted error
    if (err.data) throw err;
    // Otherwise throw generic error
    throw Error('Failed updating your order');
  }
}
