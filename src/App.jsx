import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </nav>
    </>
  );
}

export default App;
