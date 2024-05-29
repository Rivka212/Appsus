

export function NoteHeader() {
    return <section className="note-header">

        <div className="note-logo">
            <i className="fa-solid fa-bars" />
            <img src="img/note.png" alt="" />
            <h1>Keep</h1>
        </div>
        <div className="header-action">
            <i className="fas fa-cog" />
            <i className="fa-solid fa-rotate-right" />
            <i className="fas fa-ellipsis-v"></i>
        </div>
    </section>
}