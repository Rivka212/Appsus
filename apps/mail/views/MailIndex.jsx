import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailIndex() {
const [mails, setMails] = useState([])

useEffect (() => {
    debugger
mailService.query()
.then(mails => setMails(mails))
},[])

return <section className="mail-index">
<h1>mails</h1>
<MailList mails={mails}/>
</section>
}

