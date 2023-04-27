import React from "react";
import VerticalNavbar from "../navbar/navbar";
import TopBar from "../topbar/topbar";
import './AdminHome.css'

function AdminHome(){

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/logout' },
      ];
    const topbarName = 'Admin';
    return(
        <div className="admin-home-container">
            <div className="left">
            <VerticalNavbar items={navbarItems}></VerticalNavbar>
            </div>
            <div className="right">
            <div className="right-top">
            <TopBar items={topbarName}></TopBar>

            </div>
            <div className="right-bottom">
            <h1>Upload Master Sheet</h1>
            <button className="Upload-Master">Upload Master Sheet</button>
            <div className="lists">
            </div>

            </div>
            

            </div>
            
        </div>
    );

}

export default AdminHome;