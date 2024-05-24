const { useState } = React
const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"


export function MailList({ mails }) {
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

  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <Link key={mail.id} to={`/mail/${mail.id}`}>
            <li >
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
          </Link>
        ))}
      </ul>
    </section>
  )
}

