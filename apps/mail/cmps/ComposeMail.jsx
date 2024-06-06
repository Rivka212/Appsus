const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export function ComposeMail({ closeModal, setNewMail, initialRecipient = '', initialSubject = '', initialBody = '', draftId = null }) {
    const [recipient, setRecipient] = useState(initialRecipient)
    const [subject, setSubject] = useState(initialSubject)
    const [body, setBody] = useState(initialBody)

    useEffect(() => {
        setRecipient(initialRecipient)
        setSubject(initialSubject)
        setBody(initialBody)
    }, [initialRecipient, initialSubject, initialBody])

    function handleSubmit(event) {
        debugger
        event.preventDefault()
        console.log('handleSubmit called')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(recipient)) {
            swal({
                title: 'Error',
                text: 'Please specify at least one recipient.',
            })
            return
        }

        const newMail = {
            id:  draftId || utilService.makeId(),
            subject,
            body,
            sentAt: Date.now(),
            removedAt: null,
            from: mailService.loggedinUser.email,
            to: recipient,
            type: 'sent',
            originalType: 'sent',
        }

        if (draftId) {
            mailService.updateMail(newMail)
                .then(() => {
                    showSuccessMsg('Mail sent successfully')
                    setNewMail(newMail) // Update state in MailApp
                    closeModal() // Close the modal after submission
                })
                .catch((error) => {
                    console.error('Failed to send mail:', error)
                    showErrorMsg('Failed to send mail')
                })
        } else {
            mailService.addMail(newMail)
                .then(() => {
                    showSuccessMsg('Mail sent successfully')
                    setNewMail(newMail) // Update state in MailApp
                    closeModal() // Close the modal after submission
                })
                .catch((error) => {
                    console.error('Failed to send mail:', error)
                    showErrorMsg('Failed to send mail')
                })
        }
    }

    function handleClose() {
        debugger
        saveDraft()
        resetForm()
        closeModal()
    }

    function saveDraft() {

        if (!body && !recipient && !subject) return
        
        const draft = {
            id: draftId || utilService.makeId(),
            to: recipient,
            subject,
            body,
            sentAt: Date.now(),
            from: mailService.loggedinUser.email,
            type: 'draft',
            originalType: 'draft',
        }
        if (draftId) {
            debugger

            // Update existing draft
            mailService.updateMail(draft)
                .then(() => {
                    showSuccessMsg('Draft updated successfully')
                    setNewMail(draft) 
                    debugger
                    closeModal()// Update state in MailApp
                })
                .catch((error) => {
                    console.error('Failed to update draft:', error)
                    showErrorMsg('Failed to update draft')
                })
        } else {
            // Add new draft
            mailService.addMail(draft)
                .then(() => {
                    showSuccessMsg('Draft saved successfully')
                    setNewMail(draft)
                    closeModal() // Update state in MailApp
                })
                .catch((error) => {
                    console.error('Failed to save draft:', error)
                    showErrorMsg('Failed to save draft')
                })
        }
    }

    function resetForm() {
        setRecipient('')
        setSubject('')
        setBody('')
        mailService.clearDraft()
    }

    return (
        <section className="compose-mail">
            <header>
                <h2>New Message</h2>
                <div>
                    <button className="close" onClick={handleClose}>X</button>
                </div>
            </header>
            <form >
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
                <button  onClick={handleSubmit} className="send-btn" type="submit">Send</button>
            </form>
        </section>
    )
}