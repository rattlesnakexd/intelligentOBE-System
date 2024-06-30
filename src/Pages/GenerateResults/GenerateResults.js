import React, {useState, useEffect} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button  from "@mui/material/Button";
import { useUser } from "../../Context/UserContext";
import '../../Assests/Styles.css'
import TableComponent from "../../Components/table/table";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function GenerateResults (){
    const {user} = useUser();
    const name = user?.name;
    const [batchDetails, setBatchDetails] = useState([]);
    const [allUploaded, setAllUploaded] = useState(true);
    const [loading, setLoading] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Generate Results', url: '/generate-results'},
        { id: 4, label: 'Logout', url: '/' },
    ];
    const topbarName = 'Admin';
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
                <>
                  {loading ? (
                    <CircularProgress size={24} /> // Render CircularProgress if loading
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={false}
                      onClick={() => handleDownload(value)}
                    >
                      Download
                    </Button>
                  )}
                </>
              ),
        },
    ];

    useEffect(() => {

        const fetchBatchDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/generateResult/get-batches');
                if (response.data) {
                    const sortedBatchDetails = response.data.sort((a, b) => {
                        const batchA = parseInt(a.batch.split('-')[1]);
                        const batchB = parseInt(b.batch.split('-')[1]);
                        return batchB - batchA;
                    });
                    setBatchDetails(sortedBatchDetails);
                }
            } catch (error) {
                console.error("Error fetching batch details:", error);
            }
        };

        fetchBatchDetails();
    }, []);

    const handleDownload = async (rowData) => {
        try {
            setLoading(true);
          const response = await axios.post("http://localhost:8000/generateResult/generate-results", { rowData }, { responseType: 'blob' });
            setLoading(false);

          const contentDisposition = response.headers['content-disposition'];
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          let filename = 'generated_files.zip';
      
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
      

          const file = new Blob([response.data], { type: 'application/zip' });
      

          const fileURL = URL.createObjectURL(file);
      

          const link = document.createElement('a');
          link.href = fileURL;
          link.setAttribute('download', filename);
      
          document.body.appendChild(link);
      
          link.click();
      
          document.body.removeChild(link);
          URL.revokeObjectURL(fileURL);
        } catch (error) {
          console.error("Error downloading:", error);
        }
      };


      useEffect(() => {

        const fetchAllUploaded = async () => {
          try {
            const response = await axios.get('http://localhost:8000/generateResult/check-uploaded');
            setAllUploaded(response.data.all_uploaded)
            console.log(response.data.all_uploaded)
            console.log(allUploaded)
          } catch (error) {
            console.error("Error fetching all_uploaded:", error);
          }
        };
    
        fetchAllUploaded();
      }, [allUploaded]);
      

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