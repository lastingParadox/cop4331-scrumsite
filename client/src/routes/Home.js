import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeroImage from '../assets/hero.jpg';
import Productivity from '../components/Productivity';
import View from '../components/View';
import Footer from '../components/Footer';

function Home() {
	return (
		<>
			<Navbar />
			<Hero
				className='hero'
				heroImage={HeroImage}
				title='Transform Your Workflow'
				text='Do Things Differently.'
				buttonText='Get Started'
				url='/'
				buttonClass='show'
			/>
			<Productivity />
			<View />
			<Footer />
		</>
	);
}

export default Home;
