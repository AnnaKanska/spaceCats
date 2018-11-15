import React from "react";
//import styles from './styles.css';

class CatsView extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      error: false,
      cats: {},
      featured: 0,
      show: false
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
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

  render() {
    let gats = this.state.cats;
    let catPhotos = [];
    for (let key in gats) {
      catPhotos.push(
        <img
          key={key}
          src={gats[key].media.photos.photo[3].$t}
          onClick={this.handleShow()}
        />
      );
    }

    return (
      <div>
        <div>{catPhotos}</div>
        <div>
          <Modal
            {...this.props}
            show={this.state.show}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img />
              <p>modal here</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CatsView;
