import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailIndex() {
    const { mails } = useOutletContext()


    return <section className="mail-index">
        <MailList mails={mails} />
    </section>
}

