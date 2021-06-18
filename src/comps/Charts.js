import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

function Charts({ answersData, questionsData }) {
  const [answerDone, setAnswersDone] = useState();

  useEffect(() => {
    let lengths = questionsData.map((data) => data.answers.length);
    let answers = new Array(lengths.length);
    for (let i = 0; i < lengths.length; i++) {
      answers[i] = new Array(lengths[i]);
    }

    for (let i = 0; i < lengths.length; i++) {
      for (let j = 0; j < lengths[i]; j++) {
        let tmp = 0;
        for (let k = 0; k < answersData.length; k++) {
          if (answersData[k].ans[i] === j) tmp++;
        }
        answers[i][j] = tmp;
      }
    }
    setAnswersDone(answers);
  }, [answersData, questionsData]);

  return (
    <ChartsContainer>
      {answerDone &&
        answerDone.map((ansList, index) => {
          const { question, answers } = questionsData[index];
          return (
            <Bar
              key={index}
              data={{
                labels: ansList?.map((ans, i) => answers[i]),

                datasets: [
                  {
                    label: question,
                    data: ansList,
                    borderWidth: 1,
                  },
                ],
              }}
              height={400}
              width={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          );
        })}
    </ChartsContainer>
  );
}

export default Charts;

const ChartsContainer = styled.div`
  width: 500px;
  height: 500px;
  padding: 15px;
  display: flex;
  > canvas {
    margin: 15px;
  }
`;
