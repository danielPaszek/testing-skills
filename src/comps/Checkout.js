import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addItem, removeItem, selectCart } from "../features/appSlice";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [grouped, setGrouped] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [user] = useAuthState(auth);
  const removeFromCart = (id) => {
    dispatch(removeItem(id));
  };
  const addToCart = (item) => {
    dispatch(addItem(item));
  };
  const handleCheckout = () => {
    const templateId = "template_pz6i4kb";
    const serviceId = "service_0bijbk7";
    const userId = "user_EGoeVjTFI8pErL4c81WVI";
    Object.entries(grouped).forEach((x) => {
      const [sellerEmail, value] = x;
      const priceAll = value.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );
      emailjs.send(
        serviceId,
        templateId,
        {
          buyerName: user?.displayName,
          priceAll: priceAll,
          buyerEmail: user?.email,
          sellerEmail: sellerEmail,
        },
        userId
      );
    });
  };

  useEffect(() => {
    setGrouped(
      cart.reduce((r, a) => {
        r[a.email] = [...(r[a.email] || []), a];
        return r;
      }, {})
    );
  }, [cart]);

  // const showGrouped = () => {};

  return (
    <CheckoutContainer>
      {cart.length !== 0 ? (
        <>
          <h2>Your Cart:</h2>
          <hr />
          {Object.entries(grouped).map((x) => {
            const [key, value] = x;
            return (
              <>
                <p>From: {key}</p>
                {value.map((item) => (
                  <Item key={item.id}>
                    <h2>{item.name}</h2>
                    <h3>{item.price}</h3>
                    <button onClick={() => addToCart(item)}>
                      <AddIcon />
                    </button>
                    <button onClick={() => removeFromCart(item.id)}>
                      <RemoveIcon />
                    </button>
                    <p>{item.amount}</p>
                    <h1>TOTAL: {item.price * item.amount}</h1>
                  </Item>
                ))}
                <hr />
              </>
            );
          })}

          <h1>
            TOTAL:{" "}
            {cart.reduce((acc, item) => {
              return acc + item.price * item.amount;
            }, 0)}
          </h1>
          <button
            onClick={() => {
              setDisabled(true);
              handleCheckout();
            }}
            disabled={disabled}
          >
            Payment
          </button>
        </>
      ) : (
        <>
          <h1>Your cart is empty!</h1>
          <p>Want to buy something?</p>
          <Link to="/shop">
            <p>Click here!</p>
          </Link>
        </>
      )}
    </CheckoutContainer>
  );
}

export default Checkout;

const CheckoutContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 80px;
  overflow-x: hidden;
  text-align: center;
  > h1 {
    margin-top: 50px;
  }
  > a > p {
    text-decoration: underline;
  }
  > p {
    font-size: 1rem;
    margin: 20px 0;
  }
`;
const Item = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  > h1 {
    font-weight: 600;
    font-size: 1.75rem;
    width: 200px;
  }
  > h3 {
    font-weight: 600;
    font-size: 1.75rem;
    width: 100px;
  }
  > h2,
  > p {
    font-weight: 400;
    font-size: 1.25rem;
    width: 150px;
    overflow: hidden;
  }
`;
