import React from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import htmlcss from "../../assets/image/certificates/htmlcss.png"
import webDev from "../../assets/image/certificates/basics-of-web-development.jpg"
import frontend from "../../assets/image/certificates/frontend.png"
import javascript from "../../assets/image/certificates/javaScript.jpg"
import animation from "../../assets/image/certificates/animation.jpg"
import cssBootstrap from "../../assets/image/certificates/css-bootstrap.jpg"
import python from "../../assets/image/certificates/pygame.png"

import "./styles.scss";
import { useState } from "react";


const certificateData = [
  {
    id: 2,
    name: "HTML & CSS",
    image: htmlcss,
    
  },{
    id: 2,
    name: "CSS-Bootstrap",
    image: cssBootstrap,
    
  },
  {
    id: 2,
    name: "Web Development",
    image: webDev,
    
  },
  {
    id: 2,
    name: "Frontend Development",
    image: frontend,
    
  },
  {
    id: 2,
    name: "JavaScript",
    image: javascript,
    
  },
  {
    id: 2,
    name: "Animation",
    image: animation,
    
  },
  {
    id: 3,
    name: "Python",
    image: python,
    
  },

];

const filterData = [
  {
    filterId: 1,
    label: "All",
  },
  {
    filterId: 2,
    label: "Development",
  },
  {
    filterId: 3,
    label: "Python",
  },
  
];

const Certificate = () => {
  const [filteredValue, setFilteredValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(null);

  const handleFilter = (currentId) => {
    setFilteredValue(currentId);
  };

  function handleHover(index) {
    setHoverValue(index);
  }

  const filteredItems =
    filteredValue === 1
      ? certificateData
      : certificateData.filter((item) => item.id === filteredValue);

  console.log(hoverValue);
  return (
    <section id="Certificate" className="Certificate">
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
          headerText="Certificate"
          icon={<BsInfoCircleFill size={40} />}
        />
      </Animate>

      <div className="certificate__content">
        <ul className="certificate__content__filter">
          {filterData.map((cat) => (
            <li
              className={cat.filterId === filteredValue ? "active" : ""}
              onClick={() => {
                handleFilter(cat.filterId);
              }}
              key={cat.filterId}
            >
              {cat.label}
            </li>
          ))}
        </ul>
        <div className="certificate__content__cards">
          {filteredItems.map((item, index) => (
            <div
              className="certificate__content__cards__item"
              key={`cardItem${item.name.trim()}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="certificate__content__cards__item__image-wrapper">
                <a href={item.imgLink} target="_blank" rel="noreferrer">
                  <img src={item.image} alt={item.name} />
                </a>
              </div>

              <div className="overlay" >
                {index === hoverValue && (
                  <div>
                    <p>{item.name}</p>
                    <a href={item.image} target="_blank" rel="noreferrer">

                    <button >Visit</button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificate;
