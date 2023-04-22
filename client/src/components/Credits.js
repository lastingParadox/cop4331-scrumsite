import './Credits.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

const devList = [
	{
		name: 'Zander',
		github: '',
		email: '',
	},
	{
		name: 'Anthony',
		github: '',
		email: '',
	},
	{
		name: 'Donovan',
		github: '',
		email: '',
	},
	{
		name: 'Logan',
		github: '',
		email: '',
	},
	{
		name: 'Zack',
		github: '',
		email: '',
	},
	{
		name: 'Shawnn',
		github: '',
		email: '',
	},
	{
		name: 'Mario',
		github: '',
		email: '',
	}
];

const Card = props => (
	<div class="credits-card mx-3 my-1">
		<div class="credits-name">
			{props.name}
		</div>
	</div>
)

export default class Credits extends Component {
	listCredits() {
		return devList.map(cur => {
			return (
				<Card name={cur.name} />
			);
		});
	}

	render() {
		return (
			<div>
				<div class="credits-title">Credits</div>
				<div class="credits-container">
					{this.listCredits()}
				</div>
			</div>
		);
	}
}
