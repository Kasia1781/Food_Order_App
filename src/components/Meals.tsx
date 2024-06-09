import Meal from './Meal';
import Error from './Error';
import useHttp from '../hooks/useHttp';

const requestConfig = {};

export default function Meals() {
	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp('http://localhost:3000/meals', requestConfig, []); //ponieważ jest metoda GET to nie potrzebujemy drugiego argumentu w postaci obiektu konfiguracyjnego. Możemy dać pusty {} oraz jako 3 argument pusta [] która przechowuje dane ale przy pierwszym renderowaniu jest ona pusta.

	if (isLoading) {
		return <p className='center'>Fetching meals...</p>;
	}

	if (error) {
		return <Error title='Failed to fetch meals' message={error} />;
	}

	return (
		<ul id='meals'>
			{loadedMeals.map((meal) => (
				<Meal key={meal.id} meals={meal} />
			))}
		</ul>
	);
}
