import { MailList } from '../cmps/MailList.jsx'
const { useOutletContext } = ReactRouterDOM

export function MailIndex() {
  const { mails, criteria, handleToggleRead, handleToggleState, setNewMail } = useOutletContext()

  return (
    <section className="mail-index">
      <MailList
        mails={mails}
        criteria={criteria}
        handleToggleRead={handleToggleRead}
        handleToggleState={handleToggleState}
        setNewMail={setNewMail}
      />
    </section>
  )
}