import "./View.css";

function ViewData(props) {
    return (
        <div className="view-card">
            <div className="view-image">
                <img src={props.image} alt="View" />
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
    );
}

export default ViewData;
