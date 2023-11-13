import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, Button } from 'react-bootstrap';
import './Cards.css';
import { fetchCardData } from '../service/CardService';

function Cards() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchCardData();
        setCardData(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that it runs only once


  return (
    <Container>
      <div className="row">
        {cardData.map((card, index) => (
          <div key={index} className="col-md-4">
            <BlogCard title={card.name} content={card.content} />
          </div>
        ))}
      </div>
    </Container>
  );
}

class BlogCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flipped: false, showModal: false };
    this.flip = this.flip.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  flip = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true, flipped: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { title, content } = this.props;

    return (
      <div
        onMouseEnter={this.flip}
        onMouseLeave={this.flip}
        className={"card-container" + (this.state.flipped ? " flipped" : "")}
      >
        <Front title={title} />
        <Back content={content} handleOpenModal={this.handleOpenModal} />
        <ModalComponent showModal={this.state.showModal} handleCloseModal={this.handleCloseModal} content={content} />
      </div>
    );
  }
}

class Front extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="front">
       <div className="row">
      <div className="col-md-4">
        <ImageArea />
      </div>
      <div className="col-md-8">
        <MainArea title={title} />
      </div>
    </div>
      </div>
    );
  }
}

class Back extends React.Component {
  render() {
    const { content, handleOpenModal } = this.props;

    return (
      <div className="back">
        <p>{content}</p>
        <Button variant="primary" onClick={handleOpenModal}>
          Read More
        </Button>
      </div>
    );
  }
}

class ImageArea extends React.Component {
  render() {
    return (
      <div className="image-container">
        <h1 className="title">An example blog post</h1>
      </div>
    );
  }
}

class MainArea extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="main-area">
        <div className="blog-post">
          <p className="blog-content">{title}</p>
          <p className="read-more">Hover to read more...</p>
        </div>
      </div>
    );
  }
}

class ModalComponent extends React.Component {
  render() {
    const { showModal, handleCloseModal, content } = this.props;

    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Read More</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Cards;
