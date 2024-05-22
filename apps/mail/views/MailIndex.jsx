import { MailList } from '../cmps/MailList.jsx'
import { MailSideBar} from '../cmps/MailSideBar.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

export function MailIndex() {
const [mails, setMails] = useState([])

useEffect (() => {
    
mailService.query()
.then(mails => setMails(mails))
},[])

return <section className="mail-index">
<MailSideBar/>
<MailList mails={mails}/>
</section>
}

