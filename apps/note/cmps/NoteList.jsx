const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onChange }) {

    // const [colorStyle, setColorStyle] = useState({
    //     backgroundColor: notes.style.backgroundColor,
    // })


    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id} style={note.style}>
                    <Link to={`/note/edit/${note.id}`}>
                        {/* ({note.style}); */}
                        <NotePreview note={note} />
                        {/* <i className="fa-solid fa-ellipsis-vertical"> */}
                            <button onClick={() => onRemove(note.id)}>x</button>
                    </Link>
                </li>
            )}
        </ul>
    </section>
}

