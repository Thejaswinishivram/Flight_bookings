import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebasedatabase } from "../../backend/firebaseHandler";
import './Homepage.css';

const HomePage = ({name,sendPosts}) => {
    
    const navigate = useNavigate();
    const [flights,setFlights] = useState([]);
    const [ids,setIds] = useState([]);

    useEffect(() => {
        const fireref = ref(firebasedatabase,`FLIGHTS`)
        onValue(fireref, (snapshot) => {
            setFlights(Object.values(snapshot.val()));
            setIds(Object.keys(snapshot.val()));
          },{onlyOnce:true});
      
    },[])
    const handleClick = (e) => {
          const id = e.target.id; 
          sendPosts(flights[id]);
          navigate('/Add_Flight') 
    }

    return (
        <div>
          <header>
              <h2>BookFlights-Admin</h2>
              <Button sx={{height:"50px",margin:"10px 10px 0 10px"}} 
              variant="contained" onClick={() => navigate("/Add_Flight")}>Add Flight</Button>
          </header>
          <div className="post-container">
              <h1 className="head">All Listings</h1>
              {
              flights.map((flight,index) => {
                  return (
                    <div key={ids[index]}>
                      <div className="posts" key={index}>
                        <h3>{flight.aireline}</h3>
                        <p>{flight.date}</p>
                        <p>{flight.depTime}</p>
                        <p>{flight.arrivalTime}</p>
                        <p>{flight.brdPoint}</p>
                        <p>{flight.destination}</p>
                        <p>{flight.cost}</p>
                        <Button variant="contained" onClick={() => navigate(`/view_bookings/${ids[index]}`)}>View Bookings</Button>
                      </div>
                      </div>
                  )
              })}
          </div>
        </div>
    )
}

export default HomePage;