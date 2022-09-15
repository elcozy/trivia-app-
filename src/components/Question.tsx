import React from "react";

type TQuestion = {};

export const Question: React.FC<TQuestion> = () => {
  console.log("Question");

  return (
    <div>
      <span> Question </span>
    </div>
  );
};
