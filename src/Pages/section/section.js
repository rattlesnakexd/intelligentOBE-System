import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import VerticalNavbar from "../../Components/navbar/navbar";
import Modal from "../../Components/modal/modal";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import DropdownMenu from "../../Components/dropDown Menu/dropDown";
import './section.css'
import Table from "../../Components/table/table";
import { useLocation } from 'react-router-dom';

function Section(){
    const location = useLocation();
    const name = location?.state?.name;
    const [opneModal, setOpenModal] = useState(false);

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
    const handleModal = () => {
        setOpenModal(true);
    }

    return(
        <div className="section-container">
            <div className="left">
            <VerticalNavbar items={navbarItems}></VerticalNavbar>
            </div>
            <div className="right">
            <div className="right-top">
            <TopBar items={topbarName} name={name}></TopBar>

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
                <button className="simple-button">
                                <FontAwesomeIcon icon={faPlus} 
                                onClick={handleModal}/>
                            </button>
                            <button className="simple-button">
                                <FontAwesomeIcon icon={faTrash}
                                onClick={handleModal} />
                            </button>
                            <button className="simple-button">
                                <FontAwesomeIcon icon={faEdit} 
                                onClick={handleModal}/>
                            </button>
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

export default Section;