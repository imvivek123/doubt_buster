import React from 'react';
import './dashboard.css';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {auth,database,ref} from "../firebase";
import { signOut } from "firebase/auth";
import { query, orderByChild, equalTo,onValue } from 'firebase/database';

import Navbar from './navbar.js';

function Dashboard(){
  const navigate= useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert('Succesfully Signed out!')
      navigate("/")
    }).catch((error) => {
      alert('Error in Signing out!')
      alert(error);
    });
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userRef = ref(database, 'Questions');

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const userDataArray = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });
        setUserData(userDataArray);
      }
    });
  }, []);

    return(
      <div><Navbar/>
<div id="dashboard-container">
        <div id="dashboard">
          <div id="dashboard-top">
            <div id="dashboard-top-left">Dashboard</div>
            {/* <div id="dashboard-top-right"> */}
            {/* <button
                // className=""
                id="dashboard-top-right"
                type="button"
                onClick={handleSignOut}
                >
                Logout
                </button> */}
            {/* </div> */}
          </div>
        <div className='dashboard-middle'>
          <div id="dashboard-pass-and-details">
            <div id="dashboard-personalDetails">
              <div id="dashboard-personalDetails-title">Personal Details</div>
              <div id="dashboard-personalDetails-content">
                <div className="dashboard-personalDetails-content-title">
                  Name:{" "}
                  <span className="dashboard-personalDetails-content-value">
                    Shashwat Roy
                  </span>
                </div>
                <div className="dashboard-personalDetails-content-title">
                  Email:{" "}
                  <span className="dashboard-personalDetails-content-value">
                    roy.16@iitj.ac.in
                  </span>
                </div>
                <div>
     
    </div>
              </div>
            </div>

          </div>

          

          <div className='person_img'>
            {/* <img src={} */}
          </div>
        </div>


          <div id="dashboard-registeredEvents">
            <div id="dashboard-registeredEvents-title">Asked Questions</div>
            <div id="dashboard-registeredEvents-content">
            
            {userData &&
            userData.slice(0, 3).map((user) => (
          <div>
          <div key={user.id}>

          </div>

          <div className='question-asked'>
          
          <span className='question-content'>
            <span className='question-text'><span className='ques-no'> Qs :-  </span>{user.query}<span/>
            
            {/* What are the possible digits upto which pie can be found out? */}
          </span>
          <span className='answer-content'><span className='ques-no'> Ans :  </span>{user.answer}</span>
          </span>
          {/* <button onClick={CheckQuestions}></button> */}
        </div>
        </div>

        ))}
           
            </div>
          </div>
        </div>
        
 </div>
</div>
    );
}
export default Dashboard;