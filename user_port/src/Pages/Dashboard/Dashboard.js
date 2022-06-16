import { Button, TextField } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebasedatabase } from "../../backend/firebaseHandler";

import './Dashboard.css';

const DashBoard = () => {
  const navigate = useNavigate();
  const [flightList,setFlightList] = useState([]);
  const [ids,setIds] = useState([]);
  const [date, setDate] = useState(null);
  const [uid, setUid] = useState();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setUid(user.uid);
      }else{
        navigate("/login")
      }
    });
    const fref = ref(firebasedatabase,'FLIGHTS')
    onValue(fref,(snapshot) => {
        setFlightList(Object.values(snapshot.val()));
        setIds(Object.keys(snapshot.val()));
    },{onlyOnce:true})
  },[])

  const handleClick = (e) => {
      const fbref = ref(firebasedatabase,`User_Details/${uid}`)
      const id = e.target.id;
      onValue(fbref, async (snapshot) => {
      const userref = ref(firebasedatabase,`Bookings/${id}/${uid}`)
      await set(userref,snapshot.val())
      alert("Your Flight Has Been Booked!")
      })
  }
  

    return (
        <div>
          
          <header className="header">
            <h1>BookFlights</h1>
            <div className="button">
            <Button sx={{height:"50px",margin:"5px 5px 0 5px"}} 
            variant="contained" onClick={() => navigate("/signup")}>Logout</Button>
            </div>
          </header>
         
          <div>
            <div className="date-select">
            <h3>Select Date</h3>
            <TextField sx={{width:"600px",marginLeft:"20px"}} 
            id="outlined-basic" variant="outlined" type={'date'} value={date} 
            onChange={(e) => setDate(e.target.value)}/>
            </div>
          <div className="flights-list">
            {flightList.map((flight,index) => {
               if(date == flight.date){
                return(
                  <div key={ids[index]} className="flights">
                        <div>
                        <p>Airline</p>
                        <h3>{flight.aireline}</h3>
                        </div>
                        <div>
                            <p>Date</p>
                            <h3>{flight.date}</h3>
                        </div>
                        <div>
                            <p>Departure Time</p>
                            {flight.depTime[0] + flight.depTime[1] >= 12 ? <h3>{flight.depTime} PM</h3>:<h3>{flight.depTime} AM</h3>}
                        </div>
                        <div>
                            <p>Arrival Time</p>
                            {flight.arrivalTime[0] + flight.arrivalTime[1] >= 12 ? <h3>{flight.arrivalTime} PM</h3>:<h3>{flight.arrivalTime} AM</h3>}
                        </div>
                        <div>
                            <p>Boarding Point</p>
                            <h3>{flight.brdPoint}</h3>
                        </div>
                        <div>
                            <p>Destination</p>
                            <h3>{flight.destination}</h3>
                        </div>
                        <div>
                            <p>Cost</p>
                            <h3>{flight.cost}</h3>
                        </div>
                        <div className="book">
                            <Button variant="contained" onClick={handleClick} id={ids[index]}>Book</Button>
                        </div>
                       </div>
                )
               }
            })}
            </div>
          </div>
        </div>
    )
}

export default DashBoard;