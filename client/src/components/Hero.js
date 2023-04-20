import './Hero.css';

function Hero(props) {
	return (
		<>
			<div className={props.className}>
				<img
					alt='HeroImage'
					src={props.heroImage}
				/>

				<div className='hero-text'>
					<h1>{props.title}</h1>
					<p>{props.text}</p>
					<a
						href={props.url}
						className={props.buttonClass}
					>
						{props.buttonText}
					</a>
				</div>
			</div>
		</>
	);
}

export default Hero;
