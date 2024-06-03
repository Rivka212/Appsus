const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx';
import { NoteEdit } from "../cmps/NoteEdit.jsx";
import { NoteSideBar } from "../cmps/NoteSideBar.jsx";


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    // const [filterByToTxt, setFilterByToTxt] = useState(noteService.getFilterFromSearchParams(searchParams))
    const [filterBy, setFilterBy] = useState({ status: 'notes', txt: '' })

    const [criteria, setCriteria] = useState({ status: 'notes' })
    const { status } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(() => setNotes([]));
    }, [filterBy, setSearchParams]);

    useEffect(() => {
        const filterFromSearchParams = noteService.getFilterFromSearchParams(searchParams);
        const defaultFilter = noteService.getDefaultFilter(filterFromSearchParams);
        setFilterBy(defaultFilter)
    }, [searchParams])


    // useEffect(() => {
    //     noteService.query(filterBy)
    //         .then(notes => setNotes(notes))
    //         .catch(() => setNotes([]))
    // }, [filterBy])


    // useEffect(() => {
    //     setSearchParams(filterBy)
    //     console.log(filterBy);
    //     noteService.query()
    //         .then(notes => setNotes(notes))
    //         .catch(() => setNotes([]))
    // }, [filterBy])

    useEffect(() => {
        noteService.query(criteria)
            .then(setNotes)
            .catch(() => setNotes([]))
    }, [criteria])

    useEffect(() => {
        if (status) {
            setCriteria(prevCriteria => ({ ...prevCriteria, status }))
        }
    }, [status])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function handleChange(status) {
        console.log(status)
        navigate(`/note/${status}`)
    }
    // console.log(status);


    function removeNote(ev, noteId) {
        // noteId !== params
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }


    function handleSetNotePinned(noteId, isPinned) {
        const updatedNotes = noteService.query()
        console.log(updatedNotes)
            .then(() => {
                setNotes(updatedNotes)
                console.log(updatedNotes)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }

    // const [selectedNote, setSelectedNote] = useState(null);

    const handleNoteClick = (noteId) => {
        console.log('noteId', noteId);
        setSelectedNote(noteId)
    }

    // const handleSaveChanges = (updatedNote) => {
    //     // כאן נשלח את ההערה המעודכנת לפונקציה המתאימה
    //     // שתשמור אותה בעץ הדפים או בשרת
    //     // ונאפס את ההערה הנבחרת
    //     setSelectedNote(null);
    // };

    const handleCloseModal = () => {
        // נאפס את ההערה הנבחרת בלי לשמור שינויים
        setSelectedNote(null)
    }


    // function handleNoteClick(noteId) {
    //     setSelectedNote(noteId)
    // }

    return <section>
        <NoteHeader notes={notes} filterBy={filterBy} onFilter={onSetFilterBy} />
        <section className="main-container-note">
            <NoteSideBar onChange={handleChange} status={status} />
            <main>
                <NoteAdd noteId={selectedNote} />
                <NoteList notes={notes} onRemove={removeNote} onSetNotePinned={handleSetNotePinned} onNoteClick={handleNoteClick}/>
            </main>
        </section>
        {selectedNote && (
            <NoteEdit
                noteId={selectedNote}
                onClose={handleCloseModal}
               
            />
        )}
    </section>
}


