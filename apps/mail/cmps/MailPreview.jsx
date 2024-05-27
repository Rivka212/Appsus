import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
  




  return <div className="mail-preview">
  <span className="sender" >{mail.type==='inbox' ? mail.from.split('@')[0] : mail.to.split('@')[0]}</span>
  <div>
  <span className="subject">{mail.subject}</span>
  <p className="body">{mail.body}</p>
  </div>
  <span className="sent-time">{mailService.formatDate2(mail.sentAt)}</span>
  
</div>
}