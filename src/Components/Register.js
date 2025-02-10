import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React, { useContext, useState } from 'react'

//fireBase
import { getAuth , createUserWithEmailAndPassword } from 'firebase/auth'

//component
import FileDragAndDrop from './FileDragAndDrop'

//store
import { userContext } from '../App'

//icons
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Register = () => {

    const {user, setUser} = useContext(userContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);

    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
            setUser({name, email});
            alert("successful register");
            setName('');
            setEmail('');
            setPassword('');
            setRedirect(true);
            // navigate('/')
        }
        catch(error){
            console.log(error);
            alert(error)
        }
    }

    if (redirect) {
        window.location.href = '/'; // Redirect to login page after registration
    }

  return (
    <>
        <div data-testid="register-data">
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', padding: 6, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center', backgroundColor: '#F4F6F8 ' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{md:6, lg:6}} sx={{textAlign:"center"}}>
                        <Box sx={{mb:2, justifyContent:"center", alignItems:"center"}}>
                            <FileDragAndDrop />
                        </Box>
                    </Grid>
                    <Grid size={{md:6, lg:6}} sx={{textAlign:"center"}}>
                        <Box sx={{boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', p:4}}>
                        <Stack sx={{background:"#008CBA", mb:3}}>
                            <Typography variant='h5' sx={{color:"#ffff", pt:1, pb:1}}>Registration Form</Typography>
                        </Stack>   
                                    
                        <form onSubmit={handleRegister}>   
                            <Stack spacing={3}>
                                <TextField data-testid="enter-name" label="Enter Name" type="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
                                <TextField data-testid="enter-email" label="Enter Email Id" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                <TextField data-testid="enter-pass" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                                <Button type="submit" variant="contained" color="primary" sx={{textTransform:"none", fontWeight:"600"}} fullWidth>Register</Button>
                            </Stack>
                        </form>
                        </Box>    
                    </Grid>
                </Grid>   
            </Box>
        </Container>    
    </div>
       
    </>
  )
}

export default Register
