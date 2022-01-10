import { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(reqBody) {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log(`data:`, data);

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

export default function ContactForm(props) {
  const emailRef = useRef("");
  const nameRef = useRef("");
  const messageRef = useRef("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [notificationError, setNotificationError] = useState("");

  useEffect(() => {
    if (notificationStatus !== 'pending') {
      const timer = setTimeout(() => {
        setNotificationError(null)
        setNotificationStatus(null)
      }, 3000);
      
      return () => clearTimeout(timer)
    }
  }, [notificationStatus])

  async function sendMessageHandler(event) {
    event.preventDefault();
    const emailInput = emailRef.current.value;
    const nameInput = nameRef.current.value;
    const messageInput = messageRef.current.value;

    const reqBody = {
      email: emailInput,
      name: nameInput,
      message: messageInput,
    };

    setNotificationStatus("pending");
    try {
      await sendContactData(reqBody);
      setNotificationStatus("success");
      emailRef.current.value = nameRef.current.value = messageRef.current.value = '';
    } catch (error) {
      setNotificationStatus("error");
      setNotificationError(error.message);
    }
  }

  let notification;
  switch (notificationStatus) {
    case "pending":
      notification = {
        title: "Sending Message",
        message: "Your message is on the way.",
        status: notificationStatus,
      };
      break;

    case "success":
      notification = {
        title: "Message Sent",
        message: "Your message has been posted.",
        status: notificationStatus,
      };
      break;

    case "error":
      notification = {
        title: "Sending Message Failed",
        message: notificationError,
        status: notificationStatus,
      };
      break;

    default:
      break;
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email: </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              required
              id="email"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name: </label>
            <input type="name" name="name" ref={nameRef} required id="name" />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message: </label>
          <textarea
            name="message"
            ref={messageRef}
            required
            id="message"
            rows="5"
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
    </section>
  );
}
