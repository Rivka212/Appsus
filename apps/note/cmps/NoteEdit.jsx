const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM


// import { showErrorMsg } from '../services/event-bus.service.js'
// import { NoteIndex } from '../views/NoteIndex.jsx'
import { noteService } from '../services/note.service.js'

export function NoteEdit() {

    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const params = useParams()
    console.log(params);

    useEffect(() => {
        if (!params.noteId) return
        console.log(params.noteId);
        noteService.get(params.noteId)
            .then(note => setNote(note))
    }, [])

    function onSaveNote(ev) {
        ev.preventDefault()
        // onSave(reviewData)
        // onToggleReviewModal()
        noteService.save(note)
            .then(() => { navigate('/note')
                // setNote(note)
            })
        // .catch(() => {
        //     // showErrorMsg('Couldnt save')
        // })
    }

    console.log(note);

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
                        type="text" placeholder="note" />
                <button>Close</button>
            </form>
            </div>
        </section>
    )
}
