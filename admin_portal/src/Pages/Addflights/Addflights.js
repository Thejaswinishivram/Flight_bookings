import { TextField,Button,FormControl,InputLabel,MenuItem} from "@mui/material";
import Select from '@mui/material/Select';
import React, { useState } from "react";
import { push, set,ref } from "firebase/database";
import { firebasedatabase } from "../../backend/firebaseHandler";


const AddFlights=()=>{
  const [flightDetails, setFlightDetails] = useState({
    aireline:"",
    date:"",
    depTime:"",
    arrivalTime:"",
    brdPoint:"",
    destination:"",
    cost:"",
  });


  const handleChange = (event) => {
    const {name,value}=event.target;
    setFlightDetails({...flightDetails,[name]:value});
  };

  const handleClick=async()=>{
    if(!flightDetails.aireline){
        alert("Select the airlines")
        return;
    }
    if(!flightDetails.date){
        alert("Choose the date")
        return;
    }
    if(!flightDetails.depTime){
        alert("Departure Time cannot be empty")
        return;
    }
    if(!flightDetails.arrivalTime){
        alert("Arrival time cannot be empty")
        return;
    }
    if(!flightDetails.brdPoint){
      alert("Arrival time cannot be empty")
      return;
    }
    
    if(!flightDetails.destination){
      alert("Destination cannot be empty")
      return;
    }
    if(!flightDetails.cost){
      alert("Cost cannot be empty")
    }
    const fbRefref=ref(firebasedatabase,`FLIGHTS`);
    await push(fbRefref,flightDetails)
    alert("Flight Added Successfully")
        setFlightDetails({
          aireline:"",
          date:"",
          depTime:"",
          arrivalTime:"",
          brdPoint:"",
          destination:"",
          cost:"",    
        })
}
 
    return(
        <div>
           <h2>Add Flights</h2>
           <div className="container">
            <div>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" focused sx={{width:'600px',marginBottom:'20px',left:'20%'}}>Airline</InputLabel>
                      <Select labelId="demo-simple-select-label" sx={{width:'600px',marginBottom:'20px',left:'20%'}} id="demo-simple-select"
                      label="Airline" name="aireline" value={flightDetails.aireline} onChange={handleChange}>
                        <MenuItem value={"British Airways"}>British Airways</MenuItem>
                        <MenuItem value={"Delta Airlines"}>Delta Airlines</MenuItem>
                        <MenuItem value={"Singapore Airlines"}>Singapore Airlines</MenuItem>
                        <MenuItem value={"Indigo"}>Indigo</MenuItem>
                        <MenuItem value={"Emirates"}>Emirates</MenuItem>
                      </Select>
            </FormControl>
            </div>
            <div>
            <TextField InputProps={{
              inputProps:{
                min:new Date().toISOString().slice(0,10),
              },
            }}
            id="outlined-basic"
            variant="outlined"
            type="date"
            label="Date"
            name="date"
            value={flightDetails.date}
            sx={{width:'300px',marginBottom:'20px',left:'20%'}}
            onChange={handleChange} focused/>
            <TextField id="outlined-basic"sx={{width:'300px',marginBottom:'20px',left:'20%' }}name="depTime"
            value={flightDetails.depTime}  type="time" onChange={handleChange} label="Departure Time" variant="outlined" focused />
            
            </div>
            <div>
            <TextField id="outlined-basic"sx={{width:'300px',marginBottom:'20px',left:'20%' }}name="arrivalTime"
            value={flightDetails.arrivalTime} type="time" onChange={handleChange} label="Arrival Time" variant="outlined" focused />

            <TextField id="outlined-basic"sx={{width:'300px',marginBottom:'20px',left:'20%'}}label="Boarding Point"
             name="brdPoint" onChange={handleChange} value={flightDetails.brdPoint} variant="outlined" focused/>
            
            </div>
            <div>
            
            <TextField id="outlined-basic"sx={{width:'300px',marginBottom:'20px',left:'20%'}}
            name="destination" value={flightDetails.destination} onChange={handleChange} label="Destination" variant="outlined" focused />

            <TextField id="outlined-basic"sx={{width:'300px',marginBottom:'20px',left:'20%',marginleft:'90.5px'}}
            name="cost" value={flightDetails.cost} type="number" onChange={handleChange} label="Cost" variant="outlined" focused/>
            
            </div>
            <Button onClick={handleClick} sx={{width:'200px',position:'fixed',bottom: '80px',left:'40%',marginleft:'90.5px'}}
            variant="contained">Submit</Button>


        </div>
        </div>
    )
}
export default AddFlights;