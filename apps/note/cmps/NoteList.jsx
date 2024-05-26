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
                        <NotePreview note={note} />
                        <img className="action-note hidden" src={"../../../../icons/remove.png"} alt=''
                            onClick={() => onRemove(note.id)} />
                    </Link>
                </li>
            )}
        </ul>
    </section>
}

