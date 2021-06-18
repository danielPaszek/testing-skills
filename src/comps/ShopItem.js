import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addItem } from "../features/appSlice";

function ShopItem({ img, name, description, price, id, email }) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <>
      {isDisabled && (
        <LinearProgress
          className="linear"
          style={{
            position: "fixed",
            width: "100%",
          }}
        />
      )}
      <Item
        disabled={isDisabled}
        onClick={() => {
          handleAddToCart({
            id: id,
            price: price,
            name: name,
            email: email,
          });
          setIsDisabled(true);
          setTimeout(() => setIsDisabled(false), 400);
        }}
      >
        <img src={img} alt="" />
        <h1>{name}</h1>
        <p>{description}</p>
        <h2>{price} zł</h2>
        <h3>seller: {email}</h3>
      </Item>
    </>
  );
}

export default ShopItem;

const Item = styled.button`
  width: 200px;
  max-height: 400px;
  padding-top: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  cursor: pointer;
  transition: transform 350ms;
  border: none;
  outline: none;
  background-color: inherit;
  gap: 10px;
  > img {
    height: 300px;
    width: 200px;
    object-fit: cover;
    border: 1px solid black;
  }
  > h1 {
    color: gray;
    font-weight: 500;
    font-size: 1.25rem;
  }
  > p {
    color: gray;
    font-weight: 400;
    font-size: 1rem;
    max-height: 100px;
    overflow: hidden;
    max-width: 300px;
  }
  p::-webkit-scrollbar {
    display: none;
  }
  > h2 {
    font-weight: 500;
    font-size: 1.25rem;
  }
  > h3 {
    font-size: 0.65rem;
    font-weight: 400;
  }

  :hover {
    transform: scale(1.08);
  }
`;
