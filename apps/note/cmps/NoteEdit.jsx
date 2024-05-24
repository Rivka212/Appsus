import { showErrorMsg } from '../services/event-bus.service.js'
import { NoteIndex } from '../views/NoteIndex.jsx'
import { noteService } from '../services/note.service.js'

 export function NoteEdit({note}){

    const [note, setNote] = useState()

      useEffect(() => {
        if (!note) return
        noteService.getNoteById(noteId)
            .then(note => setNote(note))
    }, [])



    // useEffect(() => {
    //     if (!params.noteId) return
    //     noteService.get(params.noteId)
    //         .then(note => setNote(note))
    // }, [])

return (
    <section><h1>hi</h1></section>
)




 }