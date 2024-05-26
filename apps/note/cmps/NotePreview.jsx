
const { useState, useEffect } = React

import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteVideo } from "./dynamic-inputs/NoteVideo.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";

export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState(null)

    useEffect(() => {
        setCmpType(note.type)
    }, [note.type])

    return (
        <article className="note-preview" >
            {/* // <article className={`note-preview ${editClass}`} onClick={onClick}> */}
            <div className="note-details">
                <h3>{note.info.txt} </h3>
                <span className="hidden">
                    <i className="fa-solid fa-thumbtack" /></span>
            </div>
            <DynamicCmp cmpType={cmpType} key={note.id} note={note} />
            {/* <DynamicCmp cmpType={cmpType} key={note.id}  {...note}  />/ */}
            {/* <h3>{note.info.title}</h3> */}
            <img src={`../assets/img/${note.info.url}.png`} alt='' />
            <section className="action-note hidden">
                <img src={"../../../../img/more.png"} alt='' />
                {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
                <img src={"../../../../icons/download-file.png"} alt='' />
                {/* <i className="fa-regular fa-image"></i> */}
                <img src={"../../../../img/picture.png"} alt='' />
                <img src={"../../../../img/palette.png"} alt='' />
                <img src={"../../../../icons/person_add.png"} alt='' />
                <img src={"../../../../img/add_alert.png"} alt='' />
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
    } else if (props.cmpType === 'NoteTodo') {
        return <NoteTodos {...props} />
    }
}



