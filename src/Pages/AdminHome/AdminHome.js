import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import DropdownMenu from "../../Components/dropDown Menu/dropDown";
import './AdminHome.css'
import Table from "../../Components/table/table";
import { useLocation } from 'react-router-dom';

function AdminHome(props){
    const location = useLocation();
    const name = location?.state?.name;

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/' },
    ];

    const topbarName = "Admin";
    const columns = ["CLO", "PLO"];
    const data = [
        { CLO: "Example CLO 1", PLO: "1" },
        { CLO: "Example CLO 2", PLO: "2" },
        { CLO: "Example CLO 3", PLO: "5" },
    ];

    return (
        <div className="admin-home-container">
            <div className="left">
                <VerticalNavbar items={navbarItems}></VerticalNavbar>
            </div>
            <div className="right">
                <div className="right-top">
                    <TopBar items={topbarName} name={name}></TopBar>
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
                            <Table columns={columns} data={data} checkBox={true}></Table>
                        </div>
                        <div className="table-actions">
                            <button className="simple-button">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button className="simple-button">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button className="simple-button">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;