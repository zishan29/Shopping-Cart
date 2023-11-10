import { Link } from 'react-router-dom';
import cart from '../assets/cart.png';
import { data } from './Cart';

export default function Cart() {
  console.log(data);
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
          <img src={cart} className="cart" />
        </Link>
      </nav>
      <div>Welcome to Cart Page!</div>
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
                  <select name="quantity" id="quantity">
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
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
