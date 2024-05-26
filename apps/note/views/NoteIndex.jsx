const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM


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
  
    // const [newNote, setNewNote] = useState(null)
    // const [filterBy, setFilterBy] = useState(noteService.getFilterBy())
    
    const params = useParams()
    const navigate = useNavigate()

    console.log(params);

        // useEffect(() => {
        //     console.log(selectedNote);
        // }, [selectedNote])
    
    useEffect (()=> {
        setSelectedNote(selectedNote)
        console.log(selectedNote);
    })


    useEffect(() => {
        noteService.query()
            .then(notes => setNotes(notes))
    }, [])

    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }



    function handleNoteClick(noteId) {
        setSelectedNote(noteId)
    }

    console.log(selectedNote);
    // console.log(noteId);
    return <section>

        <NoteHeader />
        <NoteAdd noteId={selectedNote}/>
        <NoteList notes={notes} onRemove={removeNote} onChange={handleNoteClick} />
        {/* {isShowModal && <AddReview onToggleModal={onToggleModal} onSave={onSave}/>} */}

    </section>
}

