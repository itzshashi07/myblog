import { useEffect, useState, useContext } from "react";

import './AdminLogin.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import{ fb }from "../../firebase";
import AdminNavbar from "../adminNavbar/AdminNavbar";

function AdminLogin() {
  const user = fb.auth().currentUser;
  // console.log(user)
    const authorization = false;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = fb.auth();
  let navigate = useNavigate();

    
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      navigate('/Bloglist')
      // Login successful, you can redirect to the viewBlog page here
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login errors here (e.g., display an error message)
    }
  };
  return (
    
    <div className="login-container">

    <div className="login-screen">
      <div className="screen__content">
        <form className="login" onSubmit={handleLogin}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            SignIn
          </h1>
          {/* {errorMsg && (
            <div className="sellerOnBoardForm-usertype-err">{errorMsg}</div>
          )} */}
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              type="text"
              className="login__input"
              name="userName"
              placeholder="User name / Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            //   onBlur={validateInput}
            />
        
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              type="password"
              className="login__input"
              name="userPassword"
              placeholder="Password"
              value={password}
            onChange={(e) => setPassword(e.target.value)}
            //   onBlur={validateInput}
            />
            {/* {error.userPassword && (
              <div className="sellerOnBoardForm-edit-err">
                {error.userPassword}
              </div>
            )} */}
          </div>
      
          <button
            // onClick={signIn}
            // disabled={!isFormvalid}
            className="button login__submit"
          >
            <span  className="button__text">Log In Now</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>

        

        
        </form>
     
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin