import React from 'react';

const Footer = (props) => {
  let classNames = ["text-muted"]

  switch (props.environment) {
    case 'development':
      classNames.push('bg-yellow');
      break;
    case 'production':
      classNames.push('bg-green');
      break;
  }

  return (
    <footer className={classNames.join(' ')} style={{ textAlign: "center", textTransform: "uppercase" }}>
      <div><strong>{props.environment}</strong></div>
    </footer>
  )
}

export default Footer;