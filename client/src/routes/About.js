import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImage from '../assets/about.jpg';

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
		</>
	);
}

export default About;
