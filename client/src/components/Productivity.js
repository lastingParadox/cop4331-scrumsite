import "./Productivity.css";

import ProductivityData from "./ProductivityData";

import Productivity1 from "../assets/productivity1.jpg";
import Productivity2 from "../assets/productivity2.jpg";
import Productivity3 from "../assets/productivity3.jpg";
import Productivity4 from "../assets/productivity4.jpg";

const Productivity = () => {
    return (
        <div className="productivity">
            <h1>A productivity powerhouse</h1>
            <p>
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a
                clear view of who's doing what and what needs to get done.
            </p>

            <ProductivityData
                className="description"
                heading="Boards"
                text='Trello boards keep tasks organized and work moving forward. In a glance, see everything from "things to do" to "aww yeah, we did it!"'
                image1={Productivity1}
                image2={Productivity2}
            />

            <ProductivityData
                className="description-reverse"
                heading="Workflows for any project, big or small"
                text="No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams. Customize it to make it yours."
                image1={Productivity3}
                image2={Productivity4}
            />
        </div>
    );
};

export default Productivity;
