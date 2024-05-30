const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx';
import { NoteEdit } from "../cmps/NoteEdit.jsx";
import {NoteSideBar} from "../cmps/NoteSideBar.jsx";


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    const [criteria, setCriteria] = useState({ status: 'notes' })
    const { status } = useParams()
    const navigate = useNavigate()

   
    useEffect(() => {
        setSearchParams(filterBy)
        console.log(filterBy);
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(() => setNotes([]))
    }, [filterBy])

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


function handleSetNotePinned(noteId, isPinned){
            const updatedNotes = noteService.query()
            .then(() => {
            setNotes(updatedNotes)
            console.log(updatedNotes)
        })
        .catch(err => {
            console.log('err:', err)
            // showErrorMsg('There was a problem')
        })
}


    function handleNoteClick(noteId) {
        setSelectedNote(noteId)
    }

    return <section>
        <NoteHeader notes={notes} filterBy={filterBy} onFilter={onSetFilterBy}/>
        <section className="main-container-note">
            <NoteSideBar onChange={handleChange} status={status} />
            <main>
                <NoteAdd noteId={selectedNote} />
                <NoteList notes={notes} onRemove={removeNote} onSetNotePinned={handleSetNotePinned}/>
            </main>
        </section>
    </section>
}


