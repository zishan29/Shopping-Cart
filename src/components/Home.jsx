import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
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

const delay = 3500;

export default function Home() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const { data, error, loading } = useShopURL();

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === (data && data.length - 1) ? 0 : prevIndex + 1,
        ),
      delay,
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

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
          <img src={cartImage} className="cart" />
        </Link>
      </nav>
      <div>Welcome to Home Page!</div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {data &&
                data.map((d) => (
                  <div
                    className="slide"
                    key={d.id}
                    style={{
                      backgroundImage: `url(${d.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                ))}
            </div>

            <div className="slideshowDots">
              {data &&
                data.map((_, idx) => (
                  <div
                    key={idx}
                    className={`slideshowDot${index === idx ? ' active' : ''}`}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  ></div>
                ))}
            </div>
          </div>
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
                        onClick={() => addToCart({ ...d, quantity: 1 })}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
