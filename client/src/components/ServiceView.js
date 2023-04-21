import './View.css';

import ViewData from './ViewData';

import ServiceView1 from '../assets/service-view1.jpg';
import ServiceView2 from '../assets/service-view2.jpg';
import ServiceView3 from '../assets/service-view3.jpg';

function ServiceView() {
	return (
		<div className='view'>
			<h1>See work in a whole new way</h1>
			<p>
				View your team's projects from every angle and bring a fresh perspective to the task at
				hand.
			</p>
			<div className='view-card-container'>
				<ViewData
					image={ServiceView1}
					heading='Integrations'
					text='Connect the apps your team already uses into your Trello workflow or add a Power-Up to fine-tune your specific needs.'
				/>
				<ViewData
					image={ServiceView2}
					heading='Butler Automation'
					text='No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.'
				/>
				<ViewData
					image={ServiceView3}
					heading='Trello Enterprise'
					text='The productivity tool teams love, paired with the features and security needed for scale.'
				/>
			</div>
		</div>
	);
}

export default ServiceView;
