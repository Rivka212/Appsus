
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteVideo } from "./dynamic-inputs/NoteVideo.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import {NoteAction} from "./NoteAction.jsx";

export function NotePreview({ note, onRemove, onSetNotePinned}) {
    const [cmpType, setCmpType] = useState(null)
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [notes, setNotes] = useState()



    useEffect(() => {
        setCmpType(note.type)
    }, [note.type])

    function handleToggle(note) {
        // setIsPinned(!isPinned)
        setIsPinned(prevIsPinned => !prevIsPinned)
        const newIsPinned = !isPinned
        onTogglePinned(note.id, newIsPinned)
        // onSetNotePinned(note.id, newIsPinned)
    }

    useEffect(() => {
        setIsPinned(note.isPinned); // Update isPinned when the note prop changes
    }, [note]);

    // useEffect(() => {
    //     if (isPinned) {
    //         const updatedNotes = noteService.movePinnedNoteToTop(note.id)
    //         setNotes(updatedNotes)
    //     }
    // }, [isPinned])


    function onTogglePinned(noteId, newIsPinned) {
        console.log(noteId, newIsPinned);
        noteService.updateNotePinnedStatus(noteId, newIsPinned)
            // .then(response => {
                onSetNotePinned(note.id, newIsPinned)
                console.log(note.id, newIsPinned);
            //     console.log("Note updated successfully:", response)
            // })
            // .catch(error => {
            //     console.error("Error updating note:", error)
            // })
    }

    return (
        <article className="note-preview" >
            {/* // <article className={`note-preview ${editClass}`} onClick={onClick}> */}
            <div className="note-details">
                 <div className="note-dynamic-cmp">
                <DynamicCmp cmpType={cmpType} key={note.id} note={note} />
                {/* <DynamicCmp cmpType={cmpType} key={note.id}  {...note}  />/ */}
             </div>
                <span className="hidden">
                    <img src={isPinned ? "../../../../img/thumbtack01.png" :
                     "../../../../img/thumbtack0.png"} alt=''
                     onClick={(ev) => {
                        ev.stopPropagation(), handleToggle(note)
                    }} />
                     {/* onClick={handleToggle} /> */}
                </span>
            </div>
            {/* <img src={`../assets/img/${note.info.url}.png`} alt='' /> */}
            <section className="action-note hidden">
                <NoteAction note={note} onRemove={onRemove}/>
                {/* <img src={"../../../../img/more.png"} alt='' />
                <img src={"../../../../icons/download-file.png"} alt='' />
                <img src={"../../../../img/picture.png"} alt='' />
                <img src={"../../../../img/palette.png"} alt='' />
                {/* <img src={"../../../../icons/person_add.png"} alt='' /> */}
                {/* <img src={"../../../../img/add_alert.png"} alt='' />
                <img src={"../../../../icons/remove.png"} alt=''
                    onClick={(event) => onRemove(event, note.id)} /> */} 
            </section>
        </article>
    )
}

function DynamicCmp(props) {
    if (props.cmpType === 'NoteTxt') {
        return <NoteTxt {...props} />
    } else if (props.cmpType === 'NoteImg') {
        return <NoteImg {...props} />
    } else if (props.cmpType === 'NoteVideo') {
        return <NoteVideo {...props} />
    } else if (props.cmpType === 'NoteTodos') {
        return <NoteTodos {...props} />
    }
}



