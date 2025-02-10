import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid2';

//fireBase
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup ,  } from 'firebase/auth';

//Routing
import { Link, useNavigate } from 'react-router-dom';

//icon
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GoogleIcon from '@mui/icons-material/Google';

//store
import { userContext } from '../App';
import { auth } from '../firebase';


const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(userContext);
    
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            const auth = getAuth(); 
                const userCredentail =await signInWithEmailAndPassword(auth, email, password);
                const loggedInUser = userCredentail.user;
                
                setUser({ uid: loggedInUser.uid, email: loggedInUser.email })
                console.log("User logged in successfully!");
                navigate('/dataTable')
                alert("succesfull login")
        }
        catch(error){
            console.log(error);
            alert(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;
            
            setUser({ uid: googleUser.uid, email: googleUser.email });
            console.log("Google login successful:", googleUser);
            navigate('/dataTable');
            alert("Google login successful");
        } catch (error) {
            console.log("Google login error:", error);
            alert(error.message);
        }
    };

  return (
    <div data-testid="login-page">
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ width: '100%', padding: 6, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center', backgroundColor: '#F4F6F8' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{md:6, lg:6}} sx={{textAlign:"center"}}>
                        <Box sx={{mb:2, justifyContent:"center", alignItems:"center"}}>
                            <AcUnitIcon sx={{fontSize:"6rem", color: '#FF6F00'}} />
                            <Typography sx={{color:"#FF6F00", fontSize:"30px"}}>Constructions</Typography>
                        </Box>
                        <Typography sx={{color:"#1E293B", fontWeight:"600", fontSize:"20px"}}>Start Your journey now with Us</Typography>
                    </Grid>
                    <Grid size={{md:6, lg:6}} sx={{textAlign:"center"}}>
                        <Box sx={{boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', p:4}}>
                            <Typography sx={{fontSize:"32px", color:"#1E293B", fontWeight:"600", mb:4, color:"#008CBA"}}>Login</Typography>
                            <form onSubmit={handleLogin}>
                                <Stack spacing={2}>
                                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{py:1, textTransform:"none", fontWeight:"600"}}>Login</Button>
                                </Stack>
                            </form>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<GoogleIcon />}
                                fullWidth
                                sx={{ mt: 2, py: 1, textTransform: "none", fontWeight: "600", backgroundColor: "#DB4437" }}
                                onClick={handleGoogleSignIn}
                            >
                                Sign in with Google
                            </Button>
                            <Typography mt={2} variant="body2">
                                If you don't have a Google account, please <Link to="/register" style={{ color: '#1976D2', textDecoration: 'none' }}>Sign Up with Email</Link>.
                            </Typography>
                        </Box>
                        
                    </Grid>
                </Grid>   
            </Box>
        </Container>    
    </div>
  )
}

export default Login ;
