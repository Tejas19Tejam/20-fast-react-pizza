import { describe, expect, it, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import cartReducer, {
  addItem,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotalPrice,
  getCartTotalQuantity,
} from './cartSlice';

describe('Cart - Total Price Calculation', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      cart: [],
    };
  });

  it('should calculate the current total cart price', () => {
    // Add first item
    let state = cartReducer(
      initialState,
      addItem({
        pizzaId: 1,
        name: 'Margherita',
        quantity: 2,
        unitPrice: 12,
        totalPrice: 24,
      }),
    );

    // Add second item
    state = cartReducer(
      state,
      addItem({
        pizzaId: 2,
        name: 'Pepperoni',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
      }),
    );

    // Create store-like object to use with selector
    const store = { cart: state };

    // Calculate total price using selector
    const totalPrice = getCartTotalPrice(store);

    // Expected total: 24 + 15 = 39
    expect(totalPrice).toBe(39);
  });

  it('should return 0 when cart is empty', () => {
    const store = { cart: initialState };
    const totalPrice = getCartTotalPrice(store);

    expect(totalPrice).toBe(0);
  });

  it('should update total price when quantity increases', () => {
    // Add item
    let state = cartReducer(
      initialState,
      addItem({
        pizzaId: 1,
        name: 'Margherita',
        quantity: 1,
        unitPrice: 12,
        totalPrice: 12,
      }),
    );

    // Increase quantity
    state = cartReducer(state, increaseItemQuantity(1));

    const store = { cart: state };
    const totalPrice = getCartTotalPrice(store);

    // Expected: 2 * 12 = 24
    expect(totalPrice).toBe(24);
  });

  it('should update total price when quantity decreases', () => {
    // Add item with quantity 3
    let state = cartReducer(
      initialState,
      addItem({
        pizzaId: 1,
        name: 'Margherita',
        quantity: 3,
        unitPrice: 12,
        totalPrice: 36,
      }),
    );

    // Decrease quantity
    state = cartReducer(state, decreaseItemQuantity(1));

    const store = { cart: state };
    const totalPrice = getCartTotalPrice(store);

    // Expected: 2 * 12 = 24
    expect(totalPrice).toBe(24);
  });

  it('should recalculate total price after removing item', () => {
    // Add multiple items
    let state = cartReducer(
      initialState,
      addItem({
        pizzaId: 1,
        name: 'Margherita',
        quantity: 2,
        unitPrice: 12,
        totalPrice: 24,
      }),
    );

    state = cartReducer(
      state,
      addItem({
        pizzaId: 2,
        name: 'Pepperoni',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
      }),
    );

    // Remove first item
    state = cartReducer(state, removeItem(1));

    const store = { cart: state };
    const totalPrice = getCartTotalPrice(store);

    // Expected: only second item remains = 15
    expect(totalPrice).toBe(15);
  });

  it('should return 0 after clearing cart', () => {
    // Add items
    let state = cartReducer(
      initialState,
      addItem({
        pizzaId: 1,
        name: 'Margherita',
        quantity: 2,
        unitPrice: 12,
        totalPrice: 24,
      }),
    );

    // Clear cart
    state = cartReducer(state, clearCart());

    const store = { cart: state };
    const totalPrice = getCartTotalPrice(store);

    expect(totalPrice).toBe(0);
  });
});
