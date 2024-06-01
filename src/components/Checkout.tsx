import Modal from './UI/Modal';
import { currencyFormatter } from '../util/formatting.js';
import { useCartContext } from '../store/shopping-cart-context';
import Input from './UI/Input.js';
import Button from './UI/Button.js';
import { FormEvent, useContext } from 'react';
import UserProgressContext from '../store/UserProgressContext.js';

export default function Checkout() {
	const { items } = useCartContext();
	const { hideCheckout, progress } = useContext(UserProgressContext);

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
		fetch('http://localhost:3000/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				order: {
					items: items,
					customer: customerData,
				},
			}),
		});
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
				<p className='modal-actions'>
					<Button onClick={handleClose} type='button' textOnly>
						Close
					</Button>
					<Button>Submit Order</Button>
				</p>
			</form>
		</Modal>
	);
}
