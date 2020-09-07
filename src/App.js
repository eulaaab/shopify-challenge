import React from "react";
import "./App.css";
import Search from "./components/Search";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "http://www.omdbapi.com/";

console.log(process.env.REACT_APP_API_KEY);

function App() {
  return (
    <div className="App">
      <h1> Movie Nominations</h1>
      <Search />
    </div>
  );
}

export default App;
