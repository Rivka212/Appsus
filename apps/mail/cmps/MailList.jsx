const { useState, useEffect } = React;
const { useOutletContext, Link } = ReactRouterDOM;
import { mailService } from '../services/mail.service.js';
import { MailPreview } from './MailPreview.jsx';
import { ContextMenu } from './ContextMenu.jsx';
import {ToggleState } from './MailActions.jsx';


export function MailList() {
  const { criteria, mails: initialMails, handleToggleRead, handleToggleState } = useOutletContext();
  const [mails, setMails] = useState(initialMails);
  const [hoveredMailId, setHoveredMailId] = useState(null);
  const [emailState, setEmailState] = useState({ stared: {}, important: {} });
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    console.log('Initial mails:', initialMails); // Add this line
    setMails(initialMails);
}, [initialMails]);

useEffect(() => {
  mailService.query(criteria)
      .then(fetchedMails => setMails(fetchedMails))
      .catch(() => setMails([]));
}, [criteria]);


  const handleActionComplete = (mailId) => {
    setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId));
  };

  const onToggleRead = (mailId, isRead) => {
    handleToggleRead(mailId, isRead);
  };


  const onToggleState = (mailId, stateKey, newState) => {
    handleToggleState(mailId, stateKey, newState);
};




  const handleMailClick = (mailId, event) => {
    if (event.button === 2) {
      // Right-click
      event.preventDefault();
      setContextMenu({ visible: true, x: event.pageX, y: event.pageY });
    } else {
      // Left-click
      mailService.markAsRead(mailId);
    }
  };

  const handleContextMenuClose = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };


  return (
    <section className="mail-list" onClick={handleContextMenuClose}>
      <ul>
        {mails.map((mail) => (
          <li key={mail.id}
            className={mail.isRead ? "is-read" : ''}
            onClick={(ev) => handleMailClick(mail.id, ev)}
            onContextMenu={(ev) => handleMailClick(mail.id, ev)}
            onMouseEnter={() => setHoveredMailId(mail.id)}
            onMouseLeave={() => setHoveredMailId(null)}
          >
            <div className="mark">
              <label className="checkbox-container">
                <input className="checkbox" type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <span className="star-icon">
              <ToggleState 
                 mailId={mail.id}
                 stateKey="isStared"
                 isStateActive={mail.isStared}
                 onToggleState={onToggleState}
                />
              </span>
              <span className="important-icon">
              <ToggleState 
                  mailId={mail.id} 
                  stateKey="isImportant" 
                  isStateActive={mail.isImportant} 
                  onToggleState={onToggleState}
                  />
              </span>
            </div>
            <Link to={`/mail/details/${mail.id}`} >
              <MailPreview
                mail={mail}
                isHovered={hoveredMailId === mail.id}
                onActionComplete={handleActionComplete}
                onToggleRead={onToggleRead}
                showRecipient={mail.type === 'sent' || mail.originalType === 'sent'}
              />
            </Link>
          </li>
        ))}
      </ul>
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onHide={handleContextMenuClose}
        />
      )}
    </section>
  );
}
