import React,{ useState} from "react";
import './formcontact.css';
import {useNavigate} from 'react-router-dom';
import {  AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { db ,auth} from "../firebase";
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {  doc, setDoc } from "firebase/firestore";
import dbAnimation from "./doubt_animation.json";
import Lottie from "lottie-react";

const Formcontact = () =>{
    const navigate= useNavigate();
    function redirect(){
        navigate("/home")
    }
    const [userlog,setUserlog]=useState({
        email:"",
        password:"",
    });
    let name,value;
    const getUserData=(event)=>{
        name=event.target.name;
        value=event.target.value;
        setUserlog({ ...userlog,[name]:value});
     };
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  
  
  
  async function handleLogin(e) {
    const {email,password}=userlog;
//     const postData=async(e)=>{
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        redirect()
      })
      .catch((err) => {
        if (
        err.code === AuthErrorCodes.INVALID_PASSWORD ||
        err.code === AuthErrorCodes.USER_DELETED
      ) {
        setError("The email address or password is incorrect");
      } else {
        console.log(err.code);
        alert(err.code);
      }
      });
  };

  const [useracc,setUseracc]=useState({
      rollno:"",
      pass:"",
      email:"",
  });
  // let name1,value1;
  const getUserData1=(event)=>{
      let name=event.target.name;
      let value=event.target.value;
      setUseracc({ ...useracc,[name]:value});
  };

const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(useracc);
    const { rollno, pass, email } = useracc;
    if (email !== "" && pass !== "") {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, pass);

        await updateProfile(result.user, {
          displayName: name
        });
        
        navigate("/home")
        // alert("User added! Please Login.");
        setUseracc({ rollno: "", pass: "", email: "" }); // Clear form fields after successful signup
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        } else if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        } else {
          alert(error.message);
        }
      }
    } else {
      alert("Please Enter Your All Field");
    }
    
  };

    // const postData1=async(e)=>{
    //     alert('executed')
    //     e.preventDefault();
    //     const {rollno,pass,email}=useracc;
    //     alert(pass)
    //     if (rollno && pass && email ) {
    //         const res1 = await fetch('https://logincreateform-7244d-default-rtdb.firebaseio.com/Login.json',
    //     {
    //         method:"POST",
    //         headers:{
    //             "Content-type":"application/json",
    //         },
    //         body: JSON.stringify({
    //             rollno,
    //             pass,
    //             email,
    //         }),
    //     }
    //     );
    //     if (res1) {
    //         setUseracc({
    //             rollno:"",
    //             pass:"",
    //             email:"",
    //         });
    //         alert("Data Submitted Account")
    //     }   
    //     }
    //     else {
    //         alert("Empty fields are  allowed!")
    //     }
    // };
    return (
        <div className="full-div">
        <div className="heading-doubt-busters">Doubt busters</div>
        <meta charSet="utf-8" />
        <title>Portal Login</title>
        <style
            dangerouslySetInnerHTML={{
            __html:
                "\n        div.createaccount {\n          display: none;\n        }\n        button.loginbutton{\n            display: none;\n        }\n    "
            }}
        />
        <link rel="stylesheet" type="text/css" href="Style.css" />
        
        <div className="form_container" id="cont">
        <div className="animation-div">
              <Lottie animationData={dbAnimation}/>
              {/* <div className="animation-desc">LEt's end the doubts!</div> */}
        </div> 
            <div className="loginbox" id="loginbox">
                   
        
            <form className="l_form" id="lform" method="POST" action="">
                <h1 className="form_title1">Log in to your account</h1>
                <input
                className="input"
                name="email"
                type="text"
                autoComplete="off"
                placeholder="E-Mail"
                value={userlog.email}
                onChange={getUserData}
                // value={rollno}
                // onChange={e => setRollNo(e.target.value)}
                required
                />
                <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                value={userlog.password}
                onChange={getUserData}
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                required
                />
                {/* <button type="submit" class="form_submit">Log In</button> */}
                <input
                type="submit"
                defaultValue="Login"
                className="form_submit"
                id="login-form-submit"
                // onClick={postData}
                onClick={handleLogin}
                />
            </form>
            <div className="options">
                <span>OR</span>
            </div>
            {/* <button class="acc"id="newacc" type="button" onclick="document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'">Create New account</button> */}
            <div className="account_div">
                Don't have an Account?{" "}
                {/* <button
                className="acc"
                id="newacc"
                type="button"
                onClick={document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'}
                >
                Create New account
                </button> */}
                <button
                className="acc"
                id="newacc"
                type="button"
                onClick={() => {
                    document.getElementById('loginbox').style.display = 'none';
                    document.getElementById('account').style.display = 'block';
                    document.getElementById('newacc').style.display = 'none';
                    document.getElementById('log').style.display = 'block';
                }}
                >
                Create New account
                </button>

            </div>
            {error && <div>{error}</div>}
          </div>
            <div className="createaccount" id="account">
            <form className="form" id="aform" method="POST" action="">
                <h1 className="form_title2">Create Account</h1>
                <input
                className="input"
                name="email"
                type="text"
                placeholder="Email ID"
                value1={useracc.email}
                onChange={getUserData1}
                required
                />
                <input
                className="input"
                name="rollno"
                type="text"
                placeholder="Roll Number"
                value1={useracc.rollno}
                onChange={getUserData1}
                required
                />
                <input
                className="input"
                name="pass"
                type="password"
                placeholder="Password"
                value1={useracc.pass}
                onChange={getUserData1}
                required
                />
                {/* <button type="submit" class="form_button">SIGN UP</button> */}
                <input
                type="submit"
                defaultValue="Create"
                className="acc_form" //check if the input is to be changed to button type
                id="account-submit"
                onClick={handleSignUp}
                />
            </form>
            {/* <div class="account_div">Don't have an Account? <button class="acc"id="newacc" type="button" onclick="document.getElementById('loginbox').style.display='none';document.getElementById('account').style.display='block';document.getElementById('newacc').style.display='none';document.getElementById('log').style.display='block'">Create New account</button></div> */}
            <div className="back_login">
                Back to
                {/* <button
                className="loginbutton"
                id="log"
                type="button"
                onclick="document.getElementById('loginbox').style.display='block';document.getElementById('account').style.display='none';document.getElementById('newacc').style.display='block';document.getElementById('log').style.display='none'"
                >
                Login
                </button> */}
                <button
                className="loginbutton"
                id="log"
                type="button"
                onClick={() => {
                    document.getElementById('loginbox').style.display = 'block';
                    document.getElementById('account').style.display = 'none';
                    document.getElementById('newacc').style.display = 'block';
                    document.getElementById('log').style.display = 'none';
                }}
                >
                Login
                </button>

            </div>
            </div>
        </div>
        </div>

    );
};
export default Formcontact;