
const { NavLink, useNavigate } = ReactRouterDOM
import { mailService } from "../services/mail.service.js";
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { TrashAction } from "./MailActions.jsx";

export function MailUpperBar({ mailId }) {
const navigate = useNavigate()
    const icons = {
        back: '../../../../icons/back.svg',
        archive: '../../../../icons/archive.png',
        spam: '../../../../icons/spam.png',
        trash: '../../../../icons/trash.png',
        unread: '../../../../icons/mark unread.png',
        snooze: '../../../../icons/snoozed.png',
        addTask: '../../../../icons/addTask.png',
        labels: '../../../../icons/important.png',
        more: '../../../../icons/more.png',
    };

    const menuItems = [
        'back',
        'archive',
        'spam',
        'trash',
        'unread',
        'snooze',
        'addTask',
        'labels',
        'more',
    ]

    const hoverTexts = {
      back: 'Back to inbox',
      archive: 'Archive',
      spam: 'Report spam',
      trash: 'Delete',
      unread: 'Mark as unread',
      snooze: 'Snooze',
      addTask: 'Add to Tasks',
      labels: 'Labels',
      more: 'More',
    };

    function handleClick(mailId, item) {
      switch(item) {
        case 'archive':
          mailService.changeMailType(mailId, 'archive')
            .then(() => {
              showSuccessMsg('Conversation archived.', 'success');
            })
            .catch(() => {
              showErrorMsg('Failed to archive mail.', 'error');
            });
          break;
        case 'spam':
          mailService.changeMailType(mailId, 'spam')
            .then(() => {
              showSuccessMsg('Conversation marked as Spam.', 'success');
            })
            .catch(() => {
              showErrorMsg('Failed to mark mail as spam.', 'error');
            });
          break;
        default:
          showErrorMsg('Invalid action specified.', 'error');
      }
    }
  
    return (
      <section className="mail-upper-bar">
        <ul>
          
            <li className="mail-item back-item" onClick={() => navigate(-1)}>
              <img src={icons['back']} alt='back' className={`menu-icon back`} />
              <span className="hover-text">{hoverTexts['back']}</span>
            </li>
            <div className="icon-group">
              {menuItems.slice(1).map((item, index) => (
                <React.Fragment key={item}>
                  {item === 'trash' ? (
                    <li className="mail-item">
                      <TrashAction 
                        mailId={mailId} 
                        onActionComplete={() => {}} 
                        
                        navigateBack={true}
                      />
                      <span className="hover-text">{hoverTexts[item]}</span>
                    </li>
                  ) : (
                    <li className="mail-item" onClick={(event) => handleClick(mailId, item)}>
                      <img src={icons[item]} alt={item} className={`menu-icon ${item}`} />
                      <span className="hover-text">{hoverTexts[item]}</span>
                    </li>
                  )}
                  {(index + 1) % 3 === 0 && index < menuItems.slice(1).length - 1 && (
                    <li className="divider" />
                  )}
                </React.Fragment>
              ))}
            </div>
        </ul>
      </section>
    );
    }