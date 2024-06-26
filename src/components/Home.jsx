import React, {useState, useEffect} from 'react'
import "../styles/Home.css"
import Navbar from './Navbar'
import { IoIosClose } from "react-icons/io";
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import TypingText from './TypingText';
  
const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 }); // Initialize AOS and set the duration for animations
  }, []);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [caption, setCaption] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
  
    const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
        setImage(file);
      } else {
        alert('Please upload a valid image file (PNG, JPG, JPEG) less than 10 MB.');
      }
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
        setImage(file);
      } else {
        alert('Please upload a valid image file (PNG, JPG, JPEG) less than 10 MB.');
      }
    };
  
    const handleGenerateCaption = async () => {
      if (!image) {
        alert('Please upload an image.');
        return;
      }
  
      setIsGenerating(true);
  
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);
  
      try
      {
        const response=await axios.post("http://127.0.0.1:8000/get_caption",formData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      })
        setCaption(response.data['caption'])
        setSuggestions(response.data['suggestions'])
  
        const data = await response.json();
        setCaption(data.caption);
      } catch (error) {
        console.error('Error generating caption:', error);
        alert('Failed to generate caption. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    };
  
    return (
    <>
      <Navbar/>
      <div className='lower-container'>
        <div className='tile-container'> 
          <div className='text-container' data-aos='fade-right'>
            Express yourself with beautiful caption
          </div>
          <div className="instagram-caption-generator" data-aos='fade-left'>
          
            {image ? (
              <>
                <div className='image-container'>
                  <div onClick={() => setImage(null)} className='cross-button'><IoIosClose/></div>
                  <img className='drop-area-img' src={URL.createObjectURL(image)} alt="Uploaded" />
                </div>
              </>
            ) : (<div
                className={`drop-area ${image ? 'hasimage' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div>
                  <p>Drag and drop an image here or</p>
                  <label className="upload-button">
                    <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
                    Upload Image
                  </label>
                </div>
              </div>
            )}
          
          <textarea
            id="description"
            placeholder='What kind of caption do you want?'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          <button onClick={handleGenerateCaption} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Caption'}
          </button>
          {caption && (
            <div className="instagram-post">
              <img src={URL.createObjectURL(image)} alt="Instagram Post" />
              <p>{caption}</p>
            </div>
          )}
          </div>
        </div>
        <div className='tile-container'></div>
      </div>
      </>
    );
}

export default Home