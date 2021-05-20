import React , {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';



function App() {

  const [product, setProduct] = useState({
    name:"React from FB",
    price: 10,
    productBy: "facebook"
  })

  const makePayment = (token) => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`https://localhost:5000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE ",response)
      const {status} = response;
      console.log("STATUS ",status)
    }).catch(error => console.log(error))

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout stripeKey="pk_test_51IpAgiSHOVJl1RZ3sc2gCNcUG85FTbPwMKBCKfp086SyVTNfWolVfeE8ypNQg36LyMkWvt7PaImTpAKii0LT8tXe00esQIeXRc" token={makePayment} name="Buy React" amount={product.price * 100}>
          <button className="btn-large btn-primary">Donate ${product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
