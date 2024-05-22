export function MailList({mails}) {
    console.log(mails)
    return <section className="mail-list">Mail list
<ul>
    {mails.map(mail=> <li key={mail.id}>{mail.subject}</li>)}
</ul>
    </section>
}
