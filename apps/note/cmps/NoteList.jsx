
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onChange }) {
    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} onClick={onChange}/>
                    <button onClick={() => onRemove(note.id)}>x</button>
                </li>
            )}
        </ul>
    </section>
}


onClick={handleNoteClick}
//  { const handleNoteClick = (note) => { onChange(note); };

{/* <NoteList notes={notes} onRemove={removeNote} onChange={handleNoteClick} /> */}

// onClick={() => handleNoteClick(note)}
