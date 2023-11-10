import { Link } from 'react-router-dom';
import cartImage from '../assets/cart.png';
import { data as cartData, calTotal, deleteProduct } from './Cart';
import '../App.css';
import { useState } from 'react';

export default function Cart() {
  const [data, setData] = useState(cartData);
  console.log(data);

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
          <span style={{ verticalAlign: 'top' }}>{data.length}</span>
        </Link>
      </nav>
      <div className="container cart-container">
        {data &&
          data.map((d) => {
            return (
              <div key={d.id} className="cart-card card">
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
                  <div className="selectdiv">
                    <label>
                      <select id="quantity">
                        <option value="1">Qty: 1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10+</option>
                      </select>
                    </label>
                  </div>
                  <button className="delete">
                    <span
                      style={{ margin: 'auto' }}
                      onClick={() => setData(deleteProduct(d))}
                    >
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        <div className="subtotalCard">
          <div>
            Subtotal ({data.length} items): ${calTotal()}
          </div>
          <label style={{ display: 'block' }}>
            <input type="checkbox" />
            This order contains a gift
          </label>
          <button className="buyNow">
            <span style={{ margin: 'auto' }}>Proceed to Buy</span>
          </button>
        </div>
      </div>
    </>
  );
}
