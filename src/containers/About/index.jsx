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
    value: "25",
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
    label: "Linkedin :",
    value: "https://www.linkedin.com/in/saurabh-goyal-9311b2216/",
  },
  {
    label: "GitHub :",
    value: "https://github.com/the100god",
  },
  {
    label: "Contact No :",
    value: "+91-8302443507",
  },
];

const jobSummary =
  "Frontend Developer building modern, interactive, and performance-driven web applications with React and Next.js. Proficient in HTML, CSS, JavaScript, and responsive design principles to create seamless user experiences across devices. Skilled in collaborating with cross-functional teams to deliver high-quality software solutions. Passionate about staying updated with the latest industry trends and continuously improving development skills.";

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
                  {
                    item.value.includes("http") ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noreferrer"
                        className="valueLink"
                      >
                        {item.value}
                      </a>
                    ) : (
                  <span className="value">{item.value}</span>)}
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
