import { useEffect, useState } from 'react';
import { fetchMeals } from '../util/http';
import Meal, { MealProps } from './Meal';

//typujemy dane które otrzymujemy z API
type MealsProps = MealProps;

export default function Meals() {
	const [loadedMeals, setLoadedMeals] = useState<MealsProps[]>([]);

	useEffect(() => {
		async function fetchMeal() {
			try {
				const meals = await fetchMeals('http://localhost:3000/meals');
				setLoadedMeals(meals);
			} catch (error) {
				console.error('Błąd przy pobieraniu posiłków:', error);
			}
		}
		fetchMeal();
	}, []);

	if (loadedMeals.length === 0) {
		return <p>Pobieranie danych...</p>;
	}

	return (
		<ul id='meals'>
			{loadedMeals.map((meal) => (
				<Meal key={meal.id} meals={meal} />
			))}
		</ul>
	);
}
