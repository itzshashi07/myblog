import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import { fb } from "../firebase";
import LeftColumn from "../components/blogViewCom/leftColumn/LeftColumn";
import MiddleColumn from "../components/blogViewCom/middleColumn/MiddleColumn";
import './BlogView.css'
import RightColumn from "../rightColumn/RightColumn";

const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogView = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [selectedSubheadingIndex, setSelectedSubheadingIndex] = useState(0);
  const [selectedSubsubheadingIndex, setSelectedSubsubheadingIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Blogslist.doc(id).get().then((snapshot) => {
      const data = snapshot.data();
      setBlogs(data);
    });
  }, [id]);


  const subheadings = blogs?.Subheadings?.map(item => item.name);
  const subSubheadings = blogs?.Subheadings?.map(item => item.subSubheadings) || [];
 
  const [clickedSubheadingLink, setClickedSubheadingLink] = useState(false);
  const [clickedSubsubheadingLink, setClickedSubsubheadingLink] = useState(false);

  const onSelectSubheading = (index) => {
    setSelectedSubheadingIndex(index);
    setSelectedSubsubheadingIndex(selectedSubsubheadingIndex === null ? 0 : selectedSubsubheadingIndex);
    setClickedSubheadingLink(true); // Set the state to true when clicking on a subheading link
    navigate(`?subheading=${subheadings[index]}`);
  };

  const onSelectSubsubheading = (subheadingIndex, subsubheadingIndex) => {
    setSelectedSubheadingIndex(subheadingIndex);
    setSelectedSubsubheadingIndex(subsubheadingIndex);
    setClickedSubsubheadingLink(true); // Set the state to true when clicking on a subsubheading link
    navigate(
      `?subheading=${subheadings[subheadingIndex]}&subsubheading=${subSubheadings[subheadingIndex][subsubheadingIndex].name}`
    );
  };


  const selectedSubheadingData = blogs?.Subheadings?.[selectedSubheadingIndex];
  const subSubheadingsForSelectedSubheading = selectedSubheadingData?.subSubheadings || [];
  useEffect(() => {
    // Get the URL parameters from the location object
    const params = new URLSearchParams(location.search);
    const subheadingParam = params.get("subheading");
    const subsubheadingParam = params.get("subsubheading");

    // Find the index of the subheading and subsubheading from the data
    const subheadingIndex = blogs?.Subheadings?.findIndex((item) => item.name === subheadingParam);
    const subSubheadingIndex = blogs?.Subheadings?.[subheadingIndex]?.subSubheadings?.findIndex(
      (item) => item.name === subsubheadingParam
    );

    // Update the selected indexes based on the URL parameters
    setSelectedSubheadingIndex(subheadingIndex >= 0 ? subheadingIndex : 0);
    setSelectedSubsubheadingIndex(subSubheadingIndex >= 0 ? subSubheadingIndex : 0);
  }, [blogs, location]);



  // Add a useEffect to handle browser back button click
  useEffect(() => {
    const handleBrowserBackButton = (event) => {
      // Check if the user navigated back and the click events were not on subheading or subsubheading links
      if (event.type === "popstate" && !clickedSubheadingLink && !clickedSubsubheadingLink) {
        // Navigate to the "/" path
        navigate("/");
      }
      // Reset the states after handling the back button click
      setClickedSubheadingLink(false);
      setClickedSubsubheadingLink(false);
    };

    // Add event listeners for the "popstate" event (triggered when the user navigates back)
    window.addEventListener("popstate", handleBrowserBackButton);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleBrowserBackButton);
    };
  }, [navigate, clickedSubheadingLink, clickedSubsubheadingLink]);

  return (
    <div className="blogView">
    {blogs ? (
      <>
        <div className="blogView-leftColumn">
         
          <LeftColumn
            subheadings={subheadings}
            subSubheadings={subSubheadings}
            selectedSubheadingIndex={selectedSubheadingIndex}
            onSelectSubheading={onSelectSubheading}
            onSelectSubsubheading={onSelectSubsubheading}
          />
        </div>
        <div className="blogView-middleColumn">
          <MiddleColumn
            blogs={blogs}
            subSubheadings={subSubheadingsForSelectedSubheading}
            selectedSubheadingIndex={selectedSubheadingIndex}
            selectedSubsubheadingIndex={selectedSubsubheadingIndex}
          />
        </div>
        <div className="blogView-rightColumn" >
          <RightColumn />
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default BlogView;
