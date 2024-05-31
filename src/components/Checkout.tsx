import Modal from './UI/Modal';
import { currencyFormatter } from '../util/formatting.js';
import { useCartContext } from '../store/shopping-cart-context';
import Input from './UI/Input.js';
import Button from './UI/Button.js';

export default function Checkout() {
	const { items } = useCartContext();

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	return (
		<Modal>
			<form>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
				<Input label='Full name' type='text' id='full-name' />
				<Input label='E-mail' type='email' id='email' />
				<Input label='Street' type='text' id='street' />
				<div className='control-row'>
					<Input label='Postal Code' type='text' id='postal-code' />
					<Input label='City' type='text' id='city' />
				</div>
				<p className='modal-actions'>
					<Button type='button' textOnly>
						Close
					</Button>
					<Button>Submit Order</Button>
				</p>
			</form>
		</Modal>
	);
}