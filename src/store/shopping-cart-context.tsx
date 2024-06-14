import { createContext, type ReactNode, useContext, useReducer } from 'react';

type Item = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	quantity: number;
};

type CartState = {
	items: Item[];
};

type CartContextValue = CartState & {
	addItemToCart: (item: Item) => void;
	updatedItemQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCartContext() {
	const cartCtx = useContext(CartContext);

	if (cartCtx === null) {
		throw new Error('CartContext is null - that should not be case!');
	}

	return cartCtx;
}

type AddItemAction = {
	type: 'ADD_ITEM';
};

type UpdateItemAction = {
	type: 'UPDATE_ITEM';
};

type ClearCart = {
	type: 'CLEAR_CART';
};

type Action = AddItemAction | UpdateItemAction | ClearCart;

function shoppingCartReducer(state: CartState, action: Action): CartState {
	if (action.type === 'ADD_ITEM') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const updatedItems = [...state.items];

		if (existingCartItemIndex > -1) {
			const existingItem = state.items[existingCartItemIndex];
			const updatedItem = {
				...existingItem, //otrzymujemy istniejący index
				quantity: existingItem.quantity + 1, //dodaję nowy element do tablicy
			};
			updatedItems[existingCartItemIndex] = updatedItem; //zaktualizowany index tablicy
		} else {
			updatedItems.push({ ...action.item, quantity: 1 });
		}

		return {
			...state,
			items: updatedItems,
		};
	}

	if (action.type === 'UPDATE_ITEM') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingCartItem = state.items[existingCartItemIndex]; //pobieramy istniejący element koszyka

		const updatedItems = [...state.items]; //tworzymy tablicę na podstawie starych elementów.
		//sposoby usuwania elementów z tablicy
		if (existingCartItem.quantity === 1) {
			updatedItems.splice(existingCartItemIndex, 1); //używamy metody splice na tablicy
		} else {
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return { ...state, items: updatedItems };
	}

	if (action.type === 'CLEAR_CART') {
		return { ...state, items: [] };
	}

	return state;
}

type CartContextProviderProps = {
	children: ReactNode;
};

export function CartContextProvider({ children }: CartContextProviderProps) {
	const [shoppingCartState, shoppingCartDispatch] = useReducer(
		shoppingCartReducer,
		{ items: [] }
	);

	function addItem(id: string) {
		shoppingCartDispatch({
			type: 'ADD_ITEM',
			item: id, //było payload
		});
	}

	// function handleUpdateCartItemQuantity(productId: string, amount: number) {
	// 	shoppingCartDispatch({
	// 		type: 'UPDATE_ITEM',
	// 		payload: {
	// 			productId,
	// 			amount,
	// 		},
	// 	});
	// }

	function handleUpdateCartItemQuantity(id: string) {
		shoppingCartDispatch({ type: 'UPDATE_ITEM', id });
	}

	function clearCart() {
		shoppingCartDispatch({ type: 'CLEAR_CART' });
	}

	const ctx: CartContextValue = {
		items: shoppingCartState.items,
		addItemToCart: addItem,
		updatedItemQuantity: handleUpdateCartItemQuantity,
		clearCart,
	};

	console.log(ctx.items);

	return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}
