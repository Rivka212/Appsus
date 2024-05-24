const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from "../cmps/NoteEdit.jsx";


export function NoteIndex() {
debugger
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    // const [newNote, setNewNote] = useState(null)
    // const [filterBy, setFilterBy] = useState(noteService.getFilterBy())


    // function openModal(note) {
    //     console.log('hi');
    //     setSelectedNote(note)
    // }

    // function closeModal() {
    //     setSelectedNote(null)
    // }

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

    // function handleNoteClick(note) {
    //     setSelectedNote(note)
    // }


    // const handleClick = () => {
    //     setSelected(true);
    //     onClick(note);
    // };

    return <section>
    {/* <i className="fa-regular fa-trash-can" />
   
    <i className="fa-sharp fa-regular fa-lightbulb" />
    <i className="fa-sharp fa-regular fa-bell" />
    <i className="fa-brands fa-youtube" />
    <i className="fa-solid fa-pen-to-square" /> */}

    {/* onChange={handleNoteClick} */}
        <NoteHeader />
        <NoteAdd />
        <NoteList notes={notes} onRemove={removeNote}  />
        {/* {selectedNote && <NoteAdd note={selectedNote} />} */}
        {selectedNote && <NoteEdit note={selectedNote} />}

    </section>
}

