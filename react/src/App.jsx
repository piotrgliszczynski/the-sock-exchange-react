import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sock from './components/Sock'
import Footer from './components/Footer'
import Search from './components/Search'
import Promo from './components/Promo'
import sock_data from './assets/sock.json'
import promo_data from './assets/promo.json'
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TSE</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
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
            <div className="card-container" style={{ display: 'flex', flexWrap: "nowrap", gap: '20px', padding: '20px' }}>
              {
                promo_data.map(
                  (promo) => (
                    <Promo key={promo.id} data={promo} />
                  ))
              }
            </div>
            <hr />
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {
                data.map((sock) => (
                  <Sock key={sock._id} data={sock} handleDelete={handleDelete} />
                ))
              }
            </div>
            <Footer environment={import.meta.env.VITE_ENVIRONMENT} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
