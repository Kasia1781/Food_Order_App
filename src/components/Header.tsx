import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { useCartContext } from '../store/shopping-cart-context';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
	const { items } = useCartContext();
	const { showCart } = useContext(UserProgressContext);

	const totalCartItem = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	function handleShowCart() {
		showCart();
	}

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logoImg} alt='logo' />
				<h1>ReactFood</h1>
			</div>
			<p>
				<Button onClick={handleShowCart} textOnly>
					Cart ({totalCartItem})
				</Button>
			</p>
		</header>
	);
}
