import React from 'react';

const Footer = (props) => {
  return (
    <footer className="text-muted" style={{ textAlign: "left" }}>
      <div><strong>{props.environment}</strong></div>
    </footer>
  )
}

export default Footer;