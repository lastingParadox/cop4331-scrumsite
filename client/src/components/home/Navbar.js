import "./Navbar.css";

import { Component } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    resetClick = () => {
        this.setState({ clicked: false });
    };

    render() {
        return (
            <>
                <nav className="NavbarItems">
                    <h1 className="navbar-logo">Scrum Site</h1>

                    <div className="menu-icons" onClick={this.handleClick}>
                        <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>

                    <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link className={item.className} onClick={this.resetClick} to={"/home" + item.url}>
                                        <i className={item.icon}></i>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </>
        );
    }
}

export default Navbar;
