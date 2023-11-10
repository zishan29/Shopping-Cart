import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';
import cartImage from '../assets/cart.png';
import addToCart, { data as cartData } from './Cart';

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
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={cartImage} className="cart" />{' '}
          <span style={{ verticalAlign: 'top' }}>{cartData.length}</span>
        </Link>
      </nav>
      {loading && (
        <div className="spinner">
          <svg viewBox="25 25 50 50" className="circular">
            <circle
              strokeMiterlimit="10"
              strokeWidth="3"
              fill="none"
              r="20"
              cy="50"
              cx="50"
              className="path"
            ></circle>
          </svg>
        </div>
      )}
      {!loading && (
        <div className="container">
          {data &&
            data.map((d) => {
              return (
                <div key={d.id} className="card">
                  <img src={d.image} alt="" />
                  <div className="card-mid">
                    <div>{d.title}</div>
                    <div>{d.description}</div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: 'lightgray',
                          padding: '4px',
                          borderRadius: '4px',
                        }}
                      >
                        {d.rating.rate}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <title>star</title>
                          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                        </svg>
                      </span>
                      <span>{d.rating.count} Ratings</span>
                    </div>
                    <div>${d.price}</div>
                    <button className="addToCart" onClick={() => addToCart(d)}>
                      Add to Cart{' '}
                    </button>
                    <button className="buyNow">
                      <span style={{ margin: 'auto' }}>Buy Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
