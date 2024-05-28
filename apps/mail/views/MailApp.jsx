const { useState, useEffect } = React
const { Outlet, useParams, useNavigate } = ReactRouterDOM
import { MailSideBar } from "../cmps/MaIlSideBar.jsx";
import { mailService } from "../services/mail.service.js";

export function MailApp() {
    const {status} = useParams()
    const nav = useNavigate()
    const [criteria, setCriteria] = useState(mailService.getDefaultFilter({ status: 'inbox' }))
    const [mails, setMails] = useState([]);
    const [readCount, setReadCount] = useState(0)

    useEffect(() => {
        if (status === 'inbox') {
            setReadCount(mailService.countIsRead(mails));
        }
    }, [mails])


    useEffect(() => {
        if (status) {
            setCriteria(mailService.getDefaultFilter({ status }));
        } else {
            setCriteria(mailService.getDefaultFilter({ status: 'inbox' }));
        }
    }, [status])

    useEffect(() => {
        mailService.query(criteria).then(setMails).catch(() => setMails([]));
    }, [criteria])


    function handleFilterChange(newCriteria) {
        setCriteria(newCriteria)
    }



    return <section className="main-layout">
        <MailSideBar onFilterChange={handleFilterChange} readCount={readCount}/>
        <main>
            <Outlet context={{criteria, mails}} />
        </main>
    </section>
}