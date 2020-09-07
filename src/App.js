import React from "react";
import "./App.css";
import Search from "./components/Search";
import Results from "./components/Results";
import Nominations from "./components/Nominations";
import { queryByTestId } from "@testing-library/react";

const API_KEY = process.env.API_KEY;
const URL = "http://www.omdbapi.com/";

let movieResult = [];

movieQuery = (event) => {
  const query = event.target.value;
  if (query.length) {
    axios
      .get(`${URL}?s=${query}&apikey=${API_KEY}&type=movie`)

      .then((res) => {
        this.setState(() => ({
          movieResult: res.data,
        }));
      })
      .catch();
  }
};
function App() {
  return (
    <div className="App">
      The Shoppies
      <Search />
      <Results />
      <Nominations />
    </div>
  );
}

export default App;
