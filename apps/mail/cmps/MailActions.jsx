const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js';

export function TrashAction({ mail, onActionComplete, navigateBack = false }) {
  const navigate = useNavigate()

  function handleTrashClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (mail.type=== 'trash') {
        mailService.removeMail(mail.id)
        .then(() => {
            onActionComplete(mail.id);
            showSuccessMsg('Conversation deleted forever.', 'success')
            if (navigateBack) {
              navigate(-1); // Navigate back to the last page if navigateBack is true
            }
          })
          .catch(() => {
            showErrorMsg('Failed to delete mail.', 'error');
          })
      
    }
    else {
        mailService.changeMailType(mail.id, 'trash')
      .then(() => {
        onActionComplete(mail.id);
        showSuccessMsg('Conversation moved to Trash.', 'success')
        if (navigateBack) {
          navigate(-1); // Navigate back to the last page if navigateBack is true
        }
      })
      .catch(() => {
        showErrorMsg('Failed to move mail to trash.', 'error');
      })
  }
}

  return (
    <img
      src="./icons/trash.png"
      alt="Delete"
      className="action-icon"
      onClick={handleTrashClick}
    />
  )
}

export function ToggleRead({ mailId, isRead, onToggleRead }) {
    const [readStatus, setReadStatus] = useState(isRead);

  useEffect(() => {
    setReadStatus(isRead);
  }, [isRead]);

    function handleToggleRead(event) {
      event.preventDefault();
      event.stopPropagation();
      mailService.toggleReadStatus(mailId)
      .then((updatedMail) => {
        console.log(updatedMail)
        const newReadStatus = updatedMail.isRead;
        setReadStatus(newReadStatus);
        onToggleRead(mailId, newReadStatus);
        const successMessage = newReadStatus ? 'Conversation marked as Read.' : 'Conversation marked as Unread.';
        showSuccessMsg(successMessage, 'success');
        })
        .catch(() => {
          showErrorMsg('Failed to update mail status.', 'error');
        });
    }
  
    return (
      <img
        src="./icons/mark unread.png" // Use a single image source
        alt={isRead ? "Mark as Unread" : "Mark as Read"}
        className={`action-icon ${isRead ? 'read' : 'unread'}`} // Control the class based on isRead
        onClick={handleToggleRead}
      />
    );
  }