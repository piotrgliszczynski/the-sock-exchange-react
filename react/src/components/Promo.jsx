import React from 'react'

const Promo = (props) => {
  return (
    <div className="card" style={{ flex: '1', minWidth: '100px' }}>
      <div className="card" style={{ backgroundColor: '#f1f1f1' }}>
        <div className="card-text">{props.data.feature}</div>
        <div className="card-text"><a href="#">Click to buy!</a></div>
      </div >
    </div >
  )
}

export default Promo;