const { useEffect, useState } = React
const { useParams } = ReactRouter

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    const {id} = useParams()
    const [mail, setMail] = useState(null)
    const [date, setDate] = useState(null)


    useEffect(() => {
        
        mailService.getMail(id)
            .then(mail => {
                setMail(mail)
                setDate(mailService.formatDate(mail.sentAt))
            })
    }, [])

    if (!mail) return <h3>Loading...</h3>
    return <section>
        <h2>{mail.subject}</h2>
        <div>
            <h3>{mail.from}</h3>
            <span>{date} </span>
            <span>{mail.to}</span>
        </div>
        <p>{mail.body}</p>
        <button>Replay</button>
        <button>Forward</button>
    </section>
}