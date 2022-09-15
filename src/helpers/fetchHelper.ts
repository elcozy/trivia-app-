const baseURL = "https://the-trivia-api.com/api";

export const fetchCategories = async () => {
  return await fetch(`${baseURL}/categories`).then((response) =>
    response.json()
  );
};

export type TFetchQuestions = {
  categories?: string | string[];
  tags?: string | string[];
  limit?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | any;
  region?: string;
  difficulty?: "hard" | "easy" | "medium" | "" | any;
};
export const fetchQuestions = async ({
  categories = "general_knowledge",
  limit = 5,
  region = "NG",
  difficulty = "hard",
  tags = "",
}: TFetchQuestions) => {
  const queryData: any = {
    categories: categories,
    limit: limit,
    region: region,
    difficulty: difficulty,
    tags: tags,
  };

  for (let k in queryData)
    if (queryData[k] === "" || !queryData[k]) delete queryData[k];

  let queryParams = Object.entries(queryData)
    .map((entry) => entry.join("="))
    .join("&");

  var fetchQuery = queryParams
    ? `${baseURL}/questions?${queryParams}`
    : `${baseURL}/questions`;

  return await fetch(fetchQuery).then((response) => response.json());
};
