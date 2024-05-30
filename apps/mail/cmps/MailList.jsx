const { useState, useEffect } = React;
const { useOutletContext, Link } = ReactRouterDOM;
import { mailService } from '../services/mail.service.js';
import { MailPreview } from './MailPreview.jsx';
import { ContextMenu } from './ContextMenu.jsx';

export function MailList() {
  const { mails: initialMails, status, handleToggleRead } = useOutletContext();
  const [mails, setMails] = useState(initialMails);
  const [hoveredMailId, setHoveredMailId] = useState(null);
  const [emailState, setEmailState] = useState({ starred: {}, important: {} });
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    setMails(initialMails);
  }, [initialMails, isRead]);

  const handleActionComplete = (mailId) => {
    setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId));
  };

  const onToggleRead = (mailId, isRead) => {
    handleToggleRead(mailId, isRead);
  };

  const toggleEmail = (type, mailId) => {
    setEmailState(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [mailId]: !prevState[type][mailId]
      }
    }));
  };

  const renderEmailIcon = (type, mailId, icon, altText) => (
    <img
      src={emailState[type][mailId] ? icon.active : icon.inactive}
      className={`${type} ${emailState[type][mailId] ? '' : 'unstarred'}`}
      onClick={(ev) => {
        ev.stopPropagation();
        toggleEmail(type, mailId);
      }}
      alt={altText}
    />
  );

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

  const icons = {
    inbox: '../../../../icons/inbox.png',
    starred: '../../../../icons/starred.png',
    snoozed: '../../../../icons/snoozed.png',
    important: '../../../../icons/important.png',
    sent: '../../../../icons/sent.png',
    draft: '../../../../icons/draft.png',
    categories: '../../../../icons/categories.png',
    spam: '../../../../icons/spam.png',
    trash: '../../../../icons/trash.png'
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
                {renderEmailIcon('starred', mail.id, { active: '../../../icons/goldstar.svg', inactive: '../../../icons/star.svg' }, 'Toggle Starred')}
              </span>
              <span className="important-icon">
                {renderEmailIcon('important', mail.id, { active: '../../../icons/important-gold.png', inactive: '../../../../icons/important.png' }, 'Toggle Important')}
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
