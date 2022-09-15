import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCategories,
  fetchQuestions,
  TFetchQuestions,
} from "../helpers/fetchHelper";
import { isoForCountries } from "../isoCountries";

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
  const navigate = useNavigate();
  const { category = "" } = useParams();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [difficulty, setDifficulty] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const getQuestions = () => {
    setLoading(true);
    fetchQuestions({ categories: category, difficulty, limit, region, tags })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error));
  };

  const selectAnswer = (e) => {
    console.log("answer selected =>", e);
  };
  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    console.log(difficulty, region, limit);
  }, [difficulty, region, limit]);

  // const goToPath = (p: any) => {
  //   const dataP: any = data[p];
  //   const lastString: string = dataP[dataP.length - 1] || "";
  //   let regex = /_/g;
  //   let result = lastString?.replace(regex, "-");

  //   console.log(dataP, lastString);
  //   navigate(`/category/${result}`);
  // };

  console.log("Categories", data);
  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="category">
      <header>Category Page </header>
      <div className="category_setting">
        <label htmlFor="drop-down1">Question Region:</label>
        <select
          name="drop-down1"
          id="drop-down"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option disabled value="">
            -- select an option --
          </option>

          {isoForCountries.map((iso) => (
            <option key={iso?.code} value={iso?.code}>
              {iso?.name}
            </option>
          ))}
        </select>
        <label htmlFor="drop-down">Difficulty:</label>

        <select
          name="drop-down"
          id="drop-down"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option disabled value="">
            -- select an option --
          </option>
          {["easy", "medium", "hard"].map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
        <label htmlFor="drop-down2">How many questions?</label>
        <select
          name="drop-down2"
          id="drop-down"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option disabled value="">
            -- select an option --
          </option>
          {Array(20)
            .fill(1)
            .map((x, y) => x + y)
            ?.map((diff: number) => (
              <option key={diff} value={diff?.toLocaleString()}>
                {diff}
              </option>
            ))}
        </select>
        <button onClick={getQuestions}>Search</button>
        {category}
        {data?.map((q) => {
          const randomPosition = Math.floor(Math.random() * 4);
          const answers = [...q?.incorrectAnswers];
          answers?.splice(randomPosition, 0, q?.correctAnswer);

          return (
            <div className="question__block" key={answers[randomPosition]}>
              <div>{q.question}</div>
              <br />
              <p>answers</p>
              <ul>
                {/* // ?.splice(1, 0, `${q?.correctAnswer}`) */}
                {answers?.map((ans: string) => (
                  <li key={ans} onClick={(e) => selectAnswer(ans?.trim())}>
                    {ans?.trim()}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
