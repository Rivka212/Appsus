const { useState, useEffect } = React
const { Outlet, useParams, useNavigate } = ReactRouterDOM
import { NoteSideBar } from "../cmps/NoteSideBar.jsx";
// import { NoteService } from "../services/note.service.js";


export function NoteApp() {
    const [notes, setNotes] = useState([])
    const { status } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'notes') {
        }
    }, [notes])

    useEffect(() => {
        if (status === 'notes') {
        } else if (status === 'newStatus') {
        }
    }, [notes])


    // function handleChange() {
    //     console.log(status)
    //     navigate(status)
    // }

    function handleChange(newStatus) {
        console.log(newStatus)
        navigate(`/note/${newStatus}`)
    }

    return <section className="main-container-note">
        <NoteSideBar onChange={handleChange} status={status} />
        <main>
            <Outlet context={{ notes, status }} />
        </main>
    </section>
}