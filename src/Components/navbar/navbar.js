import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function VerticalNavbar(props) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/'); // Navigate to the '/login' route
  };

  return (
    <nav className="vertical-navbar">
      <ul className="nav-list">
        {props.items.map((item) => (
          <li className="nav-item" key={item.id}>
            {item.label === 'Logout' ? (
              <a className="item-link" href={item.url} onClick={handleLoginClick}>
                {item.label}
              </a>
            ) : (
              <Link className="item-link" to={item.url}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default VerticalNavbar;
