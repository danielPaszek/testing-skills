import { LinearProgress } from "@material-ui/core";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import ShopItem from "./ShopItem";

function Shop() {
  const [Items, loading] = useCollection(
    db.collection("shopItems").orderBy("timestamp", "desc")
  );

  return (
    <ShopContainer>
      {loading && (
        <LinearProgress
          style={{
            width: "100%",
            position: "fixed",
          }}
        />
      )}
      {Items?.docs.map((doc) => {
        const { description, name, price, imgUrl, email } = doc.data();
        return (
          <ShopItem
            key={doc.id}
            name={name}
            img={imgUrl}
            price={price}
            description={description}
            id={doc.id}
            email={email}
          />
        );
      })}
    </ShopContainer>
  );
}

export default Shop;

const ShopContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  row-gap: 10px;
  @media (max-width: 1050px) {
    grid-template-columns: 50% 50%;
  }
`;
