const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM
const { useOutletContext } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from "../cmps/NoteEdit.jsx";

export function NoteIndex() {
// debugger
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const { notes: outletNotes } = useOutletContext()

    useEffect(() => {
        setNotes(outletNotes)
    }, [outletNotes])

    function removeNote(event,noteId) {
        console.log(noteId);
        console.log(event);
        event.stopPropagation()
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

    function handleNoteClick(noteId) {
        setSelectedNote(noteId)
    }

    return <section>
        <NoteHeader />
        <NoteAdd noteId={selectedNote}/>
        <NoteList notes={notes} onRemove={removeNote}  />
    </section>
}
