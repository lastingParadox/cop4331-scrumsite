import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ContactImage from "../assets/contact.jpg";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function Contact() {
    return (
        <>
            <Navbar />
            <Hero
                className="hero-mid"
                heroImage={ContactImage}
                title="Contact"
                buttonClass="hide"
            />
            <ContactForm />
            <Footer />
        </>
    );
}

export default Contact;
