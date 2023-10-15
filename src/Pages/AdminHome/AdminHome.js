import React, { useState } from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import './AdminHome.css'
import TableComponent from "../../Components/table/table";
import { useUser } from '../../Context/UserContext';

function AdminHome(props){
    const { user } = useUser();
    const name = user?.name
    const [semester, setSemester] = useState(1);

    const handleChange = (event) => {
        setSemester(event.target.value);
    };

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/' },
    ];

    const topbarName = "Admin";
    const columns = [
        {
            id: "clos",
            label: "CLOs",
            minWidth: 300,
            align: "center"
        },
        {
            id: "plos",
            label: "PLOs",
            minWidth: 70,
            align: "center"
        },
        {
            id: "plosName",
            label: "PLO Name",
            minWidth: 300,
            align: "center"
        },
    ];
    const data = [
        { id: 1,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 2,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 3,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 4,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 5,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 6,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 7,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
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
                        <FormControl variant="outlined" style={{width: 200, marginRight: 20}} size="small">
                            <InputLabel htmlFor="semester-select">Semester No</InputLabel>
                            <Select
                                label="Semester No"
                                inputProps={{
                                    name: "semester",
                                    id: "semester-select",
                                }}
                                value={semester} // Set the value to the state
                                onChange={handleChange} // Add the onChange handler
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{width: 200}} size="small">
                            <InputLabel htmlFor="course-select">Course Name</InputLabel>
                            <Select
                                label="Course Name"
                                inputProps={{
                                    name: "course",
                                    id: "course-select",
                                }}
                            >
                                <MenuItem value={1}>Course 1</MenuItem>
                                <MenuItem value={2}>Course 2</MenuItem>
                                <MenuItem value={3}>Course 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="table">
                        <div>
                            <TableComponent columns={columns} rows={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
