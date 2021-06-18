import { LinearProgress } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";

function AddOfer() {
  const [user] = useAuthState(auth);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const imgRef = useRef(null);
  const [adding, setAdding] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddToShop = (e) => {
    e.preventDefault();
    if (
      !(
        nameRef.current.value &&
        descriptionRef.current.value &&
        imgRef.current.value &&
        priceRef.current.value
      )
    ) {
      alert("Please enter valid data");
      return false;
    }

    setAdding(true);
    setIsDisabled(true);
    db.collection("shopItems")
      .add({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: Number(priceRef.current.value),
        user: user.uid,
        email: user.email,
        imgUrl: imgRef.current.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setAdding(false))
      .catch(() => alert("something went wrong"));
  };
  return (
    <AddOferContainer>
      {adding && <LinearProgress />}
      <h1>Add your product to our shop!</h1>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Enter products name"
          ref={nameRef}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Enter products description"
          ref={descriptionRef}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Enter price"
          ref={priceRef}
          required
        />
        <input type="text" ref={imgRef} placeholder="image url" required />
        <button type="submit" onClick={handleAddToShop} disabled={isDisabled}>
          Submit
        </button>
      </form>
    </AddOferContainer>
  );
}

export default AddOfer;

const AddOferContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  overflow-x: hidden;
  text-align: center;
  > form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10%;
    > input {
      padding: 15px;
    }
    > button {
      padding: 15px;
      background-color: lightblue;
      cursor: pointer;
      font-size: large;
    }
  }
`;
