import React from 'react'
import { Link ,useNavigate} from "react-router-dom";
import logo from '../../img/logo.png'
import{ fb }from "../../firebase";
import './AdminNavbar.css'
function AdminNavbar() {
    const auth = fb.auth();
    let navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/");
      };
  return (
    <div className="admin-navBar">
        <div className='admin-navBar-left'>
         <Link to={"/BlogList"}  >
<img  className="admin-navbar-logo" src={logo} alt=""/>
</Link>
    <ul className="admin-nav-links">
    <Link to={"/Bloglist"} style={{textDecoration: "none" ,color: 'white' }} >
            <li className="nav-links">All Blogs </li>
    </Link>
    
     <Link to={"/ads"} style={{textDecoration: "none" ,color: 'white' ,marginLeft:'19px'}} >
            <li className="nav-links">Add ads</li>
    </Link>
    
    </ul>
    
</div>

    <button className="admin-navBar-btn" type="" onClick={handleLogout}>Log out</button>
</div>
  )
}

export default AdminNavbar 