import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchQuestions } from "../helpers/fetchHelper";

type TCategories = {};
const useCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error));
  }, []);

  return { data, loading, errorMessage };
};

const useQuestions = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchQuestions({})
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error));
  }, []);

  return { data, loading, errorMessage };
};

export const Categories: React.FC<TCategories> = () => {
  const navigate = useNavigate();
  const { data, loading, errorMessage } = useCategories();
  //   const {
  //     data: questionData,
  //     loading: questionLoading,
  //     errorMessage: quetionError,
  //   } = useQuestions();

  const goToPath = (p: any) => {
    const dataP: any = data[p];
    const lastString: string = dataP[dataP.length - 1] || "";
    let regex = /_/g;
    let result = lastString?.replace(regex, "-");

    console.log(dataP, lastString);
    navigate(`/category/${result}`);
  };
  //   console.log("Categories", questionData);
  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;
  return (
    <>
      <header>Categories</header>
      <div className="categories">
        {Object.keys(data).map((title: any) => (
          <div
            key={title}
            className="categories__item"
            onClick={() => goToPath(title)}
          >
            <span>{title}</span>
          </div>
        ))}
      </div>
    </>
  );
};
