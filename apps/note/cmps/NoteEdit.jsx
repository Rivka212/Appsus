const { useState, useEffect } = React


// import { showErrorMsg } from '../services/event-bus.service.js'
// import { NoteIndex } from '../views/NoteIndex.jsx'
import { noteService } from '../services/note.service.js'

export function NoteEdit({ note, onSave }) {

    const [notetoEdit, setNotetoEdit] = useState()

    function onSave(ev) {
        ev.preventDefault()
        // onSave(reviewData)
        // onToggleReviewModal()
        noteService.save(note)
            .then(() => {
                setNote(note)
            })
        // .catch(() => {
        //     // showErrorMsg('Couldnt save')
        // })
    }

    function handleChange({ target }) {
        const { name, value } = target
        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value
            }
        }))
    }


    return (
        <section className="note-edit">
            <div className='edit-modal'>
            <label htmlFor='title'></label>
            <form onSubmit={onSaveNote} className='note-form'>
                    <label htmlFor="txt"></label>
                    <input className="input-txt"
                        onChange={handleChange} value={note.info.txt}
                        id="txt" name="txt" autoComplete="off"
                        type="text" placeholder="title" />

                    <label htmlFor='title'></label>
                    <input className="input-title"
                        onChange={handleChange} value={note.info.title}
                        id="title" name="title"
                        type="text" placeholder="Take a note..." />
                <button>Close</button>
            </form>
            </div>
        </section>
    )
}
