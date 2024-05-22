const { useState } = React
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
              <li key={mail.id}>
                <div className="mark">
                  <input className="check-box" type="checkbox" />
                  {renderEmailIcon('starred', mail.id, { active: '../../../icons/goldstar.svg', inactive: '../../../icons/star.svg' }, 'Toggle Starred')}
                  {renderEmailIcon('important', mail.id, { active: '../../../icons/important-gold.png', inactive: '../../../../icons/important.png' }, 'Toggle Important')}
                </div>
                <MailPreview mail={mail} />
              </li>
            ))}
          </ul>
        </section>
      )
    }
    
  