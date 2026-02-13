import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CreateUser from './CreateUser';
import userReducer from './userSlice';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper function to render with providers
const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
};

describe('CreateUser - Input Validation Tests', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should not show submit button when name or phone empty', () => {
    renderWithProviders(<CreateUser />);

    const nameInput = screen.getByPlaceholderText(/your full name/i);
    const phoneInput = screen.getByPlaceholderText(/your phone number/i);

    // Both fields empty
    expect(
      screen.queryByRole('button', { name: /start ordering/i }),
    ).not.toBeInTheDocument();

    // Only name filled
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(
      screen.queryByRole('button', { name: /start ordering/i }),
    ).not.toBeInTheDocument();

    // Clear name, fill only phone
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(
      screen.queryByRole('button', { name: /start ordering/i }),
    ).not.toBeInTheDocument();
  });

  it('should accept valid phone number format', () => {
    renderWithProviders(<CreateUser />);

    const nameInput = screen.getByPlaceholderText(/your full name/i);
    const phoneInput = screen.getByPlaceholderText(/your phone number/i);

    // Enter valid name and phone number
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    // Button should appear with valid inputs
    expect(
      screen.getByRole('button', { name: /start ordering/i }),
    ).toBeInTheDocument();

    // Test with formatted phone number
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    expect(
      screen.getByRole('button', { name: /start ordering/i }),
    ).toBeInTheDocument();
  });

  it('should throw error if no valid phone number format', () => {
    renderWithProviders(<CreateUser />);

    const nameInput = screen.getByPlaceholderText(/your full name/i);
    const phoneInput = screen.getByPlaceholderText(/your phone number/i);

    // Enter name and invalid phone (letters only)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: 'abcdefghij' } });

    // Check if error message appears or button is disabled
    const errorMessage = screen.queryByText(/invalid phone number/i);

    // Note: This test will fail if validation is not implemented
    // You may need to implement phone number validation in CreateUser component
    expect(errorMessage).toBeInTheDocument();
  });
});
