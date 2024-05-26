const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onChange }) {
    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id}> 
                {/* style={{ backgroundColor:note.style.backgroundColor}}> */}
                    <Link to={`/note/edit/${note.id}`}>
                        <NotePreview note={note} />
                        <button onClick={() => onRemove(note.id)}>x</button>
                    </Link>
                </li>
            )}
        </ul>
    </section>
}

// style: {
//     backgroundColor: '#F39F76;'
// },