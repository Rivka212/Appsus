import { NoteFilter } from '../cmps/NoteFilter.jsx'


export function NoteHeader({filterBy, onFilter}) {
    return <section className="note-header">

        <div className="note-logo">
            <i className="fa-solid fa-bars" />
            <img src="img/note.png" alt="" />
            <h1>Keep</h1>
        </div>
        <NoteFilter filterBy={filterBy} onFilter={onFilter}/>
        <div className="header-action">
            <i className="fas fa-cog" />
            <i className="fa-solid fa-rotate-right" />
            <i className="fas fa-ellipsis-v"></i>
        </div>
    </section>
}