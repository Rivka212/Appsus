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


    function handleChange() {
        console.log(status)
        navigate(status)
    }

    return <section className="main-container-note">
        <NoteSideBar onChange={handleChange} />
        <main>
            <Outlet context={{ notes }} />
        </main>
    </section>


}