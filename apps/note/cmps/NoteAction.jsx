const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'
import { ColorInput } from "./ColorInput.jsx";

export function NoteAction({ note, onRemove }) {
    const [notes, setNotes] = useState([])
    const [noteColor, setNoteColor] = useState({ backgroundColor: '#101010' })
    const [showColorPalette, setShowColorPalette] = useState(false)


    // useEffect(() => {
    //         .then( setNotes(notes))
    //         .catch(() => setNotes([]))
    // }, [])

    function onDuplicate(note) {
        noteService.duplicate(note)
            .then((duplicatedNote) => {
                setNotes(prevNotes => [...prevNotes, duplicatedNote])
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }

    function onSetNoteColor(note, newColor) {
        noteService.colorStyle(note, newColor)
            .then((newColor) => {
                setNoteColor(prevColor => ({ ...prevColor, ...newColor }))
            })
    }

    function handleColorPaletteToggle() {
        setShowColorPalette(!showColorPalette)
    }

    return (
        <section className="action-note hidden">
            <img src={"../../../../img/more.png"} alt='' />
            <img src={"../../../../icons/download-file.png"} alt='' />
            <img src={"../../../../img/picture.png"} alt='' />
            <img src={"../../../../img/palette.png"} alt=''
                onClick={handleColorPaletteToggle} />
            {showColorPalette && <ColorInput {...noteColor} onSetNoteColor={onSetNoteColor} />}
            {/* //   onClick={(event) => onColor(event, note)} /> */}
            {/* <img src={"../../../../icons/person_add.png"} alt='' /> */}
            <img src={"../../../../img/add_alert.png"} alt=''
                onClick={(ev) => {
                    ev.stopPropagation(), onDuplicate(note)
                }} />
            <img src={"../../../../icons/remove.png"} alt=''
                onClick={(ev) => {
                    ev.stopPropagation(), onRemove(ev, note.id)
                }} />
        </section>

    )
}
