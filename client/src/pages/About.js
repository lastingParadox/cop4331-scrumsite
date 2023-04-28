import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import AboutImage from "../assets/about.jpg";
import Footer from "../components/home/Footer";
import AboutUs from "../components/home/AboutUs";
import { Helmet } from "react-helmet";

function About() {


    return (
        <>
            <Helmet>
                <title>Scrum Site - About Us</title>
            </Helmet>
            <Navbar />
            <Hero className="hero-mid" heroImage={AboutImage} title="About" buttonClass="hide" />
            <AboutUs />
            <Footer />
        </>
    );
}

export default About;
