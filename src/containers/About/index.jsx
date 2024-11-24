import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import PageHeaderContent from "../../components/pageHeaderContent";
import { Animate } from "react-simple-animate";
import "./styles.scss";

const personalDetails = [
  {
    label: "Name :",
    value: "Saurabh Goyal",
  },
  {
    label: "Age :",
    value: "23",
  },
  {
    label: "Address :",
    value: "Jodhpur, Rajasthan",
  },
  {
    label: "Email :",
    value: "saurabhgoyal8055@gmail.com",
  },
  {
    label: "Contact No :",
    value: "+91-8302443507",
  },
];

const jobSummary =
  "Fresher in experience and an Front End Developer with Knowledge of HTML, CSS, JavaScript, Reactjs, React-Three-Fiber, NextJs, NodeJS, and Python Programming language.";

const About = () => {
  return (
    <section id="about" className="about">
      <Animate
        play
        duration={1}
        delay={0.5}
        start={{
          transform: "translateY(-200px)",
        }}
        end={{
          transform: "translateY(0px)",
        }}
      >
        <PageHeaderContent
          headerText="About Me"
          icon={<BsInfoCircleFill size={40} />}
        />
      </Animate>

      <div className="about__content">
        <div className="about__content__personalWrapper">
          <Animate
            play
            duration={1.5}
            delay={0}
            start={{
              transform: "translateX(-1000px)",
            }}
            end={{
              transform: "translateX(0px)",
            }}
          >
            <h3>Front End Developer</h3>
            <p>{jobSummary}</p>
          </Animate>

          <Animate
            play
            duration={1.5}
            delay={0 }
            start={{
              transform: "translateX(2000px)",
            }}
            end={{
              transform: "translateX(0px)",
            }}
          >
            <h3 className="personalInformationHeaderText">
              Parsonal Information
            </h3>
            <ul className="about__personal__information__list">
              {personalDetails.map((item, key) => (
                <li
                  key={key}
                  className="about__personal__information__list__item"
                >
                  <span className="title">{item.label} </span>
                  <span className="value">{item.value}</span>
                </li>
              ))}
            </ul>
          </Animate>
        </div>
      </div>
    </section>
  );
};

export default About;
