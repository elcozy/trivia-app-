import React from "react";
import { isoForCountries } from "../isoCountries";

type TTriviaConfig = {
  getQuestions: any;
  data?: any;
  setData?: any;
};

export const TriviaConfig: React.FC<TTriviaConfig> = ({
  getQuestions,
  data,
  setData,
}) => {
  const { difficulty, region, limit, tags } = data;
  return (
    <div className="category__settings">
      <div className="category__settings-item">
        <label htmlFor="drop-down1">Question Region:</label>
        <select
          name="drop-down1"
          id="drop-down"
          value={region}
          onChange={(e) => setData("region", e.target.value)}
        >
          <option disabled value="">
            -- select a region --
          </option>

          {isoForCountries.map((iso) => (
            <option key={iso?.code} value={iso?.code}>
              {iso?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="category__settings-item">
        <label htmlFor="drop-down">Difficulty:</label>
        <select
          name="drop-down"
          id="drop-down"
          value={difficulty}
          onChange={(e) => setData("difficulty", e.target.value)}
        >
          <option disabled value="">
            -- select a difficulty --
          </option>
          {["easy", "medium", "hard"].map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>
      <div className="category__settings-item">
        <label htmlFor="drop-down2">How many questions?</label>
        <select
          name="drop-down2"
          id="drop-down"
          value={limit}
          onChange={(e) => setData("limit", e.target.value)}
        >
          <option disabled value="">
            -- select number of questions --
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
      </div>

      <button onClick={getQuestions}>Search</button>
    </div>
  );
};
