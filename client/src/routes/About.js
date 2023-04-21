import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImage from '../assets/about.jpg';
import Footer from "../components/Footer";

function About() {
	return (
		<>
			<Navbar />
			<Hero
				className='hero-mid'
				heroImage={AboutImage}
				title='About'
				buttonClass='hide'
			/>
			<Footer />
		</>
	);
}

export default About;
