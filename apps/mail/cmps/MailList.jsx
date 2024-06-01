const { useState, useEffect } = React;
const { useOutletContext, Link } = ReactRouterDOM;
import { mailService } from '../services/mail.service.js';
import { MailPreview } from './MailPreview.jsx';
import { ContextMenu } from './ContextMenu.jsx';
import { ToggleState } from './MailActions.jsx';

export function MailList() {
  const { criteria, mails: initialMails, handleToggleRead, handleToggleState, setNewMail } = useOutletContext();
  const [mails, setMails] = useState(initialMails);
  const [hoveredMailId, setHoveredMailId] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [isMailClicked, setIsClicked] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);

//   useEffect(() => {
//     console.log(isMailClicked, ' is mail clicked');
// }, [isMailClicked]);

// useEffect(() => {
//     console.log(selectedMail, 'selected mail');
// }, [selectedMail]);

  function openModal() {
    setIsClicked(true);
  }

  function closeModal() {
    console.log('Closing modal...');
    setIsClicked(false);
    console.log(isMailClicked, ' is mail clicked')
    setSelectedMail(null);
    console.log(selectedMail, 'selelcted mail')
  }

  useEffect(() => {
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

  const handleMailClick = (mail, event) => {
    if (event.button === 2) {
      // Right-click
      event.preventDefault();
      setContextMenu({ visible: true, x: event.pageX, y: event.pageY });
    } else {
      // Left-click
      setSelectedMail(mail);
      if (mail.type === 'draft') {
        event.preventDefault();
        openModal();
      } else {
        mailService.markAsRead(mail.id);
      }
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
            onClick={(ev) => handleMailClick(mail, ev)}
            onContextMenu={(ev) => handleMailClick(mail, ev)}
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
            <MailPreview
              mail={mail}
              isHovered={hoveredMailId === mail.id}
              onActionComplete={handleActionComplete}
              onToggleRead={onToggleRead}
              showRecipient={mail.type === 'sent' || mail.type === 'draft'}
              setNewMail={setNewMail}
              closeModal={closeModal}
              isMailClicked={isMailClicked}
              setIsClicked={setIsClicked}
              selectedMail={selectedMail}
              setSelectedMail={setSelectedMail}
            />
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