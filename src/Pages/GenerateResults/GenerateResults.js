import React, {useState, useEffect} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button  from "@mui/material/Button";
import { useUser } from "../../Context/UserContext";
import '../../Assests/Styles.css'
import TableComponent from "../../Components/table/table";
import axios from "axios";

function GenerateResults (){
    const {user} = useUser();
    const name = user?.name;
    const [batchDetails, setBatchDetails] = useState([]);
    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Generate Results', url: '/generate-results'},
        { id: 4, label: 'Logout', url: '/' },
    ];
    const topbarName = 'Teacher';
    const columns = [
        {
            id: "batch",
            label: "Batch",
            minWidth: 270,
            align: "center"
        },
        {
            id: "semester",
            label: "Semester",
            minWidth: 270,
            align: "center"
        },
        {
            id: "download",
            label: "Generate",
            minWidth: 150,
            align: "center",
            format: (value) => (
                <Button variant="contained" color="primary" onClick={() => handleDownload(value)}>
                    Download
                </Button>
            ),
        },
    ];

    useEffect(() => {
        // API call to fetch batch details
        const fetchBatchDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/generateResult/get-batches');
                if (response.data) {
                    setBatchDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching batch details:", error);
            }
        };

        fetchBatchDetails();
    }, []);

    const handleDownload = async (rowData) => {
        try {
          const response = await axios.post("http://localhost:8000/generateResult/generate-results", { rowData }, { responseType: 'blob' });
      
          // Parse the content-disposition header to extract the filename
          const contentDisposition = response.headers['content-disposition'];
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          let filename = 'generated_files.zip'; // Default filename
      
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
      
          // Create a Blob from the response data
          const file = new Blob([response.data], { type: 'application/zip' });
      
          // Create a URL for the Blob
          const fileURL = URL.createObjectURL(file);
      
          // Create a link element
          const link = document.createElement('a');
          link.href = fileURL;
          link.setAttribute('download', filename); // Set the download attribute with extracted filename
      
          // Append the link to the body
          document.body.appendChild(link);
      
          // Click the link to trigger download
          link.click();
      
          // Clean up: remove the link and revoke the URL object to free memory
          document.body.removeChild(link);
          URL.revokeObjectURL(fileURL);
        } catch (error) {
          console.error("Error downloading:", error);
        }
      };
      

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
            <h1>Generate Report Cards</h1>
            <div className="lists">
            </div>
            <div className="table">
                <div className="table-data">
                    <TableComponent columns={columns} rows={batchDetails}></TableComponent>
                </div>
                <div className="table-actions">
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default GenerateResults;