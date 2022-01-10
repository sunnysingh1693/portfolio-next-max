import Head from "next/head";
import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";

export default function ContactPage(props) {
  return <Fragment>
    <Head>
      <title>Contact me</title>
      <meta name='description' content='Please feel free to contact me.' />
    </Head>
    <h1 className="center">Contact Page</h1>
    <ContactForm />
  </Fragment>
}