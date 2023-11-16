import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, Button } from 'react-bootstrap';
import './Cards.css';
import { fetchCardData } from '../service/CardService';

function Cards() {
  const [cardData, setCardData] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

    const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };


  const handleAddNewBeer = () => {
    // Add your logic for adding a new beer
    console.log('Adding a new beer');
  };

return (
    <Container>
        <div className="row">
        <div className="col-md-6">
          <Button variant="primary" onClick={toggleFavorites}>
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </Button>
        </div>
        <div className="col-md-6">
          <Button variant="success" onClick={handleAddNewBeer}>
            Add New Beer
          </Button>
        </div>
      </div>
      <div className="row">
        {showFavorites
          ? cardData
              .filter((card) =>
                JSON.parse(sessionStorage.getItem('favoriteBeers') || []).includes(card.id)
              )
              .map((card, index) => (
                <div key={index} className="col-md-4">
                  <BlogCard
                    title={card.name}
                    price={card.price}
                    rating={card.rating}
                    description={card.description}
                    imageUrl={card.photos}
                    id={card.id}
                  />
                </div>
              ))
          : cardData.map((card, index) => (
              <div key={index} className="col-md-4">
                <BlogCard
                  title={card.name}
                  price={card.price}
                  rating={card.rating}
                  description={card.description}
                  imageUrl={card.photos}
                  id={card.id}
                />
              </div>
            ))}
      </div>
    
    </Container>
  );
}

class BlogCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flipped: false, showModal: false ,isFavorite: false};
    this.flip = this.flip.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    this.initializeIsFavoriteState();
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

  
  toggleFavorite = () => {
    const { id } = this.props;
    this.setState(
      (prevState) => ({
        isFavorite: !prevState.isFavorite,
      }),
      () => {
        console.log('Updated isFavorite:', this.state.isFavorite);
        // Save the updated favorite status in session storage
        const favoriteBeers = JSON.parse(sessionStorage.getItem('favoriteBeers')) || [];
        const beerIndex = favoriteBeers.indexOf(id);

        if (beerIndex !== -1) {
          // Remove from favorites if already present
          favoriteBeers.splice(beerIndex, 1);
        } else {
          // Add to favorites if not present
          favoriteBeers.push(id);
        }

        sessionStorage.setItem('favoriteBeers', JSON.stringify(favoriteBeers));
      }
    );
  };

  // Call this method in your component's lifecycle (e.g., componentDidMount)
  initializeIsFavoriteState = () => {
    const { id } = this.props;
    const favoriteBeers = JSON.parse(sessionStorage.getItem('favoriteBeers')) || [];
    const isFavorite = favoriteBeers.includes(id);
    this.setState({ isFavorite });
  };
  
  

  render() {
    const { title, price, rating, description, imageUrl,id} = this.props;

    return (
      <div
        onMouseEnter={this.flip}
        onMouseLeave={this.flip}
        className={"card-container" + (this.state.flipped ? " flipped" : "")}
      >
        <Front title={title} imageUrl={imageUrl} price={price} rating={rating} description={description}/>
        <Back title={title}  description={description} handleOpenModal={this.handleOpenModal}  isFavorite={this.state.isFavorite}/>
        <ModalComponent showModal={this.state.showModal} handleCloseModal={this.handleCloseModal}
         title={title} imageUrl={imageUrl} price={price} rating={rating} description={description} id={id}
          isFavorite={this.state.isFavorite}
        toggleFavorite={this.toggleFavorite} />
      </div>
    );
  }
}

class Front extends React.Component {
  render() {
    const { title, imageUrl, price, rating, description } = this.props;

    return (
      <div className="front">
       <div className="row">
      <div className="col-md-4">
        <ImageArea imageUrl={imageUrl} />
      </div>
      <div className="col-md-8">
        <HeaderArea title={title}/>
        <MainArea title={title} price={price} rating={rating} description={description}/>
        <FooterArea price={price} rating={rating} />
      </div>
    </div>
      </div>
    );
  }
}

