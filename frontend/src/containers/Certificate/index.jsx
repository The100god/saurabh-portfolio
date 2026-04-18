import React, { useContext, useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import { DataContext } from "../../context/DataContext";
import "./styles.scss";

const Certificate = () => {
  const { data } = useContext(DataContext);
  const certificateData = data.certificates || [];
  const [hoverValue, setHoverValue] = useState(null);

  function handleHover(index) {
    setHoverValue(index);
  }

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
        <div className="certificate__content__cards">
          {certificateData.length > 0 ? (
            certificateData.map((item, index) => (
              <div
                className="certificate__content__cards__item"
                key={`cardItem${item.id || item.name}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className="certificate__content__cards__item__image-wrapper">
                  <a href={item.link || item.image || '#'} target="_blank" rel="noreferrer">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="certificate__placeholder">
                        <span>{item.name}</span>
                      </div>
                    )}
                  </a>
                </div>

                <div className="overlay">
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
            <p style={{ fontSize: '1.6rem', color: 'var(--green-theme-main-color)', textAlign: 'center', padding: '40px' }}>
              No certificates yet. Add them from the Admin Panel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificate;
