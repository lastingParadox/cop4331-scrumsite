import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import HomeImage from "../assets/home.jpg";
import CreditsImage from "../assets/credits.jpg";
import Productivity from "../components/home/Productivity";
import View from "../components/home/View";
import Footer from "../components/home/Footer";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";
import Credits from "../components/home/Credits";
import Login from "./Login.js";

import ScrollToTop from "../components/home/ScrollToTop.js";

import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {

    useEffect(() => {
        document.title = "Scrum Site";
    }, []);

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
