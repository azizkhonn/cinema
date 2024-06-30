import { FcSearch } from "react-icons/fc"; 
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowCard from './components/showCard/ShowCard';
import ShowDetails from './components/showDetails/ShowDetails';
import Pagination from './components/pagination/Pagination';
import Navbar from "./components/navbar/Navbar";
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, shows, currentPage, itemsPerPage]);

  const fetchShows = async () => {
    try {
      const response = await axios.get('https://api.tvmaze.com/shows');
      setShows(response.data);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  const applyFilter = () => {
    const filtered = shows.filter(show => show.name.toLowerCase().includes(filter.toLowerCase()));
    const startIndex = (currentPage - 1) * itemsPerPage;
    setFilteredShows(filtered.slice(startIndex, startIndex + itemsPerPage));
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    
    
    <Router>
    <Navbar />
      <div className="App">
        <div className="main-container">
          <div className="content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <div className="search-container">
                      <FcSearch size={22}  style={{marginTop: "3px"}}/>
                      <input
                        type="text"
                        placeholder="Search"
                        onChange={handleFilterChange}
                      />
                    
                    </div>
                    <div className="items-per-page">
                      <label className="labelText" htmlFor="itemsPerPage">Items per page: </label>
                      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                    <div className="show-cards">
                      {filteredShows.map(show => (
                        <ShowCard key={show.id} show={show} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                } 
              />
              <Route path="/show/:id" element={<ShowDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
