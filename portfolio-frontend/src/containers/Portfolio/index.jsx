import React, { useContext } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import "./styles.scss";
import { useState } from "react";
import { DataContext } from "../../context/DataContext";

const Portfolio = () => {
  const { data } = useContext(DataContext);
  const [hoverValue, setHoverValue] = useState(null);

  function handleHover(index) {
    setHoverValue(index);
  }

  const portfolioItems = data.portfolio;

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
        <div className="portfolio__content__cards">
          {portfolioItems.length > 0 ? (
            portfolioItems.map((item, index) => (
              <div
                className="portfolio__content__cards__item"
                key={`cardItem${item.id}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className="portfolio__content__cards__item__image-wrapper">
                  <a href={item.link || '#'} target="_blank" rel="noreferrer">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="portfolio__placeholder">
                        <span>{item.name}</span>
                      </div>
                    )}
                  </a>
                </div>

                <div className="overlay" >
                  {index === hoverValue && (
                    <div>
                      <p>{item.name}</p>
                      <a href={item.link || item.image || '#'} target="_blank" rel="noreferrer">
                        <button>Visit</button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{fontSize: '1.6rem', color: 'var(--green-theme-main-color)', gridColumn: '1/-1', textAlign: 'center', padding: '40px'}}>
              No portfolio items yet. Add some from the Admin Panel!
            </p>
          )}
        </div>

        {data.certificates && data.certificates.length > 0 && (
          <div className="portfolio__certificates">
            <h2>Certificates</h2>
            <div className="portfolio__certificates__cards">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="portfolio__certificates__item">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.name} />
                  ) : (
                    <div className="portfolio__certificate-placeholder">{cert.name}</div>
                  )}
                  <div className="portfolio__certificate-meta">
                    <h3>{cert.name}</h3>
                    <p>{cert.issuer}</p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noreferrer">View certificate</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
