import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import ServiceImage from "../assets/service.jpg";
import Footer from "../components/home/Footer";
import ServiceView from "../components/home/ServiceView";

function Service() {
    return (
        <>
            <Navbar />
            <Hero
                className="hero-mid"
                heroImage={ServiceImage}
                title="Service"
                buttonClass="hide"
            />
            <ServiceView />
            <Footer />
        </>
    );
}

export default Service;
