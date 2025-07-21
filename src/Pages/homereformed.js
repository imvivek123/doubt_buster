import React,{useState} from 'react';
import './home.css';
import { getDatabase, ref, push } from "firebase/database";
import Navbar from './navbar.js';
import {auth} from "../firebase";
import { signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom';


function Home(){

  const [tags, setTags] = useState(['Computer Science', 'Mathematics', 'Physics', 'Chemistry']);

  const navigate= useNavigate();
  const [usertxt,setUsertxt]=useState({query:''});

  const getUserData=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setUsertxt({ ...usertxt,[name]:value});
  };

  const filterTags = (tag) => {
    if (Array.isArray(tags)) {
      const filteredTags = tags.filter((t) => t !== tag);
      setTags(filteredTags);
    }
  };
  
  const textBox = document.querySelector('#inp-box');

  const db = getDatabase();
  
  const tasksRef = ref(db, "Questions");


  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#myForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // prevent the form from submitting and refreshing the page
      
      const currentUser = auth.currentUser;
      const userEmail = currentUser ? currentUser.email : null;
      const { value: query } = event.target.elements['query']; // get the value of the textarea element
  
      addNewTask(query, userEmail); // call the addNewTask function to save the user's question
    });
  });


  const addNewTask = async (task, userEmail, tag) => {
    // Check if the tag is in the list of standardized tags
    if (!tags.includes(tag)) {
      const correctedTag = findCorrectedTag(tag);
      if (correctedTag) {
        tag = correctedTag;
      } else {
        // Show an error message or suggest a correction to the user
        alert('Invalid tag. Please choose from the list of standardized tags.');
        return;
      }
    }
  
    // Add the task to the database with the user's email and the tag
    await push(tasksRef, {
      task,
      userEmail,
      tag,
    });
  
    // Reset the input field
    setUsertxt({
      task: '',
      tag: '',
    });
  }

  const findCorrectedTag = (tag) => {
    // Find the closest matching tag in the list of standardized tags
    // You can use a library like Levenshtein distance to find the closest match
    // Here's a simple example that just checks for exact matches
    for (const standardizedTag of tags) {
      if (tag.toLowerCase() === standardizedTag.toLowerCase()) {
        return standardizedTag;
      }
    }
    return null;
  }

  // const handleCheckboxChange = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setUsertxt((prevState) => ({
  //       ...prevState,
  //       tags: [...prevState.tags, value],
  //     }));
  //   } else {
  //     setUsertxt((prevState) => ({
  //       ...prevState,
  //       tags: prevState.tags.filter((tag) => tag !== value),
  //     }));
  //   }
  // };

  // const postData2 = () => {
  //   const currentUser = auth.currentUser;
  //   const userEmail = currentUser ? currentUser.email : null;
    
  //   addNewTask(usertxt.query, userEmail); // call addNewTask function to save user's question
  //   setUsertxt({query: ''}); // clear the input field
  // }
  
  const postData = async(e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : null;
    const { query, tag } = usertxt;
    const answer = null;

    if (query && tag && tags.includes(tag)) {
      const res1 = await fetch('https://logincreateform-7244d-default-rtdb.firebaseio.com/Questions.json', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          query,
          userEmail,
          answer,
          tag,
        }),
      });

      if (res1) {
        setUsertxt((prevState) => ({ ...prevState, query: '', tag: '' }));
        alert('Question Posted!');
      }
    } else {
      alert('Invalid submission!');
    }
  };


  // const postData=async(e)=>{
  //         // alert('executed')
  //         e.preventDefault();
  //         const {query}=usertxt;

  //         // alert(pass)

  //         const currentUser = auth.currentUser;
  //         const userEmail = currentUser ? currentUser.email : null;
  //         const answer = null;



  //         if (query ) {
  //             const res1 = await fetch('https://logincreateform-7244d-default-rtdb.firebaseio.com/Questions.json',
  //         {
  //             method:"POST",
  //             headers:{
  //                 "Content-type":"application/json",
  //             },
  //             body: JSON.stringify({
  //                 query,
  //                 userEmail,
  //                 answer,
  //             }),
  //         }
  //         );
  //         if (res1) {
  //             setUsertxt({
  //                 query:"",
  //             });
  //             alert("Question Posted!")
  //         }   
  //         }
  //         else {
  //             alert("Empty submission is not allowed!")
  //         }
  //     };
  const GoTODashboard = () =>{
    navigate("/dashboard")
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
        <div className='home_div'>
    <Navbar/>

  
  <div className="container">
    <div className="left-sidebar">
    <div className='left-sidebar-enclosed'>
      <span className='left-title'>Subjects to choose from </span>
          <ul className='side-list'>
            <li className='list-items'>
              {/* <a href=""className='side-links'> */}
                <img src={require('./science.webp')} className='side-img' alt="Science" />
                <span className='side-name'>Science</span>
              {/* </a> */}
            </li>
            <li>
              {/* <a href="#"className='list-items'> */}
                <img src={require('./math.webp')} className='side-img' alt="Maths" />
                <span className='side-name'>Maths</span>
              {/* </a> */}
            </li>
            <li>
              {/* <a href="#"className='list-items'> */}
                <img src={require('./csimage.png')} className='side-img' alt="CS" />
                <span className='side-name'>Computer Science</span>
              {/* </a> */}
            </li>
          </ul>
    </div>
    </div>
    <div className="main-content">
      <div className="input-container">
        <h2>What would you like to ask today?</h2>
        <div className="input-box" id="inp-box">
          <textarea type= "text" placeholder="Type your question here..." name = "query"
            value  = {usertxt.query}
            onChange={getUserData}/> 
        </div>
        <div className="input-box" id="inp-box">
          <label htmlFor="tag">Select a tag:</label>
          <select name="tag" id="tag" value={usertxt.tag} onChange={getUserData}>
            <option value="">Choose a tag</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {usertxt.tag && (
            <button type="button" onClick={() => filterTags(usertxt.tag)}>
              Remove
            </button>
          )}
        </div>
        <button id="submit-btn"  onClick={postData}> Post</button>
      </div>
    </div>
    <div className="right-sidebar" />
  </div>
  {/* Container */}
  <div className="container" id="cont">
    <div className="contbox">
      {/* <div>This is the home page </div> */}
      {/* <button class="acc"id="newacc" type="button" onclick="document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'">Create New account</button> */}
    </div>
  </div>
</div>

    );
}

export default Home;
