import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

//firebase
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

//component
import AddData from "./AddData";

//store
import { userContext } from "../App";

const DataTable = () => {

  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm ] = useState(false);
  const [editData, setEditData] = useState(null);
  const {user} = useContext(userContext);

  useEffect(() => {
    console.log("User in DataTable:", user); 
  }, [user]);

  //fetchingData
  useEffect(() => {
    const fetchingData = onSnapshot(
      collection(db, "data"),
      (snapshot) => {
        const dataList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    );

    return () => fetchingData();
  }, []);

  const handleData =() =>{
    setShowForm(true);   
    setEditData(null);
  }

  const handleEdit = (data) =>{
      console.log("editing Data", data);
      setEditData(data);
      setShowForm(true);
  }

  //delete functionality
  const handleDelete = async (dataId) => {
    if (!dataId) return;

    try {
      await deleteDoc(doc(db, "data", dataId));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task!");
    }
  };
  
  // search functionality
  const filteredData = datas.filter((data) => {
    const titleSearch = data.title?.toLowerCase().includes(search.toLowerCase());
    const prioritySearch = data.priority?.toLowerCase().includes(search.toLowerCase());
    const statusSearch = data.status?.toLowerCase().includes(search.toLowerCase());

    return titleSearch || prioritySearch || statusSearch ;
  }
  );

  return (
    <div data-testid = "data-table">
    {
      showForm ? <AddData setShowForm = {setShowForm} editData={editData} /> :
        <Container sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Box sx={{width:"100%", boxShadow:3, backgroundColor: '#F4F6F8', borderRadius:2, p:2, textAlign:"center"}}>
              <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:2}}>
                <Typography sx={{fontWeight:"600"}}>Email Id :- </Typography>
                <Typography sx={{ fontWeight: "600", fontSize: "18px", color:"#1976D2" }}>
                  {user ? `${user.email}` : "Guest User"}
                </Typography>
              </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Customer List</Typography>
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", pl:2, pr:2}}>
              <TextField
                  label="Searching"
                  variant="outlined"
                  margin="normal"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{minWidth:"900px"}}
              />
              <Stack sx={{}}>
                <Button variant="contained" sx={{textTransform:"none", p:"12px 32px 12px 32px", fontWeight:"600"}} onClick={handleData}>Add Data</Button>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{minHeight:"70vh"}}>

              {loading ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
                  ) : (
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{fontWeight:600}}>Title</TableCell>
                                    <TableCell sx={{fontWeight:600}}>Description</TableCell>
                                    <TableCell sx={{fontWeight:600}}>Due Date</TableCell>
                                    <TableCell sx={{fontWeight:600}}>Priority</TableCell>
                                    <TableCell sx={{fontWeight:600}}>Status</TableCell>
                                    <TableCell sx={{fontWeight:600}}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell>{data.title}</TableCell>
                                        <TableCell>{data.description}</TableCell>
                                        <TableCell>{data.dueDate}</TableCell>
                                        <TableCell>{data.priority}</TableCell>
                                        <TableCell>{data.status}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="success" sx={{textTransform:"none", mr:2, fontWeight:"600"}} onClick={()=>handleEdit(data)}>Edit</Button>
                                            <Button variant="contained" color="error" sx={{textTransform:"none", fontWeight:"600"}} onClick={() => handleDelete(data.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                ) : (
                                <TableRow>
                                    <TableCell colSpan="6">
                                      {datas.length === 0 ? "No tasks available or internet issue." : "No matching tasks found."}
                                    </TableCell>
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </TableContainer>
              )}
            </Box>
          </Box>
        </Container>
    }
    </div>
    
  );
};

export default DataTable;
