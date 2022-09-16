import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions, TFetchQuestions } from "../helpers/fetchHelper";
import { TriviaConfig } from "./TriviaConfig";

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

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [difficulty, setDifficulty] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [score, setScore] = useState<any>("2/5");

  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const currentQuestionObj = data?.[questionNumber];

  const randomPosition = Math.floor(Math.random() * 4);
  const incorrectAnswer = data?.[questionNumber]?.incorrectAnswers || [];
  const correctAnswer = data?.[questionNumber]?.correctAnswer;

  const answers = [...incorrectAnswer];
  answers?.splice(randomPosition, 0, data?.[questionNumber]?.correctAnswer);

  console.log(randomPosition);

  const getQuestions = () => {
    setLoading(true);
    fetchQuestions({ categories: category, difficulty, limit, region, tags })
      .then((data) => {
        setData(data);
        setLoading(false);
        setQuestionNumber(0);
        setSelectedAnswers([]);
      })
      .catch((error) => setErrorMessage(error));
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const falseNb = selectedAnswers.reduce(
      (n, e) => (e.grade === "pass" ? n + 1 : n),
      0
    );
    function percentage(partialValue, totalValue) {
      return ((100 * partialValue) / totalValue).toFixed(2);
    }

    const scoreSetter = `${falseNb} / ${data?.length} -- ${percentage(
      falseNb,
      data?.length
    )}%`;
    setScore(scoreSetter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswers]);

  if (!data || loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  // let currentQuestionObj = data?.[questionNumber - 1] || {};
  const question = currentQuestionObj?.question;

  const selectAnswer = (e: string) => {
    const newSelection = [...selectedAnswers];

    newSelection.push({
      question,
      selected: e,
      correct: correctAnswer,
      grade: e === correctAnswer ? "pass" : "fail",
    });

    setSelectedAnswers(newSelection);
    setQuestionNumber(questionNumber + 1);
  };

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

        {questionNumber === data?.length ? (
          <>
            <div className="result">{score}</div>
            <button onClick={getQuestions}>Restart</button>
          </>
        ) : (
          <>
            <h2>
              Question {questionNumber + 1} / {data?.length}
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
