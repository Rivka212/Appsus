import { noteService } from '../services/note.service.js'


const { useState, useEffect, useRef } = React

export function NoteAdd() {
    const [note, setNote] = useState(null)
    // const [noteToAdd, setnoteToAdd] = useState(noteService.getEmptyNote())

    const [noteToAdd, setnoteToAdd] = useState({
        createdAt: new Date().toISOString().slice(0, 10),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            title: '',
            txt: ''
        }
    })


    // useEffect(() => {
    //     if (!params.noteId) return
    //     noteService.get(params.noteId)
    //         .then(note => setNote(note))
    // }, [])



    console.log(noteToAdd);
    // console.log(note);

    // useEffect(() => {
    //     const noteToAdd = { title: note.info.title, txt: note.info.txt }
    // //     // noteService.get(params.noteId)
    //         .then(() => {
    //             setNote(note)
    //             setnoteToAdd(noteToAdd)
    //         })
    // }, [])


    function onAddNote(ev) {
        console.log(ev);
        ev.preventDefault()
        const noteToSave = {
            ...note,
            info: { ...note.info, title: noteToAdd.title, txt: noteToAdd.txt }
        }
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
            <form onSubmit={onAddNote} className='note-form'>
                <label htmlFor='title'></label>
                <input className="input-title"
                    onChange={handleChange} value={noteToAdd.title}
                    id="title" name="title"
                    type="text" placeholder="new note..." />

                <label htmlFor="txt"></label>
                <input className="input-txt"
                    onChange={handleChange} value={noteToAdd.txt}
                    id="txt" name="txt"
                    type="text" placeholder="title" />

                {/* <textarea
                    placeholder="new note..."
                    name='txt'
                    cols='30'
                    rows='10'
                    value={info.txt}
                    onChange={handleChange}
                ></textarea> */}
                <button>closure</button>
            </form>
        </section>
    )
}