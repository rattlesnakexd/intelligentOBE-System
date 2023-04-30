import React from "react";
import VerticalNavbar from "../navbar/navbar";
import TopBar from "../topbar/topbar";
import Button from "../button/button";
import DropdownMenu from "../dropDown Menu/dropDown";
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
            <Button label={"Upload Master Sheet"}></Button>
            <div className="lists">
                <DropdownMenu label={"Semester No"}></DropdownMenu>
                <DropdownMenu label={"Course Name"}></DropdownMenu>

            </div>

            </div>
            

            </div>
            
        </div>
    );

}

export default AdminHome;