const { useState } = React
const { useNavigate, Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { TrashAction, ToggleRead } from './MailActions.jsx'
import { ComposeMail } from './ComposeMail.jsx'


export function MailPreview({ mail, isHovered, onActionComplete, onToggleRead, showRecipient, setNewMail, closeModal, isMailClicked, setIsClicked, selectedMail, setSelectedMail }) {
  const senderOrRecipient = mail.type === 'draft'
    ? `To: ${mail.to}`
    : (showRecipient ? `To: ${mail.to.split('@')[0]}` : mail.from.split('@')[0]);

  const handleMailClick = (event) => {
    if (mail.type === 'draft') {
      event.preventDefault();
      setSelectedMail(mail);
      setIsClicked(true);
    }
  };

  return (
    <div className="mail-preview">
      <Link to={mail.type !== 'draft' ? `/mail/details/${mail.id}` : '#'} onClick={handleMailClick}>
        <span className="sender">{senderOrRecipient}</span>
        <div className="txt-preview">
          <span className="subject">{mail.subject}</span>
          <p className="body">{mail.body}</p>
        </div>
        {isHovered ? (
          <div className="action-icons">
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
            setNewMail={setNewMail}
            closeModal={closeModal}
            initialRecipient={mail.to}
            initialSubject={mail.subject}
            initialBody={mail.body}
            draftId={mail.id}
          />
        </div>
      )}
    </div>
  );
}

