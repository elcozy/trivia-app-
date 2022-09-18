/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestions } from "../helpers/fetchHelper";
import { TriviaConfig } from "./TriviaConfig";
import { ProgressBar } from "./Progressbar";
import { Question } from "./Question";

type TCategoryPage = {};

export const CategoryPage: React.FC<TCategoryPage> = () => {
  const { category = "" } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<any>({
    difficulty: "",
    region: "",
    limit: "",
    tags: "",
  });

  const [percent, setPercent] = useState<number>(0);

  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [grade, setGrade] = useState<string>("");
  const [scoreText, setScoreText] = useState<string>("");
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

  const { difficulty, region, limit, tags } = fetchedData;

  const progressHault = () => setUpdateProgress(!updateProgress);
  const updateFetchState = (name: string, content: string) => {
    setFetchedData({ ...fetchedData, [name]: content });
  };

  const resetTrivia = () => {
    setQuestionNumber(0);
    setSelectedAnswers([]);
    setPercent(0);
  };
  const getQuestions = () => {
    setLoading(true);
    fetchQuestions({ categories: category, difficulty, limit, region, tags })
      .then((data) => {
        setData(data);
        setLoading(false);
        resetTrivia();
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
    const percentage: number = parseFloat(
      ((100 * failedQuestions) / totalQuestions).toFixed(2)
    );

    const grading =
      percentage < 50
        ? "fail"
        : percentage > 50 && percentage < 70
        ? "pass"
        : percentage > 70
        ? "great"
        : "";

    setGrade(grading);
    setScoreText(`${failedQuestions} / ${totalQuestions} -- ${percentage}%`);
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
  // useEffect(() => getQuestions(), [category]);

  useEffect(() => updateScores(), [selectedAnswers]);

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="category">
      <header>Category : {category} </header>
      <h2>Trivia Settings</h2>
      <div className="">
        {(!totalQuestions || questionNumber === totalQuestions) && (
          <TriviaConfig
            getQuestions={getQuestions}
            data={fetchedData}
            setData={updateFetchState}
          />
        )}

        <ProgressBar
          percent={percent}
          updatePercent={updateProgressBar}
          changeTrigger={questionNumber}
          setPercent={setPercent}
          delay={10}
          updateProgress={updateProgress}
        />
        {/* For testing purpose */}
        {/* <button onClick={() => progressHault()}>
          start/ stop progress
        </button> */}

        {!!totalQuestions &&
          (questionNumber === totalQuestions ? (
            <>
              <div className={`result ${grade}`}>Score : {scoreText}</div>
              <button onClick={getQuestions}>Restart Quiz</button>
              <br />
              <br />
              <button onClick={() => navigate("/")}>
                Choose another Category
              </button>
            </>
          ) : (
            <>
              <h2>
                Question {questionNumber + 1} / {totalQuestions}
              </h2>
              <Question
                question={question}
                answers={answers}
                selectAnswer={selectAnswer}
              />
            </>
          ))}
      </div>
    </div>
  );
};
