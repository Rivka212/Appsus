const { useState, useEffect, useRef } = React
import { noteService } from '../services/note.service.js'
import { ColorInput } from "./ColorInput.jsx";

export function NoteAction({ note, onRemove,onNoteChange}) {
    const [notes, setNotes] = useState([])
    const [noteColor, setNoteColor] = useState({ backgroundColor: '#101010' })
    const [showColorPalette, setShowColorPalette] = useState(false)
    const [newNote, setNewNote] = useState(null) 
    const [fileInputVisible, setFileInputVisible] = useState(false);
const fileInputRef = useRef()

    // useEffect(() => {
    //     fileInputRef.current.click()
    // }, [])

    // const { duplicatedNote } = useParams()
    
    // useEffect(() => {
    //     if (noteColor) {
    //         setNotes(prevNote => ({ ...prevNote, noteColor }))
    //     }
    // }, [noteColor])

    // useEffect(() => {
    //     if (duplicatedNote) {
    //         setNotes(prevNote => ({ ...prevNote, duplicatedNote }))
    //     }
    // }, [duplicatedNote])

    function onDuplicate(noteId) {
        onNoteChange(noteId, 'duplicate')

        // noteService.duplicate(note)
        //     .then((duplicatedNote) => {
        //         console.log(duplicatedNote);
        //         console.log(note.id);
        //         //  setNotes(prevNotes => [...prevNotes, duplicatedNote])
        //         onNoteChange(note.id,'duplicate',duplicatedNote)
        //     })
        //     .catch(err => {
        //         console.log('err:', err)
        //         // showErrorMsg('There was a problem')
        //     })

        //     console.log(notes);
    }

    // function onSetNoteImg(note, imageDataURL) {
    //     onNoteChange(note, 'getImg', imageDataURL )
    //     console.log('bii');
    //     noteService.getNoteImg(note.id, imageDataURL)
    //     const updatedNote = { ...note, info: { ...note.info, url: imageDataURL } }
    // }


    function handleImageUpload(ev) {
        console.log('ev');
        ev.stopPropagation()
        const file = ev.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataURL = reader.result;
                onNoteChange(note.id, 'getImg', imageDataURL )
            }
            reader.readAsDataURL(file)
        }
    }

    function onSetNoteColor(noteId, newColor) {
         onNoteChange(noteId,'color', newColor)
    }


    function handleColorPaletteToggle() {
        setShowColorPalette(!showColorPalette)
    }

    function onGetArchive(noteId, ev){
        onNoteChange(noteId,'archive')
    }

    function handleImage(ev) {
        ev.stopPropagation()
        setFileInputVisible(true)
        if (fileInputRef.current) {
            fileInputRef.current.click()
           }
           ev.preventDefault()
    }

    return (
        <section className="action-note hidden">

            <img src={"../../../../img/more.png"} alt='' />
            <img src={"../../../../icons/download-file.png"} alt='' onClick={(ev) => {
                ev.stopPropagation(), onGetArchive(note.id, ev)
            }}/>
            <img src={"../../../../img/picture.png"} alt='' onClick={(ev) => {
                ev.stopPropagation(), handleImage(ev)
            }}
                className="file-button" />

            {fileInputVisible && (
                <input className='file-input'
                
                    ref={fileInputRef}
                    type="file"
                    style={{ display:'none' }}
                    accept="image/*"
                    onChange={handleImageUpload} />)}

            <img src={"../../../../img/palette.png"} alt=''
                onClick={(ev) => {ev.stopPropagation(), handleColorPaletteToggle(note)}}/>
            {showColorPalette && <ColorInput noteId={note.id} {...noteColor} onSetNoteColor={onSetNoteColor}
                handleColorPaletteToggle={handleColorPaletteToggle} />}
            {/* //   onClick={(event) => onColor(event, note)} /> */}
            {/* <img src={"../../../../icons/person_add.png"} alt='' /> */}
            <img src={"../../../../img/copy.png"} alt=''
                onClick={(ev) => {
                    ev.stopPropagation(), onDuplicate(note.id)
                }} />
            <img src={"../../../../img/delete.png"} alt=''
                onClick={(ev) => {
                    ev.stopPropagation(), onRemove(ev, note.id)
                }} />
        </section>

    )
}
