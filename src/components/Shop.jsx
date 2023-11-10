import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import cartImage from '../assets/cart.png';
import addToCart from './Cart';

const useShopURL = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  });

  return { data, error, loading };
};

export default function Shop() {
  const { data, error, loading } = useShopURL();

  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <nav>
        <Link to="/" className="siteName">
          Fake Store
        </Link>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          {' '}
          <img src={cartImage} className="cart" />
        </Link>
      </nav>
      <div>Welcome to Shop Page!</div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="container">
          {data &&
            data.map((d) => {
              return (
                <div key={d.id} className="card">
                  <img src={d.image} alt="" />
                  <div>
                    <div>{d.title}</div>
                    <div>{d.description}</div>
                    <div>${d.price}</div>
                  </div>
                  <div>
                    Add to cart{' '}
                    <img
                      src={cartImage}
                      className="cart"
                      onClick={() => addToCart(d)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
