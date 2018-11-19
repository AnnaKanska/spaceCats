import React from "react";
import TestView from "./testView";

class Main extends React.Component {
  //class Main inherits from react
  constructor(props) {
    super(props); //inherits properties
    this.state = { test: false };
  }

  goTest() {
    this.setState({ test: true });
  }

  render() {
    let home;

    if (!this.state.test) {
      home = (
        <div>
          <div id="title">
            <img src="../src/assets/cat1.png" className="small-cat" />
            <h1 id="titlecats">Space Cats</h1>
            <img
              src="../src/assets/cat2.png"
              className="small-cat"
              id="smaller"
            />
          </div>

          <h3>
            Welcome to the interstellar, most amazing and spectacular cat
            adoption service in the whole galaxy!
            <br />
            Here you will be able to adopt an Space Cat based in your
            personality.
            <br />
            Click on the planet to start your personality inquiry!
          </h3>
          <div id="turning_planet">
            <img
              src="../src/assets/turning_planet.gif"
              onClick={() => this.goTest()}
            />
          </div>
        </div>
      );
    } else {
      home = <TestView />;
    }

    return <div>{home}</div>;
  }
}

export default Main;
