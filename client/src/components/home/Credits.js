import "./Credits.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";

const devList = [
    {
        name: "Zander",
        github: "",
        email: "",
    },
    {
        name: "Anthony",
        github: "",
        email: "",
    },
    {
        name: "Donovan",
        github: "",
        email: "",
    },
    {
        name: "Logan",
        github: "",
        email: "",
    },
    {
        name: "Zack",
        github: "",
        email: "",
    },
    {
        name: "Shawnn",
        github: "",
        email: "",
    },
    {
        name: "Mario",
        github: "",
        email: "",
    },
];

const Card = (props) => (
    <div className="credits-card mx-3 my-1">
        <div className="credits-name">{props.name}</div>
    </div>
);

export default class Credits extends Component {
    listCredits() {
        return devList.map((cur, index) => {
            return <Card key={index} name={cur.name} />;
        });
    }

    render() {
        return (
            <div className="main-container">
                <div className="credits-title">Credits</div>
                <div className="credits-container">{this.listCredits()}</div>
            </div>
        );
    }
}
