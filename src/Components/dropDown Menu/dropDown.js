import React, { useState } from "react";
import "./dropDown.css";

function DropdownMenu(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleMenu}>
        {props.label}
        <i className={`arrow ${showMenu ? "up" : "down"}`} />
      </button>
      {showMenu && (
        <div className="dropdown-content">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
