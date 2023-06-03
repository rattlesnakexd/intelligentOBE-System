import React from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import DropdownMenu from "../../Components/dropDown Menu/dropDown";
import './section.css'
import Table from "../../Components/table/table";

function Section(){

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/' },
      ];
    const topbarName = 'Admin';
    const columns = ["Course", "Section", "Teacher"];
    const data = [
      { Course: "Programming Fundamental", Section: "A", Teacher: "Abdullah Sohail" },
      { Course: "Programming Fundamental", Section: "B", Teacher: "Abdullah Sohail" },
      { Course: "Programming Fundamental", Section: "C", Teacher: "Abdullah Sohail" },
    ];

    return(
        <div className="section-container">
            <div className="left">
            <VerticalNavbar items={navbarItems}></VerticalNavbar>
            </div>
            <div className="right">
            <div className="right-top">
            <TopBar items={topbarName}></TopBar>

            </div>
            <div className="right-bottom">
            <h1>Upload Section Sheet</h1>
            <Button label={"Upload Section Sheet"}></Button>
            <div className="lists">
                <DropdownMenu label={"Course Code"}></DropdownMenu>
            </div>
            <div className="table">
                <div className="table-data">
                    <Table columns={columns} data={data} checkBox={true}></Table>

                </div>
                <div className="table-actions">
                </div>
            </div>
            </div> 
            </div>
            
        </div>
    );

}

export default Section;