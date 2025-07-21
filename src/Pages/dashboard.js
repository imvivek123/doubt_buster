import React from 'react';
import './dashboard.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, database } from "../firebase";
import { signOut } from "firebase/auth";
import {  ref, get, getDatabase } from 'firebase/database';
import { UserAuth } from './AuthContext';


import Navbar from './navbar.js';

const  Dashboard = () => {

  const navigate = useNavigate();
  const {user} = UserAuth()
  const [userData, setUserData] = useState(null);
  
  
//   const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     console.log(user.displayName)
//   } else {
//     // User is signed out
//     // ...
//   }
// });


  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert('Successfully signed out!');
      navigate('/');
    }).catch((error) => {
      alert('Error in signing out!');
      alert(error);
    });
  };
  const SeeAllQuestions = () =>{
    navigate("/SeeAll");
  }
  const handlegetdata = async(e) => {
    const userId = user.uid;
      // console.log(user.uid)
      const queryRef = ref(database,`Questions`);
      // console.log(queryRef)
      var arr = []
      await get(ref(database,`Questions`)).then((snapshot) =>{
        snapshot.forEach(ele => {
          if (arr.length<5) {
            if(ele.val().userEmail === user.email){
              arr.push(ele.val().query)
            }
          }
        })
      })
      setUserData(arr)
    }
    
    useEffect(() => {
      handlegetdata()
    },[user]);
  
  return (
    <div>
      <Navbar />
      <div id="dashboard-container">
        <div id="dashboard">
          <div id="dashboard-top">
            <div id="dashboard-top-left">Dashboard</div>
          </div>

          <div id="dashboard-pass-and-details">
            <div id="dashboard-personalDetails">
              {/* <div id="dashboard-personalDetails-title">Personal Details</div> */}
              <div id="dashboard-personalDetails-content">
                {/* <div className="dashboard-personalDetails-content-title">
                  Name:{" "}
                  <span className="dashboard-personalDetails-content-value">
                    {user.val}
                  </span>
                </div> */}
                <div className="dashboard-personalDetails-content-title">
                  Email:{" "}
                  <span className="dashboard-personalDetails-content-value">
                    {user.email}
                  </span>
                </div>
                <div>
     
              </div>
              </div>
            </div>

          </div>

          <div id="dashboard-main">
          <div id="dashboard-registeredEvents">
            <div id="dashboard-registeredEvents-title">Asked Questions</div>
            <div id="dashboard-registeredEvents-content">
                {userData && userData.map((question,index) => (
              
           <div className='question-asked'>
           
           <span className='question-content'>
             <span className='question-text'>
             <span className='ques-no' key={index}> Qs{index+1}</span> :-{question}<span/>
             
 
           </span>
           </span>
            </div>
                ))}
              </div>
              <button className='see-all-btn' onClick={SeeAllQuestions}>See all</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
