import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeImage from "../assets/home.jpg";
import CreditsImage from "../assets/credits.jpg";
import Productivity from "../components/Productivity";
import View from "../components/View";
import Footer from "../components/Footer";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Credits from "../components/Credits";
import Login from "./Login.js";

import ScrollToTop from "../components/ScrollToTop.js";

import { Route, Routes, Navigate } from "react-router-dom";

function Home() {
    return (
        <>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="" element={<Navigate to="get-started" />} />

                <Route
                    path="get-started"
                    element={
                        <>
                            <Hero
                                className="hero"
                                heroImage={HomeImage}
                                title="Transform Your Workflow"
                                text="Do Things Differently."
                                buttonText="Get Started"
                                url="login"
                                buttonClass="show"
                            />
                            <Productivity />
                            <View />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="about"
                    element={
                        <>
                            <About />
                        </>
                    }
                />
                <Route
                    path="service"
                    element={
                        <>
                            <Service />
                        </>
                    }
                />
                <Route
                    path="contact"
                    element={
                        <>
                            <Contact />
                        </>
                    }
                />
                <Route
                    path="credits"
                    element={
                        <>
                            <Credits />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="login"
                    element={
                        <>
                            <Login />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default Home;
