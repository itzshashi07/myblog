import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fb } from '../../firebase';
import Table from 'react-bootstrap/Table';
import './EditBlog.css';
import AdminNavbar from '../adminNavbar/AdminNavbar';
import JoditEditor from 'jodit-react';

const db = fb.firestore();
const Blogs = db.collection('blogs');

const EditBlog = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [subheadings, setSubheadings] = useState([]);
  const [heading, setHeading] = useState('');

  useEffect(() => {
    // Fetch the existing blog data from Firestore
    Blogs.doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setTitle(data.Title);
          setSubheadings(data.Subheadings || []);
        } else {
          console.log('Blog not found!');
        }
      })
      .catch((error) => {
        console.error('Error fetching blog: ', error);
      });
  }, [id]);

  const updateBlog = (e) => {
    e.preventDefault();

    // Prepare the subheadings data
    const subheadingsData = subheadings.map((subheading) => ({
      name: subheading.name,
      content: subheading.content,
      subSubheadings: subheading.subSubheadings.map((subSubheading) => ({
        name: subSubheading.name,
        content: subSubheading.content,
      })),
    }));

    // Update data in the Firestore
    Blogs.doc(id)
      .update({
        Title: title,
        Subheadings: subheadingsData,
      })
      .then(() => {
        alert('Blog updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating blog: ', error);
      });
  };

  const handleAddSubheading = () => {
    const newSubheading = { name: heading, content: '', subSubheadings: [] };
    setSubheadings([...subheadings, newSubheading]);
    setHeading('');
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

  return (
    <div className="editBlog">
      <AdminNavbar />
      <form onSubmit={updateBlog}>
        <div className="createBlog-container">
          <h1>Edit Blog</h1>
          <hr />

          <label htmlFor="title">
            <b>Title</b>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="createBlog-input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Table>
            <thead>
              <tr className="createRfq-tr">
                <th>Heading</th>
                <th>Subheading</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="buyerFormEditCustomerView-tbody">
              {subheadings.map((subheading, subheadingIndex) => (
                <tr key={subheadingIndex}>
                  <td>
                    <input
                      type="text"
                      className="createBlog-input-field"
                      value={subheading.name}
                      onChange={(e) => {
                        const updatedSubheadings = [...subheadings];
                        updatedSubheadings[subheadingIndex].name = e.target.value;
                        setSubheadings(updatedSubheadings);
                      }}
                    />
                  </td>
                  <td>
                    <Table>
                      <tbody>
                        {subheading.subSubheadings.map((subSubheading, subSubheadingIndex) => (
                          <tr key={subSubheadingIndex}>
                            <td>
                              <input
                                type="text"
                                name="SubSubheading"
                                className="createBlog-input-field"
                                placeholder="Sub-Subheading"
                                value={subSubheading.name}
                                onChange={(e) =>
                                  handleSubSubheadingChange(
                                    subheadingIndex,
                                    subSubheadingIndex,
                                    'name',
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td   className="jodit-editor-container">
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
                            <td>
                              <button
                                onClick={() =>
                                  handleRemoveSubSubheading(subheadingIndex, subSubheadingIndex)
                                }
                                type="button"
                                className="createBlog-removeSubSubheading"
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
                              </button>
                            </td>
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
                              Add more Subheading
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>
                  <td style={{ color: 'blue' }}>{/* No need for the button here */}</td>
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
                <td>{/* No need for the editor here */}</td>
                <td>
                  <button className="option-add-btn"
                    style={{
                      marginLeft: '30px',
                      backgroundColor: '#1b2838',
                      padding: '6px 10px',
                      color: 'white',
                      border: 'none',
                    }}
                  onClick={handleAddSubheading} type="button">
                    Add Subheading
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>

          <button type="submit"
          style={{
            backgroundColor: '#2d4059',
            color: 'white',
            padding: '16px 20px',
            margin: '8px 0',
            border: 'none',
            cursor: 'pointer',
            width: '10%',
            opacity: 0.9,
            fontSize: '20px',
          }} 
           className="registerbtn">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
