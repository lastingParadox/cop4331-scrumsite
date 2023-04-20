import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import HeroImage from '../assets/hero.jpg';

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
		</>
	);
}

export default Home;
