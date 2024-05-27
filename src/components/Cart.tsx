import { useRef } from 'react';
import Modal, { ModalHandle } from './UI/Modal';
import { useCartContext } from '../store/shopping-cart-context';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button';

export default function Cart() {
	const { items } = useCartContext();
	const modal = useRef<ModalHandle>(null);

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	return (
		<Modal className='cart' ref={modal}>
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
				<Button textOnly>Close</Button>
				<Button>Go to Checkout</Button>
			</p>
		</Modal>
	);
}
