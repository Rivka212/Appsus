const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onSetNotePinned }) {

    // const [colorStyle, setColorStyle] = useState({
    //     backgroundColor: notes.style.backgroundColor,
    // })
    // console.log(notes);
    // console.log(notes);

    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id} style={note.style}>
                    <Link to={`/note/edit/${note.id}`}>
                        <div>
                            <NotePreview note={note} onRemove={onRemove} onSetNotePinned={onSetNotePinned} />
                        </div>
                    </Link>
                </li>
            )}
        </ul>
    </section>
}

