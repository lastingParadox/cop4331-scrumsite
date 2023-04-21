import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ServiceImage from '../assets/service.jpg';
import Footer from "../components/Footer";
import View from "../components/View";

function Service() {
	return (
		<>
			<Navbar />
			<Hero
				className='hero-mid'
				heroImage={ServiceImage}
				title='Service'
				buttonClass='hide'
			/>
			<View />
			<Footer />
		</>
	);
}

export default Service;
