import "./App.css";
import Category from "./components/Category";
import Order from "./components/Order";
import Product from "./components/Product";

function App() {
  return (
    <div className="App container">
      <Category />
      <Order />
      <Product />
    </div>
  );
}

export default App;
