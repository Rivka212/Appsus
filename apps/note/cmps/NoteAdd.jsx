const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { AccordionInput } from './AccordionInput.jsx'
import { NoteEdit } from './NoteEdit.jsx'

export function NoteAdd({ noteId }) {

    const [note, setNote] = useState(noteService.getEmptyNote())
    const [isExpanded, setIsExpanded] = useState(false)
    const [isShowModal, setIsShowModal] = useState(null)

    // const [noteToEdit, setNoteToEdit] = useState(null)
    // const params = useParams()
    // const navigate = useNavigate()


    function handleInputClick() {
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        if (!noteId) return
        console.log(noteId);
        noteService.getNoteById(noteId)
            .then(note => setNote(note))
    }, [])


    function onSaveNote(ev) {
        setIsExpanded(!isExpanded)
        //  setIsShowModal((prevIsShowModal) => !prevIsShowModal)
        console.log(ev.target.value);
        if (!ev.target.value === 'Empty note')
            console.log(ev);
        ev.preventDefault()
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
        <section className="note-add">
            <div className={`input-container ${isExpanded ? 'expanded' : ''}`}>
                <label htmlFor='title'></label>
                {isExpanded && <React.Fragment>
                    <form onSubmit={onSaveNote} className='note-form'>
                        <div className="square-input">
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
                            <span class="icon-text hidden">
                                <img src="../../../../img/square.png" alt="" />
                            </span>
                            <span class="icon-text hidden">
                                <img src="../../../../img/pen.png" alt="" />
                            </span>
                            <span class="icon-text hidden">
                                <img src="../../../../img/picture.png" alt="" /></span>
                        </div>
                        <button>Close</button>
                    </form>
                </React.Fragment>}
                {!isExpanded && <React.Fragment><input
                    className="input-title"
                    onClick={handleInputClick}
                    type="text"
                    placeholder="Take a note..." />
                </React.Fragment>
                }
            </div>
            {isShowModal && <NoteEdit />}
        </section>
    )
}
