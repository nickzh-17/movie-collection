import { OverlayContainer } from "components/OverlayContainer/OverlayContainer";
import { MovieListPage } from "pages/MovieListPage";
import { Provider } from "react-redux/es/exports";
import "reset-css";
import { store } from "store";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<OverlayContainer />
				<MovieListPage />
			</Provider>
		</div>
	);
}

export default App;
