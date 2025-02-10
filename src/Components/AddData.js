import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'


//firebase
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';


const AddData = ({setShowForm, editData}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState([]);

    const fetchTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "data"));
            const tasksData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(tasksData);
        } catch (error) {
            console.error("Error data fetching:", error);
        }
    };

    useEffect(()=>{
        const debouncing = setTimeout(()=>{fetchTasks()},1000)
        

    },[]);

    useEffect(()=>{
        if(editData){
            setTitle(editData.title);
            setDescription(editData.description);
            setDueDate(editData.dueDate);
            setPriority(editData.priority);
            setStatus(editData.status);
        }
    }, [editData]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            if(editData){
                await updateDoc(doc(db, "data", editData.id),{
                    title,
                    description,
                    dueDate,
                    priority,
                    status
                });
                alert("data Update successfully")
                setShowForm(false)
            }
            else
            {
            await addDoc(collection(db, "data"),{
                title,
                description,
                dueDate,
                priority,
                status,
                // createdAt: new Date(),
            })
            setTitle("");
            setDescription("");
            setDueDate("");
            setPriority("Low");
            setStatus("To Do");
            alert("Task added successfully!");
            setShowForm(false);
        }}
        catch(error){
            console.log(error);
            alert("Error adding/ Editing Data!")
        }
    }

  return (
    <div data-testid="add-data">
        <Container  maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                    <Typography variant="h5" mb={2}>{editData ? "Edit Data" : "Add Data"}</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField data-testid="title-input" label="Title" type="title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
                        <TextField data-testid="description-input" label="Description" type="description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth required />
                        <TextField data-testid="dueDate-input" label="Due Date" type="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth required />
                        <FormControl fullWidth>
                            <InputLabel data-testid="priority-label">Priority</InputLabel>
                            <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel data-testid="status-label">Status</InputLabel>
                            <Select label="statue" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value="ToDo">To-Do</MenuItem>
                                <MenuItem value="InProgress">InProgress</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{textTransform:"none"}} type="submit" variant="contained" color="primary" fullWidth>{editData? "Update" : "AddData"}</Button>
                    </Stack>
                </form>   
            </Box>
        </Container>
    </div>
  )
}

export default AddData
