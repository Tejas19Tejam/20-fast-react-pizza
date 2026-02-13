import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getCartTotalPrice } from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import store from '../../store.js';
import { formatCurrency } from '../../utils/helpers.js';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice.js';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Selectors
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
    phone,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getCartTotalPrice);
  const dispatch = useDispatch();

  // If order is in priority then additional charger apply (20% of total cart price)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = Math.round(totalCartPrice + priorityPrice);

  // Using this hook we can return any  data from action , but this technique is generally use to display an errors occurred while submitting  form data on User Interface
  const formErrors = useActionData();

  // Checking if cart is empty of not
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <LinkButton to="-1">&larr; Back to menu</LinkButton>
      </div>
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form action="/order/new" method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* The htmlFor property is used in JavaScript to access or manipulate the for attribute value of a label element. */}
          <label className="sm:basis-40" htmlFor="name">
            First Name
          </label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              id="name"
              className="input"
              placeholder="Enter your name"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              placeholder="Enter phone number"
              className="input"
              defaultValue={phone}
            />

            {formErrors?.phone ? (
              <p className="ml-2 mt-2 rounded-md bg-red-100 p-2 text-xs italic text-red-700">
                {formErrors?.phone}
              </p>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              required
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
            />

            {addressStatus === 'error' ? (
              <p className=" ml-2 mt-2 rounded-md bg-red-100 p-2 text-xs italic text-red-700">
                {errorAddress}
              </p>
            ) : (
              ''
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span
              className={`absolute right-[3px] 
               top-[35.4px]  sm:right-[3px] sm:top-[3px]`}
            >
              <Button
                type="small"
                handleClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get Location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex  items-center gap-5 ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        {/* Hidden field in Form to send data to server which not for user  */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ''
          }
        />
        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Action function to handle submit(POST) request.
// Action function can handle any request accept GET method

export async function action({ request }) {
  const formData = await request.formData();
  // The formData is a array of key-value pair ([["First name" , "vasudev"] , ["phone number" , 7688477] , ["address","parpoli"]])  hence to see it first we need to convert it to an object form
  const data = Object.fromEntries(formData);

  const cart = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  // Error Handling
  const errors = {};
  if (!isValidPhone(cart.phone)) errors.phone = 'Phone number not valid !';

  // In case there is an error then . not create order
  if (Object.keys(errors).length > 0) return errors;

  // Create new order
  const newOrder = await createOrder(cart);

  // DO NOT OVERUSE THIS TECHNIQUE.
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}?new=true`);
}

export default CreateOrder;
