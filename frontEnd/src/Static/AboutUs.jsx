import React, { useEffect, useState } from 'react';
import '../styles/AboutUs.css';
import aboutUs from '../Assets/aboutUs.png';
import ourStory from '../Assets/ourStory.png';
import { getResourceDetails } from '../api/resourceDetailApi';
import { useTranslation } from 'react-i18next';

function AboutUs() {
  const [videoUrl, setVideoUrl] = useState('');
  const resourceId = '68df2fee32660943bbb4e748';
  const {t} = useTranslation();

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

          <section className="aboutUs-section">
          
            <img className='aboutUs-img1' src={aboutUs} alt="About Us" />
            <div className="our-aim">
              <p className='our-theme'>{t("aboutUs.missionTitle")}</p>
              <p className="our-text">{t("aboutUs.mission")}</p>
            </div>
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

          <section className='aboutUs-section'>
            <div className="our-aim">
              <p className="our-theme">{t("aboutUs.ourStoryTitle")}</p>
              <p className='our-text'>{t("aboutUs.ourStory")}
              </p>
            </div>
            <img src={ourStory} style={{width:'45%', paddingTop:'2em'}} alt="Our Story" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
