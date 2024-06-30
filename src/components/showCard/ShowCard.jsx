/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './ShowCard.css';

function ShowCard({ show }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/show/${show.id}`);
  };

  return (
    <div className="show-card-container">
    <div className="show-card" onClick={handleClick}>
      <img src={show.image ? show.image.medium : 'https://via.placeholder.com/210x295'} alt={show.name} />
      <h3>{show.name}</h3>
    </div>
    </div>
  );
}

export default ShowCard;
