import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, isHovered, onTrashClick, showRecipient }) {

  return <div className="mail-preview">
    <span className="sender">{showRecipient ? `To: ${mail.to.split('@')[0]}` : mail.from.split('@')[0]}</span>
    <div>
      <span className="subject">{mail.subject}</span>
      <p className="body">{mail.body}</p>
    </div>
    {isHovered ? (
      <img src="../../../icons/trash.png" alt="Delete" onClick={(ev) => onTrashClick(ev, mail.id)} />
    ) : (
      <span className="sent-time">{mailService.formatDate2(mail.sentAt)}</span>
    )}
  </div>
}