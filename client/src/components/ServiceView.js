import "./View.css";

import ViewData from "./ViewData";

import ServiceView1 from "../assets/service-view-workspace.jpg";
import ServiceView2 from "../assets/service-view-task.jpg";
import ServiceView3 from "../assets/service-view3.jpg";

function ServiceView() {
    return (
        <div className="view">
            <h1>Better than nothing</h1>
            <p>
                View your team's projects from every angle and bring a fresh perspective to the task
                at hand.
            </p>
            <div className="view-card-container">
                <ViewData
                    image={ServiceView1}
                    heading="Workspaces"
                    text="Seperate large projects into different workspaces to organize your workflow."
                />
                <ViewData
                    image={ServiceView2}
                    heading="Tasks"
                    text="Set goals for a project by creating tasks. Creating tasks lets you keep track of what should get done and what has been finished."
                />
                <ViewData
                    image={ServiceView3}
                    heading="Invite people to workspaces"
                    text="Invite people to a workspace to coordinate project tasks with your team."
                />
            </div>
        </div>
    );
}

export default ServiceView;
