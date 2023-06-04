import React from "react";
import './topbar.css'
function TopBar(props){
    return (
        <div className="topbar">
        <h1 className="Heading">OBE System/{props.items}</h1>
        <div className="profile">
          <img src="images/default-picture.jpg" alt="Profile" />
          <p>{props.name}</p>
        </div>
      </div>

    );
}

export default TopBar;