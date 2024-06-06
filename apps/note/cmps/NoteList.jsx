const { Link } = ReactRouterDOM

import { NoteEdit } from "./NoteEdit.jsx"
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onSetNotePinned, onNoteClick, onNoteChange }) {

    // const [colorStyle, setColorStyle] = useState({
    //     backgroundColor: notes.style.backgroundColor,
    // })
    console.log(notes);

    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id} style={note.style}>
                    <div onClick={() => onNoteClick(note.id)}>
                        <NotePreview note={note} onRemove={onRemove} onSetNotePinned={onSetNotePinned} onNoteChange={onNoteChange}/>
                    </div>
                </li>
            )}
        </ul>
    </section>
}


