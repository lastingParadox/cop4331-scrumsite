import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div>
                    <h1>Scrum Site</h1>
                    <p>Transform your workflow.</p>
                </div>

                <div>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>

                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>

                    <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-snapchat-square"></i>
                    </a>

                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                </div>
            </div>

            <div className="bottom">
                <div>
                    <h4>Project</h4>
                    <a
                        href="https://github.com/lastingParadox/cop4331-scrumsite"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://github.com/lastingParadox/cop4331-scrumsite/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Issues
                    </a>
                </div>

                <div>
                    <h4>Help</h4>
                    <a
                        href="contact"
                        rel="noopener noreferrer"
                    >
                        Contact Us
                    </a>
                </div>

                <div>
                    <h4>Others</h4>
                    <a
                        href="about"
                        rel="noopener noreferrer"
                    >
                        About
                    </a>
                    <a
                        href="credits"
                        rel="noopener noreferrer"
                    >
                        Credits
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
