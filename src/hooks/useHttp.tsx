//funkcja pomocnicza do ogólnego wysyłania żądań
async function sendHttpRequest(url: string, config: string) {
	const response = await fetch(url, config);

	const resData = await response.json();

	if (!response.ok) {
		throw new Error(
			resData.message || 'Something went wrong, failed to send request'
		);
	}

	return resData;
}

export default sendHttpRequest;

export default function useHttp() {
	//funkcja sendRequest() służy do aktualizacji stanu w oparciu o status żądania.
	async function sendRequest() {
		try {
			const resData = sendHttpRequest(); //wywołuję funkcję pomocniczą
		} catch (error) {}
	}
}
