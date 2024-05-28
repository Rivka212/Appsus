const { useState, useEffect } = React
const { Outlet, useParams, useNavigate } = ReactRouterDOM
import { NoteSideBar } from "../cmps/NoteSideBar.jsx";
import { noteService } from '../services/note.service.js';



export function NoteApp() {
    const [notes, setNotes] = useState([])
     const [team, setTeam] = useState(noteService.getFilterStatus())
    // const [status, setStatuse] = useState
    const { status } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        noteService.query()
            .then(notes => setNotes(notes))
    }, [])

    useEffect(() => {
        if (status) {
            setTeam(noteService.getFilterStatus({notes, status }))
        } else {
            setTeam(noteService.getFilterStatus({notes, status: 'notes' }))
        }
    }, [status])

    // useEffect(() => {
    //     if (status) {
    //         const filteredNotes = getFilterStatus(notes, { status })
    //         setTeam(filteredNotes)
    //     }
    // }, [status, notes])

    // useEffect(() => {
    //     if (status === 'notes') {
    //     }
    // }, [notes])

    // useEffect(() => {
    //     if (status === 'notes') {
    //     } else if (status === 'newStatus') {
    //     }
    // }, [status])

    useEffect(() => {
        if (status) {
            setTeam(noteService.getFilterStatus({notes, status }))
        } else {
            setTeam(noteService.getFilterStatus({notes, status: 'notes' }))
        }
    }, [status])

    // useEffect(() => {
    //     if (status) {
    //         const filteredNotes = noteService.getFilterStatus(notes, { status });
    //         setTeam(filteredNotes);
    //     }
    // }, [status, notes]);

    function handleChange(status) {
        console.log(status)
        navigate(`/note/${status}`)
    }
    console.log(status);

    return <section className="main-container-note">
        <NoteSideBar onChange={handleChange} status={status} />
        <main>
            <Outlet context={{ notes, status }} />
        </main>
    </section>
}