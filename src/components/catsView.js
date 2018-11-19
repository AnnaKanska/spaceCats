import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class CatsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      cats: {},
      featured: 0,
      modalIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/spacecats/results?id=${this.props.userId}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          cats: json
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  addFeatured(e, index) {
    e.preventDefault();
    console.log(index, "index of add featured");
    this.setState({
      featured: index,
      modalIsOpen: true
    });
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = "#f00";
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let gats = this.state.cats;
    let catList = [];

    for (let i in gats) {
      catList.push(
        <div key={i} onClick={e => this.addFeatured(e, i)}>
          <img src={gats[i].media.photos.photo[1].$t} />
        </div>
      );
    }
    return (
      <div>
        <div className="catList">{catList}</div>
      </div>
    );
  }
}

export default CatsView;
