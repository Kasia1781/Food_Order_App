import { useCallback, useEffect, useState } from 'react';

interface RequestConfig extends RequsetInit {
	body?: any;
}

type ErrorResponse {
    message: string
}

//funkcja pomocnicza do wysyłania żądań HTTP
async function sendHttpRequest(url: string, config?: RequestConfig): Promise<T> {
	const response = await fetch(url, config);
    let resData: T

    try {

        resData = await response.json(); //wyodrębniam obiekt który na backend przechowuje komunikat o błędzie
    } catch(error) {
        throw new Error('Nie udało się sparsować danych odpowiedzi')
    }

	//obsługa błędów i zakodowanie ogólnego komunikatu o błędzie
	if (!response.ok) {
        const errorData = resData as unknown as ErrorResponse
		throw new Error(
			errorData.message || 'Something went wrong, failed to send request.'
		);
	}

	//jeśli kod przejdzie pozytywnie warunek if czyli nie będzie błędów to oznacza, że mamy prawidłowo przekazane dane i możemy je zwrócić.
	return resData;
}

// Typ dla hooka useHttp
interface UseHttp<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    sendRequest: (data?: any) => Promise<void>;
    clearData: () => void;
}

export default function useHttp<T>(url:string, config?:RequestConfig, initialData?: T) {
	const [data, setData] = useState<T|null>(initialData || null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null); //zarządzamy stanem błędu

	function clearData() {
		setData(initialData || null);
        setError(null)
	}

	//funkcja sendRequest() służy do aktualizacji stanu w oparciu o status żądania.
	const sendRequest = useCallback(
		async function sendRequest(data?: any) {
			setIsLoading(true);
            setError(null)
			try {
				const resData = await sendHttpRequest<T>(url, { ...config, body: data }); //wywołuję funkcję pomocniczą
				setData(resData);
			} catch (error) {
				setError((error as Error).message || 'Something went wrong!'); //komunikat: 'Something went wrong!'jest tworzony na wypadek gdybyśmy otrzymamy błąd który nie ma zdefiniowanego komunikatu błędu
			}
			setIsLoading(false);
		},
		[url, config, initialData]
	);

	useEffect(() => {
        if (!config || config.method === 'GET' || !config.method) {
            sendRequest();
        }
    }, [sendRequest]);

	return {
		data,
		isLoading,
		error,
		sendRequest,
		clearData,
	};
}
