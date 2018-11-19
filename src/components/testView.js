import React from "react";
import CatsView from "./catsView";

class TestView extends React.Component {
  constructor(props) {
    super(props);
    //this states will be stored in the users table
    this.state = {
      q1: "T",
      q2: "T",
      q3: "T",
      q4: "T",
      email: "",
      showCats: false
    };
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  submitTest(event) {
    event.preventDefault();
    let results = this.state.q1 + this.state.q2 + this.state.q3 + this.state.q4;

    fetch("http://localhost:3000/api/v1/spacecats", {
      method: "POST",
      body: JSON.stringify({ email: this.state.email, results: results }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          showCats: true,
          id: json.body[0].id
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  render() {
    let view;

    if (!this.state.showCats) {
      view = (
        <div>
          <h1 id="test_title">Test</h1>
          <div id="test_q">
            <p>What type of relationship am I looking for?</p>
            <br />
            <form>
              <select
                name="q1"
                value={this.state.q1}
                onChange={e => this.handleChange(e)}
              >
                <option value="T">
                  Sometimes I need some company but sometimes I like beeing on
                  my own.
                </option>
                <option value="F">
                  I prefer sickness relationships, why going to the bathroom
                  alone if I can have company?
                </option>
              </select>
            </form>

            <p>
              I need action, so my parthner must have a lot of energy <br /> to
              spend with me.
            </p>
            <br />
            <form>
              <select
                name="q2"
                value={this.state.q2}
                onChange={e => this.handleChange(e)}
              >
                <option value="T">Of course! I can spend hours playing!</option>
                <option value="F">
                  Not really, I prefer some company while lying on my couch.
                </option>
              </select>
            </form>

            <p>
              I am super socible, so I expect my parthner to like having visits.
            </p>
            <br />
            <form>
              <select
                name="q3"
                value={this.state.q3}
                onChange={e => this.handleChange(e)}
              >
                <option value="T">Absolutely!</option>
                <option value="F">Meh.. I am more a lonely person.</option>
              </select>
            </form>

            <p>I like romance, but I prefer not beeing kissed all the time.</p>
            <form>
              <br />
              <select
                name="q4"
                value={this.state.q4}
                onChange={e => this.handleChange(e)}
              >
                <option value="T">
                  No! I am a love machine and I need love all day long!
                </option>
                <option value="F">
                  Exactly, I like kisses, but I need my own space.
                </option>
              </select>
            </form>
          </div>
          <br />
          <div id="submit">
            <input
              type="text"
              name="email"
              onChange={e => this.handleChange(e)}
              placeholder="my email"
            />
            <br />
            <img
              src="../src/assets/rocket.png"
              id="submit_button"
              onClick={e => this.submitTest(e)}
            />
          </div>
        </div>
      );
    } else {
      view = <CatsView userId={this.state.id} />;
    }

    return <div>{view}</div>;
  }
}

export default TestView;
