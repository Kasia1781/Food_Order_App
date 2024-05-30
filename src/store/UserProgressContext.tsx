import { createContext, useState, type ReactNode } from 'react';
//kontekst do otwarcia koszyka lub pokazania kasy

type UserProgressContextType = {
	progress: 'cart' | 'checkout' | '';
	showCart: () => void;
	hideCart: () => void;
	showCheckout: () => void;
	hideCheckout: () => void;
};

const initialState: UserProgressContextType = {
	progress: '',
	showCart: () => {},
	hideCart: () => {},
	showCheckout: () => {},
	hideCheckout: () => {},
};

const UserProgressContext =
	createContext<UserProgressContextType>(initialState);

type UserProgressProviderProps = {
	children: ReactNode;
};

export function UserProgressContextProvider({
	children,
}: UserProgressProviderProps) {
	const [userProgress, setUserProgress] = useState<'cart' | 'checkout' | ''>(
		''
	);
	//console.log(userProgress);

	function showCart() {
		setUserProgress('cart');
	}

	function hideCart() {
		setUserProgress('');
	}

	function showCheckout() {
		setUserProgress('checkout');
	}

	function hideCheckout() {
		setUserProgress('');
	}

	const userProgressCtx = {
		progress: userProgress,
		showCart,
		hideCart,
		showCheckout,
		hideCheckout,
	};

	return (
		<UserProgressContext.Provider value={userProgressCtx}>
			{children}
		</UserProgressContext.Provider>
	);
}

export default UserProgressContext;
