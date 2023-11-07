import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Card } from 'react-bootstrap';


function Cards() {
    const cardData = [
      { title: 'Card 1', content: 'This is the content of Card 1' },
      { title: 'Card 2', content: 'This is the content of Card 2' },
      { title: 'Card 3', content: 'This is the content of Card 3' },
    ];
  
    return (
      <Container>
        <div className="row">
          {cardData.map((card, index) => (
            <div key={index} className="col-md-4">
              <Card>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.content}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  export default Cards;