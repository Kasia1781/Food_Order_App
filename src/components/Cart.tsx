import { useContext } from 'react';
import Modal from './UI/Modal';
import { useCartContext } from '../store/shopping-cart-context';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext.js';
import CartItem from './CartItem.js';

export default function Cart() {
	const { items, addItemToCart, updatedItemQuantity } = useCartContext();

	const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	function handleCloseCart() {
		hideCart();
	}

	function handleGoToCheckout() {
		showCheckout();
	}

	return (
		<Modal
			className='cart'
			open={progress === 'cart'}
			onClose={progress === 'cart' ? handleCloseCart : null}>
			<h2>Your cart</h2>
			<ul>
				{items.map((item) => (
					<CartItem
						key={item.id}
						{...item}
						onIncrease={() => addItemToCart(item)}
						onDecrease={() => updatedItemQuantity(item.id, item.quantity)}
					/>
				))}
			</ul>
			<p className='cart-total'>
				Total: ${currencyFormatter.format(cartTotal)}
			</p>
			<p className='modal-actions'>
				<Button onClick={handleCloseCart} textOnly>
					Close
				</Button>
				{items.length > 0 && (
					<Button onClick={handleGoToCheckout}>Go to Checkout</Button>
				)}
			</p>
		</Modal>
	);
}
