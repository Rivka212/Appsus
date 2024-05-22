const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import {NotePreview} from '../cmps/NotePreview.jsx'
import {NoteList} from '../cmps/NoteList.jsx'
import {NoteAdd} from '../cmps/NoteAdd.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    // const [newNote, setNewNote] = useState(null)
    // const [filterBy, setFilterBy] = useState(noteService.getFilterBy())

    useEffect(() => {
        // console.log(filterBy)
        noteService.query()
            .then(notes => setNotes(notes))
    }, [])

    function onSaveNote(noteToAdd) {
        console.log(noteToAdd)
        noteService.save(noteToAdd)
            .then((note) => {
                // const note = [note, ...notes]
                setNotes({ ...note, notes })
            })
            .catch(() => {
                // console.log('err:', err)
                showErrorMsg(`Note to Failed!`, noteId)
            })
    }

    return <section>
        <NoteHeader />
        <NoteAdd />
        <NoteList notes={notes}/>
    </section>
}
