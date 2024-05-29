// const { useState, useEffect } = React
// // const { Outlet, useParams, useNavigate } = ReactRouterDOM
// import { NoteSideBar } from "../cmps/NoteSideBar.jsx";
// import { noteService } from '../services/note.service.js';



// export function NoteApp() {
//     const [notes, setNotes] = useState([])
//     //  const [team, setTeam] = useState(noteService.getFilterStatus({ status: 'notes' }))
//     const [team, setTeam] = useState({ status: 'notes' })
//     const { status } = useParams()
//     const navigate = useNavigate()

//     useEffect(() => {
//         noteService.query(team)
//             .then(setNotes)
//             .catch(() => setNotes([]));
//     }, [team])

//     useEffect(() => {
//         if (status) {
//             setTeam(prevTeam => ({ ...prevTeam, status }))
//         }
//     }, [status])


//     function handleChange(status) {
//         console.log(status)
//         navigate(`/note/${status}`)
//     }
//     console.log(status);

    // return <section className="main-container-note">
    //     <NoteSideBar onChange={handleChange} status={status} />
    //     <main>
    //         {/* <Outlet context={{ notes, status }} /> */}
    //     </main>
    // </section>
