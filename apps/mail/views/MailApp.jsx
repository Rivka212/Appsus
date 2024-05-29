const { useState, useEffect } = React
const { Outlet, useParams, useNavigate } = ReactRouterDOM
import { MailSideBar } from "../cmps/MaIlSideBar.jsx"
import { mailService } from "../services/mail.service.js"

export function MailApp() {
    const { status } = useParams()
    const navigate = useNavigate()
    const [criteria, setCriteria] = useState(mailService.getDefaultFilter({ status: 'inbox' }))
    const [mails, setMails] = useState([])
    const [readCount, setReadCount] = useState(0)
    const [newMail, setNewMail] = useState(null); // State to track new mail

    useEffect(() => {
        if (status === 'inbox') {
            setReadCount(mailService.countIsRead(mails))
        }
    }, [mails,])

    useEffect(() => {
        if (status) {
            setCriteria(mailService.getDefaultFilter({ status }))
        } else {
            setCriteria(mailService.getDefaultFilter({ status: 'inbox' }))
        }
    }, [status])

    useEffect(() => {
        mailService.query(criteria)
        .then(fetchedMails => setMails(mailService.sortEmailsByDate(fetchedMails)))
        .catch(() => setMails([]));
}, [criteria]);


    useEffect(() => {
        if (newMail) {
            mailService.query(criteria)
            .then(fetchedMails => setMails(mailService.sortEmailsByDate(fetchedMails)))
            .catch(() => setMails([]));
        }
    }, [newMail]);        

    

    const handleToggleRead = (mailId, updatedIsRead) => {
        setMails(prevMails =>
          prevMails.map(mail =>
            mail.id === mailId ? { ...mail, isRead: updatedIsRead } : mail
          )
        );
        setReadCount(prevReadCount => {
            const newReadCount = mailService.countIsRead(mails);
            return newReadCount;
    })
      };

      return (
        <section className="mail-app-main-layout">
          <MailSideBar readCount={readCount} setNewMail={setNewMail} />
          <main>
            <Outlet context={{ criteria, mails, status, handleToggleRead }} />
          </main>
        </section>
      );
    }