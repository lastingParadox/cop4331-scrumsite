import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ServiceImage from '../assets/service.jpg';

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
		</>
	);
}

export default Service;
