
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onChange }) {
    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} onClick={() => onChange(note)}/>
                    <button onClick={() => onRemove(note.id)}>x</button>
                </li>
            )}
        </ul>
    </section>
}
