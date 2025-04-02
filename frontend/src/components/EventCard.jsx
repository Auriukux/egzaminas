import { Card, Button } from 'react-bootstrap';
import { rateEvent } from '../services/api';

function EventCard({ event }) {
  const handleRate = async (rating) => {
    try {
      await rateEvent(event._id, rating);
    } catch (err) {
      console.error(err);
    }
  };

  const averageRating = event.ratings.length
    ? (event.ratings.reduce((a, b) => a + b, 0) / event.ratings.length).toFixed(1)
    : 'Nėra įvertinimų';

  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      {event.image && <Card.Img variant="top" src={event.image} />}
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
          Kategorija: {event.category}<br />
          Data: {new Date(event.date).toLocaleDateString()}<br />
          Vieta: {event.location}<br />
          Reitingas: {averageRating} ({event.ratings.length} balsų)
        </Card.Text>
        <Button variant="outline-primary" onClick={() => handleRate(5)}>
          ★
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;