import React from "react";
import "./button.css"

function Button(props){
    return (
        <div className="button">
             <button className="btn">{props.label}</button>
        </div>
    );
}

export default Button;