import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Loginpage.css";

import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../backend/firebaseHandler";
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginPage=()=>{
    const navigate=useNavigate();
    const[loading,setLoading]=useState(false);

    const[userData,setUserData]=useState({
        emailId:"",
        password:""
    })
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }

    const handleSave=async()=>{
        try{
           setLoading(true)
          await signInWithEmailAndPassword(firebaseAuth,userData.emailId,userData.password)
          navigate("/")
        }
        catch(err){
          alert(err);
        }
    }



    return(
        <div className="login-page-container">
            <div className="logi-form-container">
                <h1 className="login-logo">Login Portal</h1>
                <div className="login-form-elements">  
                <div className="login-element">
                    <h1>Welcome back</h1>
                    <p>Welcom back! please enter your details</p>    
                    <TextField name="emailId" value={userData.emailId} type="email" onChange={handleChange} sx={{marginTop:"15PX"}}id="outlined-basic" label="Email Id" variant="outlined" />
                    <TextField name="password" value={userData.password} type="password" onChange={handleChange} sx={{marginTop:"15PX"}} id="outlined-basic" label="Password" variant="outlined" />
                    <Button sx={{marginTop:"20PX",width:"225px"}} variant="contained" onClick={handleSave}>Sign In</Button>
                    <div className="account">Don't have an account?<a href="http://localhost:3000/signup">Sign Up</a> </div>
                </div> 
                </div>
            </div>
            

        </div>
        
    )
}
export default LoginPage;