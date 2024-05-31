import { mailService } from "../services/mail.service.js"
import { TrashAction, ToggleRead } from './MailActions.jsx'



export function MailPreview({ mail, isHovered, onActionComplete, onToggleRead, showRecipient }) {

  return (
    <div className="mail-preview">
      <span className="sender">{showRecipient ? `To: ${mail.to.split('@')[0]}` : mail.from.split('@')[0]}</span>
      <div>
        <span className="subject">{mail.subject}</span>
        <p className="body">{mail.body}</p>
      </div>
      {isHovered ? (
        <div>
          <TrashAction mail={mail} onActionComplete={onActionComplete} />
          <ToggleRead mailId={mail.id} isRead={mail.isRead} onToggleRead={onToggleRead} />
        </div>
      ) : (
        <span className="sent-time">{mailService.formatDate2(mail.sentAt)}</span>
      )}
    </div>
  )
}