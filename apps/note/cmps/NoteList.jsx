const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onSetNotePinned}) {

    // const [colorStyle, setColorStyle] = useState({
    //     backgroundColor: notes.style.backgroundColor,
    // })
console.log(notes);

    return <section className="note-list">
        <ul>
            {notes.map(note =>
                <li key={note.id} style={note.style}>
                    <Link to={`/note/edit/${note.id}`}>
                        <NotePreview note={note} onRemove={onRemove} onSetNotePinned={onSetNotePinned}/>
                    </Link>
                </li>
            )}
        </ul>
    </section>
}

// const {pinnedNotes, unpinnedNotes} = notes


// return <section className="note-list">
//     <ul>
//         {pinnedNotes.map(pinnedNote =>
//             <li key={pinnedNotes.id} style={pinnedNotes.style}>
//                 <div className="pinned-notes">
//                     <p>Pinned notes</p>
//                     {note.isPinned}</div>
//                 <div className="unpinned-notes">
//                 <p>Unpinned notes</p>
//                     {note.isPinned}</div>
//                 <Link to={`/note/edit/${note.id}`}>
//                     <NotePreview note={note} onRemove={onRemove}/>
//                 </Link>
//             </li>
//         )}
//     </ul>
// </section>
// }

