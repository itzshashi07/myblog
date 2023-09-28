import React, { useState, useEffect } from 'react';
import "./LeftColumn.css"
import "./LeftColumn.scss"
import { BiSolidRightArrow } from 'react-icons/bi';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
const LeftColumn = ({ subheadings, subSubheadings, onSelectSubheading, onSelectSubsubheading }) => {
  const [selectedSubheadingIndex, setSelectedSubheadingIndex] = useState(null);
  const [showHeader, setShowHeader] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than 768px (mobile view)
      if (window.innerWidth < 768) {
        setShowHeader(false);
      } else {
        // Reset to true when switching to desktop view
        setShowHeader(true);
      }
    };
  
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigate = useNavigate();

  // const toggleHeaderVisibility = () => {
  //   setShowHeader((prevState) => !prevState);
  // };

  const handleSubheadingClick = (index) => {
    setSelectedSubheadingIndex((prevIndex) => (prevIndex === index ? null : index));
    onSelectSubheading(index);
  };

  const handleSubsubheadingClick = (subIndex) => {
    if (selectedSubheadingIndex !== null) {
      onSelectSubsubheading(selectedSubheadingIndex, subIndex);
      
     
      navigate(`?subheading=${subheadings[selectedSubheadingIndex]}&subsubheading=${subSubheadings[selectedSubheadingIndex][subIndex].name}`);
      if (window.innerWidth < 768) {
      setShowHeader(false)
      }
    }
  };
  const toggleHeaderVisibility = () => {
    // Check if the screen width is less than 768px (mobile view)
    if (window.innerWidth < 768) {
      setShowHeader((prevState) => !prevState);
    }
  };
  const renderSubheadings = () => {
    return subheadings.map((subheading, index) => (
      <li key={index}>
        <a href="# " className="subheading" onClick={() => handleSubheadingClick(index)}>
    {subheading}    <span style={{marginTop :"5px"}}>    <IoMdArrowDropdown/> </span>
        </a>
        {selectedSubheadingIndex === index && (
          <ul className="subsubheading-ul">
            {subSubheadings[index].map((subsubheading, subIndex) => (
              <li key={subIndex}  className="subsubheading-li">
           <a href="#" className="subsubheading" onClick={() => handleSubsubheadingClick(subIndex)}>
                  {subsubheading.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <aside className={`left-column ${showHeader ? 'show-header' : 'hide-header'}`}>
      {showHeader && (
        <header className="header" role="banner">
          {/* <h1 className="logo">
            <a href="#"> 
              Sub <span>Headings</span>
            </a>
          </h1> */}
          <div className="nav-wrap">
            <nav className="main-nav" role="navigation">
              <ul className="unstyled list-hover-slide">
                {renderSubheadings()}
              </ul>
            </nav>
          </div>
        </header>
      )}

      {/* Button to toggle header visibility */}
      <div className="toggle-header-container">
        <button className={`toggle-header-btn ${showHeader ? 'toggle-header-btn-right' : 'toggle-header-btn-left'}`} onClick={toggleHeaderVisibility}>
          {showHeader ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
        </button>
      </div>
    </aside>
  );
};

export default LeftColumn;
