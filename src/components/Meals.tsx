import { useEffect, useState } from 'react';
import { fetchMeals } from '../util/http';
import Meal, { MealProps } from './Meal';
import useHttp from '../hooks/useHttp';

const requestConfig = {};

//typujemy dane które otrzymujemy z API
//type MealsProps = MealProps;

export default function Meals() {
	// const [loadedMeals, setLoadedMeals] = useState<MealsProps[]>([]);

	// useEffect(() => {
	// 	async function fetchMeal() {
	// 		try {
	// 			const meals = await fetchMeals('http://localhost:3000/meals');
	// 			setLoadedMeals(meals);
	// 		} catch (error) {
	// 			console.error('Błąd przy pobieraniu posiłków:', error);
	// 		}
	// 	}
	// 	fetchMeal();
	// }, []);

	// if (loadedMeals.length === 0) {
	// 	return <p>Pobieranie danych...</p>;
	// }

	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp('http://localhost:3000/meals', requestConfig, []); //ponieważ jest metoda GET to nie potrzebujemy drugiego argumentu w postaci obiektu konfiguracyjnego. Możemy dać pusty {} oraz jako 3 argument pusta [] która przechowuje dane ale przy pierwszym renderowaniu jest ona pusta.

	if (isLoading) {
		return <p className='center'>Fetching meals...</p>;
	}

	return (
		<ul id='meals'>
			{loadedMeals.map((meal) => (
				<Meal key={meal.id} meals={meal} />
			))}
		</ul>
	);
}
