import { Component } from 'react';

import './Productivity.css';

class ProductivityData extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<div className='description-text'>
					<h2>{this.props.heading}</h2>
					<p>{this.props.text}</p>
				</div>

				<div className='image'>
					<img
						alt='Productivity'
						src={this.props.image1}
					/>
					<img
						alt='Productivity'
						src={this.props.image2}
					/>
				</div>
			</div>
		);
	}
}

export default ProductivityData;
