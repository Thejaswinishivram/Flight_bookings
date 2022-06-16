import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Signup.css"
import { firebaseAuth, firebasedatabase} from "../../backend/firebaseHandler";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { width } from "@mui/system";
import { ref, set } from "firebase/database";

const SignUp=()=>{
    const navigate=useNavigate();
    const [loading,setLoading] = useState(false);

    const[userData,setUserData]=useState({
        name:"",
        phoneNo:"",
        gender:"",
        emailId:"",
        password:"",
        confirmpass:""
    })
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }

    const handleSave=async()=>{
        if(!userData.name){
            alert("Please Enter the Name");
            return;
        }
        if(!userData.phoneNo){
            alert("Please Enter the Phone Number");
            return;
        }
        if(!userData.gender){
            alert("Please Select the Gender");
            return;
        }
        if(!userData.emailId){
            alert("Please Enter the Email ID");
            return;
        }
        if(!userData.password){
            alert("Please Enter the Password");
            return;
        }
        if(!userData.confirmpass){
            alert("Please Confirm your password");
            return;
        }
        if(userData.password == userData.confirmpass){
            try{
                setLoading(true);
                await createUserWithEmailAndPassword(firebaseAuth,userData.emailId,userData.password);
                onAuthStateChanged(firebaseAuth, async (user) => {
                    if(user){
                        const uid = user.uid;
                        const fref = ref(firebasedatabase,`User_Details/${uid}`)
                        await set(fref,{
                            name:userData.name,
                            phoneNo:userData.phoneNo,
                            gender:userData.gender,
                            emailId:userData.emailId
                        })
                        navigate("/")
                    }
                })
            }catch(err){
                alert(err);
            }
            setLoading(false);
            }else{
            console.log("not");
        }
        

    }

    return(
        
        <div className="login-page-container">
            <div className="logi-form-container">
                <h1 className="login-logo">Sign Up</h1>
                <div className="login-form-elements">  
                <div className="login-element">
                    
                    <p>Please enter your details</p> 
                    <TextField name="name" value={userData.name} onChange={handleChange} sx={{marginTop:"15PX"}}
                    id="outlined-basic" label="Name" variant="outlined" />

                    <TextField name="phoneNo" value={userData.phoneNo} type="number" onChange={handleChange} sx={{marginTop:"15PX"}}
                    id="outlined-basic" label="Phone Number" variant="outlined" />

                    <FormControl sx={{marginTop:'15px', width:"225px"}}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userData.gender}
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="box">
                        
                    <TextField name="emailId" value={userData.emailId} onChange={handleChange} sx={{marginTop:"15PX"}}
                    id="outlined-basic" label="Email Id" type="email" variant="outlined" />

                    <TextField name="password" value={userData.password} onChange={handleChange} sx={{marginTop:"15PX"}}
                    id="outlined-basic" label="Password" variant="outlined" />


                    <TextField name="confirmpass" value={userData.confirmpass} onChange={handleChange} sx={{marginTop:"15PX"}}
                     id="outlined-basic" label="Confirm Password"type="password" variant="outlined" />
                     </div>
                    <Button disabled={loading} sx={{marginTop:"20PX",width:"225px"}} variant="contained" onClick={handleSave}>Sign In</Button>
                    <div >Already have an account?<a href="http://localhost:3000/login">Sign In</a> </div>
                </div> 
            </div>
            </div>
         </div>
         
    )
}

export default SignUp;
