import React, { useState } from 'react';
import { fb, storage } from '../../firebase';
import Table from 'react-bootstrap/Table';
import './CreateBlog.css';
import AdminNavbar from '../adminNavbar/AdminNavbar';
import JoditEditor from 'jodit-react';
import { FcCancel } from 'react-icons/fc';


const db = fb.firestore();
const Blogs = db.collection('blogs');





const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [subheadings, setSubheadings] = useState([]);
  const [heading, setHeading] = useState('');
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const sub =  async  (e) => {
    e.preventDefault();
   // Validation checks
    if (title.trim() === '') {
      alert('Please enter a Title.');
      return;
    }

    for (const subheading of subheadings) {
      if (subheading.name.trim() === '') {
        alert('Please enter a Subheading.');
        return;
      }

      for (const subSubheading of subheading.subSubheadings) {
        if (subSubheading.name.trim() === '') {
          alert('Please enter a Sub-Subheading.');
          return;
        }
      }}
    // Prepare the subheadings data
    const subheadingsData = subheadings.map((subheading) => ({
      name: subheading.name,
      content: subheading.content,
      subSubheadings: subheading.subSubheadings.map((subSubheading) => ({
        name: subSubheading.name,
        content: subSubheading.content,
      })),
    }));

    try { // Add data to the store
      
    if (selectedImage) {

      const storageRef = storage.ref();
      const imageRef = storageRef.child(`blog_images/${selectedImage.name}`);
      await imageRef.put(selectedImage);
      var imageUrl = await imageRef.getDownloadURL();

    }
    let obj ={
      Title: title,
      Subheadings: subheadingsData,
      publish: false,
      published_on: fb.firestore.Timestamp.fromDate(new Date()),
     
    }
    if (imageUrl){
      obj["imageUrl"]=imageUrl;
    }
  
    Blogs.add(obj)
      .then((docRef) => {
        alert('Data Successfully Submitted');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
     } 
    
      catch (error) {
      console.error('Error uploading image or adding document: ', error);
    }
  };

  const handleAddSubheading = () => {
    const newSubheading = { name: heading, content: '', subSubheadings: [] };
    setSubheadings([...subheadings, newSubheading]);
    setHeading('');
    setShow(true);
  };

  const handleAddSubSubheading = (subheadingIndex) => {
    const updatedSubheadings = [...subheadings];
    updatedSubheadings[subheadingIndex].subSubheadings.push({ name: '', content: '' });
    setSubheadings(updatedSubheadings);
  };

  const handleSubSubheadingChange = (subheadingIndex, subSubheadingIndex, field, value) => {
    const updatedSubheadings = [...subheadings];
    updatedSubheadings[subheadingIndex].subSubheadings[subSubheadingIndex][field] = value;
    setSubheadings(updatedSubheadings);
  };
  const handleRemoveSubSubheading = (subheadingIndex, subSubheadingIndex) => {
    const updatedSubheadings = [...subheadings];
    updatedSubheadings[subheadingIndex].subSubheadings.splice(subSubheadingIndex, 1);
    setSubheadings(updatedSubheadings);
  };
  const handleRemoveSubheading = (subheadingIndex) => {
    const updatedSubheadings = [...subheadings];
    updatedSubheadings.splice(subheadingIndex, 1);
    setSubheadings(updatedSubheadings);
  };

  return (
    <div className="createBlog">
      <AdminNavbar />
      <form onSubmit={(event) => sub(event)}>
        <div className="createBlog-container">
          <h1>Create</h1>
          <p>Please fill in this form to create a blog </p>
          <label htmlFor="image" style={{marginRight:"20px"}}><b>Image</b></label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => setSelectedImage(e.target.files[0])}
/>
          <hr />
          
          <label htmlFor="title"><b>Title</b></label>
          <input
            type="text"
            placeholder="Title"
            className="createBlog-input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Table  >
            <thead  >
              <tr className="createRfq-tr" >
                <th>Heading</th>
                
                {show === true ? ( <th>Sub Heading</th>) : (
                  <></>
                )}
            
              </tr>
            </thead>
            <tbody className="buyerFormEditCustomerView-tbody ">
              {subheadings.map((subheading, subheadingIndex) => (
                <tr key={subheadingIndex} > 
                  <td>{subheading.name}                 <FcCancel onClick={() => handleRemoveSubheading(subheadingIndex)}/>
</td>
                  <td>
                    <Table>
                      <tbody >
                        {subheading.subSubheadings.map((subSubheading, subSubheadingIndex) => (
                          <tr key={subSubheadingIndex} >
                            <td >
                              <input
                                type="text"
                                name="SubSubheading"
                                className="createBlog-input-field"
                                placeholder="Sub-heading"
                                value={subSubheading.name}
                                onChange={(e) => handleSubSubheadingChange(subheadingIndex, subSubheadingIndex, 'name', e.target.value)}
                              />
                            </td>
                            {/* <td style={{ color: 'blue' }}>
             
                <FcCancel onClick={() => handleRemoveSubheading(subheadingIndex)}
                  type="button"
                  className="createBlog-removeSubheading"/>
              </td> */}
                          <td className="jodit-editor-container" >
  <JoditEditor
    className="jodit-editor-limited-width"
    value={subSubheading.content}
    onChange={(newContent) =>
      handleSubSubheadingChange(
        subheadingIndex,
        subSubheadingIndex,
        'content',
        newContent
      )
    }
   
  />
</td>
                            
                            <td> <button
                            onClick={() => handleRemoveSubSubheading(subheadingIndex, subSubheadingIndex)}
                            type="button"
                            className='createBlog-removeSubSubheading'
                            style={{
                              marginLeft: '20px',
                              backgroundColor: 'red',
                              padding: '5px',
                              fontSize: '15px',
                              border: 'none',
                              color: 'white',
                            }}
                          >
                            Remove Subheading
                          </button></td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={2}>
                            <button
                              onClick={() => handleAddSubSubheading(subheadingIndex)}
                              type="button"

                              style={{
                                marginLeft: '20px',
                                backgroundColor: '#1b2838',
                                padding: '3px',
                                padding: "6px 7px",
                                fontSize: '15px',
                                border: 'none',
                                color: 'white',
                              }}
                            >
                              Add more Subheadings
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>
                  <td style={{ color: 'blue' }}>
                    {/* No need for the button here */}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    name="Heading"
                    className="createBlog-input-field"
                    placeholder="Heading"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    min={2}
                  />
                </td>
                <td>
                  {/* No need for the editor here */}
                </td>
                <td>
                  <button
                    className="option-add-btn"
                    onClick={handleAddSubheading}
                    type="button"
                    style={{
                      marginLeft: '30px',
                      backgroundColor: '#1b2838',
                      padding: '6px 10px',
                      color: 'white',
                      border: 'none',
                    }}
                  >
                    Add Subheading
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>

          <button type="submit"   style={{
    backgroundColor: '#2d4059',
    color: 'white',
    padding: '16px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    width: '10%',
    opacity: 0.9,
    fontSize: '20px',
  }} className="registerbtn">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
