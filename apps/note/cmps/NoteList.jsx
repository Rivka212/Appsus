
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemove, onChange }) {
    return <section className="note-list">
        <ul>
            {notes.map(note => 
                <li key={note.id}  onClick={() => onChange(note.id)}>
                    <NotePreview note={note} />
                    <button onClick={() => onRemove(note.id)}>x</button>
                </li>
            )}
        </ul>
    </section>
}


// export  function ComposeMail(){
//     const [isOpen, setIsOpen] = useState(false)

//     function openModal() {
//         setIsOpen(true)
//     }

//     function closeModal(){
//         setIsOpen(false)
//     }
//     return <section>
//          <button className="compose-btn" onClick={openModal}>
//             <img src="../../../../icons/compose.png"/>
//             Compose</button>
//             {isOpen && (<ComposeList closeModal={closeModal} />)}
//     </section>
//    
// }