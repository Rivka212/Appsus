const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from "../cmps/NoteEdit.jsx";


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    // const [newNote, setNewNote] = useState(null)
    // const [filterBy, setFilterBy] = useState(noteService.getFilterBy())


    function openModal(note) {
        console.log('hi');
        setSelectedNote(note)
    }

    function closeModal() {
        setSelectedNote(null)
    }

    // useEffect (()=> {
    //     setSelectedNote(note)

    // })


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

    function handleNoteClick(note) {
        setSelectedNote(note)
    }

    // function onSaveNote(noteToAdd) {
    //     console.log(noteToAdd)
    //     noteService.save(noteToAdd)
    //         .then((note) => {
    //             // const note = [note, ...notes]
    //             setNotes({ ...note, notes })
    //         })
    //         .catch(() => {
    //             // console.log('err:', err)
    //             showErrorMsg(`Note to Failed!`, noteId)
    //         })
    // }
    return <section>
        <NoteHeader />
        <NoteAdd />
        <NoteList notes={notes} onRemove={removeNote} onChange={handleNoteClick} />
        {/* {selectedNote && <NoteAdd note={selectedNote} />} */}
        {selectedNote && <NoteAdd note={selectedNote} />}

    </section>
}

