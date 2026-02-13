import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateUser } from './userSlice.js';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validatePhoneNumber(phoneNumber) {
    // Phone number should contain only digits, spaces, dashes, and parentheses
    const isValidPhone = (str) =>
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
      );

    return (
      isValidPhone(phoneNumber) && phoneNumber.replace(/\D/g, '').length >= 10
    );
  }

  function handlePhoneChange(e) {
    const value = e.target.value;
    setPhone(value);

    if (value && !validatePhoneNumber(value)) {
      setPhoneError('Invalid phone number format');
    } else {
      setPhoneError('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !phone || phoneError) return;
    dispatch(updateUser({ username, phone }));
    toast.success(`Welcome, ${username}! Let's start ordering!`);
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm font-medium text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name and phone number:
      </p>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input mb-2 mr-3 w-72"
        />
        <input
          type="telephone"
          placeholder="Your phone number"
          value={phone}
          onChange={handlePhoneChange}
          className="input mb-2 w-72"
        />
      </div>

      {phoneError && <p className="mb-4 text-sm text-red-600">{phoneError}</p>}

      {username !== '' && phone !== '' && !phoneError && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
