import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import Charts from "./Charts";

let ansArray = [];
function Quiz() {
  const [user] = useAuthState(auth);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, loading] = useCollection(
    db.collection("quizes").doc("quizQuestions").collection("questions")
  );
  const [answersData] = useCollection(
    db.collection("quizes").doc("quizAnswers").collection("answers")
  );

  const handleAnswer = (inx) => {
    ansArray.push(inx);
    setCurrentQuestion((prev) => prev + 1);
    if (ansArray.length === questions?.docs.length) {
      db.collection("quizes")
        .doc("quizAnswers")
        .collection("answers")
        .doc(user.uid)
        .set({
          ans: ansArray,
        });
    }
  };
  return (
    <QuizContainer>
      {!loading ? (
        currentQuestion === questions?.docs.length ? (
          <Charts
            answersData={answersData?.docs?.map((doc) => doc?.data())}
            questionsData={questions?.docs?.map((doc) => doc?.data())}
          />
        ) : (
          <QuizSection>
            <p>
              Question {currentQuestion + 1}/{questions?.docs.length}
            </p>
            <h1>{questions?.docs[currentQuestion]?.data()?.question}</h1>
            <div className="buttons">
              {questions?.docs[currentQuestion]
                ?.data()
                ?.answers?.map((ans, inx) => (
                  <button key={inx} onClick={() => handleAnswer(inx)}>
                    {ans}
                  </button>
                ))}
            </div>
          </QuizSection>
        )
      ) : (
        <div className="">
          <h1>LOADINS</h1>
        </div>
      )}
    </QuizContainer>
  );
}

export default Quiz;

const QuizContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  /* display: flex;
  justify-content: center; */
`;
const QuizSection = styled.div`
  margin: 100px;
  padding: 100px;
  background-color: #e0cea4;
  max-height: 350px;
  text-align: center;
  max-width: 500px;
  > p {
    font-size: 1.25rem;
  }
  > h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 600;
  }
  .buttons {
    > button {
      padding: 10px;
      margin: 10px;
      background-color: var(--slack-color);
      color: white;
      cursor: pointer;
      font-size: large;
    }
  }
`;
