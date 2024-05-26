import { useCartContext } from '../store/shopping-cart-context.js';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.js';

export type MealProps = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	quantity: number;
};

type MealsProps = {
	meals: MealProps;
};

export default function Meal({ meals }: MealsProps) {
	const { addItemToCart } = useCartContext();

	function handleAddItemToCart() {
		addItemToCart(meals);
	}

	return (
		<li className='meal-item'>
			<article>
				<img src={`http://localhost:3000/${meals.image}`} alt={meals.name} />
				<div>
					<h3>{meals.name}</h3>
					<p className='meal-item-price'>
						{currencyFormatter.format(meals.price)}
					</p>
					<p className='meal-item-description'>{meals.description}</p>
				</div>
				<p className='meal-item-actions'>
					<Button onClick={() => handleAddItemToCart()}>Add to Cart</Button>
				</p>
			</article>
		</li>
	);
}
