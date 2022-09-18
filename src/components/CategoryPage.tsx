/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions, TFetchQuestions } from "../helpers/fetchHelper";
import { TriviaConfig } from "./TriviaConfig";
import { Line, Circle } from "rc-progress";
import { ProgressBar } from "./Progressbar";

type TCategoryPage = {};

const useQuestions = ({
  categories = "",
  difficulty,
  limit,
  region,
}: // tags,
TFetchQuestions) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchQuestions({ categories })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error));
  }, [categories]);

  return { data, loading, errorMessage };
};

export const CategoryPage: React.FC<TCategoryPage> = () => {
  const { category = "" } = useParams();

  // const [data, setData] = useState<any>([]);
  //
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [difficulty, setDifficulty] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [score, setScore] = useState<any>("");
  const [updateProgress, setUpdateProgress] = useState<boolean>(true);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [randomPosition, setRandomPosition] = useState<number>(
    Math.floor(Math.random() * 4)
  );

  const question = data?.[questionNumber]?.question;
  const incorrectAnswer = data?.[questionNumber]?.incorrectAnswers || [];
  const correctAnswer = data?.[questionNumber]?.correctAnswer;

  const answers = [...incorrectAnswer];
  answers?.splice(randomPosition, 0, data?.[questionNumber]?.correctAnswer);

  const totalQuestions: number = data?.length;

  const getQuestions = () => {
    setLoading(true);
    fetchQuestions({ categories: category, difficulty, limit, region, tags })
      .then((data) => {
        setData(data);
        setLoading(false);
        setQuestionNumber(0);
        setSelectedAnswers([]);
        setPercent(0);
      })
      .catch((error) => setErrorMessage(error));
  };

  const updateProgressBar = (newPercent: number) => {
    const updateCriteria = newPercent <= 100 && questionNumber < totalQuestions;
    if (updateCriteria) setPercent(newPercent);
    if (percent === 100) selectAnswer("");
  };

  const updateScores = () => {
    const failedQuestions = selectedAnswers.reduce(
      (n, e) => (e.grade === "pass" ? n + 1 : n),
      0
    );
    const percentage = ((100 * failedQuestions) / totalQuestions).toFixed(2);

    setScore(`${failedQuestions} / ${totalQuestions} -- ${percentage}%`);
  };

  const selectAnswer = (e: string) => {
    setPercent(0);
    const newSelection = [...selectedAnswers];
    newSelection.push({
      question,
      selected: e,
      correct: correctAnswer,
      grade: e === correctAnswer ? "pass" : "fail",
    });

    setSelectedAnswers(newSelection);
    setQuestionNumber((questionNumber) => questionNumber + 1);
    setRandomPosition(Math.floor(Math.random() * 4));
  };
  useEffect(() => getQuestions(), [category]);

  useEffect(() => updateScores(), [selectedAnswers]);

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="category">
      <header>Category Page </header>
      <div className="">
        <TriviaConfig
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          region={region}
          setRegion={setRegion}
          limit={limit}
          setLimit={setLimit}
          tags={tags}
          setTags={setTags}
          getQuestions={getQuestions}
        />
        {category}
        <ProgressBar
          percent={percent}
          updatePercent={updateProgressBar}
          changeTrigger={questionNumber}
          setPercent={setPercent}
          delay={2}
          updateProgress={updateProgress}
        />
        <button onClick={() => setUpdateProgress(!updateProgress)}>
          start/ stop progress
        </button>

        {questionNumber === totalQuestions ? (
          <>
            <div className="result">{score}</div>
            <button onClick={getQuestions}>Restart Quiz</button>
          </>
        ) : (
          <>
            <h2>
              Question {questionNumber + 1} / {totalQuestions}
            </h2>
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
          </>
        )}
      </div>
    </div>
  );
};
