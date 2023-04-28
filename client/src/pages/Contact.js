import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import ContactImage from "../assets/contact.jpg";
import Footer from "../components/home/Footer";
import ContactForm from "../components/home/ContactForm";

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
