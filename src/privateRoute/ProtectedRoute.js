import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { fb } from '../firebase';

const ProtectedRoute = (props) => {
  let Cmp = props.Cmp;
  const user = fb.auth().currentUser;
// console.log(user)

if (user != null) {
  return (
    <div>
      <Cmp />
    </div>
  )
} 

  if (user === null) {
    // User is not authenticated, redirect to login page
    return    <div style={{ marginLeft: '300px', marginTop: '300px' }}>
    You are not authorized to access this component.
  </div>;  
   }

 
};

export default ProtectedRoute;