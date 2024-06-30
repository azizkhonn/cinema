/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ShowDetails.css';

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const summaryText = show.summary.replace(/<[^>]+>/g, '');
  const displayText = showMore ? summaryText : `${summaryText.substring(0, 100)}...`;

  return (
    <div className='container'>
      <div className="show-details">
        <div id='singleCard'>
          <img className='showImage' width={280} height={295} src={show.image ? show.image.medium : 'https://via.placeholder.com/210x295'} alt={show.name} />
          <h2 className='cardTitle'>{show.name}</h2>
          <p className='cardText'>{displayText}
          {summaryText.length > 100 && (
            <button className='showMoreButton' onClick={toggleShowMore}>
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
          </p>
          <a className='cardLink' href={show.officialSite} target="_blank" rel="noopener noreferrer">Official Site</a>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
