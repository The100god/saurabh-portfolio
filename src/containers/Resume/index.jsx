import React from 'react'
import PageHeaderContent from '../../components/pageHeaderContent';
import { BsInfoCircleFill } from 'react-icons/bs';
import { Animate } from "react-simple-animate";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { resumeData } from './utils';
import './styles.scss';
import 'react-vertical-timeline-component/style.min.css';
import {MdWork} from 'react-icons/md'
import {MdSchool} from 'react-icons/md'

const Resume = () => {
  return (
    <section id='resume' className='resume'>
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
        headerText="Resume"
        icon={<BsInfoCircleFill size={40}/>}
      />
      </Animate>

      <div className="timeLine">
        <div className="timeLine__education">
          <h3 className='timeLine__education__header-text'>
            Education
          </h3>
          <VerticalTimeline 
          layout={'1-column'}
          lineColor='var(--green-theme-main-color)'
          >
          {
            resumeData.education.map((level, key)=>(
              <VerticalTimelineElement
              key={key}
              className='timeLine__education__vartical-timeline-element'
              contentStyle={{background:'none',
              color:'var(--green-theme-sub-text-color)',
              border:'1.5px solid var(--green-theme-main-color)'}}
              icon={<MdSchool/>}
              iconStyle={{
                background:'#181818',
                color:'var(--green-theme-main-color)',
              }}
              >
              <div className="vartical-timeline-element-title-wrapper">
                <h3 className='vartical-timeline-element-title'>
                  {level.title}
                </h3>

                <h4 className='vartical-timeline-element-subTitle'>
                  {level.subTitle}
                </h4>
                <h4 className='vartical-timeline-element-year'>
                  {level.year}
                </h4>
              </div>
                <p className='vartical-timeline-element-description'>
                  {level.description}
                </p>

              </VerticalTimelineElement>
            ))
          }

          </VerticalTimeline>
        </div>
        <div className="timeLine__internship">
        <h3 className='timeLine__internship__header-text'>
            Internship
          </h3>
          <VerticalTimeline 
          layout={'1-column'}
          lineColor='var(--green-theme-main-color)'
          >
          {
            resumeData.internship.map((level, key)=>(
              <VerticalTimelineElement
              key={key}
              className='timeLine__internship__vartical-timeline-element'
              contentStyle={{background:'none',
              color:'var(--green-theme-sub-text-color)',
              border:'1.5px solid var(--green-theme-main-color)'}}
              icon={<MdWork/>}
              iconStyle={{
                background:'#181818',
                color:'var(--green-theme-main-color)',
              }}
              >
              <div className="vartical-timeline-element-title-wrapper">
                <h3 className='vartical-timeline-element-title'>
                  {level.title}
                </h3>

                <h4 className='vartical-timeline-element-subTitle'>
                  {level.subTitle}
                </h4>
              
              </div>
                <p className='vartical-timeline-element-description'>
                  {level.description}
                </p>

              </VerticalTimelineElement>
            ))
          }

          </VerticalTimeline>
        </div>
      </div>
    </section>
  )
}

export default Resume;
