import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.js';

export type MealProps = {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
};

type MealsProps = {
	meals: MealProps;
};

export default function Meal({ meals }: MealsProps) {
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
					<Button>Add to Cart</Button>
				</p>
			</article>
		</li>
	);
}
