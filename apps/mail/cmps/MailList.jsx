const { useState, useContext } = React
const { NavLink, useOutletContext } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

export function MailList() {
  const { mails } = useOutletContext()
  const [emailState, setEmailState] = useState({ starred: {}, important: {} })


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
      onClick={() => toggleEmail(type, mailId)}
      alt={altText}
    />
  )

  function handleMailClick(mailId) {
    mailService.addIsRead(mails, mailId)
  }
  



  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <NavLink key={mail.id} to={`/mail/details/${mail.id}`}>
            <li className={mail.isRead ? "is-read" : ''}  onClick={() => handleMailClick(mail.id)}>
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
              <MailPreview mail={mail} />
            </li>
          </NavLink>
        ))}
      </ul>
    </section >
  )
}