class Back extends React.Component {
// Define CSS styles as constants
buttonStyle = {
  border: 'none',
  backgroundColor: 'inherit', // Change the background color to your preference
  color: '#8c8c8c', // Change the text color to your preference
  padding: '0px',
  cursor: 'pointer',
  fontSize: '0.7em',
  fontStyle: 'italic'
};

descriptionStyle = {
  color: '#333', // Change the text color to your preference
  fontSize: '0.7em', // Change the font size to your preference
  lineHeight: '1.4',
  fontStyle: 'italic'
};

headerStyle = {
  borderBottom: '2px solid #b3b3b3', // Add your preferred color here
  paddingBottom: '10px', // Adjust the spacing as needed
  marginBottom: '10px', // Adjust the spacing as needed
  fontSize: '1.3em', // Adjust the font size as needed
  fontWeight: 'bold', // Adjust the font weight as needed
  color:'#737373',
  };
  
  truncateDescription = (description, words) => {
    return description.split(' ').slice(0, words).join(' ') + (description.split('').length > words ? '' : '');
  };

  render() {
    const {title, description, handleOpenModal ,isFavorite} = this.props;
    const truncatedDescription = this.truncateDescription(description, 15);

    return (
      <div className="back">
          {isFavorite ? '★' : '☆'} 
        <h1 style={this.headerStyle} className="Header">{title}</h1>
        <p style={this.descriptionStyle}>
          {truncatedDescription}
          {description.split(' ').length > 15 && (
            <span>
              {' '}
              {/* Add a space before the "Read more..." text */}
              <Button style={this.buttonStyle} variant="primary" onClick={handleOpenModal}>
              Read more...
              </Button>
            </span>
          )}
        </p>
      </div>
    );
  }
}

class ImageArea extends React.Component {
  render() {
     const { imageUrl } = this.props;
    return (
    <div className="image-container">
    <img src={imageUrl} alt="img" className="img-fluid" />
     </div>
    );
  }
}

class HeaderArea extends React.Component {
  render() {
    const { title } = this.props;

    const headerStyle = {
  borderBottom: '2px solid #b3b3b3', // Add your preferred color here
  paddingBottom: '10px', // Adjust the spacing as needed
  marginBottom: '10px', // Adjust the spacing as needed
  fontSize: '1.3em', // Adjust the font size as needed
  fontWeight: 'bold', // Adjust the font weight as needed
  color:'#737373',
    };

    return (
      <div className="Header" style={headerStyle}>
        {title}
      </div>
    );
  }
}

class MainArea extends React.Component {
  render() {
    const { title,price, rating, description } = this.props;
    const truncatedDescription =
    description.split(' ').slice(0, 10).join(' ') + (description.split(' ').length > 10 ? '...' : '');
    const desStype = {
      color: '#737373'
    }
    return (
      <div className="main-area">
      <div className="blog-post">
        <p style={desStype} className="description">{truncatedDescription}</p>
      </div>
    </div>
    );
  }
}

// Add a new component for the FooterArea
class FooterArea extends React.Component {
  render() {
    const { price, rating } = this.props;

    const starRating = '⭐'.repeat(rating);
    const styles = {
      price: {
        fontWeight: 'bold',
        fontSize: '1em',
        color: '#262626'
      },
      rating: {
        fontSize: '1em',
      },
    };
    
    
    return (
      <div className="footer">
        <div className="row">
          <div className="col-md-6">
            <p style={styles.price} className="price">
              <span role="img" aria-label="Rupee">
                ₹
              </span>
              {price}
            </p>
          </div>
          <div className="col-md-6">
            <p style={styles.rating} className="rating">
              {starRating}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class ModalComponent extends React.Component {
  render() {
    const { showModal, handleCloseModal, description,title, price, rating, imageUrl , id, isFavorite, toggleFavorite} = this.props;
      // Retrieve favorite beers from session storage on component moun

    return (
      <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ marginRight: '20px' }}>
    <ImageArea imageUrl={imageUrl} />
  </div>
  <div>
    <p>{description}</p>
  </div>
</Modal.Body>


<Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <FooterArea price={price} rating={rating} />
  <Button
  variant="primary"
  onClick={toggleFavorite}
  style={{
    color: isFavorite ? 'green' : 'black',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '2.5em',
    padding: '0',
    margin: '0',
    display: 'flex', // Use flex display to align items vertically
    flexDirection: 'column', // Align items in a column
    alignItems: 'center', // Center items horizontally
  }}
>
  {isFavorite ? '★' : '☆'} 
  <p style={{ color: 'grey', fontSize: '0.4em', margin: '0' }}>Favorite</p>
</Button>


</Modal.Footer>

      </Modal>
    );
  }
}

export default Cards;
