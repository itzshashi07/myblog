
import './ContactUsPage.css'
import React, { useState, useEffect }from 'react'
import { Link } from "react-router-dom";
import{ fb }from '../firebase'

import { Element, Events } from 'react-scroll';

import Footer from '../footer/Footer';

function ContactUsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [societyName, setSocietyName] = useState('');
    const [societAddress, setSocietyAddress] = useState('');
    const [lastName, setLastName] = useState('');

    const [noOfMembers, setNoOfMembers] = useState('');
    const [inquiryType, setInquiryType] = useState('');

    
  const [services, setServices] = useState([]);

  const handleServiceCheckboxChange = (event) => {
    const selectedService = event.target.value;
    if (services.includes(selectedService)) {
      setServices(services.filter(service => service !== selectedService));
    } else {
      setServices([...services, selectedService]);
    }
  }
    const handleSubmit = async (e) => {

      e.preventDefault();
   // Validate form fields
    if (
      name === '' ||
      lastName === '' ||

      contactNumber === '' ||
      // societyName === '' ||
      // societAddress === '' ||
      // noOfMembers === '' ||
      // inquiryType === '' ||
      email === '' ||
      message === ''
    )
     {
      debugger;
      alert('Hello.');
      return;
    }
  
  
      const formData = {
        name,
        // services,
        lastName,
        email,
        message,
        contactNumber,
        // societyName,
        // societAddress,
        // noOfMembers,
        // inquiryType,
      };
  
      try {
        const response = await fetch('https://localhost:3001/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert('Message sent successfully!');
          setName('');
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
  return (
    <div className='contactUsPage'> 
        
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
  )
}

export default ContactUsPage