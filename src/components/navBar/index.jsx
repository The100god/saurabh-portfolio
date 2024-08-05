import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./styles.scss";

const data = [
  {
    label: "HOME",
    to: "/",
  },
  {
    label: "ABOUT ME",
    to: "/About",
  },
  {
    label: "CERTIFICATES",
    to: "/Certificate",
  },
  {
    label: "PORTFOLIO",
    to: "/Portfolio",
  },
  {
    label: "RESUME",
    to: "/Resume",
  },
  {
    label: "SKILLS",
    to: "/Skills",
  },
  {
    label: "CONTACT",
    to: "/Contact",
  },
];

const Navbar = () => {
  const [toggleIcon, setToggleIcon] = useState(false);

  const handleToggleIcon = () => {
    setToggleIcon(!toggleIcon);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__container">
          <Link to={"/"} className="navbar__container__logo">
            <h1>SG</h1>
          </Link>
        </div>
        <ul className={`navbar__container__menu ${toggleIcon ? "active" : ""}`}>
          {data.map((item, key) => (
            <li key={key} className="navbar__container__menu__items" onClick={handleToggleIcon}>
              <Link
                to={item.to}
                className="navbar__container__menu__items__links"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav__icons" onClick={handleToggleIcon}>
          {!toggleIcon ? <FaBars size={30} /> : <HiX size={30} />}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
