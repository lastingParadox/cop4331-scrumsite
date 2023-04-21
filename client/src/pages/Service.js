import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ServiceImage from '../assets/service.jpg';
import Footer from "../components/Footer";
import ServiceView from "../components/ServiceView";

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
			<ServiceView />
			<Footer />
		</>
	);
}

export default Service;
