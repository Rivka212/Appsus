const { useState } = React;

export function ComposeList({ closeModal, initialRecipient, initialSubject, initialBody }) {
    const [recipient, setRecipient] = useState(initialRecipient);
    const [subject, setSubject] = useState(initialSubject);
    const [body, setBody] = useState(initialBody);

    function handleSubmit(event) {
        event.preventDefault();
        console.log('hi');
        // Add your submit logic here

        // Reset state and close modal
        closeModal();
    }

    return (
        <section className="compose-mail">
            <header>
                <h2>New Message</h2>
                <div>
                    <button>-</button>
                    <button>~</button>
                    <button className="close" onClick={closeModal}>X</button>
                </div>
            </header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    onFocus={(ev) => (ev.target.placeholder = '')}
                    onBlur={(ev) => (ev.target.placeholder = 'Recipient')}
                    required
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onFocus={(ev) => (ev.target.placeholder = '')}
                    onBlur={(ev) => (ev.target.placeholder = 'Subject')}
                />
                <div className="text-box">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button className="send-btn" type="submit">Send</button>
            </form>
        </section>
    );
}