import React from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import dice from "../../assets/image/dice.png";
import drum from "../../assets/image/drum.png";
import food from "../../assets/image/food_lelo.png";
import gym from "../../assets/image/gym.png";
import movie from "../../assets/image/movie.png";
import simons from "../../assets/image/simons.png";
import result from "../../assets/image/result.png";
import mywatch from "../../assets/image/mywatch.png";
import sangeet from "../../assets/image/sangeet.jpg";
import clock from "../../assets/image/clock.png";
import calculator from "../../assets/image/calculator.png";
import textConverter from "../../assets/image/textConverter.png";
import template from "../../assets/image/template.png";
import weather from "../../assets/image/weather.png";
import school from "../../assets/image/school.png";
import "./styles.scss";
import { useState } from "react";


const portfolioData = [
  {
    id: 2,
    name: "Dice Game",
    image: dice,
    imgLink: "https://the100god.github.io/Dice-game/",
  },
  {
    id: 2,
    name: "Simons Game",
    image: simons,
    imgLink: "https://the100god.github.io/Simon/",
  },
  {
    id: 2,
    name: "Drum kit",
    image: drum,
    imgLink: "https://the100god.github.io/Drum-kit/",
  },
  {
    id: 2,
    name: "GYM Site",
    image: gym,
    imgLink: "https://the100god.github.io/GYM-Site/",
  },
  {
    id: 2,
    name: "Movie List",
    image: movie,
    imgLink: "https://the100god.github.io/Movie-Time/",
  },
  {
    id: 2,
    name: "Food Lelo",
    image: food,
    imgLink: "https://the100god.github.io/Food-lelo/",
  },
  {
    id: 2,
    name: "Sangeet",
    image: sangeet,
    imgLink: "https://the100god.github.io/Sangeet/",
  },
  {
    id: 3,
    name: "Result CSS layout",
    image: result,
    imgLink: "https://the100god.github.io/Challenge1/",
  },
  {
    id: 3,
    name: "My Watch",
    image: mywatch,
    imgLink: "https://the100god.github.io/mywatch/",
  },
  {
    id: 3,
    name: "Clock",
    image: clock,
    imgLink: "https://sg-clock.netlify.app/",
  },
  {
    id: 3,
    name: "Calculator",
    image: calculator,
    imgLink: "https://sgcalculator.netlify.app/",
  },
  {
    id: 3,
    name: "Text Converter",
    image: textConverter,
    imgLink: "https://sg-text-converter.netlify.app/",
  },
  {
    id: 3,
    name: "Template",
    image: template,
    imgLink: "https://tasktamplate.netlify.app/",
  },
  {
    id: 4,
    name: "Weather",
    image: weather,
    imgLink: "https://my-weather-search-app.netlify.app/",
  },
  {
    id: 4,
    name: "School",
    image: school,
    imgLink: "https://saurabh-school.netlify.app/",
  },

];

const filterData = [
  {
    filterId: 1,
    label: "All",
  },
  {
    filterId: 4,
    label: "Development",
  },
  {
    filterId: 3,
    label: "Design",
  },
  
];

const Portfolio = () => {
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
      ? portfolioData
      : portfolioData.filter((item) => item.id === filteredValue);

  console.log(hoverValue);
  return (
    <section id="portfolio" className="portfolio">
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
          headerText="Portfolio"
          icon={<BsInfoCircleFill size={40} />}
        />
      </Animate>

      <div className="portfolio__content">
        <ul className="portfolio__content__filter">
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
        <div className="portfolio__content__cards">
          {filteredItems.map((item, index) => (
            <div
              className="portfolio__content__cards__item"
              key={`cardItem${item.name.trim()}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="portfolio__content__cards__item__image-wrapper">
                <a href={item.imgLink}>
                  <img src={item.image} alt={item.name} />
                </a>
              </div>

              <div className="overlay" >
                {index === hoverValue && (
                  <div>
                    <p>{item.name}</p>
                    <a href={item.imgLink} target="_blank" rel="noreferrer">

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

export default Portfolio;
