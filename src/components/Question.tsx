import React from "react";

type TQuestion = {
  question: string;
  answers: string[];
  selectAnswer?: any;
};

export const Question: React.FC<TQuestion> = ({
  question,
  answers,
  selectAnswer,
}) => {
  console.log("Question");

  return (
    <div className="question__block">
      <div>{question}</div>
      <br />
      <p>answers</p>
      <ul className="question__list">
        {answers?.map((ans: string, i: number) => (
          <li
            key={`${ans?.trim()}${i}`}
            onClick={() => selectAnswer(ans?.trim())}
          >
            {ans?.trim()}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};
