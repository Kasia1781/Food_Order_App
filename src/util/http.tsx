import { MealProps } from '../components/Meal';

export async function fetchMeals(url: string): Promise<MealProps> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Błąd pobierania danych');
		}

		const data = (await response.json()) as MealProps;
		return data;
	} catch (error) {
		console.error('Błąd pobierania danych:', error);
		throw error;
	}
}
