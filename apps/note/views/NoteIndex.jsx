const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import {NotePreview} from '../cmps/NotePreview.jsx'
import {NoteList} from '../cmps/NoteList.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    // const [filterBy, setFilterBy] = useState(noteService.getFilterBy())

    useEffect(() => {
        // console.log(filterBy)
        noteService.query()
            .then(notes => setNotes(notes))
    }, [])



    return <section>
        <NoteHeader />
        <NoteList notes={notes}/>
    </section>
}
