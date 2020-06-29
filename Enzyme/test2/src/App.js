import React, { Component } from "react";

import GuessWords from "./GuessedWords";
import Congrats from "./Congrats";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessWords
          guessedWords={[
            {
              guessedWord: "train",
              letterMatchCount: 3,
            },
          ]}
        />
      </div>
    );
  }
}

export default App;
