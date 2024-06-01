const { useState } = React
const { useNavigate, Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { TrashAction, ToggleRead } from './MailActions.jsx'
import { ComposeMail } from './ComposeMail.jsx'

export function MailPreview({ mail, isHovered, onActionComplete, onToggleRead, showRecipient, openModal, closeModal, isMailClicked, selectedMail, setNewMail }) {
  const senderOrRecipient = mail.type === 'draft'
    ? `To: ${mail.to}`
    : (showRecipient ? `To: ${mail.to.split('@')[0]}` : mail.from.split('@')[0]);

  const handleMailClick = (event) => {
    if (mail.type === 'draft') {
      event.preventDefault();
      openModal();
    }
  };

  return (
    <div className="mail-preview">
      <Link to={mail.type !== 'draft' ? `/mail/details/${mail.id}` : '#'} onClick={handleMailClick}>
        
        <span className="sender">{senderOrRecipient}</span>
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
      </Link>
      {isMailClicked && selectedMail && selectedMail.id === mail.id && (
        <div className="modal">
          {console.log('Passing to ComposeMail:', {
            initialRecipient: mail.to,
            initialSubject: mail.subject,
            initialBody: mail.body
          })}
          <ComposeMail
            setNewMail={setNewMail} // You may need to handle this appropriately
            closeModal={closeModal}
            initialRecipient={mail.to}
            initialSubject={mail.subject}
            initialBody={mail.body}
            draftId={mail.id}
            onActionComplete={onActionComplete}
            mail={mail}
          />
        </div>
      )}
    </div>
  );
}