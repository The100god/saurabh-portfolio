import React, { useRef, useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import "./styles.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";

const p_key = process.env.REACT_APP_PUBLIC_KEY;
const s_id = process.env.REACT_APP_SERVICE_ID;
const t_id = process.env.REACT_APP_TEMPLATE_ID;
const Contact = () => {
  const [recivedMessage, setRecivedMessage] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(s_id, t_id, recivedMessage, p_key).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );

    // Clear the form
    setRecivedMessage({
      name: "",
      email: "",
      subject: "",
      description: "",
    });
    toast.success("Your message sent successfully.")
  };

  const handleOnchange = (e) => {
    setRecivedMessage({ ...recivedMessage, [e.target.name]: e.target.value });
  };
  return (
    <section id="contact" className="contact">
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
          headerText="Contact Me"
          icon={<BsInfoCircleFill size={40} />}
        />
      </Animate>

      <div className="contact__content">
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(-200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <h3 className="contact__content__header-text">Contact Me</h3>
        </Animate>
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(2000px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <div className="contact__content__form" ref={form}>
            <div className="contact__content__form__controlsWrapper">
              <div className="nameWrapper">
                <input
                  required
                  type="text"
                  name="name"
                  className="inputName"
                  value={recivedMessage.name}
                  onChange={handleOnchange}
                />
                <label htmlFor="name" className="nameLabel">
                  Name
                </label>
              </div>
              <div className="emailWrapper">
                <input
                  required
                  type="email"
                  name="email"
                  className="inputEmail"
                  onChange={handleOnchange}
                  value={recivedMessage.email}
                />
                <label htmlFor="email" className="emailLabel">
                  Email
                </label>
              </div>
              <div className="subjectWrapper">
                <input
                  required
                  type="text"
                  name="subject"
                  className="inputSubject"
                  onChange={handleOnchange}
                  value={recivedMessage.subject}
                />
                <label htmlFor="subject" className="subjectLabel">
                  Subject
                </label>
              </div>
              <div className="descriptionWrapper">
                <textarea
                  required
                  type="text"
                  name="description"
                  className="inputDescription"
                  rows={5}
                  onChange={handleOnchange}
                  value={recivedMessage.description}
                />
                <label htmlFor="description" className="descriptionLabel">
                  Description
                </label>
              </div>
            </div>
            <button onClick={handleSubmit} disabled={recivedMessage.email && recivedMessage.subject && recivedMessage.description ?false:true}>Submit</button>
          </div>
        </Animate>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </section>
  );
};

export default Contact;
