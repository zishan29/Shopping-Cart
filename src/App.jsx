import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <link to="/" style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Fake Store
        </link>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </nav>
    </>
  );
}

export default App;
