import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import ServiceImage from "../assets/service.jpg";
import Footer from "../components/home/Footer";
import ServiceView from "../components/home/ServiceView";
import { Helmet } from "react-helmet";

function Service() {

    return (
        <>
            <Helmet>
                <title>Scrum Site - Service</title>
            </Helmet>
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
