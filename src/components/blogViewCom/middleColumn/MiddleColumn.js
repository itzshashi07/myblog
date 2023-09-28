import React from 'react';
import './MiddleColumn.css';
import DOMPurify from 'dompurify';

// Import icons/components for share buttons
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const MiddleColumn = ({ blogs, subSubheadings, selectedSubheadingIndex, selectedSubsubheadingIndex }) => {
  const selectedSubsubheadingData = blogs.Subheadings[selectedSubheadingIndex].subSubheadings[selectedSubsubheadingIndex];

  const clean = DOMPurify.sanitize(selectedSubsubheadingData?.content);

  // Function to share the current page on Facebook
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  };

  // Function to share the current page on Twitter
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`);
  };

  // Function to share the current page on WhatsApp
  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`);
  };

  return (
    <main className="middle-column">
      <div className="middle-column-fist-div">
        <h1 className="middleColumn-subheading">{selectedSubsubheadingData?.name}</h1>
      <div className="middleColumn-underline"></div>

      <div
        className="middleColumn-content"
        dangerouslySetInnerHTML={{ __html: clean }}
        style={{ width: '100%' }}
      ></div>

      </div>
      
      {/* Share buttons */}
      <div className="share-buttons">
        <div>
        Share with -
        </div>

        <button className="share-button" onClick={shareOnTwitter}>
          <FaTwitter />
        </button>
        <button className="share-button-whatsapp" onClick={shareOnWhatsApp}>
          <FaWhatsapp />
        </button>
      </div>
    </main>
  );
};

export default MiddleColumn;
