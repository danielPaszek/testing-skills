import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../firebase";

function People() {
  const [users, loading] = useCollection(db.collection("users"));

  if (loading) return <h1>Loading..</h1>;

  return (
    <PeopleContainer>
      <h1>Registered People</h1>
      <p>Click on Your Avatar icon to join lottery. Awards are awesome</p>
      <PeopleGrid>
        {users?.docs.map((person, index) => {
          return (
            <Person key={index}>
              <img src={person?.data().userImage} alt="" />
              <p>{person?.data().user}</p>
            </Person>
          );
        })}
      </PeopleGrid>
    </PeopleContainer>
  );
}

export default People;

const PeopleGrid = styled.div`
  display: grid;
  justify-content: flex-start;
  width: 100%;
  overflow-y: auto;
`;

const PeopleContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  > h1,
  p {
    margin: 15px;
  }
`;
const Person = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-right: 1px solid gray;
  width: auto;
  > p {
    font-size: 1rem;
    font-weight: 500;
    margin-right: 15px;
  }
  > img {
    object-fit: contain;
    width: 96px;
  }
`;
