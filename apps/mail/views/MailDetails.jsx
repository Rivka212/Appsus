const { useEffect, useState } = React
const { useParams } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { MailUpperBar } from "../cmps/MailUpperBar.jsx"

export function MailDetails() {
    const { id } = useParams()
    const [mail, setMail] = useState(null)
    const [date, setDate] = useState(null)



    function formatDate(timestamp) {
        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }


    useEffect(() => {
        mailService.getMail(id)
            .then(mail => {
                setMail(mail)
                setDate(formatDate(mail.sentAt))
                console.log(date)
            })
    }, [])

    function handleChange() {
        console.log('change')
    }

    if (!mail) return <h3>Loading...</h3>
    return <section className="mail-details">
        <MailUpperBar onFilterChange={handleChange} />
        <div className="main-mail">
            <h2>{mail.subject}</h2>
            <div className="sender-details">
                <div>
                    <div>
                        <h3>{mail.from.split('@')[0]}  </h3>
                        <span className="from-and-date">{`<${mail.from}>`}</span>
                    </div>
                    <span>{mail.type === 'inbox' ? 'to me' : mail.to}</span>
                </div>

                <div >
                    <span className="from-and-date">{date} </span>
                    <img src="../../icons/star.svg" />
                    <img src="../../icons/reply.png" />
                    <img src="../../icons/more.png" />
                </div>

            </div>
            <p>{mail.body}</p>

            <div className="btns">
                <button>
                    <img src="../../icons/reply.png" />
                    Replay</button>
                <button>
                    <img className="forward" src="../../icons/reply.png" />
                    Forward
                </button>
            </div>

        </div>

    </section>
}