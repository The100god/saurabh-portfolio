import React, { useContext } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import PageHeaderContent from "../../components/pageHeaderContent";
import { Animate } from "react-simple-animate";
import { DataContext } from "../../context/DataContext";
import "./styles.scss";

const About = () => {
  const { data } = useContext(DataContext);
  const { personalInfo } = data;

  const personalDetails = [
    {
      label: "Name :",
      value: personalInfo.name,
    },
    {
      label: "Age :",
      value: personalInfo.age,
    },
    {
      label: "Address :",
      value: personalInfo.address,
    },
    {
      label: "Email :",
      value: personalInfo.email,
    },
    {
      label: "Linkedin :",
      value: personalInfo.linkedin,
    },
    {
      label: "GitHub :",
      value: personalInfo.github,
    },
    {
      label: "Contact No :",
      value: personalInfo.phone,
    },
  ];

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
            <h3>{personalInfo.role}</h3>
            <p>{personalInfo.summary}</p>
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
