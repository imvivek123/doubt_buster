import './App.css';
import React from 'react';
import Formcontact from "./Pages/formcontact.js"
import Home from './Pages/home';
import QuestionForum from './Pages/QuestionForum';
import Dashboard from './Pages/dashboard';
import Answers from './Pages/Answers';
import { AuthContextProvider } from './Pages/AuthContext.js';
import ProtectedRoute from './Pages/ProtectedRoute';
import {Routes, Route} from 'react-router-dom';
import QuestionSearch from './Pages/Search';
import SeeAll from './Pages/SeeAll';

const App = () =>{
  
  return (
    <>
    <div className='App'>
      {/* <Formcontact/> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Formcontact />}/>
          <Route path="/home" element={
           <ProtectedRoute>
              <Home/>
           </ProtectedRoute>
          }/>
          <Route path="/Answers" element={
           <ProtectedRoute>
              <Answers/>
           </ProtectedRoute>
          }/>
          
          <Route path="/dashboard" element={
             <ProtectedRoute>
              <Dashboard/>
             </ProtectedRoute>
          }/>

          <Route path="/SeeAll" element={
           <ProtectedRoute>
              <SeeAll/>
           </ProtectedRoute>
          }/>
          <Route path="/Search" element={
             <ProtectedRoute>
              <QuestionSearch/>
             </ProtectedRoute>
          }/>
          <Route path="/QuestionForum" element={
             <ProtectedRoute>
              <QuestionForum/>
             </ProtectedRoute>
          }/>
          <Route path="/Answers/:questionId" element={<Answers />} />
        </Routes>
      </AuthContextProvider>
    </div>
    </>
  );
};
export default App;