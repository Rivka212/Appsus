const { useState, useEffect, useRef } = React
import { noteService } from '../services/note.service.js'
import { ColorInput } from "./ColorInput.jsx";

export function NoteAction({ note, onRemove }) {
    const [notes, setNotes] = useState([])
    const [noteColor, setNoteColor] = useState({ backgroundColor: '#101010' })
    const [showColorPalette, setShowColorPalette] = useState(false)
    const [newNote, setNewNote] = useState(null)
    const fileInputRef = useRef()
    const [fileInputVisible, setFileInputVisible] = useState(false);


    // useEffect(() => {
    //     fileInputRef.current.click()
    // }, [])

    // const { duplicatedNote } = useParams()

    // useEffect(() => {
    //     if (duplicatedNote) {
    //         setNoteColor(prevColor => ({ ...prevColor, duplicatedNote }))
    //     }
    // }, [duplicatedNote])

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

    function onSetNoteImg(note, imageDataURL) {
        console.log('bii');
        noteService.getNoteImg(note.id, imageDataURL)
        const updatedNote = { ...note, info: { ...note.info, url: imageDataURL } }
    }


    function handleImageUpload() {

        console.log('ev');
        const file = ev.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataURL = reader.result;
                onSetNoteImg(note, imageDataURL)
            }
            reader.readAsDataURL(file);
        }
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

    function handleImage(ev, note) {
        console.log(note, ev)
        setFileInputVisible(true)
        // ev.preventDefault()
        // console.log(fileInputRef.current);
        fileInputRef.current.click()
        if (fileInputRef.current) {
            console.log(fileInputRef.current)
        }
    }

    return (
        <section className="action-note hidden">

            <img src={"../../../../img/more.png"} alt='' />
            <img src={"../../../../icons/download-file.png"} alt='' />
            {/* <label className="file-input-label"> */}
            <img src={"../../../../img/picture.png"} alt='' onClick={(ev) => {
                ev.stopPropagation(), handleImage(ev)
            }}
                className="file-button" />

            {/* //   handleImageUpload(ev) onSetNoteImg(note)} */}
            {/* //  fileInputRef.current.click()}}/> */}

            {fileInputVisible && (
                <input className='file-input'
                    // <input type="file" onChange={handleImageUpload} />

                    // autoFocus
                    ref={fileInputRef}
                    type="file"
                    style={{ display: fileInputVisible ? 'block' : 'none' }}

                    // style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageUpload} />)}

            <img src={"../../../../img/palette.png"} alt=''
                onClick={() => handleColorPaletteToggle(note)} />
            {showColorPalette && <ColorInput noteId={note.id} {...noteColor} onSetNoteColor={onSetNoteColor}
                handleColorPaletteToggle={handleColorPaletteToggle} />}
            {/* //   onClick={(event) => onColor(event, note)} /> */}
            {/* <img src={"../../../../icons/person_add.png"} alt='' /> */}
            <img src={"../../../../img/copy.png"} alt=''
                onClick={(ev) => {
                    ev.stopPropagation(), onDuplicate(note)
                }} />
            <img src={"../../../../img/delete.png"} alt=''
                onClick={(ev) => {
                    ev.stopPropagation(), onRemove(ev, note.id)
                }} />
        </section>

    )
}
