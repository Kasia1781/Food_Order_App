import Modal from './UI/Modal';
import { currencyFormatter } from '../util/formatting.js';
import { useCartContext } from '../store/shopping-cart-context';

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
			</form>
		</Modal>
	);
}
