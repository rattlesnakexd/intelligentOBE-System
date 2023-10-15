import React,{useState} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import './section.css'
import TableComponent from "../../Components/table/table";
import {useUser} from "../../Context/UserContext"
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Section(){
    const {user} = useUser();
    const name = user?.name
    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/' },
      ];
    const topbarName = 'Admin';
    const columns = [
        {
            id: "course",
            label: "Course",
            minWidth: 270,
            align: "center"
        },
        {
            id: "section",
            label: "Section",
            minWidth: 70,
            align: "center",
        },
        {
            id: "teacher",
            label: "Teacher",
            minWidth: 270,
            align: "center",
        }
    ];
    const data = [
      { id: 1,course: "Programming Fundamental", section: "A", teacher: "Abdullah Sohail" },
      { id: 2,course: "Programming Fundamental", section: "B", teacher: "Abdullah Sohail" },
      { id: 3,course: "Programming Fundamental", section: "C", teacher: "Abdullah Sohail" },
      { id: 3,course: "Programming Fundamental", section: "C", teacher: "Abdullah Sohail" },
      { id: 3,course: "Programming Fundamental", section: "C", teacher: "Abdullah Sohail" },
    ];

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
                <div className="table-data">
                    <TableComponent columns={columns} rows={data} />
                </div>
            </div>
            </div> 
            </div>
            
        </div>
    );

}

export default Section;