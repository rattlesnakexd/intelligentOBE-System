import React from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import DropdownMenu from "../../Components/dropDown Menu/dropDown";
import './AdminHome.css'
import Table from "../../Components/table/table";

function AdminHome(){

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/logout' },
      ];
    const topbarName = 'Admin';
    const columns = ["Name", "Location"];
    const data = [
      { Name: "John", Location: "New York" },
      { Name: "Mary",  Location: "Los Angeles" },
      { Name: "Bob", Location: "Chicago" },
    ];

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
            <div className="table">
                <div className="table-data">
                    <Table columns={columns} data={data}></Table>

                </div>
                <div className="table-actions">
                </div>
            </div>
        
            </div>
            

            </div>
            
        </div>
    );

}

export default AdminHome;