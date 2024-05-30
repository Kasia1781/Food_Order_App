import { useContext, useRef } from 'react';
import Modal, { ModalHandle } from './UI/Modal';
import { useCartContext } from '../store/shopping-cart-context';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext.js';

export default function Cart() {
	const { items } = useCartContext();
	//const modal = useRef<ModalHandle>(null);
	const { progress, hideCart } = useContext(UserProgressContext);
	console.log(progress);

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	function handleCloseCart() {
		hideCart();
	}

	return (
		<Modal className='cart' open={progress === 'cart'}>
			<h2>Your cart</h2>
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						{item.name} - {item.quantity}
					</li>
				))}
			</ul>
			<p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
			<p className='modal-actions'>
				<Button onClick={handleCloseCart} textOnly>
					Close
				</Button>
				<Button>Go to Checkout</Button>
			</p>
		</Modal>
	);
}
