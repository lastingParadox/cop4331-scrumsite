import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HomeImage from '../assets/home.jpg';
import Productivity from '../components/Productivity';
import View from '../components/View';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs.js';
import ScrollToTop from '../components/ScrollToTop.js';

import {
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';

function Home() {
	return (
		<>
			<Navbar />
			<ScrollToTop />
			<Routes>
                <Route path="" element={<Navigate to="get-started" />} />

				<Route path="get-started" element={
					<>
						<Hero
							className='hero'
							heroImage={HomeImage}
							title='Transform Your Workflow'
							text='Do Things Differently.'
							buttonText='Get Started'
							url='/'
							buttonClass='show'
						/>
						<Productivity />
						<View />
					</>
					}
				/>
				<Route path="credits" element={
					<>
					</>
					}
				/>
				<Route path="about" element={
					<>
						<div style={{width: "100%", height: "100px"}}/>
						<AboutUs/>
					</>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default Home;
