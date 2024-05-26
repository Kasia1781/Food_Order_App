import logoImg from '../assets/logo.jpg';
import { useCartContext } from '../store/shopping-cart-context';
import Button from './UI/Button';

export default function Header() {
	const { items } = useCartContext();
	const totalCartItem = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logoImg} alt='logo' />
				<h1>ReactFood</h1>
			</div>
			<p>
				<Button textOnly>Cart ({totalCartItem})</Button>
			</p>
		</header>
	);
}
