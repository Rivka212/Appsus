const { useState } = React

import { mailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"



export function ComposeList({ closeModal, setNewMail, initialRecipient = '', initialSubject = '', initialBody = ''  }) {
    const [recipient, setRecipient] = useState(initialRecipient);
    const [subject, setSubject] = useState(initialSubject);
    const [body, setBody] = useState(initialBody);


    function handleSubmit(event) {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(recipient)) {
            if (!emailRegex.test(recipient)) {
                swal({
                    title: 'Error',
                    text: 'Please specify at least one recipient.',
                });
                return;
            }
        }

        const newMail = {
            id: utilService.makeId(),
            subject,
            body,
            sentAt: Date.now(),
            removedAt: null,
            from: mailService.loggedinUser.email,
            to: recipient,
            type: 'sent',
            originalType: 'sent',
        };

        mailService.addMail(newMail)
            .then(() => {
                showSuccessMsg('Mail sent successfully');
                debugger

                setNewMail(newMail); // Update state in MailApp
                handleClose(); // Close the modal after submission
            })
            .catch(() => {
                showErrorMsg('Failed to send mail');
            });
    }


    function handleClose() {
        setRecipient('');
        setSubject('');
        setBody('');
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