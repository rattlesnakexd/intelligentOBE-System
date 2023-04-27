import React from 'react';
import './navbar.css'


function VerticalNavbar(props) {
  return (
    <nav className="vertical-navbar">
      <ul className='nav-list'>
        {props.items.map((item) => (
          <li className='nav-item' key={item.id}>
            <a className='item-link' href={item.url}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default VerticalNavbar;
