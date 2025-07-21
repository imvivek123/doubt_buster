import React,{useState} from 'react';
import './home.css';
// import Parse from 'parse/dist/parse.min.js';
import {auth} from "../firebase";
import { signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";


function Navbar(){
    const navigate= useNavigate();
    const GoTODashboard = () =>{
        navigate("/dashboard")
      }
      const GoTOSearch = () =>{
        navigate("/search")
      }
      const GoTOQuestions = () =>{
        navigate("/QuestionForum")
      }
      const GoTOHome = () =>{
        navigate("/home")
      }

        const handleSignOut = () => {
          signOut(auth).then(() => {
            alert('Succesfully Signed out!')
            navigate("/")
          }).catch((error) => {
            alert('Error in Signing out!')
            alert(error);
          });
    };
    return (
    <div>
       <nav>
    <div className="nav-left">
      <img src={require('./Doubt_Busters_Logo_nobg.png')} className="logo" alt="logo" />
      <div className="site-name">Doubt Busters</div>
      <div className="icons_navbar">
        <img
          src={require('./question_icon.png')}
          alt="question icon"
          className="question-icon icons"
        />
        <img
          src={require('./bell.png')}
          alt="question icon"
          className="question-icon icons"
        />
      </div>
    </div>
    <div className="nav-right">
      <div className="search-box">
        {/* <img src={require('./search_icon.png')} alt="search icon" className="search-icon" /> */}
        {/* <input type="text" placeholder="Search" /> */}
      </div>
      {/* <div className="user_name online"> */}
      <button
                className="user_name_online"
                // id="dashboard"
                type="button"
                onClick={GoTOSearch}
                >
                Search
                </button>

      <button
                className="user_name_online"
                // id="dashboard"
                type="button"
                onClick={GoTODashboard}
                >
                Dashboard
                </button>
      
      <button
                className="user_name_online"
                // id="dashboard"
                type="button"
                onClick={GoTOQuestions}
                >
                Questions
                </button>
      <button
                className="user_name_online"
                // id="dashboard"
                type="button"
                onClick={GoTOHome}
                >
                Home
                </button>
      {/* </div> */}
      {/* <div className="logout_button"> */}
      <button
                className="logout_button"
                // id="signout"
                type="button"
                onClick={handleSignOut}
                >
                Logout
                </button>
      {/* </div> */}
      <div className="user-details"></div>
    </div>
  </nav>
    </div>
    );
  }

  export default Navbar;
