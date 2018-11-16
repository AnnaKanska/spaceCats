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

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
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

  addFeatured(i) {
    this.setState({
      featured: i
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
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
    // console.log(gats[2]);
    let catList = [];
    for (let i in gats) {
      catList.push(
        <div key={i}>
          <div
            onClick={() => this.addFeatured(i)}
            onClick={() => this.openModal()}
          >
            <img src={gats[i].media.photos.photo[1].$t} />
          </div>
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Space Cat Modal"
          >
            <h2>Hello</h2>
            <div>
              <img src={gats[i].media.photos.photo[0].$t} />
              <p>{gats[i].description.$t}</p>
            </div>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>
      );

      // console.log(gats[this.state.featured].name.$t);
    }
    return (
      <div>
        <div className="catList">{catList}</div>
      </div>
    );
  }
}

export default CatsView;
