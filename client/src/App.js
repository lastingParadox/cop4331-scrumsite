// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { React, Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';

class App extends Component {
	state = {
		data: null,
	};

	render() {
		return (
			<div className='App'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/about'
						element={<About />}
					/>
					<Route
						path='/service'
						element={<Service />}
					/>
					<Route
						path='/contact'
						element={<Contact />}
					/>
				</Routes>
			</div>
		);
	}
}

export default App;
