import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firebasedatabase } from "../../backend/firebaseHandler";

import './Viewbookings.css';


const ViewBookings = () => {
    const navigate = useNavigate();
    const [passenger,setPassenger] = useState([]);
    const params = useParams();
    useEffect(() => {
       const fref = ref(firebasedatabase,`Bookings/${params.id}`)
       onValue(fref,(snapshot) => {
        setPassenger(Object.values(snapshot.val()));

       })
       console.log(params.id)
    },[])
    
    return(
        <div>
            <div className="user-list">
                {!passenger ? <div>No Bookings</div> : 
                passenger.map((user,index) => {
                    return (
                        <div className="user">
                            <div key={index}>
                        <p>Name</p>
                        <h2>{user.name}</h2>
                        </div>
                        <div>
                            <p>Gender</p>
                            <h2>{user.gender}</h2>
                        </div>
                        <div>
                            <p>Phone Number</p>
                            <h2>{user.phoneNo}</h2>
                        </div>
                        <div>
                            <p>Email Id</p>
                            <h2>{user.emailId}</h2>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ViewBookings;