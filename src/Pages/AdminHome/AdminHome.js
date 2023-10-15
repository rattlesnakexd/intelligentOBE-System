import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import DropdownMenu from "../../Components/dropDown Menu/dropDown";
import Modal from "../../Components/modal/modal";
import './AdminHome.css'
import Table from "../../Components/table/table";
import { useUser } from '../../Context/UserContext';

function AdminHome(props){
    const { user } = useUser();
    const name = user?.name
    const [opneModal, setOpenModal] = useState(false);

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

    const handleModal = () => {
        setOpenModal(true);
    }

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
                        <div>
                            {opneModal && <Modal opneModal={opneModal} setOpenModal={setOpenModal} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;