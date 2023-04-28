import "./ContactForm.css";

function ContactForm() {
    return (
        <div className="form-container">
            <h1>Send a message to us!</h1>
            <form>
                <input type="text" placeholder="Name" required></input>
                <input type="email" placeholder="Email" required></input>
                <input type="text" placeholder="Subject" required></input>
                <textarea placeholder="Message" rows={4} required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactForm;
