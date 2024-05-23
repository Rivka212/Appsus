const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { AccordionInput } from './AccordionInput.jsx'

export function NoteAdd() {
    const [note, setNote] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

    const params = useParams()
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)

    function handleInputClick() {
        setIsExpanded(!isExpanded)
    }

    function onAddNote(ev) {
        setIsExpanded(!isExpanded)
        console.log(ev);
        ev.preventDefault()
        noteService.save(noteToAdd)
            .then(() => {
                setNoteToAdd(noteToAdd)
            })
        // .catch(() => {
        //     // showErrorMsg('Couldnt save')
        // })
    }

    function handleChange({ target }) {
        const { name, value } = target
        setNoteToAdd(prevNote => ({
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
                    <form onSubmit={onAddNote} className='note-form'>
                        <div className="square-input">
                            <label htmlFor="txt"></label>
                            <input className="input-txt"
                                onChange={handleChange} value={noteToAdd.info.txt}
                                id="txt" name="txt" autoComplete="off"
                                type="text" placeholder="title" />

                            <label htmlFor='title'></label>
                            <input className="input-title"
                                onChange={handleChange} value={noteToAdd.info.title}
                                id="title" name="title"
                                type="text" placeholder="new note..." />
                        </div>
                        <button>closure</button>
                    </form>
                </React.Fragment>}
                {!isExpanded && <React.Fragment><input
                    className="input-title"
                    onClick={handleInputClick}
                    type="text"
                    placeholder="new note..." />
                </React.Fragment>
                }
            </div>
        </section>
    )
}
