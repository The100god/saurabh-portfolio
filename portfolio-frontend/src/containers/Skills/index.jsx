import React from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
// import { Animate, AnimateKeyframes } from "react-simple-animate";
import { Animate } from "react-simple-animate";
// import { skillsData } from "./utils";
// import { Line } from "rc-progress";
import './styles.scss'
import RadarChart from "../skillChart";

const Skills = () => {
  return (
    <section id="skills" className="skills">
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
          headerText="My Skills"
          icon={<BsInfoCircleFill size={40} />}
        />
      </Animate>

      <div className="skills__contentWrapper">
        {/* {skillsData.map((item, key) => ( */}
          {/* <div key={key} className="skills__contentWrapper__data"> */}
          <div className="skills__contentWrapper__data">
            <Animate
              play
              duration={1}
              delay={1.6}
              start={{
                transform: "translateY(-1000%)",
              }}
              end={{
                transform: "translateY(0px)",
              }}
            >
              {/* <h3 className="skills__contentWrapper__data__category">
                {item.label}
              </h3>
              <div className="skills__contentWrapper__data__category__data">
                {item.data.map((skill, skillkey) => (
                  <AnimateKeyframes
                    play
                    duration={1}
                    keyframes={["opacity: 1", "opacity:0"]}
                    iterationCount="1"
                  >
                    <div className="progressbarWrapper" key={skillkey}>
                      <p>{skill.skillName}</p>
                      <Line
                        percent={skill.percentage}
                        strokeWidth="2"
                        strokeColor="var(--green-theme-main-color)"
                        trailWidth={"2"}
                        strokeLinecap="square"
                      />
                    </div> 
                 </AnimateKeyframes>
                ))}
              </div> */}
                    <RadarChart/>
            </Animate>
          </div>
        {/* ))} */}
      </div>
    </section>
  );
};

export default Skills;
