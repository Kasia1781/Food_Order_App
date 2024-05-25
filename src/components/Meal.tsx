import { currencyFormatter } from '../util/formatting.js';

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
	console.log(meals);
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
					<button>Add to Cart</button>
				</p>
			</article>
		</li>
	);
}
