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
    const [newMail, setNewMail] = useState(null); // State to track new mail
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    useEffect(() => {
        if (status === 'inbox') {
            setReadCount(mailService.countIsRead(mails))
        }
    }, [mails, status])

    useEffect(() => {
        const filter = mailService.getDefaultFilter({});
        switch (status) {
            case 'inbox':
                filter.status = 'inbox';
                break;
            case 'stared':
                filter.isStared = true;
                break;
            case 'snoozed':
                filter.isSnoozed = true;
                break;
            case 'important':
                filter.isImportant = true;
                break;
            case 'sent':
                filter.status = 'sent';
                break;
            case 'draft':
                filter.status = 'draft';
                break;
            case 'categories':
                filter.categories = true;
                break;
            case 'spam':
                filter.status = 'spam';
                break;
            case 'trash':
                filter.status = 'trash';
                break;
            default:
                filter.status = 'inbox';
        }
        setCriteria(filter);
    }, [status]);


    useEffect(() => {
        debugger

        mailService.query(criteria)
            .then(fetchedMails => setMails(mailService.sortEmailsByDate(fetchedMails)))
            .catch(() => setMails([]));
    }, [criteria]);
    


    useEffect(() => {
        if (newMail) {
            console.log('New mail detected in MailApp:', newMail);
            mailService.query(criteria)
                .then(fetchedMails => {
                    console.log('Fetched mails after new mail:', fetchedMails);
                    setMails(mailService.sortEmailsByDate(fetchedMails));
                })
                .catch(() => setMails([]));
        }
    }, [newMail]);

    console.log('New Mail:', newMail);


    function toggleSideBar () {
        console.log(isSideBarOpen)
        setIsSideBarOpen(!isSideBarOpen);
    };


    const handleToggleState = (mailId, stateKey, newState) => {
        console.log(`Toggling state for mailId: ${mailId}, stateKey: ${stateKey}, newState: ${newState}`);
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, [stateKey]: newState } : mail
            )
        );

        const updatedCriteria = { ...criteria };
        if (stateKey === 'isStared' && status === 'stared') {
            updatedCriteria.isStared = true;
        } else if (stateKey === 'isImportant' && status === 'important') {
            updatedCriteria.isImportant = true;
        }
        setCriteria(updatedCriteria);

        mailService.query(updatedCriteria)
            .then(fetchedMails => setMails(mailService.sortEmailsByDate(fetchedMails)))
            .catch(() => setMails([]));
    };
   


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
        <section >
            <MailHeader toggleSideBar={toggleSideBar}/>
            <div className={`mail-app-main-layout ${isSideBarOpen ? 'open' : 'collapsed'}`}>
                <MailSideBar readCount={readCount} setNewMail={setNewMail}  isOpen={isSideBarOpen}/>
                <main>
                    <Outlet context={{ criteria, mails, status,setNewMail,  handleToggleRead, handleToggleState }} />
                </main>
            </div>

        </section>
    );
}