export function MailPreview({ mail }) {
    console.log(mail)
    
    
    return <div className="mail-preview">
        <span className="sender" >{mail.inbox ? mail.from.split('@')[0] : mail.to.split('@')[0]}</span>
        <span className="subject">{mail.subject}</span>
        
    </div>
}