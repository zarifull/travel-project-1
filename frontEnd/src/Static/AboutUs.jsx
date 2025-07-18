import React from 'react';
import '../styles/AboutUs.css';
import aboutUs from '../Assets/aboutUs.png';
import member from '../Assets/member.jpeg';
import ourStory from '../Assets/ourStory.png';
import partners from '../Assets/partners.png';
import customer from '../Assets/customer.png';
import employees from '../Assets/emplyees.png';

function AboutUs() {
  return (
    <div className='aboutUs'>
      <div className="container">
        <p className="aboutUs-theme">About Us</p>
        <div className="aboutUs-block">
          <section className="aboutUs-part1">
            <img className='aboutUs-img1' src={aboutUs} alt="" />
          </section>
          {/* <section className="aboutUs-team">
            <div className="part2-box1">
            <p className="part2-theme">Our Team Members</p>
            <p className="part2-prg">Lorem ipsum dolor sit amet consectetur adipisicing similique.</p>
            </div>  
            <div className="team-carts">
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              <div className="member-cart">
                <img className='member-img' src={member} alt="" />
                <p className="member-name">Zari Momun</p>
                <p className="member-role">Founder</p>
              </div>
              </div>          
          </section> */}
          <section className='ourStory'>
            <div className="ourStory-theme">
              <p className="ourStory-mainTheme">Our Story</p>
              <p className='ourStory-about'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Fugit, minus aliquam rerum repellendus sequi magnam incidunt nam! 
                Aperiam aliquid reprehenderit error amet magni quasi exercitationem 
                illum sed consectetur maiores temporibus, vel velit provident deserunt 
                Fugit, minus aliquam rerum repellendus sequi magnam incidunt nam! 
                Aperiam aliquid reprehenderit error amet magni quasi exercitationem 
                illum sed consectetur maiores temporibus, vel velit provident deserunt 
                molestias fuga iste repellat delectus laborum? Delectus, quas eaque? 
                Tenetur reprehenderit esse laudantium magnam at molestias!</p>
            </div>
            <div className="ourStory-img">
            <img src={ourStory}  alt="" />
            </div>
          </section>
          <section className="our-resours">
            <p className="resours-mainTheme">
              HubSpot By the Numbers
            </p>
            <div className="resours-block">
            <div className="resours-box">
                <img className='resours-img' src={employees} alt="" />
                <p className="resours-theme">
                  + 20 Employers
                  </p>
                  <a href="/">Learn more </a>
              </div>
              <div className="resours-box resours-box2">
                <img className='resours-img resours-img2 ' src={partners} alt="" />
                <p className="resours-theme">
                  + 20 Partners
                  </p>
                  <a href="/">Learn more </a>
              </div>
              <div className="resours-box">
                <img className='resours-img' src={customer} alt="" />
                <p className="resours-theme">
                  + 200 Customees
                  </p>
                  <a href="/">Learn more </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
