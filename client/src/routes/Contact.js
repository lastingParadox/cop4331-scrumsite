import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ContactImage from '../assets/contact.jpg';
import Footer from "../components/Footer";

function Contact() {
	return (
		<>
			<Navbar />
			<Hero
				className='hero-mid'
				heroImage={ContactImage}
				title='Contact'
				buttonClass='hide'
			/>
			<Footer />
		</>
	);
}

export default Contact;
