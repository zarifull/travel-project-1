import React, { useEffect, useState } from 'react';
import '../styles/AboutUs.css';
import aboutUs from '../Assets/aboutUs.png';
import ourStory from '../Assets/ourStory.png';
import { getResourceDetails } from '../api/resourceDetailApi';

function AboutUs() {
  const [videoUrl, setVideoUrl] = useState('');
  const resourceId = '68df2fee32660943bbb4e748';

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getResourceDetails(resourceId);
        if (data.video && data.video.length > 0) {
          setVideoUrl(data.video[0]); 
        }
      } catch (error) {
        console.log("Failed to fetch video", error);
      }
    };
    fetchVideo();
  }, []);
  return (
    <div className='aboutUs'>
      <div className="container">
        <p className="aboutUs-theme">About Us</p>
        <div className="aboutUs-block">
          <section className="aboutUs-part1">
            <img className='aboutUs-img1' src={aboutUs} alt="About Us" />
          </section>

          <section className='aboutUs-video'>
            {videoUrl ? (
              <video controls width="100%" className='video-player' >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Loading video...</p>
            )}
          </section>

          <section className='ourStory'>
            <div className="ourStory-theme">
              <p className="ourStory-mainTheme">Our Story</p>
              <p className='ourStory-about'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Fugit, minus aliquam rerum repellendus sequi magnam incidunt nam! 
                Aperiam aliquid reprehenderit error amet magni quasi exercitationem 
                illum sed consectetur maiores temporibus, vel velit provident deserunt 
                molestias fuga iste repellat delectus laborum? Delectus, quas eaque? 
                Tenetur reprehenderit esse laudantium magnam at molestias!
              </p>
            </div>
            <img src={ourStory} style={{width:'100%', paddingTop:'2em'}} alt="Our Story" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
