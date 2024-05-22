import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    console.log(mails)
    return <section className="mail-list">
        <ul>
            {mails.map(mail => (
                <li key={mail.id}>
                    <input type="checkbox" />
                    <img src="../../../../icons/starred.png" />
                    <img src="../../../../icons/important.png" />
                    <MailPreview mail={mail}/>

                </li>
            ))}
        </ul>
    </section>
}
