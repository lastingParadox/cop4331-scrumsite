import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImage from "../assets/about.jpg";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

function About() {
    return (
        <>
            <Navbar />
            <Hero className="hero-mid" heroImage={AboutImage} title="About" buttonClass="hide" />
            <AboutUs />
            <Footer />
        </>
    );
}

export default About;
