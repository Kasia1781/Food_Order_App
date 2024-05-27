import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvider } from './store/shopping-cart-context';

function App() {
	return (
		<CartContextProvider>
			<Header />
			<Meals />
			<Cart />
		</CartContextProvider>
	);
}

export default App;
