const { useState, useEffect } = React
const { Outlet, useParams, useNavigate } = ReactRouterDOM
import { MailSideBar } from "../cmps/MaIlSideBar.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { mailService } from "../services/mail.service.js"

export function MailApp() {
    const { status } = useParams()
    const navigate = useNavigate()
    const [criteria, setCriteria] = useState(mailService.getDefaultFilter({}))
    const [mails, setMails] = useState([])
    const [readCount, setReadCount] = useState(0)
    const [newMail, setNewMail] = useState(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)

    useEffect(() => {
        const filter = mailService.getDefaultFilter({})
        switch (status) {
            case 'inbox':
                filter.status = 'inbox'
                break
            case 'stared':
                filter.isStared = true
                break
            case 'snoozed':
                filter.isSnoozed = true
                break
            case 'important':
                filter.isImportant = true
                break
            case 'sent':
                filter.status = 'sent'
                break
            case 'draft':
                filter.status = 'draft'
                break
            case 'labels':
                filter.labels = ''
                break
            case 'spam':
                filter.status = 'spam'
                break
            case 'trash':
                filter.status = 'trash'
                break
            default:
                filter.status = ''
        }
        console.log('Updated Filter:', filter);

        setCriteria(filter)
    }, [status])

    useEffect(() => {
    
        console.log('Fetching mails with criteria:', criteria);
        mailService.query(criteria)
            .then(fetchedMails => {
                console.log('Fetched Mails:', fetchedMails);
                setMails(mailService.sortEmailsByDate(fetchedMails));
                if (criteria.status === 'inbox') {
                    setReadCount(mailService.countIsRead(fetchedMails));
                }
            })
            .catch(error => {
                console.error('Error fetching mails:', error);
                setMails([]);
            });
    }, [criteria, newMail]);

    const handleFilterChange = (newFilter) => {
        console.log('New Filter:', newFilter);
        if (newFilter.txt === '') {
            setCriteria(mailService.getDefaultFilter({ status }));
        } else {
            setCriteria(prevCriteria => {
                const updatedCriteria = { ...prevCriteria, ...newFilter };
                console.log('Updated Criteria:', updatedCriteria);
                return updatedCriteria;
            });
        }
    };
    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const handleToggleState = (mailId, stateKey, newState) => {
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, [stateKey]: newState } : mail
            )
        )

        const updatedCriteria = { ...criteria }
        if (stateKey === 'isStared' && status === 'stared') {
            updatedCriteria.isStared = true
        } else if (stateKey === 'isImportant' && status === 'important') {
            updatedCriteria.isImportant = true
        }
        setCriteria(updatedCriteria)

        mailService.query(updatedCriteria)
            .then(fetchedMails => setMails(mailService.sortEmailsByDate(fetchedMails)))
            .catch(() => setMails([]))
    }

    const handleToggleRead = (mailId, updatedIsRead) => {
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, isRead: updatedIsRead } : mail
            )
        )
        setReadCount(mailService.countIsRead(mails))
    }

    return (
        <section>
            <MailHeader toggleSideBar={toggleSideBar} filterBy={criteria} onFilter={handleFilterChange} />
            <div className={`mail-app-main-layout ${isSideBarOpen ? 'open' : 'collapsed'}`}>
                <MailSideBar readCount={readCount} setNewMail={setNewMail} isOpen={isSideBarOpen} />
                <main>
                    <Outlet context={{ criteria, mails, status, setNewMail, handleToggleRead, handleToggleState }} />
                </main>
            </div>
        </section>
    )
}