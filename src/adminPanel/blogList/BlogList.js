import React, { useState, useEffect }from 'react'
import { Link } from "react-router-dom";
import {fb} from '../../firebase'
import Table from 'react-bootstrap/Table';
import './BlogList.css'
import AdminNavbar from '../adminNavbar/AdminNavbar';
import { GiCancel } from 'react-icons/gi';
const db = fb.firestore()
const Blogs = db.collection('blogs');


const Bloglist = () => {
    const [blogslist, setblogs] = useState([]);

    const DeleteBlog = (id)=> {
        Blogs.doc(id).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Blogs.limit(100).onSnapshot(querySnapshot => {
          // Get all documents from collection - with IDs
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          // Update state
          setblogs(data);
        });

        // Detach listener
        return unsubscribe;
      }, []);

    return (
        <div >
          <AdminNavbar/>
        <h2 className="w-full text-center font-bold text-xl">All Blogs List</h2>
        <div className='blogList-head'>
            <div>
            <h2 className="w-full text-center font-bold text-xl">All Blogs  List</h2>

            </div>
            <Link to={"/blog/create"}>  
             <button type="" className='blogList-btn'>Create Blogs </button></Link>
         
        </div>
        <div className='blogList-table-container'>
        <table id="customers">
  <tr>
    <th>Title</th>
    <th>View</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  {blogslist.map(blog=> (
  <tr key={blog.id}>
    <td>{blog.Title}</td>
    <td>   <Link to={"/blog/"+blog.id}
                        class="mr-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 border border-indigo-500 rounded"
                        >View
                    </Link></td>
    <td><Link to={"/blog/edit/"+blog.id}
                        class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                        >Edit
                    </Link></td>
                   
                    <GiCancel className='deletBlogBtn' onClick={()=> {DeleteBlog(blog.id)}} /> 
  </tr>
     ))}
</table>
        </div>


           
    </div>
    );
  };

export default Bloglist;