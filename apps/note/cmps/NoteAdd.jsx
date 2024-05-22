const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from '../services/note.service.js'
import { AccordionInput } from './AccordionInput.jsx'

export function NoteAdd() {
    const [note, setNote] = useState(null)
    const [noteToAdd, setnoteToAdd] = useState(noteService.getEmptyNote())

    const params = useParams()
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleInputClick(){
        setIsExpanded(!isExpanded)
    }


    var res = noteService.getEmptyNote()
    console.log(res);
    // const [noteToAdd, setnoteToAdd] = useState({
    //     createdAt: new Date().toISOString().slice(0, 10),
    //     type: 'NoteTxt',
    //     isPinned: false,
    //     style: {
    //         backgroundColor: '#ffffff'
    //     },
    //     info: {
    //         title: '',
    //         txt: ''
    //     }
    // })


    // useEffect(() => {
    //     if (!params.noteId) return
    //     noteService.get(params.noteId)
    //         .then(note => setNote(note))
    // }, [])
    // console.log(noteToAdd);
    // console.log(note);

    // useEffect(() => {
    //     noteService.getEmptyNote().then((note) => {
    //     // const noteToAdd = { title: note.info.title, txt: note.info.txt }
    // //     // noteService.get(params.noteId)
    //             setNote(note)
    //             setnoteToAdd(noteToAdd)
    //         })
    // }, [])

    console.log(noteToAdd);
    function onAddNote(ev) {
        setIsExpanded(!isExpanded)
        console.log(ev);

        ev.preventDefault()
        const noteToSave = {
            ...note,
            info: { ...note.info, title: noteToAdd.title, txt: noteToAdd.txt }
        }
        console.log(noteToSave);
        noteService.save(noteToSave)
            .then(() => {
                console.log(note);
                setNote(note)
                setnoteToAdd(noteToAdd)
            })

        // .catch(() => {
        //     // showErrorMsg('Couldnt save')
        //     navigate('/note')
        // })
        // onSaveNote(note)
        // onToggleNoteModal()
    }

    function handleChange({ target }) {

        const { type, name: prop } = target
        let { value } = target
        console.log('name', prop);

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setnoteToAdd((prevNote) => ({ ...prevNote, [prop]: value }))
    }

    // console.log(note);
    // function handleChange({ target }) {
    //     const { value, name: prop } = target
    //     setNote((prevNote) => ({ ...prevNote, [prop]: value }))
    // }

    // const { info } = note
    // const noteToAdd = { title: note.info.title, txt: note.info.txt }

    return (
        <section className="note-add">
            <div className={`input-container ${isExpanded ? 'expanded' : ''}`}>
                <label htmlFor='title'></label>
                {isExpanded && <React.Fragment>
                    <form onSubmit={onAddNote} className='note-form'>

                        <label htmlFor="txt"></label>
                        <input className="input-txt"
                            onChange={handleChange} value={noteToAdd.txt}
                            id="txt" name="txt"
                            type="text" placeholder="title" />

                        <label htmlFor='title'></label>
                        <input className="input-title"
                            onChange={handleChange} value={noteToAdd.title}
                            id="title" name="title"
                            type="text" placeholder="new note..." />
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



// export default NoteAdd;