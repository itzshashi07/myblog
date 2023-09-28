import React, { useState, useEffect } from 'react';
import { fb } from '../../firebase';
import './Ads.css';
const db = fb.firestore();

function Ads() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesRef = db.collection('adsImages').orderBy('timestamp', 'desc');
      const snapshot = await imagesRef.get();

      const fetchedImages = [];
      snapshot.forEach((doc) => {
        fetchedImages.push({
          id: doc.id,
          url: doc.data().adsImages,
        });
      });

      setImages(fetchedImages);
    } catch (error) {
      setError(error.message);
    }
  };

  const submitImage = async () => {
    try {
      if (!image) {
        setError("Please select an image to upload.");
        return;
      }

      const timestamp = new Date();
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'rs5ykuzz');
      data.append('cloud_name', 'dwwouvtei');

      const response = await fetch('https://api.cloudinary.com/v1_1/dwwouvtei/image/upload', {
        method: 'post',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data2 = await response.json();
      const newImageUrl = data2.url;

      // Add the image URL to Firestore
      const newImageRef = await db.collection('adsImages').add({
        adsImages: newImageUrl,
        timestamp: timestamp,
      });

      setImages([...images, { id: newImageRef.id, url: newImageUrl }]);
      setImage(null); // Clear the selected image after uploading
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      // Delete the image document from Firestore
      await db.collection('adsImages').doc(imageId).delete();

      // Remove the deleted image from the images state
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="ads-container">
      <h2>Upload Ads</h2>
      <p >Upload 736 × 1183 image</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button className="upload-button" onClick={submitImage}>
        Upload
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="images-list">
        {images.map((image) => (
          <div key={image.id} className="image-container">
            <img src={image.url} alt={`Ad ${image.id}`} style={{ width: '100px' }} />
            <button onClick={() => deleteImage(image.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ads;
