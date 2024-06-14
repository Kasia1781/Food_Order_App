import Modal from './UI/Modal';
import { currencyFormatter } from '../util/formatting.js';
import { useCartContext } from '../store/shopping-cart-context';
import Input from './UI/Input.js';
import Button from './UI/Button.js';
import { FormEvent, useContext } from 'react';
import UserProgressContext from '../store/UserProgressContext.js';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.js';

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
};

export default function Checkout() {
	const { items, clearCart } = useCartContext();
	const { hideCheckout, progress } = useContext(UserProgressContext);

	const { data, error, isLoading, sendRequest, clearData } = useHttp(
		'http://localhost:3000/orders',
		requestConfig
	);

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	function handleClose() {
		hideCheckout();
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event?.preventDefault();

		const fd = new FormData(event.currentTarget);

		const customerData = Object.fromEntries(fd.entries());
		console.log(customerData);

		//przesyłanie danych na backend
		// fetch('http://localhost:3000/orders', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		order: {
		// 			items: items,
		// 			customer: customerData,
		// 		},
		// 	}),
		// });

		sendRequest(
			JSON.stringify({
				order: {
					items: items,
					customer: customerData,
				},
			})
		);
	}

	let actions = (
		<>
			<Button onClick={handleClose} type='button' textOnly>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	);

	if (isLoading) {
		actions = <span>Sending order data...</span>;
	}

	function handleFinish() {
		hideCheckout();
		clearCart();
		clearData();
	}

	if (data && !error) {
		return (
			<Modal open={progress === 'checkout'} onClose={handleClose}>
				<h2>Success!</h2>
				<p>Your order was submitted successfully!</p>
				<p>
					We will get back to you with more deatails via email within the next
					few minutes.
				</p>
				<p className='modal-actions'>
					<Button onClick={handleFinish}>Okay</Button>
				</p>
			</Modal>
		);
	}

	return (
		<Modal open={progress === 'checkout'} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
				<Input label='Full name' type='text' id='name' />
				<Input label='E-mail' type='email' id='email' />
				<Input label='Street' type='text' id='street' />
				<div className='control-row'>
					<Input label='Postal Code' type='text' id='postal-code' />
					<Input label='City' type='text' id='city' />
				</div>
				{error && <Error title='Filed to submit order' message={error} />}
				<p className='modal-actions'>{actions}</p>
			</form>
		</Modal>
	);
}
