import "./Credits.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const devList = [
    {
        name: "Zander",
        github: "https://github.com/lastingParadox",
        email: "zanpres@knights.ucf.edu",
    },
    {
        name: "Anthony",
        github: "https://github.com/blockdude",
        email: "anthonycobb@knights.ucf.edu",
    },
    {
        name: "Donovan",
        github: "https://github.com/DonovanReynolds",
        email: "",
    },
    {
        name: "Logan",
        github: "https://github.com/GravesLogan",
        email: "graveslogan@knights.ucf.edu",
    },
    {
        name: "Zack",
        github: "https://github.com/zacharyyore",
        email: "",
    },
    {
        name: "Shawnn",
        github: "https://github.com/shawnnongyiu",
        email: "shawnnongyiu@knights.ucf.edu",
    },
    {
        name: "Mario",
        github: "https://github.com/recycon",
        email: "",
    },
];

const Card = (props) => (
    <div className="credits-card mx-3 my-1">
        <div className="credits-name">{props.person.name}</div>
        <hr className="credits-divider"></hr>
        <div className="credits-email">{props.person.email}</div>
        <a className="credits-github" href={props.person.github}>Github</a>
    </div>
);

export default function Credits() {

    useEffect(() => {
        document.title = "Scrum Site - Credits";
    }, []);

    const listCredits = devList.map((cur, index) => {
        return <Card key={index} person={cur} />;
    });

    return (
        <div className="main-container">
            <div className="credits-title">Credits</div>
            <div className="credits-container">{listCredits}</div>
        </div>
    );
}

