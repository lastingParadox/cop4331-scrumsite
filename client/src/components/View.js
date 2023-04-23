import "./View.css";

import ViewData from "./ViewData";

import View1 from "../assets/view1.jpg";
import View2 from "../assets/view2.jpg";
import View3 from "../assets/view3.jpg";

function View() {
    return (
        <div className="view">
            <h1>See work in a whole new way</h1>
            <p>
                View your team's projects from every angle and bring a fresh perspective to the task
                at hand.
            </p>
            <div className="view-card-container">
                <ViewData
                    image={View1}
                    heading="Hit deadlines every time"
                    text="From weekly sprints to annual planning, Timeline view keeps all tasks on track. Quickly get a glimpse of what's coming down the pipeline and identify any gaps that might impede your team's progress."
                />
                <ViewData
                    image={View2}
                    heading="Stay on top of tasks"
                    text="Start each day without any surprises. Whether scheduling an editorial calendar or staying on top of to-dos, Calendar view is like a crystal ball giving you a clear vision of what work lies ahead."
                />
                <ViewData
                    image={View3}
                    heading="Do more with Trello"
                    text="Trello's intuitive features give any team the ability to quickly set up and customize workflows for just about anything."
                />
            </div>
        </div>
    );
}

export default View;
