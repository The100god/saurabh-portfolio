import React from "react";
import "./styles.scss";
import { Animate } from "react-simple-animate";
// import { keyframes, styled } from "styled-components";
// import { bounce } from 'react-animations';
import resume from "../../assets/Saurabh_CV.pdf";
import profilePhoto from '../../assets/logo/main.jpg'

// const Bounce = styled.div`animations: 1s ${keyframes`${bounce}`} infinite`;
const Home = () => {
  return (
    <section id="home" className="home">
    
    <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translate(-1000px)",
        }}
        end={{
          transform: "translateY(0px)",
        }}
      >
      <div className="home__profilePhoto">
      {/* <Bounce> */}
        <img src={profilePhoto} alt="main" />
      {/* </Bounce> */}
      </div>
      </Animate>
      
      <div className="home__text__weapper">
        <h1>
          Hello, I'm Saurabh Goyal
          <br />
          Front-End Developer.
        </h1>
      </div>

      <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translateY(550px)",
        }}
        end={{
          transform: "translateX(0px)",
        }}
      >
        <div className="home__download-resume">
          <button>
            <a href={resume} download>
              Download Resume
            </a>
          </button>
        </div>
      </Animate>
      
    </section>
  );
};

export default Home;
