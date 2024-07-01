import React, {useState, useEffect} from 'react'
import "../styles/Home.css"
import Navbar from './Navbar'
import { IoIosClose } from "react-icons/io";
import { FaUpload } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import AOS from 'aos';
// import axios from 'axios';
import 'aos/dist/aos.css';
import TypingText from './TypingText';
  
const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialize AOS and set the duration for animations
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
      //   const response=await axios.post("http://127.0.0.1:8000/get_caption",formData,{
      //   headers:{
      //     'content-type':'multipart/form-data'
      //   }
      // })
      //   const data = await response.json();
      //   setCaption(response.data['caption'])
      //   setSuggestions(response.data['suggestions'])
        setTimeout(() => {
          setCaption("Living life one moment at a time ✨ #GoodVibesOnly");
      }, 2000);
        
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
            <div className='smaller-text' style={{
              marginTop:'20px'
            }}>
              Create a <div style={{display:'inline-block', 
                background: 'linear-gradient(90deg, #ff00ff, #0000ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>captivating</div> and <div style={{display:'inline-block', 
                background: 'linear-gradient(90deg, #ff00ff, #0000ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
                }}>mesmerizing</div> caption for your next perfect post 
            </div>
            <div className='smaller-text'>
            in only a matter of seconds!!
            </div>
          </div>
          {!caption && <div className="instagram-caption-generator" data-aos='fade-up'>
          
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
                  <FaUpload className='faupload'/>
                  <p>DRAG AND DROP OR</p>
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
          
          </div>
          }
          {caption && (
            <div className='ig-post-container'>
              <div className='post-title'>Here's your post : </div>
              <div className="ig-post">
              <div className='post-header'>
                <div className='profile-pic'>
                  <a href='https://www.instagram.com/' target='_blank' >
                    <FaInstagram />
                  </a>
                </div>
                <div className='three-dots'>
                  <BsThreeDotsVertical/>
                </div>
              </div>
              <div className='ig-image-container'>
                <img src={URL.createObjectURL(image)}  className='img' alt="Insta Post" />
              </div>
              <div className='symbols'>
                <div>
                  <div className='like'>
                    <FcLike/>
                  </div>
                  <div className='comment'>
                    <FaRegComment/>
                  </div>
                  <div className='send'>
                    <FiSend/>
                  </div> 
                </div>
                <div className='bookmark'>
                  <FaRegBookmark/>
                </div>
              </div>
              <div className='ig-caption'>{caption}</div>
            </div>
            </div>
        )}
        </div>
        
        {/* <div className='tile-container'></div> */}
      </div>
      </>
    );
}

export default Home
