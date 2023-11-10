import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import cartImage from '../assets/cart.png';
import { data as cartData } from './Cart';

const useShopURL = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/women's clothing", {
      mode: 'cors',
    })
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
        <>
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {data &&
                data.map((d) => (
                  <Link
                    to="/shop"
                    className="slide"
                    key={d.id}
                    style={{
                      backgroundImage: `url(${d.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                  ></Link>
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
        </>
      )}
    </>
  );
}
