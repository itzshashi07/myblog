import React, { useState, useEffect }from 'react'
import { Link } from "react-router-dom";
import{ fb }from '../firebase'
import Banner from '../components/banner/Banner';
import './LandingPage.css'
import './LandingPage.scss'
import { Element, Events } from 'react-scroll';
import { CloudinaryContext, Image } from 'cloudinary-react';

import { Navbar } from 'react-bootstrap';
import Footer from '../footer/Footer';
import logo from '../img/logo.png'

const db = fb.firestore()
const Blogs = db.collection('blogs');

function LandingPage() {
    const [blogslist, setblogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6); // Adjust the number of posts per page here
  
 

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
// console.log(blogslist[2]?.Subheadings[0]?.subSubheadings[0]?.content  )

const truncateContent = (content, wordCount = 20) => {
    if (!content) return "";
    const words = content.split(" ");
    const truncatedWords = words.slice(0, wordCount);
    return truncatedWords.join(" ");
  };
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };



  //===========form=====================

  
  useEffect(() => {
    // Smooth scroll to the "Contact Us" section
    const handleScrollToContact = () => {
      const contactSection = document.getElementById('contactUs');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Attach the scroll behavior to the "Contact" link
    const contactLink = document.getElementById('contactLink'); // Add an ID to the link
    if (contactLink) {
      contactLink.addEventListener('click', handleScrollToContact);
    }

    // Clean up event listener
    return () => {
      if (contactLink) {
        contactLink.removeEventListener('click', handleScrollToContact);
      }
    };
  }, []);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  // const [societyName, setSocietyName] = useState('');
  // const [societAddress, setSocietyAddress] = useState('');
  // const [noOfMembers, setNoOfMembers] = useState('');
  // const [inquiryType, setInquiryType] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
 // Validate form fields
  if (
    name === '' ||
    lastName==='' ||
    contactNumber === '' ||
    // societyName === '' ||
    // societAddress === '' ||
    // noOfMembers === '' ||
    // inquiryType === '' ||
    email === '' ||
    message === ''
  ) {
    alert('Please fill in all fields before submitting.');
    return;
  }


    const formData = {
      name,
      email,
      lastName,
      
      message,
      contactNumber,
      // societyName,
      // societAddress,
      // noOfMembers,
      // services,
      // inquiryType,
    };

    try {
      const response = await fetch('https://shy-teal-drill-suit.cyclic.app/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName('');
        setLastName('');
        setEmail('');
        setMessage('');
        setContactNumber('');
        // setSocietyName('');
        // setSocietyAddress('');
        // setNoOfMembers('');
        // setInquiryType('')
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };
  const [recentImages, setRecentImages] = useState([]);

  useEffect(() => {
    // Fetch images from Firestore, sorted by timestamp in descending order
    db.collection('adsImages')
      .orderBy('timestamp', 'desc')
      .limit(2)
      .get()
      .then(querySnapshot => {
        const images = querySnapshot.docs.map(doc => doc.data());
        setRecentImages(images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const [services, setServices] = useState([]);

  const handleServiceCheckboxChange = (event) => {
    const selectedService = event.target.value;
    if (services.includes(selectedService)) {
      setServices(services.filter(service => service !== selectedService));
    } else {
      setServices([...services, selectedService]);
    }
  }


  //pagination

  
 // Calculate the indexes of the first and last posts to display on the current page
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = blogslist.slice(indexOfFirstPost, indexOfLastPost);

 // Function to handle page changes
 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

 // Function to handle "Next" and "Previous" button clicks
 const nextPage = () => {
   if (currentPage < Math.ceil(blogslist.length / postsPerPage)) {
     setCurrentPage(currentPage + 1);
   }
 };

 const prevPage = () => {
   if (currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
 };
    return (
         
        <div  className='landingPage'>

        <section class="blog-cards">
   <div class="bylaw-cards">
 {currentPosts.map(blog=> ( 


<div className="blog_post">
<div className="img_pod">
  <img  className='img_pod-img' src={logo} alt="random image"/>
</div>
<div className="container_copy">
  <h3 className="container_copy-date">12 January 2019</h3>
  <h1 className="container_copy-title">{blog?.Title}</h1>
  
  
  <p className="container_copy-des">{truncateContent(stripHtmlTags(blog?.Subheadings[0]?.subSubheadings[0]?.content ))}</p>
<Link style={{textDecoration: 'none'}} to={`/blog/${blog?.id}`}>

  <a className="btn_primary" href='#' target="_blank">Read More</a>
</Link>
</div>
</div>
  
 
   ))} </div>

         
            
    </section>  
    <div className="pagination">
        <button className="prev" onClick={prevPage} title="previous page">
          &#10094;
        </button>
        {Array.from({ length: Math.ceil(blogslist.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`page-button ${i + 1 === currentPage ? 'active' : ''}`}
            onClick={() => paginate(i + 1)}
            title={`page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button className="next" onClick={nextPage} title="next page">
          &#10095;
        </button>
      </div>
  
         <Element name="contactUs">

    <div id="contactUs"  class="arch_contact_us_duplicate" >
  <div class="responsive-container-block big-container">
    <div class="responsive-container-block container">
      <div class="responsive-cell-block wk-mobile-12 wk-desk-5 wk-tab-10 wk-ipadp-5" id="ih6s">
        <p class="text-blk section-head">
        Send Us a Message
        </p>
      
      </div>
      <div class="responsive-cell-block wk-ipadp-6 wk-mobile-12 wk-desk-5 wk-tab-9" id="i6df">
        <div class="form-wrapper">
<div className='form-div-2'>
  <input class="input input-element" name="Name" style={{marginRight: "10px"}} value={name} onChange={(e) => setName(e.target.value)}  placeholder="First Name"/>
          <input class="input input-element" name="Name"  value={lastName} onChange={(e) => setLastName(e.target.value)}  placeholder="Last Name"/>

</div>

<input class="input input-element" name="Contact Number" style={{marginRight: "10px"}} type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}  placeholder="Contact Number"/>

<input class="input input-element" name="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email"/>





     
          
          <textarea class="textinput input-element" value={message} onChange={(e) => setMessage(e.target.value)}  placeholder="Message"></textarea>
          <button class="button" onClick={handleSubmit}>
            Send
          </button>
        </div>
     
      </div>
    </div>
  </div>

</div>
</Element>


                      <Footer/>
           
    </div>
    );
  };

export default LandingPage