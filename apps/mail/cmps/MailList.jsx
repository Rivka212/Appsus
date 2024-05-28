const { useState, useEffect } = React
const { useOutletContext, Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"


export function MailList() {
  const { mails: initialMails, status } = useOutletContext()
  const [mails, setMails] = useState(initialMails)
  const [hoveredMailId, setHoveredMailId] = useState(null)
  const [emailState, setEmailState] = useState({ starred: {}, important: {} })

  useEffect(() => {
    setMails(initialMails)
  }, [initialMails])

  const handleTrashClick = (event, mailId) => {
    event.preventDefault()
    event.stopPropagation()
    mailService.changeMailType(mailId, 'trash')
      .then(() => {
        const updatedMails = mails.filter(mail => mail.id !== mailId)
        setMails(updatedMails)
        showSuccessMsg('Conversation moverd to Trash.', 'success')
      })
      .catch(()=> {
        showErrorMsg('Failed to move mail to trash:', 'error')
      })
  }

  const toggleEmail = (type, mailId) => {
    setEmailState(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [mailId]: !prevState[type][mailId]
      }
    }))
  }

  const renderEmailIcon = (type, mailId, icon, altText) => (
    <img
      src={emailState[type][mailId] ? icon.active : icon.inactive}
      className={`${type} ${emailState[type][mailId] ? '' : 'unstarred'}`}
      onClick={(ev) => {
        ev.stopPropagation()
        toggleEmail(type, mailId)
      }}
      alt={altText}
    />
  )

  const handleMailClick = (mailId) => {
    mailService.addIsRead(mailId)
  }

  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li key={mail.id}
            className={(status === 'inbox' && mail.isRead) ? "is-read" : ''}
            onClick={() => handleMailClick(mail.id)}
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
              onTrashClick={handleTrashClick} 
              showRecipient={mail.originalType === 'sent'} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}