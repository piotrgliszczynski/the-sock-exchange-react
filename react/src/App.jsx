import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sock from './components/Sock'
import Footer from './components/Footer'
import Search from './components/Search'
import Promo from './components/Promo'
import Home from './components/Home'
import About from './components/About'
import Featured from './components/Featured'
import AddSock from './components/AddSock'
import sock_data from './assets/sock.json'
import promo_data from './assets/promo.json'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }

        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (sockId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`, {
        method: `DELETE`
      });
      if (!response.ok) {
        throw new Error('Sock could not be deleted!');
      }

      const updatedData = data.filter(sock => sock._id !== sockId);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting sock:', error);
    }
  }

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">TSE</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-sock">Add Sock</Link>
                </li>
              </ul>
              <Search setData={setData} />
            </div>
          </div>
        </nav>
        <main role="main" className="ml-sm-auto col-lg-12 px-md-4">

          <div className="container-fluid">
            <div className="row">
              Both socks and space rockets 🚀 will take you to new heights, but only one will get cold feet!
              <hr />
              <Featured promoData={promo_data} />
              <Routes>
                <Route exact path="/" element={<Home data={data} handleDelete={handleDelete} />} />
                <Route path="/about" element={<About />} />
                <Route path="/add-sock" element={<AddSock />} />
              </Routes>
              <Footer environment={import.meta.env.VITE_ENVIRONMENT} />
            </div>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
